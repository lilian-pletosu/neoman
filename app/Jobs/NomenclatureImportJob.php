<?php

namespace App\Jobs;

use App\Http\Controllers\front\UltraImportController;
use App\Services\UltraImportService;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class NomenclatureImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3; // Numărul de încercări
    public $backoff = 10; // Timpul de așteptare între încercări în secunde

    protected $guid;
    protected $requestParams;
    protected $maxRetries = 5; // Maximum number of retries
    protected $retryDelay = 2; // Delay between retries in seconds

    /**
     * Create a new job instance.
     *
     * @param array $requestParams
     * @param string $guid
     */
    public function __construct(array $requestParams)
    {
        $this->requestParams = $requestParams;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $attempt = $this->attempts();
        Log::info("Attempt number: $attempt, in NOMENCLATURE service for GUID:", [$this->guid]);

        $client = new Client([
            'base_uri' => 'https://neoman.md',
            'timeout' => 600, // Timeout set to 600 seconds (10 minutes)
            'connect_timeout' => 600, // Connection timeout set to 60 seconds
        ]);


        $ultraImportController = new UltraImportController();

        $request = new Request();
        $request->merge($this->requestParams);
        $this->guid = $ultraImportController->requestData($request);

        Log::info('Guid is:', [$this->guid]);

        $status = false;

        do {
            try {
                ini_set('max_execution_time', 0); // Setăm timpul de execuție la infinit (0)
                // need to set time for request more than 60 seconds

                $newStatus = $this->isReady($client, $this->guid);
                $status = $newStatus['status'] ?? false;
                Log::info("Status for NOMENCLATURE is: ", [$status]);

            } catch (\Exception $e) {
                Log::error('Error checking status: ' . $e->getMessage());
                throw $e;
            }
        } while ($status == false);


        Log::info('Service is ready, proceeding with the next steps');

        // Obține datele pe baza GUID-ului


        try {
            ini_set('max_execution_time', 600);

            $responseBody = (new UltraImportService())->getDataByID($this->guid);

        } catch (\Exception $exception) {
            Log::error('We have an error: ' . $exception->getMessage());
            throw $exception; // Aruncăm din nou excepția pentru a declanșa retry logic
        }
// //
        $this->isCommit();
        $encodedData = json_encode($responseBody);
        $data = json_decode($encodedData, true);
// //        // Salvăm datele în Redis
        Redis::set("NOMENCLATURE", json_encode($data['nomenclature']));
// //
        Log::info('NOMENCLATURE process is done!');

    }

    protected function isReady(Client $client, $guid)
    {
        $responseBody = (new UltraImportService())->isReady($guid);
        $response = json_decode(json_encode($responseBody), true);
//        $response = $client->get("/api/check-status/{$guid}");
        $body = json_decode((string)$response->getBody(), true);
        return $body;
    }

    protected function isCommit()
    {
        (new UltraImportService())->commitReceivingData('NOMENCLATURE');
    }

    /**
     * Handle a job failure.
     *
     * @param \Exception $exception
     * @return void
     */
    public function failed(\Throwable $exception)
    {
        Log::error("Job failed after {$this->attempts()} attempts for GUID: {$this->guid}. Exception: {$exception->getMessage()}");
    }

    protected function getDataWithRetries(Client $client, $uri, $retries = 0)
    {
        try {
            $response = $client->get($uri);
            return json_decode($response->getBody()->getContents());
        } catch (RequestException $exception) {
            if ($exception->getCode() == 504 && $retries < $this->maxRetries) {
                Log::warning("504 Gateway Timeout error, retrying... ({$retries}/{$this->maxRetries})");
                sleep($this->retryDelay);
                return $this->getDataWithRetries($client, $uri, ++$retries);
            }
            throw $exception; // Rethrow the exception if max retries are reached
        } catch (ServerException $exception) {
            Log::error('Server error: ' . $exception->getMessage());
            throw $exception;
        }
    }
}

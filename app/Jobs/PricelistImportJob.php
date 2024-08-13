<?php

namespace App\Jobs;

use App\Http\Controllers\front\UltraImportController;
use App\Services\UltraImportService;
use GuzzleHttp\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class PricelistImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3; // Numărul de încercări
    public $backoff = 10; // Timpul de așteptare între încercări în secunde
    protected $guid;
    protected $requestParams;

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
        Log::info("Attempt number: $attempt, in PRICELIST service for GUID:", [$this->guid]);

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
                $newStatus = $this->isReady($client, $this->guid);
                $status = $newStatus['status'] ?? false;
                Log::info("Status for PRICELIST is: ", [$status]);

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


       Redis::set("PRICELIST", json_encode($data['price']));
// //
       Log::info('NOMENCLATURE process is done!');

    }

    protected function isReady(Client $client, $guid)
    {
        $response = $client->get("/api/check-status/{$guid}");
        $body = json_decode((string)$response->getBody(), true);
        return $body;
    }

    protected function getData(UltraImportController $ultraImportController, $guid)
    {
        return $ultraImportController->getData($guid);
    }

    protected function isCommit()
    {
        (new UltraImportService())->commitReceivingData('PRICELIST');
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

}

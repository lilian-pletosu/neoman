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

class BrandImportJob implements ShouldQueue
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
        Log::info("Attempt number: $attempt, in BRAND service for GUID: $this->guid");

        $client = new Client(['base_uri' => 'https://neoman.md']);


        $ultraImportController = new UltraImportController(new UltraImportService());

        $request = new Request();
        $request->merge($this->requestParams);
        $this->guid = $ultraImportController->requestData($request);

        do {
            $status = $this->isReady($client, $this->guid);
            Log::info("Status for BRAND is: ", (array)$status);

            if (!$status) {
                Log::info('Service not yet ready', ['status' => $status]);
                sleep(2); // Așteaptă 2 secunde înainte de a verifica din nou
            }
        } while (isset($status['status']) && !$status['status']);

        Log::info('Service is ready, proceeding with the next steps');

        // Obține datele pe baza GUID-ului
        try {
            $response = $client->get("api/get-data/$this->guid");

            $responseBody = json_decode($response->getBody()->getContents());
        } catch (\Exception $exception) {
            Log::error('We have an error: ', (array)$exception->getMessage());
            throw $exception; // Aruncăm din nou excepția pentru a declanșa retry logic
        }

        $this->isCommit();
        Log::info("Data for BRAND received");

        // Salvăm datele în Redis
        Redis::set("BRAND", json_encode($responseBody->brand));

        Log::info('BRAND process is done!');
    }

    protected function isReady(Client $client, $guid)
    {
        $responseBody = (new UltraImportService())->isReady($guid);
        $response = json_decode(json_encode($responseBody), true);
        Log::info('test here', [$response]);

        return $response;
    }

    protected function isCommit()
    {
        (new UltraImportService())->commitReceivingData('BRAND');
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

    protected function getData(UltraImportController $ultraImportController, $guid)
    {
        return $ultraImportController->getData($guid);
    }

}

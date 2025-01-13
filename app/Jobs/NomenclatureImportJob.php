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

class NomenclatureImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 5; // Numărul de încercări
    public $backoff = [60, 90, 110]; // Timpul de așteptare între încercări în secunde
    public $timeout = 3600; // 1 hour timeout


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

        // Log::info('Guid is:', [$this->guid]);


        do {
            $status = $this->isReady($client, $this->guid);
            // Log::info("Status for NOMENCLATURE is: ", (array)$status);

            if (!$status) {
                // Log::info('Service not yet ready', ['status' => $status]);
                sleep(15); // Așteaptă 2 secunde înainte de a verifica din nou
            }
        } while ($status === false);


        Log::info('Service NOMENCLATURE is ready, proceeding with the next steps. Dispatching NomenclatureImportFetchProductsJob with GUID:', [$this->guid ?? 'N/A']);

        if ($this->guid) {
            dispatch(new NomenclatureImportFetchProductsJob($this->guid));
        } else {
            Log::error('GUID is null. Dispatching NomenclatureImportFetchProductsJob with GUID: N/A');
            return;
        }
    }

    protected function isReady(Client $client, $guid)
    {
        $responseBody = (new UltraImportService())->isReady($guid);
        $response = json_decode(json_encode($responseBody), true);
        return $response;
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

<?php

namespace App\Jobs;

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

class ParentListImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3; // Numărul de încercări
    public $backoff = 10; // Timpul de așteptare între încercări în secunde
    protected $guid;
    protected $requestParams;

    /**
     * Create a new job instance.
     *
     * @param string $guid
     * @param array $requestParams
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
        Log::info("Attempt number: $attempt, in PARENTLIST service for GUID: " . $this->guid);

        $client = new Client(['base_uri' => 'https://neoman.md']);
        $ultraImportService = new (new UltraImportService());


        $request = new Request();
        $request->merge($this->requestParams);
        $this->guid = $ultraImportService->requestData($request->input('service'),
            $request->input('all'),
            $request->input('additionalParams'));


        do {
            $status = $this->isReady($client, $this->guid);
            Log::info("Status for PARENTLIST is: ", ['status' => $status]);
            if (!$status) {
                Log::info('Service not yet ready', ['status' => $status['status']]);
                sleep(2); // Așteaptă 2 secunde înainte de a verifica din nou
            }
        } while (isset($status['status']) && !$status['status']);
        Log::info("Status for PARENTLIST is: ", ['status' => $status]);
        Log::info('Service is ready, proceeding with the next steps');

        // Obține datele pe baza GUID-ului
        try {
            $data = $this->getData($ultraImportService, $this->guid);
            Log::info("Data for PARENTLIST received", ['data' => $data]);
        } catch (\Exception $exception) {
            Log::error('We have an error: ' . $exception->getMessage());
            throw $exception; // Aruncăm din nou excepția pentru a declanșa retry logic
        }

        $this->isCommit();

        // Salvăm datele în Redis
        Redis::set("PARENTLIST", json_encode($data));

        Log::info('PARENTLIST process is done!');
    }

    protected function isReady(Client $client, $guid)
    {
        $response = $client->get("/api/check-status/{$guid}");
        $body = json_decode((string)$response->getBody(), true);
        return $body;
    }

    protected function getData(UltraImportService $ultraImportService, $guid)
    {
        return response()->json($ultraImportService->getDataByID($guid));
    }

    protected function isCommit()
    {
        (new UltraImportService())->commitReceivingData('PARENTLIST');
    }

    /**
     * Handle a job failure.
     *
     * @param \Exception $exception
     * @return void
     */
    public function failed(\Throwable $exception)
    {
        Log::error("Job failed after {$this->attempts()} attempts for GUID: $this->guid. Exception: {$exception->getMessage()}");
    }
}

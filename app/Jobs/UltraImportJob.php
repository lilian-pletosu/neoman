<?php

namespace App\Jobs;

use App\Models\PollingResult;
use App\Services\UltraImportService;
use GuzzleHttp\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class UltraImportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $guid;
    protected $service;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($guid, $service)
    {
        $this->guid = $guid;
        $this->service = $service;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $client = new Client(['base_uri' => 'https://neoman.md']);

        do {
            $status = $this->isReady($client, $this->guid);
            Log::info("Status for $this->service is: ", [$status]);
        } while ($status == false);

        Log::info('Service is ready, proceeding with the next steps');

        // Obține datele pe baza GUID-ului

        $data = $this->getData($client, $this->guid);

        Log::info("Data for: {$this->service} received: ", [$data]);


        // Continuă cu următorii pași, de exemplu, salvarea datelor în baza de date
        Redis::set("$this->service:" . $this->guid, json_encode($data));

    }

    protected function isReady(Client $client, $guid, $maxRetries = 10, $retryInterval = 10)
    {
        $response = $client->get("/api/check-status/{$guid}");
        Log::info('In Ready function1 body is:' . $response->getBody()->getContents());
        $body = json_decode((string)$response->getBody(), true);
        Log::info('In Ready function2 body is:', [$body]);
        return $body;

    }

    protected function getData(Client $client, $guid)
    {
        $response = $client->get("/api/get-data/{$guid}");
        return json_decode((string)$response->getBody(), true);
    }

}

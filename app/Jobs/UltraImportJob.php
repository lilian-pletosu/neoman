<?php

namespace App\Jobs;

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

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($guid)
    {
        $this->guid = $guid;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(UltraImportService $ultraImportService)
    {
        $client = new Client(['base_uri' => 'https://neoman.md']);
//
//        $response = $client->post('request-data');
//
//        $body = json_decode((string)$response->getBody(), true);
//        return $body['guid'];

        // Așteaptă până când serviciul este gata


        do {
            $status = $this->isReady($client, $this->guid);
        } while (!$status);

        Log::info('Service is ready, proceeding with the next steps');

        // Obține datele pe baza GUID-ului
        $data = $this->getData($client, $this->guid);
        Log::info('Data received: ', $data);

        // Continuă cu următorii pași, de exemplu, salvarea datelor în baza de date
        Redis::set('data:' . $this->guid, json_encode($data));

    }

//    protected function requestData(Client $client)
//    {
//        $response = $client->post('/api/request-data');
//
//        $body = json_decode((string)$response->getBody(), true);
//        return $body['guid'];
//    }

    protected function isReady(Client $client, $guid, $maxRetries = 10, $retryInterval = 5)
    {
        $response = $client->get("/api/check-status/{$guid}");
        $body = json_decode((string)$response->getBody(), true);
        return $body['status'];

    }

    protected function getData(Client $client, $guid)
    {
        $response = $client->get("/api/get-data/{$guid}");
        return json_decode((string)$response->getBody(), true);
    }
}

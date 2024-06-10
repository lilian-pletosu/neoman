<?php

namespace App\Jobs;

use App\Models\PollingResult;
use App\Services\UltraImportService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class PollDataByID implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

//    protected $GUID;

    /**
     * Create a new job instance.
     *
     * @return void
     */
//    public function __construct($GUID)
//    {
//        $this->GUID = $GUID;
//    }


    public function handle(UltraImportService $ultraImportService)
    {

        $maxRetries = 30;
        $retryCount = 0;
        $GUID = $ultraImportService->requestData('BRAND', true, '');
        if ($ultraImportService->waitForReady($GUID)) {
            echo "Proceeding with the next steps\n";
            $data = $ultraImportService->getDataByID($GUID);

            while ($data->return === $GUID && $retryCount < $maxRetries) {
                sleep(10);
                $data = $ultraImportService->getDataByID($GUID);
                Log::info('Polling attempt', ['retryCount' => $retryCount, 'GUID' => $GUID, 'response' => $data->return]);
                $retryCount++;
                if ($data->return !== $GUID) {
                    break;
                }
            }

            // Store or process the data
            Redis::set('data:' . $GUID, json_encode($data));
            Log::info('Data retrieved', ['data' => $data]);

        } else {
            if ($retryCount >= $maxRetries) {
                Log::warning('Maximum retries reached', ['GUID' => $GUID]);
                // Handle case where data is not available after max retries
            }
        }


// Inside handle() method after data is retrieved

        PollingResult::updateOrCreate(
            ['guid' => $GUID],
            ['data' => json_encode($data)]
        );

        // You might want to store the data in a database or cache for later retrieval
    }
}

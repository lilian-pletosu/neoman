<?php

namespace App\Jobs;

use App\Services\UltraImportService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class NomenclatureImportFetchProductsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3; // Numărul de încercări
    public $backoff = 10; // Timpul de așteptare între încercări în secunde

    protected $guid;

    /**
     * Create a new job instance.
     *
     * @param string $guid
     */
    public function __construct(string $guid)
    {
        $this->guid = $guid;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        try {
            ini_set('max_execution_time', 900);
            set_time_limit(900);

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
}

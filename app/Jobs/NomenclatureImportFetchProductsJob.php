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

<?php

namespace App\Jobs;

use App\Services\UltraImportProcessingService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;


class SeedInDatabaseUltraProducts implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 5600; // 5600 sec = 1 h 33 min

    public function handle()
    {
        try {
            (new UltraImportProcessingService())();
            Log::info('Ultra products have been seeded in the database');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Bus\Batch;
use App\Jobs\BrandImportJob;
use App\Jobs\ParentImportJob;
use App\Jobs\TranslationsUltra;
use Illuminate\Console\Command;
use App\Jobs\PricelistImportJob;
use App\Jobs\NomenclatureImportJob;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;
use App\Jobs\NomenclatureTypeImportJob;
use App\Jobs\SeedInDatabaseUltraProducts;

class RunSoapController extends Command
{
    protected $signature = 'run:import-ultra'; // Numele și semnătura comenzii console
    protected $description = 'Import data from Ultra service'; // Descrierea comenzii console

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Parametrii pentru diferite servicii
        $services = [
            'NOMENCLATURE' => [
                'params' => [
                    "service" => "NOMENCLATURE",
                    "all" => true,
                    "additionalParams" => ""
                ],
                'job' => NomenclatureImportJob::class
            ],
            'PARENTLIST' => [
                'params' => [
                    "service" => "PARENTLIST",
                    "all" => true,
                    "additionalParams" => "NOMENCLATURETYPELIST"
                ],
                'job' => ParentImportJob::class
            ],
            'NOMENCLATURETYPELIST' => [
                'params' => [
                    "service" => "NOMENCLATURETYPELIST",
                    "all" => true,
                    "additionalParams" => ""
                ],
                'job' => NomenclatureTypeImportJob::class
            ],
            'BRAND' => [
                'params' => [
                    "service" => "BRAND",
                    "all" => true,
                    "additionalParams" => ""
                ],
                'job' => BrandImportJob::class
            ],
            'PRICELIST' => [
                'params' => [
                    "service" => "PRICELIST",
                    "all" => true,
                    "additionalParams" => ""
                ],
                'job' => PricelistImportJob::class
            ],
            'TRANSLATIONS' => [
                'params' => [
                    "service" => "TRANSLATIONS",
                    "all" => true,
                    "additionalParams" => ""
                ],
                'job' => TranslationsUltra::class
            ],
        ];

        try {
            $jobs = [];
            foreach ($services as $service => $details) {
                $requestParams = $details['params'];
                $jobClass = $details['job'];

                $jobClass::dispatch($requestParams);

                Log::info("$service import job was prepared.");
            }

            Bus::batch($jobs)
                ->then(function (Batch $batch) {
                    // This will only run after all jobs in the batch have completed
                    SeedInDatabaseUltraProducts::dispatch();
                    Log::info('Starting database seeding after all imports completed');
                })
                ->catch(function (Batch $batch, \Throwable $e) {
                    Log::error('Batch failed: ' . $e->getMessage());
                })
                ->dispatch();

            $this->info('All import jobs were successfully dispatched.');
        } catch (\Exception $e) {
            $this->error('An error occurred while dispatching the import jobs.');
            Log::error('Error dispatching import jobs: ' . $e->getMessage());
            throw $e; // Re-aruncăm excepția pentru a permite retry logic (dacă există)
        }
    }
}

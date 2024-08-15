<?php

namespace App\Console\Commands;

use App\Jobs\BrandImportJob;
use App\Jobs\NomenclatureImportJob;
use App\Jobs\NomenclatureTypeImportJob;
use App\Jobs\ParentImportJob;
use App\Jobs\PricelistImportJob;
use App\Jobs\TranslationsUltra;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

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
            foreach ($services as $service => $details) {
                $requestParams = $details['params'];
                $jobClass = $details['job'];

                $jobClass::dispatch($requestParams);

                Log::info("$service import job was successfully dispatched.");
            }

            $this->info('All import jobs were successfully dispatched.');
        } catch (\Exception $e) {
            $this->error('An error occurred while dispatching the import jobs.');
            Log::error('Error dispatching import jobs: ' . $e->getMessage());
            throw $e; // Re-aruncăm excepția pentru a permite retry logic (dacă există)
        }
    }
}

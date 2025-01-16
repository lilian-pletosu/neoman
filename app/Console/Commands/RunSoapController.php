<?php

namespace App\Console\Commands;

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
            'NOMENCLATURE' => [
                'params' => [
                    "service" => "NOMENCLATURE",
                    "all" => true,
                    "additionalParams" => ""
                ],
                'job' => NomenclatureImportJob::class
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
            $chain = [
                new ParentImportJob($services['PARENTLIST']['params']),
                new NomenclatureTypeImportJob($services['NOMENCLATURETYPELIST']['params']),
                new BrandImportJob($services['BRAND']['params']),
                new NomenclatureImportJob($services['NOMENCLATURE']['params']),
                new PricelistImportJob($services['PRICELIST']['params']),
                new TranslationsUltra($services['TRANSLATIONS']['params']),
                new SeedInDatabaseUltraProducts()
            ];

            Bus::chain($chain)->dispatch();

            Log::info('Job chain was successfully dispatched');
            $this->info('All import jobs were successfully chained and dispatched.');
        } catch (\Exception $e) {
            $this->error('An error occurred while dispatching the import jobs.');
            Log::error('Error dispatching import jobs: ' . $e->getMessage());
            throw $e;
        }
    }
}

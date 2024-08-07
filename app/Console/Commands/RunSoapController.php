<?php

namespace App\Console\Commands;

use App\Jobs\BrandImportJob;
use App\Jobs\NomenclatureImportJob;
use App\Jobs\NomenclatureTypeImportJob;
use App\Jobs\ParentListImportJob;
use App\Jobs\PricelistImportJob;
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
        $startTime = microtime(true);

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
                    "additionalParams" => "NOMENCLATURE"
                ],
                'job' => ParentListImportJob::class
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
            ]
        ];

        try {
            foreach ($services as $service => $details) {
                $requestParams = $details['params'];
                $jobClass = $details['job'];

                $jobClass::dispatch($requestParams);

                Log::info("$service import was successfully executed with GUID: $service");
            }

            $endTime = microtime(true);
            $executionTime = $endTime - $startTime;
            $this->info('All imports were successfully executed');
            $this->info('Total execution time: ' . round($executionTime, 2) . ' seconds');

        } catch (\Exception $e) {
            $endTime = microtime(true);
            $executionTime = $endTime - $startTime;
            $this->error('An error occurred during the import process');
            $this->error('Execution time before error: ' . round($executionTime, 2) . ' seconds');
            $this->error($e->getMessage());
            Log::error('An error occurred during the import process: ' . $e->getMessage());
            throw $e; // Aruncăm din nou excepția pentru a permite retry logic
        }
    }
}

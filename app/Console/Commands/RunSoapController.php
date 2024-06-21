<?php

namespace App\Console\Commands;

use App\Http\Controllers\front\UltraImportController;
use App\Services\UltraImportService;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use PHPUnit\Event\Exception;

class RunSoapController extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:import-ultra';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $startTime = microtime(true);
        $ultraImportController = new UltraImportController(new UltraImportService());

        try {
            // Step 1: Import NOMENCLATURE
            $nomenclatureRequest = new Request();
            $nomenclatureRequest->merge([
                "service" => "NOMENCLATURE",
                "all" => true,
                "additionalParams" => ""
            ]);
            $ultraImportController->requestData($nomenclatureRequest);
            $this->info('NOMENCLATURE import was successful');

            // Step 2: Import BRAND
            $brandRequest = new Request();
            $brandRequest->merge([
                "service" => "BRAND",
                "all" => true,
                "additionalParams" => ""
            ]);
            $ultraImportController->requestData($brandRequest);
            $this->info('BRAND import was successful');

            // Step 3: Import PRICELIST
            $pricelistRequest = new Request();
            $pricelistRequest->merge([
                "service" => "PRICELIST",
                "all" => true,
                "additionalParams" => ""
            ]);
            $ultraImportController->requestData($pricelistRequest);
            $this->info('PRICELIST import was successful');

            // Step 4: Import NOMENCLATURETYPE
            $nomenclatureTypeRequest = new Request();
            $nomenclatureTypeRequest->merge([
                "service" => "NOMENCLATURETYPE",
                "all" => true,
                "additionalParams" => ""
            ]);
            $ultraImportController->requestData($nomenclatureTypeRequest);
            $this->info('NOMENCLATURETYPE import was successful');

            $endTime = microtime(true);
            $executionTime = $endTime - $startTime;
            $this->info('All imports were successfully executed');
            $this->info('Total execution time: ' . round($executionTime, 2) . ' seconds');
        } catch (Exception $exception) {
            $endTime = microtime(true);
            $executionTime = $endTime - $startTime;

            $this->info('An error occurred during the import process');
            $this->error('Execution time before error: ' . round($executionTime, 2) . ' seconds');
            $this->error($exception->getMessage());
        }
        return 0;



//        $client->post('api/request-data', [
//            "service"=> "PARENTLIST",
//            "all"=> true,
//            "additionalParams"=> "NOMENCLATURE"
//        ]);


    }
}

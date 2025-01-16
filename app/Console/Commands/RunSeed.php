<?php

namespace App\Console\Commands;

use App\Http\Controllers\front\HomeController;
use Illuminate\Http\Request;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Services\UltraImportService;
use App\Jobs\SeedInDatabaseUltraProducts;
use App\Http\Controllers\front\UltraImportController;


class RunSeed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-seed';

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

         SeedInDatabaseUltraProducts::dispatch();

        // $params = [
        //     "service" => "NOMENCLATURE",
        //     "all" => false,
        //     "additionalParams" => ""
        // ];

        // $request = new Request();
        // $request->merge($params);
        // $ultraImportController = new UltraImportController();
        // $ultraImportService = new UltraImportService();

        // $guid = $ultraImportController->requestData($request);
        // $isReady = false;
        // $maxTries = 30;
        // $tries = 0;

        // do {
        //     sleep(50);
        //     $isReady = $ultraImportService->isReady($guid);
        //     logger()->info('isReady response', ['tries' => $tries, 'isReady' => $isReady, 'guid' => $guid]);

        //     $tries++;
        // } while (!$isReady && $tries < $maxTries);

        // if ($isReady) {
        //     logger()->info('Resource is ready', ['guid' => $guid]);
        // } else {
        //     logger()->warning('Timeout: Resource not ready', ['guid' => $guid]);
        // }


        // var_dump('ura');



        // // dd($isReady);


        // try {
        //     ini_set('max_execution_time', 900);
        //     set_time_limit(900); // Setăm timpul maxim de execuție la 15 minute

        //     $responseBody = (new UltraImportService())->getDataByID($guid);
        // } catch (\Exception $exception) {
        //     Log::error('We have an error: ' . $exception->getMessage());
        //     throw $exception; // Aruncăm din nou excepția pentru a declanșa retry logic
        // }
        // // //
        // $encodedData = json_encode($responseBody);
        // $data = json_decode($encodedData, true);
        // Log::info('Data received from API: ' . [$data]);
    }

    public function check($guid, $ultraImportService)
    {
        return (new HomeController($ultraImportService))->checkStatus($guid)->getData()->status;
    }
}

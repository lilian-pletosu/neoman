<?php

namespace App\Console\Commands;

use App\Http\Controllers\front\UltraImportController;
use Illuminate\Console\Command;

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

    protected $soapController;

    public function __construct(UltraImportController $soapController)
    {
        parent::__construct();

        $this->soapController = $soapController;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $service = 'NOMENCLATURE';
        $all = true;
        $additionalParameters = '';
        $compress = false;

        $GUID = $this->soapController->requestData();
//        $isReady = $this->soapController->checkIsReady($GUID);
        // Loop until isReady returns true
        while (true) {
            $isReady = $this->soapController->checkIsReady($GUID);
            if ($isReady) {
                break;
            }

            // Wait for 5 seconds before trying again
            sleep(5);
        }
        while (true) {
            $data = $this->soapController->getDataByID($GUID);
            if ($data) {
                break;
            }
        }

        // Wait for 5 seconds before trying again

//            $data = $this->soapController->getDataByID($GUID);
        dd($data);
//        $response = $this->soapController->commitReceivingData($service);
    }
}

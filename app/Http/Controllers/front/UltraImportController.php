<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Services\UltraImportService;
use Illuminate\Http\Request;


class UltraImportController extends Controller
{

    protected $ultraImportService;

    public function __construct()
    {
        $this->ultraImportService = new UltraImportService();
    }

    public function requestData(Request $request)
    {

        $guid = $this->ultraImportService->requestData(
            $request['service'],
            $request['all'],
            $request['additionalParams']
        );

        return $guid;
    }

    public function checkStatus($guid)
    {
        $status = $this->ultraImportService->waitForReady($guid);
        return response()->json(['status' => $status]);
    }


    public function getData($guid)
    {
        $data = $this->ultraImportService->getDataByID($guid);
        return response()->json($data);
    }

    public function commitReceivingData(string $service): void
    {
        $this->ultraImportService->commitReceivingData($service);
    }
}

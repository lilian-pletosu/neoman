<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Services\UltraImportService;
use Illuminate\Http\Request;


class UltraImportController extends Controller
{

    protected $ultraImportService;

    public function __construct(UltraImportService $ultraImportService)
    {
        $this->ultraImportService = $ultraImportService;
    }

    public function requestData(Request $request)
    {

        $guid = $this->ultraImportService->requestData(
            $request->input('service'),
            $request->input('all'),
            $request->input('additionalParams')
        );


        return $guid;
    }

    public function checkStatus($guid)
    {
        $status = $this->ultraImportService->waitForReady($guid);
        return response()->json(['status' => $status]);
    }


    public function getData($guid): \Illuminate\Http\JsonResponse
    {
        $data = $this->ultraImportService->getDataByID($guid);
        return response()->json($data);
    }

    public function commitReceivingData(string $service): void
    {
        $this->ultraImportService->commitReceivingData($service);
    }

}

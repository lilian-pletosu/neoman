<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\ProductService;
use App\Services\UltraImportService;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{

    protected $ultraImportService;

    public function __construct(UltraImportService $ultraImportService)
    {
        $this->ultraImportService = $ultraImportService;
    }

    public function index()
    {

//
//        $client = new Client([
//            'base_uri' => 'http://172.18.0.4:80',
//            'timeout' => 10, // Timeout total în secunde
//            'connect_timeout' => 10, // Timeout pentru conexiune în secunde
//        ]);
//
//        try {
//            $response = $client->get('/api/request-data');
//            // procesează răspunsul
//        } catch (\GuzzleHttp\Exception\RequestException $e) {
//            // gestionează eroarea
//            $response = $e->getMessage();
//        }
//
//        return response()->json(['guid' => $response]);


//
//
//        PollDataByID::dispatch();
//
////        if ($this->ultraImportService->waitForReady($GUID)) {
////            echo "Proceeding with the next steps\n";
////            $ss = $this->ultraImportService->getDataByID($GUID);
////
////        } else {
////            dd('sds');
////            echo "Unable to proceed, service not ready\n";
////        }

//        set_time_limit(300);
//        $r = Redis::get('data:ca59df9a-f28b-4434-b1af-3b688d0d8425'); // pricelist
//        $r = Redis::get('data:5d27e6eb-fd38-4df6-93cd-d03ba60d98b3'); // nomenclature
//        $r = Redis::get('data:8a6ae0ae-f115-4419-a779-4ecb5df34c28'); //parent
//        $r = Redis::get('data:eb02162e-bf57-4344-8d60-1dc7d6906dac'); //nomeclaturetype
//        $r = Redis::get('data:740bbaf6-0030-4982-a694-7f043028b29b'); //brands

//        dd($r);
//        $aspiratoare = '033999cf-4e76-11ea-b816-00155d1de702';
//        $congelatoare = 'ad8cff32-4e6f-11ea-b816-00155d1de702';
//        $xxml = json_decode($r)->return->data;
//        dd($xxml);
//        $xml = simplexml_load_string($xxml);
//        if ($xml === false) {
//            echo "Invalid XML data received\n";
//        } else {
//            echo "Valid XML data received\n";
//            $json = json_encode($xml);
//            $array = json_decode($json, TRUE);
//
//            // extract 5 products with nomenclatureTye e8fa3d85-4e6f-11ea-b816-00155d1de702
//            $coll = collect($array['parent']);
//            dd($coll);
////            $coll = collect($array['price']);
////            dd($coll->take(2000));
//            $new = $coll->filter(function ($item) use ($congelatoare) {
////                'UUID' => '3f8d66ef-cd51-48cc-810d-7edecddd491f'
////  'characteristic' => '00000000-0000-0000-0000-000000000000'
////  'Price' => '985'
////  'priceType' => array:4 [▼
////    'name' => 'S'
////    'code' => '000000006'
////    'UUID' => 'b1823400-124e-470e-a745-b341c02cdae2'
////    'valute' => '99833f73-5f95-463a-9fb2-e12325a00a32'
////  ]
////]
//                return $item['nomenclatureType'] === '0e795ff5-4e6f-11ea-b816-00155d1de702';
//            });
//            dd($new);
////        }
//
//        // Inițiază cererea și primește GUID-ul
//        $guid = $this->ultraImportService->requestData('BRAND', true, '');
//
//        // Dispatchează job-ul
//        UltraImportJob::dispatch('BRAND', true, '', $guid);
//
//        return response()->json(['status' => 'Import job dispatched']);


        if (Cache::has('categories')) {
            $categories = Cache::get('categories');
        } else {
            $categories = Category::all();
            Cache::remember('categories', 262656, function () {
                return Category::all();
            });
        }

        if (Cache::has('sales_products')) {
            $sales_products = Cache::get('sales_products');
        } else {
            $sales_products = (new ProductService())->loadSalesProducts();
            Cache::remember('sales_products', 262656, function () {
                return (new ProductService())->loadSalesProducts();
            });
        }

        if (Cache::has('latest_products')) {
            $latest_products = Cache::get('latest_products');
        } else {
            $latest_products = (new ProductService())->loadLatestProducts();
            Cache::remember('latest_products', 262656, function () {
                return (new ProductService())->loadLatestProducts();
            });
        }


        return inertia('User/HomePage', [
            'categories' => $categories,
            'sales_products' => $sales_products,
            'latest_products' => $latest_products
        ]);
    }
}

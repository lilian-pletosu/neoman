<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\ProductService;
use App\Services\UltraImportService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class HomeController extends Controller
{

    protected $ultraImportService;

    public function __construct(UltraImportService $ultraImportService)
    {
        $this->ultraImportService = $ultraImportService;
    }

    public function index()
    {

//        $r = Redis::get('NOMENCLATURETYPELIST:bd9ed935-2844-4d7a-9779-0cdc4ea78d98'); // parentlist
//        $r = Redis::get('NOMENCLATURE:ebb3c1f9-8a2e-46a0-b8a4-9371f5c13a10'); // nomenclature
//        $keys = Redis::get('NOMENCLATURE:fda2f377-3f3c-45f8-8fff-e8fe3fb91eb3'); // nomenclature
//        $keys = Redis::keys('*'); // nomenclature
        $keys = Redis::get('NOMENCLATURE'); // nomenclature.
//        $keys = Redis::get('PARENTLIST'); // nomenclature.

//        $keys = Redis::del('NOMENCLATURE:fda2f377-3f3c-45f8-8fff-e8fe3fb91eb3');


        dd($keys);
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
//        }

//        // Inițiază cererea și primește GUID-ul
//        $guid = $this->ultraImportService->requestData('BRAND', true, '');
//
//        // Dispatchează job-ul
//        NomenclatureImportJob::dispatch('BRAND', true, '', $guid);
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

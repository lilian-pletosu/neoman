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

//        if (Cache::has('latest_products')) {
//            $latest_products = Cache::get('latest_products');
//        } else {
//            $latest_products = (new ProductService())->loadLatestProducts();
//            Cache::remember('latest_products', 262656, function () {
//                return (new ProductService())->loadLatestProducts();
//            });
//        }


        return inertia('User/HomePage', [
            'categories' => $categories,
            'sales_products' => $sales_products,
//            'latest_products' => $latest_products
        ]);
    }
}

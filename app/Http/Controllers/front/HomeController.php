<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\ProductService;

class HomeController extends Controller
{
    public function index()
    {

        $categories = Category::all();
        $sales_products = (new ProductService())->loadSalesProducts();
        $latest_products = (new ProductService())->loadLatestProducts();

        return inertia('User/HomePage', [
            'categories' => $categories,
            'sales_products' => $sales_products,
            'latest_products' => $latest_products
        ]);
    }
}

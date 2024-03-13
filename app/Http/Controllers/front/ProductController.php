<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index($productSlug)
    {
        $product = Product::where('slug', $productSlug)->first();
        return inertia('User/ProductPage', ['product' => $product]);
    }
}

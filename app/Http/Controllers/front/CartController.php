<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Product;

class CartController extends Controller
{
    public function index()
    {
        $products = [];
        if (request()->cookie('cart')) {
            foreach (unserialize(\request()->cookie('cart')) as $id) {
                $product = Product::where('id', $id)->with(['images', 'brand', 'subSubCategory.subcategory.category'])->first();
                $product['qty'] = 1;
                $products[] = $product;
            }
        }

        return inertia('User/CartPage', [
            'products' => $products,
        ]);

    }
}

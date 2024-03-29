<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;


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


    public function checkout(Request $request): void
    {
        $data = $request->validate([
            'first_name' => 'required|String',
            'last_name' => 'required|String',
            'phone' => 'required|numeric',
            'products' => 'required',
            'total_price' => 'required|numeric'
        ]);
        Order::create($data);
    }
}

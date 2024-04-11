<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;


class CartController extends Controller
{
    public function index()
    {

        return inertia('User/CartPage');

    }


    public function checkout(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string',
            'phone' => 'required|numeric',
            'email' => 'required|email',
            'city' => 'required|string',
            'address' => 'required|string',
            'message' => 'nullable|string',
            'products' => 'required',
            'total_price' => 'required|numeric',
//            'delivery_price' => 'required|numeric',
        ]);
        Order::create($data);
    }
}

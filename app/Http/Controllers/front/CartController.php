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
            'first_name' => 'required|String',
            'last_name' => 'required|String',
            'phone' => 'required|numeric',
            'products' => 'required',
            'total_price' => 'required|numeric'
        ]);
        Order::create($data);
    }
}

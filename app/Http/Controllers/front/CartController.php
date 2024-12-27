<?php

namespace App\Http\Controllers\front;

use App\Enum\OrderTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\CookieService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class CartController extends Controller
{
    public function index()
    {

        return inertia('User/CartPage');
    }


    public function checkout(Request $request)
    {
        $data = [];
        if ($request->type == OrderTypeEnum::SIMPLE->value) {
            $data = $request->validate([
                'full_name' => 'required|string',
                'phone' => 'required|string',
                'email' => 'required|email',
                'city' => 'required|string',
                'address' => 'required|string',
                'message' => 'nullable|string',
                'products' => 'required',
                'total_price' => 'required|numeric',
            ]);
            $data['type'] = OrderTypeEnum::SIMPLE->value;
        }
        if ($request->type == OrderTypeEnum::CREDIT->value) {
            $data = $request->validate([
                'full_name' => 'required|string',
                'phone' => 'required|string',
                'email' => 'nullable|email',
                'city' => 'nullable|string',
                'address' => 'nullable|string',
                'message' => 'nullable|string',
                'products' => 'required',
                'total_price' => 'required|numeric',
                'credit_id' => 'required|numeric',
            ]);
            $data['type'] = OrderTypeEnum::CREDIT->value;
        }

        if ($request->type == OrderTypeEnum::INSTALLMENTS->value) {
            $data = $request->validate([
                'full_name' => 'required|string',
                'phone' => 'required|string',
                'email' => 'nullable|email',
                'city' => 'nullable|string',
                'address' => 'nullable|string',
                'message' => 'nullable|string',
                'products' => 'required',
                'total_price' => 'required|numeric',
                'credit_id' => 'required|numeric',
            ]);
            $data['type'] = OrderTypeEnum::INSTALLMENTS->value;
        }

        if ($request->type == OrderTypeEnum::FAST_ORDER->value) {
            $data = $request->validate([
                'full_name' => 'nullable|string',
                'phone' => 'required|numeric',
                'email' => 'nullable|email',
                'city' => 'nullable|string',
                'address' => 'nullable|string',
                'message' => 'nullable|string',
                'products' => 'required',
                'total_price' => 'required|numeric',
            ]);
            $data['type'] = OrderTypeEnum::FAST_ORDER->value;
        }
        try {
            (new CookieService())->delCart();
            do {
                $orderNumber = mt_rand(10000, 999999);
            } while (Order::where('order_number', $orderNumber)->exists());

            $data['order_number'] = "#$orderNumber";
            Order::create($data);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }
    }
}

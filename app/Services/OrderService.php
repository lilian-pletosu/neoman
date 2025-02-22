<?php

namespace App\Services;

use App\Models\Order;

class OrderService
{
    function getOrders()
    {
        $orders = Order::select('id', 'status')
            ->get()
            ->groupBy('status')
            ->mapWithKeys(function ($group, $status) {
                return [$status => $group->count()];
            });
        return $orders;
    }
}

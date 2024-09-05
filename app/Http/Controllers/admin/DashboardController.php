<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ImportedProduct;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;

class DashboardController extends Controller
{
    function index()
    {
        $orders = Order::select('full_name', 'email', 'total_price')->limit(10)->get();
        $latestConfimerdOrders = Order::select('full_name', 'created_at', 'total_price')
            ->active()
            ->limit(10)
            ->get();
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        $startOfLastWeek = Carbon::now()->subWeek()->startOfWeek();
        $endOfLastWeek = Carbon::now()->subWeek()->endOfWeek();
        $currentWeekCount = ImportedProduct::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count();
        $lastWeekCount = ImportedProduct::whereBetween('created_at', [$startOfLastWeek, $endOfLastWeek])->count();
        $percentageChange = $lastWeekCount > 0 ? (($currentWeekCount - $lastWeekCount) / $lastWeekCount) * 100 : 0;
        $productImportedPercentage = [
            'currentWeekCount' => $currentWeekCount,
            'lastWeekCount' => $lastWeekCount,
            'percentageChange' => $percentageChange
        ];


        return inertia('Admin/Dashboard', [
            'route' => 'admin.dashboard',
            'orders' => $orders,
            'latestConfimerdOrders' => $latestConfimerdOrders,
            'productImportedPercentage' => $productImportedPercentage,
            'totalProducts' => Product::count(),
            'totalOrders' => Order::count(),
        ]);
    }
}

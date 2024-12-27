<?php

namespace App\Http\Controllers\admin;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use App\Services\OrderService;
use App\Models\ImportedProduct;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function index()
    {
        $orders = Order::select('full_name', 'email', 'total_price')->limit(10)->get();

        $ordersAdmin = (new OrderService())->getOrders();
        Inertia::share('ordersBar', $ordersAdmin);

        $latestConfirmedOrders = Order::select('full_name', 'created_at', 'total_price', 'status')
            ->where('status', 'confirmed')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        $startOfLastWeek = Carbon::now()->subWeek()->startOfWeek();
        $endOfLastWeek = Carbon::now()->subWeek()->endOfWeek();
        $currentWeekCount = ImportedProduct::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count();
        // $lastWeekCount = ImportedProduct::whereBetween('created_at', [$startOfLastWeek, $endOfLastWeek])->count();



        return inertia('Admin/Dashboard', [
            'route' => 'admin.dashboard',
            'orders' => $orders,
            'latestConfirmedOrders' => $latestConfirmedOrders,
            'importedProductsLastWeek' => $currentWeekCount,
            'totalProducts' => Product::count(),
            'totalOrders' => Order::count(),
        ]);
    }
}

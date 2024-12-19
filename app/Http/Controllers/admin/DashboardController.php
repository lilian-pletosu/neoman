<?php

namespace App\Http\Controllers\admin;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Product;
use App\Services\OrderService;
use App\Models\ImportedProduct;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function index()
    {
        $orders = Order::select('full_name', 'email', 'total_price')->limit(10)->get();

        $ordersAdmin = Cache::has('orders') ? Cache::get('orders') : Cache::remember('orders', 10000, function () {
            return (new OrderService())->getOrders();
        });
        Inertia::share('orders', $ordersAdmin);

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



        return inertia('Admin/Dashboard', [
            'route' => 'admin.dashboard',
            'orders' => $orders,
            'latestConfimerdOrders' => $latestConfimerdOrders,
            'importedProductsLastWeek' => $currentWeekCount,
            'totalProducts' => Product::count(),
            'totalOrders' => Order::count(),
        ]);
    }
}

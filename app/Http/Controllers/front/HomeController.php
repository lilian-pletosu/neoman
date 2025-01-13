<?php

namespace App\Http\Controllers\front;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Category;
use App\Mail\CallWaitForm;
use Illuminate\Http\Request;
use App\Services\BannerService;
use App\Services\ProductService;
use App\Http\Controllers\Controller;
use App\Services\UltraImportService;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;


class HomeController extends Controller
{

    protected $ultraImportService;

    public function __construct(UltraImportService $ultraImportService)
    {
        $this->ultraImportService = $ultraImportService;
    }

    public function index()
    {
        $categories = Cache::remember('categories', 262656, function () {
            return Category::orderBy('name')->active()->get();
        });

        $brands = Cache::remember('brands', 10000, function () {
            return Brand::whereNotNull('image')
                ->active()
                ->orderBy('name')
                ->limit(15)
                ->get();
        });

        $homeBanners = Cache::remember('home_banners', 10000, function () {
            return (new BannerService())->getHomeBanners();
        });

        $salesProducts = Cache::remember('sales_products', 262656, function () {
            return (new ProductService())->loadSalesProducts();
        });

        Inertia::share([
            'home_banners' => $homeBanners,
            'brands' => $brands,
            'call_action' => (new BannerService())->getCallActionBanner(),
            'season_products' => (new ProductService())->loadAllProducts(15),
            'last_products' => (new ProductService())->loadLastProducts(15)
        ]);

        return inertia('User/HomePage', [
            'categories' => $categories,
            'sales_products' => $salesProducts
        ]);
    }


    public function callWait(Request  $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'phone' => 'required',
        ]);

        Mail::to('office.neoman@gmail.com')->send(new CallWaitForm($data));
    }
}

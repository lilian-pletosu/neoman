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
        if (Cache::has('categories')) {
            $categories = Cache::get('categories');
        } else {
            $categories = Category::all();
            Cache::remember('categories', 262656, function () {
                return Category::all();
            });
        }
        $brands = Cache::has('brands') ? Cache::get('brands') : Cache::remember('brands', 10000, function () {
            return Brand::whereNotNull('image')->active()->orderBy('name')->limit(15)->get();
        });

        $homeBanners = Cache::has('home_banners') ? Cache::get('home_banners') : Cache::remember('home_banners', 10000, function () {
            return (new BannerService())->getHomeBanners();
        });


        Inertia::share('home_banners', $homeBanners);
        Inertia::share('brands', $brands);
        Inertia::share('call_action', (new BannerService())->getCallActionBanner());
        Inertia::share('season_products', (new ProductService())->loadAllProducts(15));
        Inertia::share('last_products', (new ProductService())->loadLastProducts(15));

        $sales_products = Cache::remember('sales_products', 262656, function () {
            return (new ProductService())->loadSalesProducts();
        });


        return inertia('User/HomePage', [
            'categories' => $categories,
            'sales_products' => $sales_products,
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

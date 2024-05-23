<?php

namespace App\Http\Middleware;

use App\Enum\StatusEnum;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use App\Services\BannerService;
use App\Services\OrderService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
//        dd(serialize(Cache::get('cart')));
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
                'query' => $request->query()
            ],
            'current_locale' => fn() => app()->currentLocale(),
            'currentYear' => today()->year,
            'localization' => function () {
                return __('app_context');
            },
            'availableLanguages' => config('availableLanguages'),
            'categories' => Cache::has('categories') ? Cache::get('categories') : Cache::remember('categories', 10000, function () {
                return Category::orderBy('name')->active()->get();
            }),
            'menu' => Cache::has('menu') ? Cache::get('menu') : Cache::remember('menu', 10000, function () {
                return Category::orderBy('name')->active()->with('subcategory', function ($item) {
                    $item->active();
                    $item->with('subSubcategory', function ($item) {
                        $item->active()->get();
                    });
                    $item->orderBy('name');
                })->get();
            }),
            'subcategories' => Cache::has('subcategories') ? Cache::get('subcategories') : Cache::remember('subcategories', 10000, function () {
                return SubCategory::orderBy('name')->get();
            }),
            'sub_subcategories' => Cache::has('sub_subcategories') ? Cache::get('sub_subcategories') : Cache::remember('sub_subcategories', 10000, function () {
                return SubSubCategory::orderBy('name')->get();
            }),
            'brands' => Cache::has('brands') ? Cache::get('brands') : Cache::remember('brands', 10000, function () {
                return Brand::orderBy('name')->get();
            }),
            'order_count' => Order::where('status', StatusEnum::PENDING)->count(),
            'last_visited' => (new ProductService())->loadLastVisitedProduct(request()) ?? [],
            'all_products' => [],
            'home_banners' => Cache::has('home_banners') ? Cache::get('home_banners') : Cache::remember('home_banners', 10000, function () {
                return (new BannerService())->getHomeBanners();
            }),
            'orders' => Cache::has('orders') ? Cache::get('orders') : Cache::remember('orders', 10000, function () {
                return (new OrderService())->getOrders();
            }),
        ]);
    }
}

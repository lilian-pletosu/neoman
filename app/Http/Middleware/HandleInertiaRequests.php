<?php

namespace App\Http\Middleware;

use App\Enum\StatusEnum;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use App\Services\BannerService;
use App\Services\ProductService;
use Illuminate\Http\Request;
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
            'categories' => Category::orderBy('name')->get(),
            'subcategories' => SubCategory::orderBy('name')->get(),
            'sub_subcategories' => SubSubCategory::orderBy('name')->get(),
            'sales_products' => (new ProductService())->loadSalesProducts(),
            'brands' => Brand::where('is_enabled', 1)->get(),
            'latest_products' => (new ProductService())->loadLatestProducts(),
            'order_count' => Order::where('status', StatusEnum::PENDING)->count(),
            'last_visited' => (new ProductService())->loadLastVisitedProduct($request) ?? [],
            'all_products' => [],
//            'all_products' => (new ProductService())->loadAllProducts(),
            'home_banners' => (new BannerService())->getHomeBanners(),

        ]);
    }
}

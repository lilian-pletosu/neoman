<?php

namespace App\Http\Middleware;

use App\Models\Brand;
use App\Models\Category;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'currentLocale' => fn() => app()->currentLocale(),
            'currentYear' => today()->year,
            'localization' => function () {
                return __('app_context');
            },
            'availableLanguages' => config('availableLanguages'),
            'categories' => Category::orderBy('name')->get(),
            'sales_products' => (new ProductService())->loadSalesProducts(),
            'brands' => Brand::where('is_enabled', 1)->get(),
            'latest_products' => (new ProductService())->loadLatestProducts(),
            'last_visited' => (new ProductService())->loadLastVisitedProduct(request()->session()->get('last'))

        ];
    }
}

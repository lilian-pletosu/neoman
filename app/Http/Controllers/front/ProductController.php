<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Services\ProductService;
use App\Services\SessionService;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index($categorySlug)
    {
        $category = Category::where([
            ['slug', $categorySlug],
            ['level', 3]
        ])->first();

        $brandQuery = Brand::brandsOfSubsubCategory($category->id)->get();
        $attributesQuery = Attribute::where('category_id', $category->id)->with('attributeValues')->get();

        $brands[] = [
            'key' => 'brand',
            'name' => trans('app_context.brand'),
            'options' => $brandQuery->map(function ($brand) {
                return [
                    'id' => $brand->id,
                    'value' => $brand->name,
                    'count' => $brand->products_count,
                ];
            })->toArray(),
        ];

        $attributes = $attributesQuery->map(function ($attribute) {
            return [
                'key' => $attribute->slug,
                'name' => $attribute->translateOrDefault()->name ?? null,
                'options' => $attribute->attributeValues->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'value' => $item->translateOrDefault()->value ?? $item->translate('ro')->value ?? null
                    ];
                })->all()
            ];
        })->all();

        $products = Product::where('category_id', $category->id)
            ->with('brand', 'images');


        $attributesForFilter = [];
        foreach ($attributes as $item) {
            $attributesForFilter[] = $item['key'];
        }




        $products = $products->filtered($attributesForFilter)->paginate(12)->withQueryString();

        return inertia('User/ProductsPage', [
            'products' => $products,
            'subSubcategory' => $category,
            'brands' => $brands,
            'attributes' => $attributes,
        ]);
    }


    public function show($productSlug)
    {
        $newSlug = explode('_', $productSlug);
        array_pop($newSlug);
        $res = implode('_', $newSlug);

        // give last symbol of productSlug
        $fullSlug = explode('_', $productSlug);
        $mu_unit = array_pop($fullSlug);

        // check if last symbol contains 'l' or 'kg' and return this symbol
        if (strpos($mu_unit, 'l') !== false) {
            $mu_unit = 'l';
        } elseif (strpos($mu_unit, 'kg') !== false) {
            $mu_unit = 'kg';
        } else {
            $mu_unit = '';
        }

        $product = Product::where('slug', $productSlug)->with(['images', 'brand', 'attributeValues', 'category.promotions', 'category.parent.promotions', 'category.parent.parent'])->first();

        $productService = new ProductService();
        $salesDetails = $productService->loadSalesProducts($product->id);
        $product['has_discount'] = $salesDetails ? true : false;
        $product['sale'] = $salesDetails ? $salesDetails[0]['sale'] : null;
        $product['promotion_price'] = $salesDetails ? $salesDetails[0]['promotion_price'] : null;



        (new SessionService())->AddVisitedProductInSession($product);


        $product['attributes'] = $product->attributeValues->load('attribute')->groupBy('attribute.slug');

        $product['attributes'] = $product['attributes']->map(function ($item) use ($res, $mu_unit) {
            $values = [];


            return [
                'name' => $item[0]->attribute->translate()->name ?? null,
                'values' => $item->map(function ($value) use ($res, $mu_unit) {
                    $translation = Str::slug($value->translateOrDefault('ro')?->value, '_') ?? null;
                    $values['link'] = $res . '_' . $translation . $mu_unit;
                    $values['value'] = $value->translate()->value ?? $value->translate('ro')->value ?? null;
                    $values['mu'] = $mu_unit;
                    return $values;
                })->toArray(),
            ];
        });

        //        $latest_products = (new ProductService())->loadLatestProducts();


        //        $product['mu'] = MeasurementUnit::findOrFail($product->measurement_unit_id)->first()->translate(app()->currentLocale())->symbol ?? '';

        $product['credits'] = $product->credits()->get();

        return inertia('User/ProductPage', ['product' => $product, 'latest_products' => null]);
    }

    private function extractKeywordsFromSlug($slug): array
    {
        // Definirea sinonimelor
        $synonyms = [
            'latex' => ['latex', 'spektra latex'],
            // Adaugă alte sinonime aici...
        ];

        // 1. Împarte slug-ul în elemente individuale
        $words = explode('_', $slug);

        // 2. Elimină cuvintele nerelevante
        $irrelevantWords = ['pu', 'baza', '1'];
        $words = array_diff($words, $irrelevantWords);

        // 3. Gruparea sinonimelor și eliminarea duplicatelor
        $groupedWords = array_map(function ($word) use ($synonyms) {
            foreach ($synonyms as $mainWord => $synonymsList) {
                if (in_array($word, $synonymsList)) {
                    return $mainWord;
                }
            }
            return $word;
        }, $words);

        // Eliminarea duplicatelor
        $groupedWords = array_unique($groupedWords);

        return $groupedWords;
    }
}

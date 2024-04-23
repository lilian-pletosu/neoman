<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Brand;
use App\Models\MeasurementUnit;
use App\Models\Product;
use App\Models\SubSubCategory;
use App\Services\ProductService;
use App\Services\SessionService;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index($subSubcategorySlug)
    {

        $subSubcategory = SubSubCategory::where('slug', $subSubcategorySlug)->first();
        $brandQuery = Brand::all();
        $attributesQuery = Attribute::where('sub_sub_category_id', $subSubcategory->id)->with('attributeValues')->get();

        $brands[] = [
            'key' => 'brand',
            'name' => 'Brand',
            'options' => $brandQuery->map(function ($brand) {
                return [
                    'id' => $brand->id,
                    'value' => $brand->name];
            })->toArray(),
        ];

        $attributes = $attributesQuery->map(function ($attribute) {
            return [
                'key' => $attribute->slug,
                'name' => $attribute->translate()->name,
                'options' => $attribute->attributeValues->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'value' => $item->translate()->value
                    ];
                })->all()
            ];
        })->all();

        $products = Product::where('sub_sub_category_id', $subSubcategory->id)
            ->with('brand', 'images');

        $attributesForFilter = [];
        foreach ($attributes as $item) {
            $attributesForFilter[] = $item['key'];
        }


        $products = $products->filtered($attributesForFilter)->paginate(9)->withQueryString();

        return inertia('User/ProductsPage', [
            'products' => $products,
            'subSubcategory' => $subSubcategory,
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

        $product = Product::where('slug', $productSlug)->with(['images', 'brand', 'subSubCategory.subcategory.category', 'attributeValues'])->first();

//        dd($productSlug);

        (new SessionService())->AddVisitedProductInSession($product);


        $product['attributes'] = $product->attributeValues->load('attribute')->groupBy('attribute.slug');

        $product['attributes'] = $product['attributes']->map(function ($item) use ($res, $mu_unit) {
            return [
                'name' => $item[0]->attribute->translate()->name,
                'values' => $item->map(function ($value) use ($res, $mu_unit) {
                    $value['link'] = $res . '_' . Str::slug($value->translate()->value, '_') . $mu_unit;
                    $value->translate()->value;
                    return $value;
                })->toArray(),
            ];
        });

        $latest_products = (new ProductService())->loadLatestProducts();


        $product['mu'] = MeasurementUnit::find($product->measurement_unit_id)->first()->translate(app()->currentLocale())->symbol;


        return inertia('User/ProductPage', ['product' => $product, 'latest_products' => $latest_products]);
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

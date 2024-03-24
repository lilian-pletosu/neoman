<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Brand;
use App\Models\MeasurementUnit;
use App\Models\Product;
use App\Models\SubSubCategory;
use App\Services\SessionService;

class ProductController extends Controller
{
    public function index($subSubcategorySlug)
    {
        $filters = [];

        $subSubcategory = SubSubCategory::where('slug', $subSubcategorySlug)->first();
        $brands = Brand::all();
        $attributes = Attribute::where('sub_sub_category_id', $subSubcategory->id)->with('attributeValues')->get();

        $filters[] = [
            'id' => 'brand',
            'name' => 'Brand',
            'options' => $brands->map(function ($brand) {
                return [
                    'id' => $brand->id,
                    'value' => $brand->name];
            })->toArray(),
        ];
        

        $attributes->each(function ($attribute) use (&$filters) {
            $filters[] = [
                'id' => $attribute->id,
                'name' => $attribute->translate($attribute->value)->name,
                'options' => $attribute->attributeValues->map(function ($item) {
                    return ['id' => $item->id, 'value' => $item->translate()->value];
                })->toArray()
            ];
        });

        $products = Product::where('sub_sub_category_id', $subSubcategory->id)
            ->with('brand', 'images');
        if (in_array(request('sort'), ['asc', 'desc'])) {
            $products->orderBy('price', request('sort'));
        } else {
            $products->orderBy('created_at', 'desc');
        }

        if (request('filter')) {
            dd(request('filter'));
        }
        $products = $products->paginate(9)->withQueryString();

        return inertia('User/ProductsPage', [
            'products' => $products,
            'subSubcategory' => $subSubcategory,
            'filters' => $filters
        ]);

    }


    public function show($productSlug)
    {

        $product = Product::where('slug', $productSlug)->with(['images', 'brand', 'subSubCategory.subcategory.category'])->first();

        (new SessionService())->AddVisitedProductInSession($product);

        $attributesArray = [];

        foreach ($product->attributes as $attribute) {
            foreach ($attribute->attributeValues as $attributeValue) {
                $translatedValue = $attributeValue->translate(app()->currentLocale());
                if ($translatedValue) {
                    // Adăugați valoarea tradusă a atributului în array-ul de atribute
                    $attributesArray[$attribute->name] = $translatedValue->value;
                }
            }
        }
        $product['attributes'] = $attributesArray;
        $product['mu'] = MeasurementUnit::find($product->measurement_unit_id)->first()->translate(app()->currentLocale())->symbol;


        return inertia('User/ProductPage', ['product' => $product]);
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

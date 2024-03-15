<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\MeasurementUnit;
use App\Models\Product;

class ProductController extends Controller
{
    public function index($productSlug)
    {
//        foreach (($attributes) as $attribute) {
//            $query->orWhere($attribute, 'like', "%{$searchTerm}%");
//        }


        $product = Product::where('slug', $productSlug)->with(['images', 'brand'])->first();


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

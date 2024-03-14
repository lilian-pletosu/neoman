<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index($productSlug)
    {
//        foreach (($attributes) as $attribute) {
//            $query->orWhere($attribute, 'like', "%{$searchTerm}%");
//        }

        // Extrage automat cuvintele cheie din slug
        $keywords = $this->extractKeywordsFromSlug($productSlug);
        // Găsește produse similare
        $productss = Product::search($keywords);
//        dd($productss);

//        $prodc = Product::where('slug', 'like', "%${productSlug}")->get();

        $product = Product::where('slug', $productSlug)->with(['images', 'brand', 'attributes.attributeValues'])->first();
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

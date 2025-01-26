<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;


class SitemapController extends Controller
{
    public function index()
    {
        $categories = Category::where('level', 1)->active()->get();
        $subcategories = Category::where('level', 2)->active()->get();
        $subSubcategories = Category::where('level', 3)->active()->get();

        $content = view('sitemap', [
            'categories' => $categories,
            'subcategories' => $subcategories,
            'subSubcategories' => $subSubcategories,
            'products' => Product::all(),
        ])->render();

        return response($content)
            ->header('Content-Type', 'text/xml');
    }
}

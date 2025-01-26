<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;


class SitemapController extends Controller
{
    public function index()
    {
        $content = view('sitemap', [
            'categories' => Category::all(),
            'products' => Product::all(),
        ])->render();

        return response($content)
            ->header('Content-Type', 'text/xml');
    }
}

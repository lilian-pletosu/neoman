<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Product;

class SearchController extends Controller
{
    public function index($search = null)
    {
        $attributesForFilter = [];
        foreach ([] as $item) {
            $attributesForFilter[] = $item['key'];
        }

        $products = Product::withDiscountDetails()
            ->sort()
            ->where('name', 'like', '%' . $search . '%')
            ->orWhere('description', 'like', '%' . $search . '%')
            ->orWhere('slug', 'like', '%' . $search . '%')
            ->orWhere('product_code', 'like', '%' . $search . '%')
            ->with('brand', 'images', 'credits')
            ->paginate(12)
            ->withQueryString();


        return inertia('User/AllProductsPage', [
            'products' => $products,
            'search' => $search,
        ]);
    }
}

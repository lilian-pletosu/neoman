<?php

namespace App\Http\Controllers\front;

use App\Models\Product;
use App\Services\ProductService;
use App\Http\Controllers\Controller;

class SearchController extends Controller
{
    public function index($search = null)
    {
        $attributesForFilter = [];
        foreach ([] as $item) {
            $attributesForFilter[] = $item['key'];
        }

        $products = Product::where('slug', 'like', '%%' . $search . '%%')
            ->orWhereHas('translations', function ($q) use ($search) {
                $q->where('name', 'like', '%%' . $search . '%%');
            })
            // ->orWhere('product_code', 'like', '%' . $search . '%')
            ->with('brand', 'images', 'credits')
            ->sort()
            ->paginate(12)
            ->withQueryString();

        $productService = new ProductService();
        $products->each(function ($product) use ($productService) {
            $salesDetails = $productService->loadSalesProducts($product->id);
            $product->has_discount = $salesDetails ? true : false;
            $product->sale = $salesDetails ? $salesDetails[0]['sale'] : null;
            $product->promotion_price = $salesDetails ? $salesDetails[0]['promotion_price'] : null;
        });


        return inertia('User/AllProductsPage', [
            'products' => $products,
            'search' => $search,
        ]);
    }
}

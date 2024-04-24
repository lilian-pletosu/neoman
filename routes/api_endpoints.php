<?php


use App\Services\ProductService;
use Illuminate\Support\Facades\Route;

Route::get('get_products', fn() => (new ProductService())->loadAllProducts())->name('api.get_products');
Route::get('last_visited', fn() => (new ProductService())->loadLastVisitedProduct(request()) ?? [])->name('api.get_last_visited_products');


Route::get('search/{query?}', fn($query = null) => (new ProductService())->searchProduct($query))->name('api.search_product');

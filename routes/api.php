<?php

use App\Models\Product;
use App\Services\CookieService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Cart
Route::get('/cart/{productCode}', function ($productCode) {
    return (new CookieService())->addIncart($productCode);
})->name('api.cartAdd');
Route::delete('/cart/{productCode}', function ($productCode) {
    return (new CookieService())->removeProductFromCart($productCode);
})->name('api.cartRemove');
Route::get('/cartCount', function () {
    $products = [];
    $totalPrice = 0;

    if (request()->cookie('cart')) {
        foreach (unserialize(\request()->cookie('cart')) as $id) {
            $product = Product::where('id', $id)->with(['images', 'brand', 'subSubCategory.subcategory.category'])->first();
            $totalPrice += $product->price;
            $products[] = $product;
        }
    }
    $count = request()->cookie('cart') ? count(unserialize(request()->cookie('cart'))) : 0;
    return response()->json(['count' => $count, 'products' => $products, 'totalPrice' => $totalPrice]);
})->name('api.cartCount');

//Wishlist
Route::get('/wishlist/{productCode}', function ($productCode) {
    return (new CookieService())->addInWishlist($productCode);
})->name('api.add_wishlist');
Route::delete('/wishlistCount{productCode}', function ($productCode) {
    return (new CookieService())->removeProductFromWishlist($productCode);
})->name('api.wishlistRemove');
Route::get('/wishlistCount', function () {
    $products = [];

    if (request()->cookie('wishlist')) {
        foreach (unserialize(\request()->cookie('wishlist')) as $id) {
            $product = Product::where('id', $id)->with(['images', 'brand', 'subSubCategory.subcategory.category'])->first();
            $products[] = $product;
        }
    }
    $count = request()->cookie('wishlist') ? count(unserialize(request()->cookie('wishlist'))) : 0;
    return response()->json(['count' => $count, 'products' => $products]);
})->name('api.wishlistCount');


//locale
Route::get('/currentLocale', function () {
    $locale = app()->currentLocale();
    return response($locale);
})->name('api.currentLocale');

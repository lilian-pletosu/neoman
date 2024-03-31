<?php

use App\Models\Product;
use App\Services\CookieService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
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
Route::get('/cart/{productId}/{colorId}', function ($productCode, $colorId) {
    return (new CookieService())->addIncart($productCode, $colorId);
})->name('api.cartAdd');

Route::get('/updateCart/{productId}/{qty}', function ($productId, $qty) {
    return (new CookieService())->updateQtyOfProductFromCart($productId, $qty);
})->name('api.cart.updateQtyOfProduct');

Route::delete('/cart/{productCode}', function ($productCode) {
    return (new CookieService())->removeProductFromCart($productCode);
})->name('api.cartRemove');

Route::get('/cart/forget', function () {
    Cookie::queue(Cookie::forget('cart'));
})->name('api.cartForget');


Route::get('/getCart', function () {
    $products = [];

    if (request()->cookie('cart')) {
        $products = unserialize(\request()->cookie('cart'));
    }
    $totalPrice = 0;

    foreach ($products as $product) {
        if (isset($product['total_price'])) {
            $totalPrice += $product['total_price'];
        }
    }
    $count = request()->cookie('cart') ? count(unserialize(request()->cookie('cart'))) : 0;
    return response()->json(['count' => $count, 'products' => $products, 'total_price' => $totalPrice]);
})->name('api.getCart');


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


Route::get('/fetchOrder/{orderNumber}', [\App\Http\Controllers\admin\OrderController::class, 'show'])->name('api.fetchOrder');

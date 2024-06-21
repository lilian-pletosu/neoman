<?php

use App\Http\Controllers\front\UltraImportController;
use App\Models\Product;
use App\Services\CookieService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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

require __DIR__ . '/api_endpoints.php';

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// --------------------------------- API UltraImportController Endpoints ---------------------------------
Route::post('/request-data', [UltraImportController::class, 'requestData']);
Route::get('/check-status/{guid}', [UltraImportController::class, 'checkStatus']);
Route::get('/get-data/{guid}', [UltraImportController::class, 'getData']);
Route::post('/commit-receiving-data', [UltraImportController::class, 'commitReceivingData']);

//-------------------------------------------------------------------------------

// Cart
Route::get('/cart/{productId}/{colorId}', function ($productCode, $colorId) {
    return (new CookieService())->addIncart($productCode, $colorId);
})->name('api.cartAdd');

Route::get('/updateCart/{productId}/{qty}', function ($productId, $qty) {
    return (new CookieService())->updateQtyOfProductFromCart($productId, $qty);
})->name('api.cart.updateQtyOfProduct');

Route::delete('/cart/{productID}', function ($productID) {
    return (new CookieService())->removeProductFromCart($productID);
})->name('api.cartRemove');

Route::get('/cart/forget', function () {
    $cookie = Cookie::forget('cart');
    return response(trans('app_context.product_updated'))->withCookie($cookie);
})->name('api.cartForget');


Route::get('/getCart', function () {
    $products = [];

    if (Cache::get('cart')) {
        $products = Cache::get('cart');
    }
    $totalPrice = 0;
    foreach ($products as $product) {

        if (isset($product['total_price'])) {
            $totalPrice += $product['total_price'];
        }
    }

    $count = Cache::get('cart') ? count(Cache::get('cart')) : 0;
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

    if (Cache::get('wishlist')) {
        foreach (Cache::get('wishlist') as $id) {
            $product = Product::where('id', $id)->with(['images', 'brand', 'subSubCategory.subcategory.category'])->first();
            $products[] = $product;
        }
    }
    $count = Cache::get('wishlist') ? count(Cache::get('wishlist')) : 0;
    return response()->json(['count' => $count, 'products' => $products]);
})->name('api.wishlistCount');


//locale
Route::get('/currentLocale', function () {
    $locale = app()->currentLocale();
    return response($locale);
})->name('api.currentLocale');


Route::get('/fetchOrder/{orderNumber}', [\App\Http\Controllers\admin\OrderController::class, 'show'])->name('api.fetchOrder');


Route::get('/wishlistToCart', function () {
    return (new CookieService())->wishlistToCart();
})->name('api.transferProducts');

Route::get('forget_wishlist', function () {
    return (new CookieService())->forgetCookie('wishlist');
})->name('api.forget_wishlist');

//-------------------------------------------------------------------------------


Route::get('acceptCookies', function () {
    $data = [
        'message' => 'Cookies accepted',
        'session' => session()->getId(),
        'ip_address' => request()->ip()
    ];
    $cookie = cookie('cookies', json_encode($data), 262800);
    return response()->json(['message' => 'Cookies accepted'])->withCookie($cookie);
})->name('api.acceptCookies');

Route::get('getCookies', function () {
    $accepted = request()->cookie('cookies') ? true : false;
    return response()->json($accepted);
})->name('api.getCookies');

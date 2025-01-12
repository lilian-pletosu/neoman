<?php

/*
 | -----------------------
 | Front web routes
 | ------------------------
 |
 */


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\front\UltraImportController;

Route::prefix('front')->group(function () {
    Route::get('/', [\App\Http\Controllers\front\HomeController::class, 'index'])->name('home');
    Route::get('product/{slug}', [\App\Http\Controllers\front\ProductController::class, 'show'])->name('product_page');
    Route::get('category/{slug}', [\App\Http\Controllers\front\CategoryController::class, 'index'])->name('category_page');
    Route::get('subcategory/{slug}', [\App\Http\Controllers\front\SubcategoryController::class, 'index'])->name('subcategory_page');
    Route::get('products/{subSubcategory}', [\App\Http\Controllers\front\ProductController::class, 'index'])->name('products_page');
    Route::get('cart', [\App\Http\Controllers\front\CartController::class, 'index'])->name('cart');
    Route::get('about', [\App\Http\Controllers\front\AboutController::class, 'index'])->name('about_page');
    Route::resource('/contacts', \App\Http\Controllers\front\ContactController::class);
    Route::get('terms', [\App\Http\Controllers\front\TermsController::class, 'index'])->name('terms_page');
    Route::get('privacy', [\App\Http\Controllers\front\PrivacyController::class, 'index'])->name('privacy_page');
    Route::get('search/{search?}', [\App\Http\Controllers\front\SearchController::class, 'index'])->name('search_page');

    Route::get('/request-data', [UltraImportController::class, 'requestData']);
    Route::get('/check-is-ready/{GUID}', [UltraImportController::class, 'checkIsReady']);
    Route::get('/check-data-status/{guid}', [UltraImportController::class, 'checkDataStatus']);
    Route::get('/get-data-by-id/{GUID}', [UltraImportController::class, 'getDataByID']);
    Route::post('/commit-receiving-data', [UltraImportController::class, 'commitReceivingData']);

    Route::post('post_order', [\App\Http\Controllers\front\CartController::class, 'checkout'])->name('set_order');

    Route::post('callback', [\App\Http\Controllers\front\HomeController::class, 'callWait'])->name('call.store');
});

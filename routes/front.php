<?php

/*
 | -----------------------
 | Front web routes
 | ------------------------
 |
 */


Route::prefix('front')->group(function () {
    Route::get('/', [\App\Http\Controllers\front\HomeController::class, 'index'])->name('home');
    Route::get('product/{slug}', [\App\Http\Controllers\front\ProductController::class, 'show'])->name('product_page');
    Route::get('category/{slug}', [\App\Http\Controllers\front\CategoryController::class, 'index'])->name('category_page');
    Route::get('subcategory/{slug}', [\App\Http\Controllers\front\SubcategoryController::class, 'index'])->name('subcategory_page');
    Route::get('products/{subSubcategory}', [\App\Http\Controllers\front\ProductController::class, 'index'])->name('products_page');
    Route::get('cart', [\App\Http\Controllers\front\CartController::class, 'index'])->name('cart');


    Route::post('post_order', [\App\Http\Controllers\front\CartController::class, 'checkout'])->name('set_order');
});


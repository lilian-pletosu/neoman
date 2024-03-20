<?php

/*
 | -----------------------
 | Front web routes
 | ------------------------
 |
 */


Route::prefix('front')->group(function () {
    Route::get('/', [\App\Http\Controllers\front\HomeController::class, 'index'])->name('home');
    Route::get('product/{slug}', [\App\Http\Controllers\front\ProductController::class, 'index'])->name('product_page');
    Route::get('category/{slug}', [\App\Http\Controllers\front\CategoryController::class, 'index'])->name('category_page');
    Route::get('subcategory/{slug}', [\App\Http\Controllers\front\SubcategoryController::class, 'index'])->name('subcategory_page');
});


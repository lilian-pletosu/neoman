<?php

/*
 | -----------------------
 | Front web routes
 | ------------------------
 |
 */


Route::prefix('front')->group(function () {
    Route::get('/', [\App\Http\Controllers\front\HomeController::class, 'index'])->name('home');
    Route::get('/{slug}', [\App\Http\Controllers\front\ProductController::class, 'index'])->name('product_page');
});


<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::group([], function () {

    Route::prefix('admin')->name('admin')->group(function () {
        Route::get('/', function () {
            return redirect()->route('admin.dashboard');
        });
    });

    Route::prefix('admin')
        ->middleware(['auth'])
        ->name('admin.')
        ->group(function () {
            Route::get('/dashboard', [\App\Http\Controllers\admin\DashboardController::class, 'index'])->name('dashboard');
            Route::resource('/products', \App\Http\Controllers\admin\ProductsController::class);
            Route::resource('/orders', \App\Http\Controllers\admin\OrderController::class);
            Route::resource('/categories', \App\Http\Controllers\admin\CategoriesController::class);
            Route::resource('/brands', \App\Http\Controllers\admin\BrandController::class);
            Route::resource('/associations', \App\Http\Controllers\admin\AssociationsController::class);
            Route::resource('/banners', \App\Http\Controllers\admin\BannerController::class);
            Route::resource('/promotions', \App\Http\Controllers\admin\PromotionsController::class);
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit')->name('profile');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update')->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy')->name('profile.destroy');
        });

    Route::post('import-excel-csv-file', [\App\Http\Controllers\ExcelCSV::class, 'importExcelCSV'])->name('importCSV');


});

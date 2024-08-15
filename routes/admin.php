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
            Route::resource('/products', \App\Http\Controllers\admin\ProductController::class);
            Route::resource('/orders', \App\Http\Controllers\admin\OrderController::class);
            Route::resource('/categories', \App\Http\Controllers\admin\CategoryController::class);
            Route::prefix('category')
                ->name('categories.')
                ->group(function () {
                    Route::resource('/subcategories', \App\Http\Controllers\admin\SubcategoryController::class);
                    Route::resource('/subSubcategories', \App\Http\Controllers\admin\SubSubcategoryController::class);

                });
            Route::resource('/brands', \App\Http\Controllers\admin\BrandController::class);
            Route::resource('/associations', \App\Http\Controllers\admin\AssociationController::class);
            Route::resource('/banners', \App\Http\Controllers\admin\BannerController::class);
            Route::resource('/privacy', \App\Http\Controllers\admin\PrivacyController::class);
            Route::resource('/about_us', \App\Http\Controllers\admin\AboutController::class);
            Route::resource('/settings', \App\Http\Controllers\admin\SettingsController::class);
            Route::resource('/attributes', \App\Http\Controllers\admin\AttributeController::class);
            Route::resource('/promotions', \App\Http\Controllers\admin\PromotionController::class);
            Route::resource('/imported-products', \App\Http\Controllers\admin\ImportedProductController::class);
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit')->name('profile');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update')->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy')->name('profile.destroy');
        });

    Route::post('import-excel-csv-file{resourceType}', [\App\Http\Controllers\ImportResources::class, 'importExcelCSV'])->name('importResource');


});

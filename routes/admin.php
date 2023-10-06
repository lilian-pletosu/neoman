<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

    Route::group([], function ()
{
    Route::prefix('admin')
        ->middleware(['auth'])
        ->name('admin.')
        ->group(function () {
            Route::get('/dashboard', [\App\Http\Controllers\admin\DashboardController::class, 'index'])->name('dashboard');
            Route::resource('/products', \App\Http\Controllers\admin\ProductsController::class);
            Route::resource('/products', \App\Http\Controllers\admin\ProductsController::class);
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit')->name('profile');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update')->name('profile.update');
            Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy')->name('profile.destroy');
        });

});

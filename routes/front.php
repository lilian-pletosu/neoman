<?php

/*
 | -----------------------
 | Front web routes
 | ------------------------
 |
 */
Route::get('/', [\App\Http\Controllers\front\HomeController::class, 'index'])->name('home');

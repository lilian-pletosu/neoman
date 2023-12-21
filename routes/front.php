<?php

/*
 | -----------------------
 | Front web routes
 | ------------------------
 |
 */
Route::get('/front', [\App\Http\Controllers\front\HomeController::class, 'index'])->name('home');

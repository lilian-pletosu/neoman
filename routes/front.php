<?php

/*
 | -----------------------
 | Front web routes
 | ------------------------
 |
 */
Route::get('/home', [\App\Http\Controllers\front\HomeController::class, 'index'])->name('home');

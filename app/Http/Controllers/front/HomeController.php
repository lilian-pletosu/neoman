<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Category;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return inertia('User/HomePage/HomePage', ['categories' => $categories]);
    }
}

<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Category;

class SubcategoryController extends Controller
{
    public function index($subcategorySlug)
    {

        $subcategory = Category::where([
            ['slug', $subcategorySlug],
            ['level', 2]
        ])
            ->with(['parent', 'children' => function ($query) {
                $query->active();
            }])
            ->first();

        return inertia('User/SubcategoryPage', ['subcategory' => $subcategory]);
    }
}

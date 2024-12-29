<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;

class SubcategoryController extends Controller
{
    public function index($subcategorySlug)
    {

        $subcategory = SubCategory::where('slug', $subcategorySlug)
            ->with(['subSubcategory' => function ($query) {
                $query->active();
            }])
            ->first();


        return inertia('User/SubcategoryPage', ['subcategory' => $subcategory]);
    }
}

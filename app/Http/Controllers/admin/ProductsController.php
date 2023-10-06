<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

class ProductsController extends Controller
{
    function index()
    {
        return inertia('Admin/Products', [
            'initialRoute'=> 'admin.products'
        ]);
    }
}

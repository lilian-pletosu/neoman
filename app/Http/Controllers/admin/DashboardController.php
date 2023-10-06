<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function index()
    {
        return inertia('Admin/Dashboard', [
            'route' => 'admin.dashboard'
        ]);
    }
}

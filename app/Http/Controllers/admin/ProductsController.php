<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\DataTableService;

class ProductsController extends Controller
{


    private DataTableService $dataTableService;


    public function __construct(DataTableService  $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }


    function index()
    {
        $builder = $this->dataTableService
            ->setResource('Product')
            ->setResourceColumns(['id', 'title', 'price'])
            ->setColumnsOrder(['id', 'title', 'price'])
            ->sortBy('id');
        return inertia('Admin/Products', [
            'initialRoute'=> 'admin.products'
        ])->loadData($builder);
    }
}

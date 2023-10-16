<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\DataTableService;

class ProductController extends Controller
{


    private DataTableService $dataTableService;


    public function __construct(DataTableService $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }


    function index()
    {
        $builder = $this->dataTableService
            ->setResource('Product')
            ->setResourceColumns(['product_code', 'title', 'price', 'description'])
            ->setRelationColumn('subSubCategory', 'category', ['name'])
            ->setRelationColumn('brand', 'brand', ['name'])
            ->setColumnsOrder(['product_code', 'title', 'description', 'price'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.products')
            ->sortBy('id');

//        dd($builder->getData()['resources'][1]);
        return inertia('Admin/Products', [
            'initialRoute' => 'admin.products'
        ])->loadData($builder);
    }
}

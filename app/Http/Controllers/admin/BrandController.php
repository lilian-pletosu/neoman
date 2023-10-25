<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrandRequest;
use App\Services\BrandCreateService;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    private DataTableService $dataTableService;


    public function __construct(DataTableService $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }

    public function index()
    {
        $builder = $this->dataTableService
            ->setResource('Brand')
            ->setResourceColumns(['id', 'image', 'name', 'description', 'website', 'is_enabled'])
            ->editInModal(true)
            ->paginate(10)
            ->setResourceRoute('admin.brands')
            ->setSearchRoute('admin.brands')
            ->sortBy('id');

        return inertia('Admin/Brands')->loadData($builder);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return (new SchemaFormBuilder)('Brand', 'post', 'admin.brands.store');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, BrandRequest $brandRequest)
    {
        (new BrandCreateService())->create($request, $brandRequest->all());
        return to_route('admin.brands.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return (new SchemaFormBuilder)("Brand", 'put', 'admin.brands.update', $id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id, BrandRequest $brandRequest)
    {
//        return to_route('admin.brands.index');
        dd($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

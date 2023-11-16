<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;

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
            ->setResourceColumns(['id', 'product_code', 'title', 'price', 'description'])
            ->setRelationColumn('subSubCategory', 'category', ['name'])
            ->setRelationColumn('brand', 'brand', ['name'])
            ->setRelationColumn('images', 'image', ['image1', 'image2', 'image3', 'image4'])
//            ->expandResourceQuery(['brand_id', 'sub_subcategory_id'])
            ->setColumnsOrder(['id', 'product_code', 'title', 'description', 'price'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.products')
            ->setResourceRoute('admin.products')
            ->sortBy('id');

//        dd($builder->getData()['resources'][1]);
        return inertia('Admin/Products', [
            'initialRoute' => 'admin.products',
            'resourceType' => 'product',
        ])->loadData($builder);
    }

    public function create()
    {
        return (new SchemaFormBuilder)('Product', 'post', 'admin.products.store');
    }

    public function store(Request $request)
    {
        dd($request->all());
    }

    public function show(Product $product)
    {
        return $product->loadAggregate(['brand', 'subSubCategory'], 'name');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): array
    {
        return (new SchemaFormBuilder)('Product', 'put', 'admin.products.update', $id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        dd($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }


}

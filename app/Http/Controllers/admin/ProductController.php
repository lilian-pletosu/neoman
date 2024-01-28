<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use App\Services\DataTableService;
use App\Services\ProductService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private Product $product;

    private DataTableService $dataTableService;


    public function __construct(DataTableService $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }


    function index()
    {
        $builder = $this->dataTableService
            ->setResource('Product')
            ->setResourceColumns(['id', 'product_code', 'name', 'price', 'description'])
            ->setRelationColumn('subSubCategory', 'subSubCategory', ['name'])
            ->setRelationColumn('brand', 'brand', ['name'])
            ->setRelationColumn('images', 'image', ['image1', 'image2', 'image3', 'image4'])
            ->setColumnsOrder(['id', 'product_code', 'name', 'description', 'price'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.products')
            ->setResourceRoute('admin.products')
            ->sortBy('id');

        return inertia('Admin/Products', [
            'initialRoute' => 'admin.products',
            'resourceType' => 'product',
        ])->loadData($builder);
    }

    public function create()
    {
        return (new SchemaFormBuilder)('Product', 'post', 'admin.products.store');
    }

    public function store(Request $request, ProductRequest $productRequest)
    {
        (new ProductService())->create($request, $productRequest->all());
    }

    public function show(Product $product)
    {
        $attributesArray = [];

        foreach ($product->attributes as $attribute) {
            $attributesArray[$attribute->name] = $attribute->pivot->value;
        }
        $product['attributes'] = $attributesArray;
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
    public function update(Request $request, Product $product, ProductUpdateRequest $productUpdateRequest)
    {
        (new ProductService())->update($productUpdateRequest->form, $product, $request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
    }


}

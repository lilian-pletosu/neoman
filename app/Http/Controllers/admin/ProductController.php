<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\MeasurementUnit;
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
            ->setResourceColumns(['id', 'product_code', 'name', 'price', 'description', 'slug'])
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

    public function store(Request $request)
    {
        if ($request->hasFile('image')) {
            $data = $request->validate([
                'name_ro' => 'required|min:3',
                'name_ru' => 'required|min:3',
                'description_ro' => 'required',
                'description_ru' => 'required',
                'brand_id' => 'required',
                'sub_sub_category_id' => 'required',
                'price' => 'required|decimal:2',
                'image' => 'nullable|file|image|mimes:jpg,bmp,png,svg'
            ]);
        } else {
            $data = $request->validate([
                'name ro' => 'required|min:3',
                'name ru' => 'required|min:3',
                'description ro' => 'required|min:15',
                'description ru' => 'required|min:15',
                'brand_id' => 'required',
                'sub_sub_category_id' => 'required',
                'price' => 'required|decimal:2',
                'image' => 'nullable|file|image|mimes:jpg,bmp,png,svg'
            ]);
        }
        (new ProductService())->create($request, $data);
    }

    public function show(Product $product)
    {
        $attributesArray = [];

        foreach ($product->attributes as $attribute) {
            foreach ($attribute->attributeValues as $attributeValue) {
                $translatedValue = $attributeValue->translate(app()->currentLocale());
                if ($translatedValue) {
                    // Adăugați valoarea tradusă a atributului în array-ul de atribute
                    $attributesArray[$attribute->name] = $translatedValue->value;
                }
            }
        }
//        dd($attributesArray);

        $product['attribute_name'] = $attributesArray;
        $product['mu'] = MeasurementUnit::find($product->measurement_unit_id)->first()->translate(app()->currentLocale())->symbol;

        return $product->loadAggregate(['brand', 'subSubCategory'], "name");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): array
    {
        return (new SchemaFormBuilder)('Product', 'put', 'admin.products.update', $id, null, true);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'form.name ro' => 'required|min:3|String',
            'form.name ru' => 'required|min:3|String',
            'form.description ro' => 'required',
            'form.description ru' => 'required',
            'form.brand_id' => 'required',
            'form.sub_sub_category_id' => 'required',
            'form.price' => 'required|numeric',
        ]);
        (new ProductService())->update($data, $product, $request);
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

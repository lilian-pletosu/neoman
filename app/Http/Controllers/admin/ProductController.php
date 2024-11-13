<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Credit;
use App\Models\MeasurementUnit;
use App\Models\Product;
use App\Services\DataTableService;
use App\Services\ProductService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private Product $product;
    private string $route = 'admin.products.index';

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
        return to_route($this->route);
    }

    public function create()
    {
        return (new SchemaFormBuilder)('Product', 'post', 'admin.products.store');
    }

    public function show(Product $product)
    {
        $attributesArray = [];

        foreach ($product->attributes as $attribute) {
            foreach ($attribute->attributeValues as $attributeValue) {
                $translatedValue = $attributeValue->translate(app()->currentLocale());
                if ($translatedValue && $translatedValue->value !== null) {
                    // Add the translated attribute value to the attributes array
                    $attributesArray[$attribute->name] = $translatedValue->value;
                }
            }
        }

        $product['attribute_name'] = $attributesArray;
        $measurementUnit = MeasurementUnit::find($product->measurement_unit_id);
        $product['mu'] = $measurementUnit ? $measurementUnit->translate(app()->currentLocale())->symbol ?? '' : '';

        $product->loadAggregate(['brand', 'subSubCategory'], "name");
        $product->loadAggregate(['images'], "image1");
        $product->load(['credits', 'images']); // Încarcă relația 'credits'


        $credits = Credit::all();


        return inertia('Admin/Product', [
            'product' => $product,
            'initialRoute' => 'admin.products',
            'resourceType' => 'product',
            'creditsSettings' => $credits,
        ]);
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
        return to_route($this->route);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return to_route($this->route);
    }

    public function addNewCreditOptions(Request $request, Product $product)
    {
        $data = $request->validate([
            'form' => 'required|array',
            'form.num_of_installments' => 'required|numeric',
            'form.interest_rate' => 'required|numeric',
            'form.type' => 'required',
        ]);

        $product->credits()->firstOrCreate(['type' => $data['form']['type'], 'num_of_installments' => $data['form']['num_of_installments'], 'interest_rate' => $data['form']['interest_rate']], [
            'num_of_installments' => $data['form']['num_of_installments'],
            'interest_rate' => $data['form']['interest_rate'],
            'type' => $data['form']['type'],
        ]);
    }

    public function updateImagesOrder(Request $request, Product $product)
    {


        $data = $request->validate([
            'images' => 'required|array',
        ]);

        $images = $data['images'];

        // Actualizăm fiecare câmp (image1, image2, ...) pe baza ordinii din array
        $productImagesData = [];
        foreach ($images as $index => $image) {
            $field = 'image' . ($index + 1); // Generează câmpurile: image1, image2, etc.
            $productImagesData[$field] = $image;
        }

        // Actualizăm tabelul product_images pentru produsul curent
        $product->images()->update($productImagesData);
    }

    public function deleteCreditFromProduct(Product $product, Credit $credit)
    {
        $product->credits()->detach($credit->id);
    }
}

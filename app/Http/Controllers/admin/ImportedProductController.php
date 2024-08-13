<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ImportedProduct;
use App\Services\DataTableService;
use Illuminate\Http\Request;

class ImportedProductController extends Controller
{
    private ImportedProduct $importedProduct;
    private string $route = 'admin.imported-products.index';

    private DataTableService $dataTableService;


    public function __construct(DataTableService $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }

    public function index()
    {
        $builder = $this->dataTableService
            ->setResource('ImportedProduct')
            ->setResourceColumns(['id', 'name', 'price', 'description', 'images'])
            ->setRelationColumn('subSubCategory', 'subSubCategory', ['name'])
            ->setRelationColumn('subSubCategory', 'subSubCategory', ['name'])
            ->setRelationColumn('brand', 'brand', ['name'])
            //            ->setRelationColumn('images', 'image', ['image1', 'image2', 'image3', 'image4'])
            ->editInModal(true)
            ->paginate(15)
            ->setSearchRoute('admin.imported-products')
            ->setResourceRoute('admin.imported-products')
            ->sortBy('id');

        return inertia('Admin/ImportedProducts', [
            'initialRoute' => 'admin.products',
            'resourceType' => 'product',
        ])->loadData($builder);
    }

    public function store(Request $request)
    {
//        /// need to clone all products from imported products to products with selected sub_subcategory_id
//        collect($request->products)->each(function ($product) use ($request) {
//            $product = ImportedProduct::find($product['id']);
//            $product['sub_subcategory_id'] = $request->sub_subcategory_id;
//            dd($product);
//            $newProduct = Product::create($product);
//            dd($newProduct);
//        });

        return redirect()->back()->with('toast', 'Sectiunea este in lucru!');
    }

    public function create()
    {
        //
    }

    public function show(ImportedProduct $importedProduct)
    {
        //
    }

    public function edit(string $id)
    {
    }

    public function update(Request $request)
    {
    }

    public function destroy(Request $request)
    {
        foreach ($request->products as $product) {
            ImportedProduct::destroy($product['id']);
        }
        return redirect()->back()->with('toast', trans('app_context.products_was_successfully_deleted'));
    }
}

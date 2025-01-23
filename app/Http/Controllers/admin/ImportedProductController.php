<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use App\Models\SubSubCategory;
use App\Models\ImportedProduct;
use App\Services\ProductService;
use App\Services\DataTableService;
use App\Http\Controllers\Controller;
use App\Models\Category;

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

        Inertia::share('categories', Category::where('level', 1)->orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());
        Inertia::share('subcategories', Category::where('level', 2)->orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());
        Inertia::share('sub_subcategories', Category::where('level', 3)->orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());

        $builder = $this->dataTableService
            ->setResource('ImportedProduct')
            ->setResourceColumns(['id', 'name', 'price', 'description', 'images', 'updated_at'])
            ->setRelationColumn('category', 'subSubCategory', ['name'])
            ->setRelationColumn('brand', 'brand', ['name'])
            //            ->setRelationColumn('images', 'image', ['image1', 'image2', 'image3', 'image4'])
            ->editInModal(true)
            ->paginate(15)
            ->setSearchRoute('admin.imported-products')
            ->setResourceRoute('admin.imported-products')
            ->sortBy('updated_at');

        return inertia('Admin/ImportedProducts', [
            'initialRoute' => 'admin.products',
            'resourceType' => 'product',
        ])->loadData($builder);
    }

    public function store(Request $request)
    {
        try {
            /// need to clone all products from imported products to products with selected sub_subcategory_id
            collect($request->products)->each(function ($product) use ($request) {
                $product = ImportedProduct::find($product['id']);
                $product['category_id'] = $request->sub_subcategory ?? $product['category_id'];
                $product['description'] = json_decode($product['description'], true);
                $array = [];
                $array['name'] = $product['name'];
                $array['description'] = $product['description'];


                $newProduct = Product::updateOrCreate(['product_code' => $product['product_code']], [
                    'slug' => $product['slug'],
                    'price' => $product['price'],
                    'brand_id' => $product['brand_id'],
                    'category_id' => $product['category_id'],
                    'specifications_id' => null,
                ]);
                if ($newProduct->images()->count() == 0) {
                    if (isset($product['images'])) {
                        $newProduct->images()->create($product['images']);
                    } else {
                        $newProduct->images()->create([
                            'image1' => 'https://banner2.cleanpng.com/20180815/sit/a1fff69c4e6de4ea9f7a7f388f4b51cb.webp',
                        ]);
                    }
                }

                foreach ((new Product())->translatedAttributes as $translatableAttribute) {
                    foreach (config('translatable.locales') as $locale) {
                        $newProduct->translateOrNew($locale)->$translatableAttribute = $product[$translatableAttribute][$locale] ?? null;
                    }
                }
                (new ProductService())->assignAttributesToProduct($newProduct, $array['description'], $newProduct->category_id);
                $newProduct->save();
                $product->delete();
            });

            return redirect()->back()->with('toast', trans('app_context.products_was_successfully_imported'));
        } catch (\Exception $e) {
            return redirect()->back()->with('toast', $e->getMessage());
        }
    }

    public function create()
    {
        //
    }

    public function show(ImportedProduct $importedProduct)
    {
        //
    }

    public function edit(string $id) {}

    public function update(Request $request) {}

    public function destroy(Request $request)
    {
        foreach ($request->products as $product) {
            ImportedProduct::destroy($product['id']);
        }
        return redirect()->back()->with('toast', trans('app_context.products_was_successfully_deleted'));
    }
}

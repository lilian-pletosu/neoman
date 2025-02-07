<?php

namespace App\Http\Controllers\admin;

use App\Models\Brand;
use App\Models\Credit;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\SubSubCategory;
use App\Models\MeasurementUnit;
use App\Services\ProductService;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

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
            ->setResourceColumns(['id', 'product_code', 'name', 'price', 'updated_at'])
            ->setRelationColumn('category', 'subSubCategory', ['name'])
            ->setRelationColumn('brand', 'brand', ['name'])
            ->setRelationColumn('images', 'image', ['image1', 'image2', 'image3', 'image4'])
            ->setColumnsOrder(['id', 'product_code', 'name', 'price'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.products')
            ->setResourceRoute('admin.products')
            ->sortBy('updated_at', 'desc');

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
                'category_id' => 'required',
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
                'category_id' => 'required',
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

        $product->loadAggregate(['brand'], "name");
        $product->loadAggregate(['images'], "image1");
        $product->load(['credits', 'images', 'category']); // Încarcă relația 'credits'


        $credits = Credit::all();


        return inertia('Admin/Product', [
            'product' => $product,
            'initialRoute' => 'admin.products',
            'resourceType' => 'product',
            'creditsSettings' => $credits,
            'subSubCategories' => Category::where('level', 3)->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'label'  => $f->name])->toArray(),
            'brands' => Brand::all()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'label'  => $f->name])->toArray(),
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
        $locale = app()->currentLocale();
        $data = $request->validate([
            "name $locale" => 'required|min:3|String',
            "description $locale" => 'required|min:3|String',
            'category_id' => 'required',
            'brand_id' => 'required',
            'price' => 'required|numeric',
        ]);
        (new ProductService())->simpleUpdate($data, $product, $request);
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

    public function uploadNewImage(Product $product, Request $request)
    {
        $data = $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $fileName = $product['slug'] . now()->toDateString() . random_int(1, 100000) . '.' . $request->file('image')->extension();
        $data['image'] = '/storage/products/' . $fileName;
        $imageContents = $request->file('image')->getContent();
        Storage::disk('products')->put($fileName, $imageContents);

        // adaugam imaginea unde este null exemplu image1 = 'image.jpg', image2 = null, image3 = null, image4 = null
        // atunci adaugam imaginea in image2
        $productImage = $product->images()->first(); // Extrage obiectul productImage

        // Lista de câmpuri care trebuie completate
        $imageFields = ['image1', 'image2', 'image3', 'image4'];

        foreach ($imageFields as $field) {
            // Verificăm dacă câmpul este null
            if (is_null($productImage->$field)) {
                // Dacă este null, îl completăm cu noua imagine
                $productImage->$field = $data['image'];
                // Salvăm modificările
                $productImage->save();
                break; // Ieșim din buclă după prima completare
            }
        }
    }


    public function deleteCreditFromProduct(Product $product, Credit $credit)
    {
        $product->credits()->detach($credit->id);
    }

    public function deleteImage(Product $product, Request $request)
    {
        $data = $request->validate([
            'image' => 'required|string',
        ]);
        // find in product_images the image that is equal to the image that we want to delete
        try {
            $productImages = $product->images()->get()->toArray();
            $key = array_search($data['image'], $productImages[0]);
            // delete the image from db knowing the key
            $product->images()->update([$key => null]);
            Storage::disk('products')->delete($data['image']);
            Session::flash('toast', 'Imaginea a fost ștearsă cu succes');
        } catch (\Exception $e) {
            Session::flash('toast', 'Eroare la ștergerea imaginii');
        }
    }
}

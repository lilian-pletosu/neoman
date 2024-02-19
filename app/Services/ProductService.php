<?php

namespace App\Services;

use App\Models\MeasurementUnit;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductService
{
    public $translatedAttributes;

    public function __construct()
    {
        $this->translatedAttributes = (new Product())->translatedAttributes;
    }

    public function create(Request $request, $data)
    {
        if ($request->hasFile('image')) {
            $data['slug'] = array_key_exists('name_ro', $data) ? Str::slug($data['name_ro'], '_') : Str::slug('Product name', '_');

            $data['image'] = '/products/' . $request->file('image')->hashName();
            $request->image->move(public_path('products'), $request->file('image')->hashName());
        } else {
            $data['slug'] = array_key_exists('name ro', $data) ? Str::slug($data['name ro'], '_') : Str::slug('Product name', '_');

            $data['image'] = '/img/no_image.svg';
        }
        try {
            $product = Product::firstOrCreate(['slug' => $data['slug']], [
                'slug' => $data['slug'],
                'price' => $data['price'],
                'brand_id' => $data['brand_id'],
                'sub_sub_category_id' => $data['sub_sub_category_id'],
                'product_code' => (new GenerateProductCode)((new Product())),
                'specifications_id' => null,
                'image' => 'image'
            ]);


            if ($request->hasFile('image')) {
                foreach ($this->translatedAttributes as $translatableAttribute) {
                    foreach (config('translatable.locales') as $locale) {
                        $product->translateOrNew($locale)->$translatableAttribute = $data[$translatableAttribute . '_' . $locale];

                    }
                }
                $product->save();
            } else {
                foreach ($this->translatedAttributes as $translatableAttribute) {
                    foreach (config('translatable.locales') as $locale) {
                        $product->translateOrNew($locale)->$translatableAttribute = $data["$translatableAttribute $locale"];

                    }
                }
                $product->save();
            }


            return $product;
        } catch (\Exception $exception) {
            dd($exception);
        }


    }

    public function update($data, Product $product, Request $request)
    {
        if (app()->currentLocale() == 'ru') {
            $data['slug'] = $product->slug;
        } else {
            $data['slug'] = Str::slug($data['name'], '_');
        }
        if (!$request->file('form.image')) {
            $data['image'] = $product->image;
        } else {
            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('form.image')->extension();

            $data['image'] = '/storage/products/' . $fileName;
            $imageContents = $request->file('form.image')->getContent();
            Storage::disk('products')->put($fileName, $imageContents);
        }

        $product->attributes()->syncWithoutDetaching([21 => ['value' => '1 Tb']]);
        $product->attributes()->syncWithoutDetaching([19 => ['value' => '16 inch']]);


        $product->update($data);
//
//        $locale = app()->currentLocale();
//        $product->translateOrNew($locale)->name = $data['name'];
//        $product->translateOrNew($locale)->description = $data['description'];
//        $product->save();

    }


    public function loadSalesProducts()
    {
        $productsArray = [];

        foreach (Product::all() as $product) {
            // Inițializează un array pentru atributele fiecărui produs
            $attributesArray = [];

            // Parcurge fiecare atribut al produsului
            foreach ($product->attributes as $attribute) {
                foreach ($attribute->attributeValues as $attributeValue) {
                    // Obține valoarea tradusă a atributului
                    $translatedValue = $attributeValue->translate(app()->currentLocale());
                    if ($translatedValue) {
                        // Adaugă valoarea tradusă a atributului în array-ul de atribute
                        $attributesArray[$attribute->name] = $translatedValue->value;
                    }
                }
            }

            // Obține brandul produsului și adaugă numele său în array-ul produsului
            $brandName = $product->brand->name;
            $brandLogo = $product->brand->image;

            // Adaugă array-urile de atribute și numele brandului în array-ul produsului
            $productArray = [
                'name' => $product->name,
                'image' => $product->images()->first()->image1,
                'price' => $product->price,
                'brand' => ['name' => $brandName, 'image' => $brandLogo],
                'attributes' => $attributesArray,
                'mu' => MeasurementUnit::find($product->measurement_unit_id)->first()->translate(app()->currentLocale())->symbol
            ];

            // Adaugă array-ul produsului în array-ul general de produse
            $productsArray[] = $productArray;

        }
        return $productsArray;
    }
}

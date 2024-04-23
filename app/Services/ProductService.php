<?php

namespace App\Services;

use App\Models\MeasurementUnit;
use App\Models\Product;
use App\Models\Promotion;
use Illuminate\Http\Request;
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
            return $exception;
        }


    }

    public function update($data, Product $product, Request $request)
    {
        $data['slug'] = Str::slug($data['form']['name ro'], '_');


        $product->update($data['form']);
        foreach ($this->translatedAttributes as $translatableAttribute) {
            foreach (config('translatable.locales') as $locale) {
                $product->translateOrNew($locale)->$translatableAttribute = $data['form']["$translatableAttribute $locale"];
            }
        }
        $product->save();

    }


    public function loadSalesProducts(): array
    {
        $productsArray = [];

        $promotions = Promotion::where('status', 1)->with(['brands'])->get();
        foreach ($promotions as $promotion) {
            if (!$promotion->brands->isEmpty()) {
                foreach ($promotion->brands as $brand) {
                    foreach ($brand->products as $product) {
                        $attributesArray = [];
                        foreach ($product->attributes->take(15) as $attribute) {
                            foreach ($attribute->attributeValues as $attributeValue) {
                                $translatedValue = $attributeValue->translate(session()->get('locale'));
                                if ($translatedValue) {
                                    $attributesArray[$attribute->name] = $translatedValue->value;
                                }
                            }
                        }
                        $brandName = $product->brand->name ?? null;
                        $brandLogo = $product->brand->image ?? null;
                        $image = $product->images()->first()->image1 ?? null;

                        $productArray = [
                            'id' => $product->id,
                            'slug' => $product->slug,
                            'name' => $product->translate(session()->get('locale'))->name,
                            'image' => $image,
                            'price' => $product->price,
                            'final_price' => $product->price - ($product->price * $promotion->discount / 100), // 'discount' => $promotion->discount . '%',
                            'sale' => $promotion->discount . '%',
                            'brand' => ['name' => $brandName, 'image' => $brandLogo],
                            'attributes' => $attributesArray,
                            'mu' => MeasurementUnit::find($product->measurement_unit_id)->first()->translate(session()->get('locale'))->symbol
                        ];
                        $productsArray[] = $productArray;
                    }
                }
            }
        }
//        dd($productsArray);

        return $productsArray;
    }

    public function loadLatestProducts()
    {
        $productsArray = [];

        foreach (Product::latest()->take(10)->get() as $product) {

            // Inițializează un array pentru atributele fiecărui produs
            $attributesArray = [];

            // Parcurge fiecare atribut al produsului
            foreach ($product->attributes as $attribute) {
                foreach ($attribute->attributeValues as $attributeValue) {
                    // Obține valoarea tradusă a atributului
                    $translatedValue = $attributeValue->translate(session()->get('locale'));
                    if ($translatedValue) {
                        // Adaugă valoarea tradusă a atributului în array-ul de atribute
                        $attributesArray[$attribute->name] = $translatedValue->value;
                    }
                }
            }

            // Obține brandul produsului și adaugă numele său în array-ul produsului
            $brandName = $product->brand->name ?? null;
            $brandLogo = $product->brand->image ?? null;
            $image = $product->images()->first()->image1 ?? null;

            // Adaugă array-urile de atribute și numele brandului în array-ul produsului
            $productArray = [
                'id' => $product->id,
                'slug' => $product->slug,
                'name' => $product->translate(session()->get('locale'))->name,
                'image' => $image,
                'price' => $product->price,
                'brand' => ['name' => $brandName, 'image' => $brandLogo],
                'attributes' => $attributesArray,
                'mu' => MeasurementUnit::find($product->measurement_unit_id)->first()->translate(session()->get('locale'))->symbol
            ];

            // Adaugă array-ul produsului în array-ul general de produse
            $productsArray[] = $productArray;

        }
        return $productsArray;
    }


    public function loadLastVisitedProduct($request)
    {
        $productsArray = [];

        $array = request()->session()->get('last');
        if (!empty(request()->session()->get('last'))) {
            foreach ($array as $id) {
                foreach (Product::where('id', $id)->get() as $product) {

                    // Inițializează un array pentru atributele fiecărui produs
                    $attributesArray = [];

                    // Parcurge fiecare atribut al produsului
                    foreach ($product->attributes as $attribute) {
                        foreach ($attribute->attributeValues as $attributeValue) {
                            // Obține valoarea tradusă a atributului
                            $translatedValue = $attributeValue->translate(session()->get('locale'));
                            if ($translatedValue) {
                                // Adaugă valoarea tradusă a atributului în array-ul de atribute
                                $attributesArray[$attribute->name] = $translatedValue->value;
                            }
                        }
                    }

                    // Obține brandul produsului și adaugă numele său în array-ul produsului
                    $brandName = $product->brand->name ?? null;
                    $brandLogo = $product->brand->image ?? null;
                    $image = $product->images()->first()->image1 ?? null;


                    // Adaugă array-urile de atribute și numele brandului în array-ul produsului
                    $productArray = [
                        'id' => $product->id,
                        'slug' => $product->slug,
                        'name' => $product->translate(session()->get('locale'))->name,
                        'image' => $image,
                        'price' => $product->price,
                        'brand' => ['name' => $brandName, 'image' => $brandLogo],
                        'attributes' => $attributesArray,
                        'mu' => MeasurementUnit::find($product->measurement_unit_id)->first()->translate(session()->get('locale'))->symbol
                    ];

                    // Adaugă array-ul produsului în array-ul general de produse
                    $productsArray[] = $productArray;

                }
            }

        }


        return $productsArray;
    }


    public function loadAllProducts()
    {
        $productsArray = [];

        // Utilizăm metoda with() pentru a încărca în prealabil relațiile necesare
        $productsChunks = Product::with(['attributes.attributeValues', 'brand', 'images', 'measurementUnit'])
            ->select('id', 'slug', 'price', 'brand_id', 'measurement_unit_id') // Selectăm doar câmpurile necesare
            ->limit(50) // Limităm numărul de produse la 50
            ->get()
            ->chunk(5);


        foreach ($productsChunks as $products) {

            foreach ($products as $product) {
                $attributesArray = [];

                foreach ($product->attributes as $attribute) {
                    foreach ($attribute->attributeValues as $attributeValue) {
                        $translatedValue = $attributeValue->translate(session()->get('locale'));
                        if ($translatedValue) {
                            $attributesArray[$attribute->name] = $translatedValue->value;
                        }
                    }
                }

                $brandName = $product->brand->name ?? null;
                $brandLogo = $product->brand->image ?? null;
                $image = $product->images()->first()->image1 ?? null;

                $productArray = [
                    'id' => $product->id,
                    'slug' => $product->slug,
                    'name' => $product->translate(session()->get('locale'))->name,
                    'description' => $product->translate(session()->get('locale'))->description,
                    'image' => $image,
                    'price' => $product->price,
                    'brand' => ['name' => $brandName, 'image' => $brandLogo],
                    'attributes' => $attributesArray,
                    'mu' => $product->measurement_unit->symbol ?? ''
                ];

                $productsArray[] = $productArray;
            }
        }

        return $productsArray;
    }


    public function searchProduct($query)
    {
        $productsArray = [];

        $products = Product::where('slug', 'like', '%' . $query . '%')
            ->orWhereHas('translations', function ($q) use ($query) {
                $q->where('name', 'like', '%' . $query . '%');
                $q->orWhere('description', 'like', '%' . $query . '%');
            })
            ->get();


        foreach ($products as $product) {
            $attributesArray = [];

            foreach ($product->attributes as $attribute) {
                foreach ($attribute->attributeValues as $attributeValue) {
                    $translatedValue = $attributeValue->translate(session()->get('locale'));
                    if ($translatedValue) {
                        $attributesArray[$attribute->name] = $translatedValue->value;
                    }
                }
            }

            $brandName = $product->brand->name ?? null;
            $brandLogo = $product->brand->image ?? null;
            $image = $product->images()->first()->image1 ?? null;

            $productArray = [
                'id' => $product->id,
                'slug' => $product->slug,
                'name' => $product->translate(session()->get('locale'))->name,
                'description' => $product->translate(session()->get('locale'))->description,
                'image' => $image,
                'price' => $product->price,
                'brand' => ['name' => $brandName, 'image' => $brandLogo],
                'attributes' => $attributesArray,
                'mu' => $product->measurement_unit->symbol ?? ''
            ];

            $productsArray[] = $productArray;
        }

        return $productsArray;
    }
}

<?php

namespace App\Services;

use App\Models\Attribute;
use App\Models\Brand;
use App\Models\Category;
use App\Models\ImportedProduct;
use App\Models\MeasurementUnit;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ProductService
{
    public $translatedAttributes;

    public function __construct()
    {
        $this->translatedAttributes = (new Product())->translatedAttributes;
    }

    public function loadSalesProducts(): array
    {
        $productsArray = [];

        $promotions = Promotion::where('status', 1)->with(['brands'])->get();
        foreach ($promotions as $promotion) {
            if (!$promotion->brands->isEmpty()) {
                foreach ($promotion->brands as $brand) {

                    $products = $brand->products()->latest()->take(15)->get();

                    foreach ($products as $product) {

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
                            'name' => $product->translateOrDefault()->name,
                            'image' => $image,
                            'price' => $product->price,
                            'credits' => $product->credits,
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
                    $translatedValue = $attributeValue->translate();
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
                'name' => $product->translate()->name,
                'image' => $image,
                'price' => $product->price,
                'brand' => ['name' => $brandName, 'image' => $brandLogo],
                'attributes' => $attributesArray,
                'mu' => MeasurementUnit::findOrFail($product->measurement_unit_id)->first()->translate(session()->get('locale'))->symbol ?? 'buc'
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
                foreach (Product::where('id', $id)->take(15)->get() as $product) {

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
                        'name' => $product->translateOrDefault('ro')->name ?? '',
                        'image' => $image,
                        'price' => $product->price,
                        'brand' => ['name' => $brandName, 'image' => $brandLogo],
                        'attributes' => $attributesArray,
                        'mu' => null
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

    public function searchProduct($query = null)
    {
        $locale = session()->get('locale');
        $productsArray = [];

        if ($query) {
            $products = Product::with([

                'attributes.attributeValues.translations' => function ($q) use ($locale) {
                    $q->where('locale', $locale);
                },
                'brand',
                'images',
            ])
                ->where('slug', 'like', '%' . $query . '%')
                ->orWhereHas('translations', function ($q) use ($query) {
                    $q->where('name', 'like', '%' . $query . '%')
                        ->orWhere('description', 'like', '%' . $query . '%');
                })
                ->limit(10)
                ->get();

            foreach ($products as $product) {
                $attributesArray = [];

                foreach ($product->attributes as $attribute) {
                    foreach ($attribute->attributeValues as $attributeValue) {
                        $translatedValue = $attributeValue->translations->first();
                        if ($translatedValue) {
                            $attributesArray[$attribute->name] = $translatedValue->value;
                        }
                    }
                }

                $productArray = [
                    'id' => $product->id,
                    'slug' => $product->slug,
                    'name' => $product->translations->first()->name ?? $product->name,
                    'description' => $product->translations->first()->description ?? $product->description,
                    'image' => $product->images->first()->image1 ?? null,
                    'price' => $product->price,
                    'brand' => [
                        'name' => $product->brand->name ?? null,
                        'image' => $product->brand->image ?? null
                    ],
                    'attributes' => $attributesArray,
                ];

                $productsArray[] = $productArray;
            }
        }

        return $productsArray;
    }



    public function saveUltraImportedProductInDB($product)
    {
        try {
            // Convertim $product într-un array
            $productArray = json_decode(json_encode($product), true);


            $slug = Str::slug($productArray['name']['ro'], '_');
            $existProduct = Product::where('product_code', $productArray['code'])->first();
            if ($existProduct) {

                try {
                    $existProduct->update([
                        'product_code' => $productArray['code'],
                        //                        'name' => $productArray['name'],
                        'slug' => $slug,
                        //                        'description' => json_encode($productArray['description']),
                        'brand_id' => $this->ultraImportBrandSave($productArray['brand'])->id ?? null,
                        'price' => $productArray['price'],
                    ]);
                    $existProduct->images()->create($product['images']);

                    $this->assignAttributesToProduct($existProduct, $productArray['description'], $existProduct->sub_sub_category_id);

                    $existProduct->save();
                    return $existProduct;
                } catch (\Exception $exception) {
                    Log::error('----------------------------------------------------------------------------', [
                        'error' => $exception->getMessage(),
                        'product' => $product,
                        'trace' => $exception->getTraceAsString()
                    ]);
                }
            } else {
                $newProd = ImportedProduct::updateOrCreate(['product_code' => $productArray['code'],], [
                    'name' => $productArray['name'],
                    'slug' => $slug,
                    'description' => json_encode($productArray['description']),
                    'price' => $productArray['price'],
                    'brand_id' => $this->ultraImportBrandSave($productArray['brand'])->id ?? null,
                    'sub_sub_category_id' => $this->ultraImportSubSubcategory($productArray['sub_subcategory'], $productArray['subcategory'], $productArray['category']),
                    'specifications_id' => null,
                    'images' => $productArray['images'],
                    'for_searching' => $productArray['name']['ro'] . ' ' . $productArray['description']['ro']
                ]);
                return $newProd;
            }
        } catch (\Error $error) {
            Log::error('Error occurred while saving the product', [
                'error' => $error->getMessage(),
                'product' => $product,
                'trace' => $error->getTraceAsString()
            ]);
            return null;
        } catch (\Exception $exception) {
            Log::error('Exception occurred while saving the product', [
                'error' => $exception->getMessage(),
                'product' => $product,
                'trace' => $exception->getTraceAsString()
            ]);
            return null;
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
    public function simpleUpdate($data, Product $product, Request $request)
    {
        $locale = app()->currentLocale();
        if ($locale == 'ro') {
            $data['slug'] = Str::slug($data["name $locale"], '_');
        }


        $product->update($data);

        foreach ($this->translatedAttributes as $translatableAttribute) {
            $product->translateOrNew($locale)->$translatableAttribute = $data["$translatableAttribute $locale"];
        }
        $product->save();
    }

    private function ultraImportBrandSave($brand)
    {
        try {
            $imagePath = $brand['image']['pathGlobal'] ?? null;
            $dbBrand = Brand::where('name', $brand['name'])->first();

            if (!$dbBrand) {
                return Brand::create([
                    'name' => $brand['name'] ?? '',
                    'slug' => Str::slug($brand['name'], '_') ?? '',
                    'website' => $brand['name'] ?? '',
                    'seo_title' => $brand['name'] ?? '',
                    'seo_description' => 'description',
                    'is_enabled' => 1,
                    'image' => $imagePath,
                ]);
            } else
                return $dbBrand;
        } catch (\Error $error) {
            Log::error('Error when trying to create new brand', [
                'error' => $error->getMessage(),
                'brand' => $brand,
                'trace' => $error->getTraceAsString()
            ]);
        } catch (\Exception $exception) {
            Log::error('Exception occurred while  create new brand', [
                'error' => $exception->getMessage(),
                'brand' => $brand,
                'trace' => $exception->getTraceAsString()
            ]);
        }
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

    public function assignAttributesToProduct($product, $attributes, $subSubCategoryId)
    {
        foreach (config('translatable.locales') as $locale) {
            $localeAttributes = $this->transformStringToArray($attributes[$locale]);

            foreach ($localeAttributes as $attributeName => $attributesValue) {
                // Generează slug-ul folosind numele atributului
                $slug = Str::slug($attributeName, '_');

                // Caută atributul folosind slug-ul și sub_sub_category_id
                $attribute = Attribute::where('slug', $slug)
                    ->where('sub_sub_category_id', $subSubCategoryId)
                    ->first();

                // Dacă atributul nu există, creează-l
                if (!$attribute) {
                    $attribute = Attribute::create([
                        'slug' => $slug,
                        'sub_sub_category_id' => $subSubCategoryId,
                    ]);
                }

                // Adaugă sau actualizează traducerea pentru atribut
                $attribute->translateOrNew($locale)->name = $attributeName;
                $attribute->save();

                // Verifică dacă valoarea atributului există deja pentru limba curentă
                $attributeValueModel = $attribute->attributeValues()
                    ->whereHas('translations', function ($query) use ($attributesValue, $locale) {
                        $query->where('value', $attributesValue)
                            ->where('locale', $locale);
                    })->first();

                // Dacă valoarea nu există, creează-o
                if (!$attributeValueModel) {
                    $attributeValueModel = $attribute->attributeValues()->create([
                        'slug' => Str::slug($attributesValue, '_'),
                    ]);
                }

                // Adaugă sau actualizează traducerea pentru valoarea atributului
                $attributeValueModel->translateOrNew($locale)->value = $attributesValue;
                $attributeValueModel->save();

                // Atașează atributul la produs doar dacă nu există deja
                if (!$product->attributes()->wherePivot('attribute_id', $attribute->id)
                    ->wherePivot('attribute_value_id', $attributeValueModel->id)
                    ->exists()) {
                    $product->attributes()->attach($attribute->id, ['attribute_value_id' => $attributeValueModel->id]);
                }
            }
        }


        // Assign the attribute value to the product
    }

    public function transformStringToArray($string)
    {
        $lines = explode("\n", $string);
        $attributes = [];

        foreach ($lines as $line) {
            if (strpos($line, ':') !== false) {
                list($key, $value) = explode(':', $line, 2);
                $attributes[trim($key)] = trim($value);
            } else {
                $attributes[trim($line)] = true; // For attributes without values
            }
        }

        return $attributes;
    }

    private function ultraImportSubSubcategory($sub_subcategory, $subcategory, $category)
    {

        if (!isset($sub_subcategory['translations'])) {
            return null;
        }

        try {
            $dbSubsubcategory = SubSubCategory::where('slug', Str::slug($sub_subcategory['translations']['ro'], '_'))->first();

            if (!$dbSubsubcategory) {

                $subsubcategory = SubSubCategory::create([
                    'slug' => Str::slug($sub_subcategory['translations']['ro'], '_') ?? '',
                    'website' => $sub_subcategory['translations']['ro'] ?? '',
                    'seo_title' => $sub_subcategory['translations']['ro'] ?? '',
                    'seo_description' => 'description',
                    'is_enabled' => 1,
                    'image' => 'image',
                    'subcategory_id' => $this->ultraImportSubcategory($subcategory, $category),
                ]);

                foreach (config('app.available_locales') as $locale) {
                    foreach ((new SubSubCategory())->translatedAttributes as $translatedAttribute) {
                        $subsubcategory->translateOrNew($locale)->$translatedAttribute = $sub_subcategory['translations'][$locale] ?? $sub_subcategory['translations']['ro'];
                        $subsubcategory->save();
                    }
                }
                return $subsubcategory->id;
            } else {
                return $dbSubsubcategory->id;
            }
        } catch (\Exception $exception) {

            Log::error('We have error when trying to create new SubSubcategory', [
                'error' => $exception->getMessage(),
                'product' => $sub_subcategory,
                'trace' => $exception->getTraceAsString()
            ]);
        }
    }

    private function ultraImportSubcategory($ultraSubcategory, $category)
    {
        try {
            $dbSubcategory = SubCategory::where('slug', Str::slug($ultraSubcategory['ro'], '_'))->first();

            if (!$dbSubcategory) {
                $subcategory = SubCategory::create([
                    'slug' => Str::slug($ultraSubcategory['ro'], '_') ?? '',
                    'is_active' => 1,
                    'image' => 'image',
                    'category_id' => $this->ultraImportCategory($category),
                ]);

                foreach (config('app.available_locales') as $locale) {
                    foreach ((new SubCategory())->translatedAttributes as $translatedAttribute) {
                        $subcategory->translateOrNew($locale)->$translatedAttribute = $ultraSubcategory[$locale] ?? $ultraSubcategory['ro'];
                        $subcategory->save();
                    }
                }
                return $subcategory->id;
            } else {
                return $dbSubcategory->id;
            }
        } catch (\Exception $exception) {
            Log::error('We have error when trying to create new subcategory', [
                'error' => $exception->getMessage(),
                'product' => $ultraSubcategory,
                'trace' => $exception->getTraceAsString()
            ]);
        }
    }

    private function ultraImportCategory($ultraCategory)
    {
        try {
            $dbCategory = Category::where('slug', Str::slug($ultraCategory['ro'], '_'))->first();

            if (!$dbCategory) {
                $category = Category::create([
                    'slug' => Str::slug($ultraCategory['ro'], '_') ?? '',
                    'is_active' => 1,
                    'icon' => 'icon',
                ]);
                foreach (config('app.available_locales') as $locale) {
                    foreach ((new Category())->translatedAttributes as $translatedAttribute) {
                        $category->translateOrNew($locale)->$translatedAttribute = $ultraCategory[$locale] ?? $ultraCategory['ro'];
                        $category->save();
                    }
                }
                return $category->id;
            } else {
                return $dbCategory->id;
            }
        } catch (\Exception $exception) {
            Log::error('We have error when trying to create new category', [
                'error' => $exception->getMessage(),
                'product' => $ultraCategory,
                'trace' => $exception->getTraceAsString()
            ]);
        }
    }
}

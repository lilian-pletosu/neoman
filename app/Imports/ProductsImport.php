<?php

namespace App\Imports;

use App\Models\Attribute;
use App\Models\Product;
use App\Services\BrandService;
use App\Services\GenerateProductCode;
use App\Services\MeasurementUnitService;
use App\Services\SubSubcategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing;


class ProductsImport
{

    private array $translatedAttributes;

    public function __construct()
    {
        $this->translatedAttributes = (new Product())->translatedAttributes;
    }

    public function __invoke(Request $request)
    {
        $this->createProduct();
    }

    public function processString(): array
    {
        $worksheet = IOFactory::load(request()->file('file'))->getActiveSheet();

        $firstRowKeys = $worksheet->rangeToArray('A1:' . $worksheet->getHighestColumn() . '1')[0];
        $rows = $worksheet->rangeToArray('A2:' . $worksheet->getHighestColumn() . $worksheet->getHighestRow());

        $columns = [];
        foreach ($rows as $rowIndex => $row) {
            // Trim the keys
            $trimmedKeys = array_map('trim', $firstRowKeys);
            $columns[$rowIndex + 2] = array_combine($trimmedKeys, $row);
        }
        return $columns;
    }

    public function processImages()
    {
        $spreadSheet = IOFactory::load(request()->file('file'));
        $productImages = [];

        if ($spreadSheet->getActiveSheet()->getDrawingCollection()->count() > 0) {
            foreach ($spreadSheet->getActiveSheet()->getDrawingCollection() as $drawing) {
                preg_match('/[0-9]+/', $drawing->getCoordinates(), $matches);
                $rowKey = $matches[0];
                $productImages[$rowKey][] = $this->saveImage($drawing);
            }
        }

        return $productImages;
    }

    public function combineImagesWithText(): array
    {
        $texts = $this->processString();
        $images = $this->processImages();
        $combinedColumns = [];

        foreach ($texts as $key => $text) {
            if (!$text['name ro'] && !$text['name ru']) {
                continue;
            }
            if (isset($images[$key])) {
                foreach ($images[$key] as $index => $image) {
                    $text['image' . ($index + 1)] = $image;
                }
            }
            $combinedColumns[$key] = $text;
        }
        return $combinedColumns;
    }


    public function saveImage($drawing)
    {
        if ($drawing instanceof MemoryDrawing) {
            ob_start();
            call_user_func($drawing->getRenderingFunction(), $drawing->getImageResource());

            $imageContents = ob_get_contents();
            ob_end_clean();
            switch ($drawing->getMimeType()) {
                case MemoryDrawing::MIMETYPE_PNG:
                    $extension = 'png';
                    break;
                case MemoryDrawing::MIMETYPE_JPEG:
                    $extension = 'jpg';
                    break;
            }
        } else {
            $zipReader = fopen($drawing->getPath(), 'r');


            $imageContents = '';
            while (!feof($zipReader)) {
                $imageContents .= fread($zipReader, 1024);
            }
            fclose($zipReader);
            $extension = $drawing->getExtension();


            $fileName = uniqid('prod') . '.' . $extension;
            try {
                Storage::disk('products')->put($fileName, $imageContents);
            } catch (\Throwable $th) {
                throw $th;
            }
            return '/storage/products/' . $fileName;
        }
    }

    public function createProduct()
    {
        $data = $this->combineImagesWithText();
        $createdProducts = [];



        foreach ($data as $item) {
            if ($item['name ro'] || $item['name ru']) {
                try {
                    $brand = (new BrandService)->createWithProduct($item);
                    $subSubcategory = (new SubSubcategoryService())->createWithProduct($item);
                    $mu = (new MeasurementUnitService())->associateToProduct($item);

                    $productData = [
                        'price' => floatval(str_replace(',', '', $item['price'])),
                        'slug' => Str::slug($item['name ro'], '_'),
                        'product_code' => (new GenerateProductCode)((new Product())),
                        'specifications_id' => null,
                        'brand_id' => $brand->id,
                        'category_id' => $subSubcategory->id,
                        'measurement_unit_id' => $mu->id,
                    ];


                    $product = Product::updateOrCreate(['slug' => Str::slug($item['name ro'], '_')], $productData);

                    foreach (config('app.available_locales') as $locale) {
                        foreach ($this->translatedAttributes as $translatedAttribute) {
                            $xlsxKey = $translatedAttribute . ' ' . $locale;
                            $product->translateOrNew($locale)->$translatedAttribute = $item[$xlsxKey] ?? $item['name ro'];
                        }
                    }

                    try {
                        $this->associateAttributes($product, $item);
                    } catch (\Exception $e) {
                        return redirect()->back()->withErrors([
                            'import' => $e->getMessage()
                        ]);
                    }
                    $this->associateImagesWithProduct($product, $item);
                    $product->save();
                    $createdProducts[] = $product;
                } catch (\Exception $e) {
                    return redirect()->back()->withErrors([
                        'import' => $e->getMessage()
                    ]);
                }
            }
        }
    }

    private function associateImagesWithProduct($product, $item)
    {
        $images = [];

        foreach ($item as $key => $value) {
            if (Str::startsWith($key, 'image')) {
                $images[$key] = $value;
            }
        }

        if ($images) {
            $productImage = $product->images()->first();

            if ($productImage) {
                $productImage->update($images);
            } else {
                $product->images()->create($images);
            }
        }
    }

    public function associateAttributes($product, $item)
    {
        // Obține toate atributele existente pentru subcategoria specificată
        $attributes = Attribute::all();

        foreach ($attributes as $attribute) {
            if ($attribute->slug == 'cantitate') {
                // Obține obiectul atributului
                $attributeObj = Attribute::find($attribute->id);
                if (array_key_exists($attribute->name, $item)) {
                    $quantities = json_decode($item[$attribute->name], true);
                    foreach ($quantities as $qty) {
                        // Verifică dacă valoarea atributului există deja
                        $valueAttribute = $attributeObj->attributeValues()->firstOrCreate(['slug' => $qty]);
                        $valueAttribute->value = $qty;
                        $valueAttribute->save();

                        // Atașează valoarea atributului la produs, dacă nu este deja atașată
                        if (!$product->attributes()->where('attribute_id', $attribute->id)->where('attribute_value_id', $valueAttribute->id)->exists()) {
                            $product->attributes()->attach($attribute->id, ['attribute_value_id' => $valueAttribute->id]);
                        }
                    }
                }
            } else {
                foreach (config('app.available_locales') as $locale) {
                    if (isset($item[$attribute->name . ' ' . $locale])) {
                        $attributeObj = Attribute::find($attribute->id);

                        // Verifică dacă valoarea atributului există deja
                        $valueAttribute = $attributeObj->attributeValues()->firstOrCreate(['slug' => $item[$attribute->name . ' ' . 'ro']]);
                        $valueAttribute->translateOrNew($locale)->value = $item[$attribute->name . ' ' . $locale];
                        $valueAttribute->save();

                        // Atașează valoarea atributului la produs, dacă nu este deja atașată
                        if (!$product->attributes()->where('attribute_id', $attribute->id)->where('attribute_value_id', $valueAttribute->id)->exists()) {
                            $product->attributes()->attach($attribute->id, ['attribute_value_id' => $valueAttribute->id]);
                        }
                    }
                    continue;
                }
            }
        }
    }
}

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

    public function _columnIndexToNumber($columnIndex)
    {
        $numericColumnIndex = 0;
        $base = ord('A') - 1;

        for ($i = strlen($columnIndex) - 1, $j = 0; $i >= 0; $i--, $j++) {
            $numericColumnIndex += (ord($columnIndex[$i]) - $base) * (26 ** $j);
        }

        return $numericColumnIndex - 1;
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
                case MemoryDrawing::MIMETYPE_PNG :
                    $extension = 'png';
                    break;
                case MemoryDrawing::MIMETYPE_JPEG :
                    $extension = 'jpg';
                    break;
            }
        } else {
            $zipReader = fopen($drawing->getPath(), 'r');

//            Redis::set('drawing', $drawing->getName());

            $imageContents = '';
            while (!feof($zipReader)) {
                $imageContents .= fread($zipReader, 1024);
            }
            fclose($zipReader);
            $extension = $drawing->getExtension();


            $fileName = uniqid('prod') . '.' . $extension;
//            Storage::put('public/products/' . $fileName, $imageContents);
            Storage::disk('products')->put($fileName, $imageContents);
            return '/storage/products/' . $fileName;
        }
    }

    public function createProduct()
    {
        $data = $this->combineImagesWithText();

        foreach ($data as $item) {
            if ($item['name ro'] || $item['name ru']) {
                try {
                    $brand = (new BrandService)->createWithProduct($item);
                    $subSubcategory = (new SubSubcategoryService())->createWithProduct($item);
                    $mu = (new MeasurementUnitService())->associateToProduct($item);

                    $productData = [
                        'price' => $item['price'],
                        'slug' => Str::slug($item['name ro'], '_'),
                        'product_code' => (new GenerateProductCode)((new Product())),
                        'specifications_id' => null,
                        'brand_id' => $brand->id,
                        'sub_sub_category_id' => $subSubcategory->id,
                        'measurement_unit_id' => $mu->id,
                    ];


                    $product = Product::updateOrCreate(['slug' => Str::slug($item['name ro'], '_')], $productData);

                    foreach (config('app.available_locales') as $locale) {
                        foreach ($this->translatedAttributes as $translatedAttribute) {
                            $xlsxKey = $translatedAttribute . ' ' . $locale;
                            $product->translateOrNew($locale)->$translatedAttribute = $item[$xlsxKey] ?? $item['name ro'];
                        }
                    }

                    $product->save();

                    $this->associateAttributes($product, $subSubcategory, $item);
                    $this->associateImagesWithProduct($product, $item);
                } catch (\Exception $e) {
                    return redirect()->back()->withErrors([
                        'import' => $e->getMessage()
                    ]);
                }
            }
        }

        return $product;

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

    public function associateAttributes($product, $subSubcategory, $item)
    {
        // TODO:// Here need to fix probelem when update product and update or create attribute value


        $attributes = Attribute::where('sub_sub_category_id', $subSubcategory->id)->get()->toArray();

        foreach ($attributes as $attribute) {
            if ($attribute['slug'] == 'cantitate') {

                $attributeObj = Attribute::find($attribute['id']);
                if (array_key_exists($attribute['name'], $item)) {
                    $quantities = json_decode($item[$attribute['name']], true);
                    foreach ($quantities as $qty) {
                        $valueAttribute = $attributeObj->attributeValues()->firstOrCreate(['slug' => $qty]);
                        $valueAttribute->value = $qty;
                        $valueAttribute->save();
                        $product->attributes()->attach($attribute['id'], ['attribute_value_id' => $valueAttribute->id]);
                    }
                }

            }
            if (isset($item[$attribute['name'] . ' ' . 'ro'])) {
                $attributeObj = Attribute::find($attribute['id']);

                foreach (config('app.available_locales') as $locale) {
                    $valueAttribute = $attributeObj->attributeValues()->firstOrCreate(['slug' => $item[$attribute['name'] . ' ' . 'ro']]);
                    $valueAttribute->translateOrNew($locale)->value = $item[$attribute['name'] . ' ' . $locale];
                    $valueAttribute->save();
                }
                // Attach the attribute value to the product
                $product->attributes()->attach($attribute['id'], ['attribute_value_id' => $valueAttribute->id]);
            }
        }

    }















//    public function associateAttributes($product, $subSubcategory, $item)
//    {
//        $attributes = Attribute::where('sub_sub_category_id', $subSubcategory->id)->pluck('slug', 'id')->toArray();
//        foreach ($attributes as $id => $attributeSlug) {
//
//            $product->attributes()->syncWithoutDetaching($id);
////-------------------------------------------------------------------------------------
//            $attribute = Attribute::find($id);
//
////
//
//
//            if (isset($item["$attributeSlug ro"])) {
//                $valueAttribute = $attribute->attributeValues()->create([
//                    'slug' => Str::slug($item["$attributeSlug ro"], '_')
//                ]);
//            } else if (isset($item[ucfirst($attributeSlug) . ' ro'])) {
//                Session::put('cart', 'test');
//                $valueAttribute = $attribute->attributeValues()->create([
//                    'slug' => Str::slug($item[ucfirst($attributeSlug) . ' ro'], '_')
//                ]);
//            } else {
//                session(['cart' => $item]);
//                return null;
//            }
//            foreach ((new AttributeValue())->translatedAttributes as $translatedAttribute) {
//                foreach (config('app.available_locales') as $locale) {
//                    $valueAttribute->translateOrNew($locale)->$translatedAttribute = $item["$attributeSlug $locale"] ?? $item[ucfirst($attributeSlug) . ' ' . $locale];
//                    $valueAttribute->save();
//                }
//            }
//        }
//    }
}


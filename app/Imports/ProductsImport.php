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

    private function processString(): array
    {
        $spreadSheet = IOFactory::load(request()->file('file'));
        $worksheet = $spreadSheet->getActiveSheet();

        $columns = [];
        $firstRowKeys = [];

        foreach ($worksheet->getRowIterator() as $rowIndex => $row) {
            if (!$row->isEmpty()) {
                foreach ($row->getCellIterator() as $cell) {
                    $cellValue = $cell->getValue();
                    if ($rowIndex === 1) {
                        $firstRowKeys[] = $cellValue;
                    } else {
                        $columnIndex = $cell->getColumn();
                        $numericColumnIndex = $this->_columnIndexToNumber($columnIndex);
                        $columns[$rowIndex][$firstRowKeys[$numericColumnIndex]] = $cellValue;
                    }
                }
            }
        }
        return $columns;
    }

    private function _columnIndexToNumber($columnIndex)
    {
        $numericColumnIndex = 0;
        $base = ord('A') - 1;

        for ($i = strlen($columnIndex) - 1, $j = 0; $i >= 0; $i--, $j++) {
            $numericColumnIndex += (ord($columnIndex[$i]) - $base) * (26 ** $j);
        }

        return $numericColumnIndex - 1;
    }


    private function processImages()
    {

        $spreadSheet = IOFactory::load(request()->file('file'));

        if ($spreadSheet->getActiveSheet()->getDrawingCollection()->count() > 0) {

            $imagePositions = [];

            foreach ($spreadSheet->getActiveSheet()->getDrawingCollection() as $key => $drawing) {


//                $col = $drawing->getCoordinates()[0]; // image column
//                $row = $drawing->getCoordinates()[1]; // image row


                $drawingCoordinates = $drawing->getCoordinates();
                $matches = [];
                preg_match('/[0-9]+/', $drawingCoordinates, $matches);
                $row = $matches[0];

                // Identifică rândul în funcție de poziția imaginii
                $rowKey = $row;

                // Adaugă poziția imaginii la array-ul $imagePositions
                $productImages[$rowKey][] = $this->saveImage($drawing);
            }

        }


        return $productImages;

    }

    private function combineImagesWithText(): array
    {
        $texts = $this->processString();
        $images = $this->processImages();
        $combinedColumns = [];
        foreach ($texts as $key => $text) {
            foreach ($images as $k => $image) {
                if ($key == $k) {
                    foreach ($image as $keyI => $image) {
                        $index = ++$keyI;
                        $text['image' . $index] = $image;

                    }
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

                $product = Product::where('slug', Str::slug($item['name ro'], '_'))->first();
                if (!$product) {

                    $brand = (new BrandService)->createWithProduct($item);
                    $subSubcategory = (new SubSubcategoryService())->createWithProduct($item);
                    $mu = (new MeasurementUnitService())->associateToProduct($item);


                    //------------------------------>d

                    $product = Product::firstOrCreate(['slug' => $item['name ro']], [
                        'price' => $item['price'],
                        'slug' => Str::slug($item['name ro'], '_'),
                        'product_code' => (new GenerateProductCode)((new Product())),
                        'specifications_id' => null,
                        'brand_id' => $brand->id,  // Asigură că ai deja $row['brand_id'] disponibil înainte
                        'sub_sub_category_id' => $subSubcategory->id,
                        'measurement_unit_id' => $mu->id,
                    ]);
                    foreach (config('app.available_locales') as $locale) {
                        foreach ($this->translatedAttributes as $translatedAttribute) {
                            $xlsxKey = $translatedAttribute . ' ' . $locale;
                            if (isset($item[$xlsxKey])) {
                                $product->translateOrNew($locale)->$translatedAttribute = $item[$xlsxKey];
                            } else {
                                $product->translateOrNew($locale)->$translatedAttribute = $item['name ro'];
                            }
                        }
                    }


                    $this->associateAttributes($product, $subSubcategory, $item);
                    $this->associateImagesWithProduct($product, $item);
                    $product->save();
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

        if (!empty($images)) {
            $product->images()->create($images);
        }
    }

    public function associateAttributes($product, $subSubcategory, $item)
    {
        $attributes = Attribute::where('sub_sub_category_id', $subSubcategory->id)->get()->toArray();

        foreach ($attributes as $attribute) {
//            output
            /**
             * [
             * 'id' => 1
             * 'name' => 'Culoare'
             * 'slug' => 'culoare'
             * 'sub_sub_category_id' => 1
             * 'created_at' => '2024-02-11T18:26:21.000000Z'
             * 'updated_at' => '2024-02-11T18:26:21.000000Z'
             * 'translations' => array:2 [▶]
             * ]
             */
            if (isset($item[$attribute['name'] . ' ' . 'ro'])) {
                $product->attributes()->syncWithoutDetaching($attribute['id']);
////-------------------------------------------------------------------------------------
                $attributeObj = Attribute::find($attribute['id']);

                foreach (config('app.available_locales') as $locale) {
                    $valueAttribute = $attributeObj->attributeValues()->firstOrCreate(['slug' => $item[$attribute['name'] . ' ' . 'ro']]);
                    $valueAttribute->translateOrNew($locale)->value = $item[$attribute['name'] . ' ' . $locale];
                    $valueAttribute->save();
                }
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


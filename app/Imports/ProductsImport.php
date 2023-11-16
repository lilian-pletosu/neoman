<?php

namespace App\Imports;

use App\Models\Brand;
use App\Models\Product;
use App\Models\SubSubCategory;
use App\Services\GenerateProductCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing;
use function PHPUnit\Framework\isNull;


class ProductsImport
{


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
                        $columnIndex = array_search($columnIndex, range('A', 'Z'));
                        $columns[$rowIndex][$firstRowKeys[$columnIndex]] = $cellValue;
                    }
                }
            }


        }
        return $columns;
    }

    private function processImages()
    {

        $spreadSheet = IOFactory::load(request()->file('file'));

        if ($spreadSheet->getActiveSheet()->getDrawingCollection()->count() > 0) {

            $imagePositions = [];

            foreach ($spreadSheet->getActiveSheet()->getDrawingCollection() as $drawing) {
                $col = $drawing->getCoordinates()[0]; // image column
                $row = $drawing->getCoordinates()[1]; // image row

                // Identifică rândul în funcție de poziția imaginii
                $rowKey = "{$row}";

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
            return $fileName;
        }
    }

    public function createProduct()
    {
        $data = $this->combineImagesWithText();
        foreach ($data as $item) {

            if (isNull(Product::where('title', $item['title'])->first())) {
                $brand = Brand::firstOrCreate(['name' => $item['brand']], [
                    'slug' => Str::slug($item['brand'], '_'),
                    'website' => Str::lower('www' . '.' . $item['brand'] . '.' . 'com',),
                    'description' => $item['brand'] . ' ' . 'description',
                    'seo_title' => $item['brand'],
                    'seo_description' => $item['brand'] . ' ' . 'description',
                    'is_enabled' => 1,
                    'image' => 'image'
                ]);

                if (Product::where('title', $item['title'])->first() == null) {
                    $product = Product::create([
                        'title' => $item['title'],
                        // Atribuie celelalte atribute ale produsului
                        'description' => $item['description'],
                        'price' => $item['price'],
                        'slug' => Str::slug($item['title'], '_'),
                        'product_code' => (new GenerateProductCode)((new Product())),
                        'specifications_id' => null,
                        'brand_id' => $brand->id,  // Asigură că ai deja $row['brand_id'] disponibil înainte
                        'sub_subcategory_id' => SubSubCategory::where('name', '=', $item['sub_subcategory_id'] ?? '')->first()->id,

                    ]);
                    $this->associateImagesWithProduct($product, $item);
                }


            }


        }

    }

    private function associateImagesWithProduct($product, $item)
    {
//        dd($item);
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
}


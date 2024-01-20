<?php

namespace App\Imports;

use App\Models\Category;
use App\Models\Product;
use App\Models\SubCategory;
use App\Services\GenerateProductCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing;

class SubCategoriesImport
{
    public function __invoke(Request $request)
    {
        $this->createSubCategory();
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

        $activeSheet = $spreadSheet->getActiveSheet()->getDrawingCollection();

        $index = 2;
        if ($activeSheet->count() > 0) {
            $imagePositions = [];

            foreach ($activeSheet as $drawing) {
                // Adaugă poziția imaginii la array-ul $imagePositions
                $subCategoryImages[$index][] = $this->saveImage($drawing);
                ++$index;
            }
            return $subCategoryImages;
        }
//        return [];


    }

    private function combineImagesWithText(): array
    {
        $textColumns = $this->processString();
        $imageColumns = $this->processImages();
        $combinedColumns = [];
        foreach ($textColumns as $textKey => $text) {
            foreach ($imageColumns as $imageKey => $image) {
                if ($textKey == $imageKey) {
                    if (count($image) > 1) {
                        foreach ($image as $imageIndex => $img) {
                            $index = ++$imageIndex;
                            $text['image' . $index] = $img;
                        }
                    } else {
                        $text['image'] = $image[0];
                    }
                }
            }
            $combinedColumns[$textKey] = $text;
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

            $imageContents = '';
            while (!feof($zipReader)) {
                $imageContents .= fread($zipReader, 1024);
            }
            fclose($zipReader);
            $extension = $drawing->getExtension();


            $fileName = 'subcategory' . '_' . (new GenerateProductCode())((new Product())) . '.' . $extension;
            Storage::disk('subcategories')->put($fileName, $imageContents);
            return $fileName;
        }
    }

    public function createSubCategory()
    {
        $data = $this->combineImagesWithText();

        foreach ($data as $item) {


            // Caută sau creează o categorie cu slug-ul furnizat
            try {
                $subcategory = SubCategory::firstOrCreate(['slug' => Str::slug($item['name ro'], '_')],
                    [
                        'image' => '/storage/subcategories/' . $item['image'],
                        'category_id' => Category::firstOrCreate(['slug' => Str::slug($item['category'], '_')], [
                            'slug' => Str::slug($item['category']),
                        ])->id
                    ]);

                $subcategory->translateOrNew('ro')->name = $item['name ro'];
                $subcategory->translateOrNew('ru')->name = $item['name ru'];

                $subcategory->save();
            } catch (\Exception $exception) {
                return $exception;
            }

        }

    }


}

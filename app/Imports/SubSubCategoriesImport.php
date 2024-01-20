<?php

namespace App\Imports;

use App\Models\Product;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use App\Services\GenerateProductCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing;


class SubSubCategoriesImport
{
    public function __invoke(Request $request)
    {
        return $this->createSubSubCategory();
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
                $subSubCategoryImages[$index][] = $this->saveImage($drawing);
                ++$index;
            }
            return $subSubCategoryImages;
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


            $fileName = 'subSubCategory' . '_' . (new GenerateProductCode())((new Product())) . '.' . $extension;
            Storage::disk('subSubcategories')->put($fileName, $imageContents);
            return $fileName;
        }
    }

    public function createSubSubCategory()
    {
        $data = $this->combineImagesWithText();

        foreach ($data as $item) {


            // Caută sau creează o categorie cu slug-ul furnizat
            try {
                $subSubcategory = SubSubCategory::firstOrCreate(['slug' => Str::slug($item['name ro'], '_')],
                    [
                        'image' => '/storage/subSubcategories/' . $item['image'],
                        'subcategory_id' => SubCategory::firstOrCreate(['slug' => Str::slug($item['subcategory'], '_')], [
                            'slug' => Str::slug($item['subcategory']),
                        ])->id
                    ]);

                foreach (config('app.available_locales') as $locale) {
                    $subSubcategory->translateOrNew($locale)->name = $item['name' . ' ' . $locale];
                }

                $subSubcategory->save();
            } catch (\Exception $exception) {
                return $exception;
            }

        }
    }

}

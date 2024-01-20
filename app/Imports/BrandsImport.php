<?php

namespace App\Imports;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing;

class BrandsImport
{
    public function __invoke(Request $request)
    {
        $this->createBrand();
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
                $categoryImages[$rowKey][] = $this->saveImage($drawing);
            }
            return $categoryImages;

        }
        return [];


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


            $imageContents = '';
            while (!feof($zipReader)) {
                $imageContents .= fread($zipReader, 1024);
            }
            fclose($zipReader);
            $extension = $drawing->getExtension();


            $fileName = uniqid('brand') . '.' . $extension;
            Storage::disk('brands')->put($fileName, $imageContents);
            return $fileName;
        }
    }

    public function createBrand()
    {
        $data = $this->combineImagesWithText();

        foreach ($data as $item) {


            // Caută sau creează o categorie cu slug-ul furnizat
            $category = Category::firstOrCreate(['slug' => Str::slug($item['name ro'], '_')]);

            $category->translateOrNew('ro')->name = $item['name ro'];
            $category->translateOrNew('ru')->name = $item['name ru'];

            $category->save();

        }

    }


}

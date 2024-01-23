<?php

namespace App\Imports;

use App\Services\BrandService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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


            $fileName = uniqid('brand') . '.' . $extension;
            Storage::disk('brands')->put($fileName, $imageContents);
            return $fileName;
        }
    }

    public function createBrand()
    {
        $data = $this->combineImagesWithText();

        foreach ($data as $item) {
            if ($item['image'] != null) {
                $item['image'] = '/storage/brands/' . $item['image'];
            } else {
                $item['image'] = '/img/no_image.svg';
            }
            (new BrandService())->create($item, false);
        }

    }


}

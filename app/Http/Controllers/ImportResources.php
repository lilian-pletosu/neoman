<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Imports\BrandsImport;
use App\Imports\CategoriesImport;
use App\Imports\SubCategoriesImport;
use App\Jobs\ExcelImportProductsJob;
use App\Imports\SubSubCategoriesImport;
use Illuminate\Support\Facades\Storage;

class ImportResources extends Controller
{
    public function importExcelCSV(Request $request, string $resourceType)
    {
        //TODO: Make conditional case if resourceType is equal with product make productImport and the like
        switch (Str::lower($resourceType)) {
            case 'product':
                $originalName = now() . "-" . $request->file->getClientOriginalName();
                $path = "imports/" . $originalName;
                Storage::disk('public')->put($path, file_get_contents($request->file));
                ExcelImportProductsJob::dispatch($originalName);
                break;
            case 'category':
                (new CategoriesImport())($request);
                break;
            case 'subcategory':
                (new SubCategoriesImport())($request);
                break;
            case 'subsubcategories':
                (new SubSubCategoriesImport())($request);
                break;
            case 'brand':
                (new BrandsImport())($request);
                break;
        }
    }
}

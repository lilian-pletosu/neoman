<?php

namespace App\Http\Controllers;

use App\Imports\BrandsImport;
use App\Imports\CategoriesImport;
use App\Imports\SubCategoriesImport;
use App\Imports\SubSubCategoriesImport;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ImportResources extends Controller
{
    public function importExcelCSV(Request $request, string $resourceType)
    {
        $request->validate([
            'file' => 'required'
        ]);

        //TODO: Make conditional case if resourceType is equal with product make productImport and the like
//        dd(Str::lower($resourceType));
        switch (Str::lower($resourceType)) {
            case 'product':
                dd('product');
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

<?php

namespace App\Http\Controllers;

use App\Imports\ProductsImport;
use Illuminate\Http\Request;

class ExcelCSV extends Controller
{
    public function importExcelCSV(Request $request)
    {

        $request->validate([
            'file' => 'required'
        ]);

        (new ProductsImport)($request);
    }
}

<?php

namespace App\Http\Controllers;

use App\Imports\ProductsImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExcelCSV extends Controller
{
    public function importExcelCSV(Request $request)
    {
        $request->validate([
            'file' => 'required'
        ]);

        Excel::import(new ProductsImport, $request->file('file'));
    }
}

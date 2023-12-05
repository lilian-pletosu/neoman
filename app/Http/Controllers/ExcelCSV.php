<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExcelCSV extends Controller
{
    public function importExcelCSV(Request $request, string $resourceType)
    {
        $request->validate([
            'file' => 'required'
        ]);

        //TODO: Make conditional case if resourceType is equal with product make productImport and the like
    }
}

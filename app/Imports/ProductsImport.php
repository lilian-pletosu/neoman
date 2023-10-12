<?php

namespace App\Imports;

use App\Models\Brand;
use App\Models\Product;
use App\Models\SubSubCategory;
use App\Services\GenerateProductCode;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {

//        $fieldsTable = Schema::getColumnListing(
//            app(ProductSpecification::class)->getTable()
//        );
//
//        foreach ($row as $field => $value) {
//            $val = json_decode($value);
//            foreach ($fieldsTable as $item) {
//
//                if ($item === $field) {
//                    $prop = ProductSpecification::where($field, json_encode($val))->first();
//                    if ($prop->$field === $val) {
//                        dd($prop);
//                    }
//                }
//            }
//
//
//        }
//        dd(ProductSpecification::where($row, $row)->first());

        if (!array_key_exists('title', $row)) {
            return [];
        }
        if (Product::where('title', $row['title'])->first()) {
            return [];
        }
        $row['slug'] = Str::slug($row['title'], '_');
        $row['product_code'] = (new GenerateProductCode)();
        $row['specifications_id'] = null;
        $row['brand_id'] = Brand::where('name', '=', $row['brand'])->first()->id;
        $row['sub_subcategory_id'] = SubSubCategory::where('name', '=', $row['sub_subcategory_id'])->first()->id;
        $product = Product::create($row);
        return $product;

    }
}

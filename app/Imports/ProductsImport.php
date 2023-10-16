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

        if (array_key_exists('brand', $row)) {
            $brand = Brand::firstOrCreate(['name' => $row['brand']], [
                'slug' => Str::slug($row['brand'], '_'),
                'website' => Str::lower('www' . '.' . $row['brand'] . '.' . 'com',),
                'description' => $row['brand'] . ' ' . 'description',
                'seo_title' => $row['brand'],
                'seo_description' => $row['brand'] . ' ' . 'description',
                'is_enabled' => 1,
                'image' => 'image'
            ]);
        }

        if (!array_key_exists('title', $row)) {
            return [];
        }
        if (Product::where('title', $row['title'])->first()) {
            return [];
        }
        $row['slug'] = Str::slug($row['title'], '_');
        $row['product_code'] = (new GenerateProductCode)((new Product()));
        $row['specifications_id'] = null;
        $row['brand_id'] = $brand->id;
        $row['sub_subcategory_id'] = SubSubCategory::where('name', '=', $row['sub_subcategory_id'])->first()->id;
        $product = Product::create($row);
        return $product;

    }
}

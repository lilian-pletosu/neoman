<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportedProduct extends Model
{
    use HasFactory;

    protected $table = 'imported_products';

    protected $fillable = [
        'name',
        'description',
        'price',
        'product_code',
        'slug',
        'brand_id',
        'sub_sub_category_id',
        'measurement_unit_id',
        'images'
    ];

    protected $casts = [
        'description' => 'json',
        'name' => 'json',
        'images' => 'json'
    ];

    public function subSubCategory()
    {
        return $this->belongsTo(SubSubCategory::class, 'sub_sub_category_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }


}

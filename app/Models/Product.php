<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;


    public $translatedAttributes = ['name', 'description'];

    protected $fillable = ['name', 'description', 'price', 'product_code', 'slug', 'brand_id', 'sub_sub_category_id'];

    public function subSubCategory()
    {
        return $this->belongsTo(SubSubCategory::class, 'sub_sub_category_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'product_attributes')->withPivot('value');
    }
}

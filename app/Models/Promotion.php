<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $table = 'promotions';
    protected $fillable = ['name', 'description', 'start_date', 'end_date', 'discount', 'status'];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'promotion_product');
    }

    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'promotion_brand');
    }

    public function sub_subcategories()
    {
        return $this->belongsToMany(SubSubCategory::class, 'promotion_sub_sub_category');
    }
}


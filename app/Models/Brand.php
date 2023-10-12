<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $table = 'brands';
    protected $fillable = [
        'name', 'slug', 'website', 'description', 'position', 'is_enabled', 'seo_title', 'seo_description', 'image'
    ];

    public function product()
    {
        return $this->hasMany(Product::class, 'brand_id');
    }
}

<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    protected $table = 'brands';

    public array $translatedAttributes = ['description'];

    protected $fillable = [
        'name', 'slug', 'website', 'description', 'position', 'is_enabled', 'seo_title', 'seo_description', 'image'
    ];


    public function products()
    {
        return $this->hasMany(Product::class, 'brand_id');
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'promotion_brand')->withPivot('brand_id', 'promotion_id');
    }
}

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

    public $translatedAttributes = ['description'];

    protected $fillable = [
        'name', 'slug', 'website', 'description', 'position', 'is_enabled', 'seo_title', 'seo_description', 'image'
    ];


    public function product()
    {
        return $this->hasMany(Product::class, 'brand_id');
    }

}

<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    protected $table = 'categories';
    protected $fillable = [
        'name', 'slug', 'icon', 'is_active'
    ];

    
    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }


    public $translatedAttributes = ['name'];

    public function subcategory()
    {
        return $this->hasMany(SubCategory::class, 'category_id');
    }
}

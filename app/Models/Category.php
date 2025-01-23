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



    protected $fillable = ['parent_id', 'level', 'is_active', 'icon', 'order', 'slug', 'image'];
    public $translatedAttributes = ['name'];


    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }


    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'promotion_category')->withPivot('category_id', 'promotion_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}

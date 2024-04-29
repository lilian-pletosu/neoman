<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    protected $table = 'subcategories';


    protected $fillable = [
        'slug', 'category_id', 'image', 'name', 'is_active'
    ];
    public $translatedAttributes = ['name'];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function subSubcategory()
    {
        return $this->hasMany(SubSubCategory::class, 'subcategory_id');
    }
}

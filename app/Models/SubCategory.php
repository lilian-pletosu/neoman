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
        'slug', 'category_id', 'image', 'name'
    ];
    public $translatedAttributes = ['name'];


    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function subSubcategory()
    {
        return $this->hasMany(SubSubCategory::class, 'sub_sub_category_id');
    }
}

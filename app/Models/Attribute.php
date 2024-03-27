<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    protected $table = 'attributes';
    public array $translatedAttributes = ['name'];

    protected $fillable = [
        'slug',
        'sub_sub_category_id'
    ];

    public function attributeValues()
    {
        return $this->hasMany(AttributeValue::class, 'attribute_id', 'id');
    }

    public function subSubcategory()
    {
        return $this->belongsTo(SubSubCategory::class, 'sub_sub_category_id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_attributes')->withPivot('attribute_id');
    }
}

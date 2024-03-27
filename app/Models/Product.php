<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;


    public $translatedAttributes = ['name', 'description'];

    protected $fillable = ['name', 'description', 'price', 'product_code', 'slug', 'brand_id', 'sub_sub_category_id', 'measurement_unit_id'];

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
        return $this->belongsToMany(Attribute::class, 'product_attributes')->withPivot('product_id');
    }

    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValue::class, 'product_attributes')->withPivot('product_id')->with('attribute');
    }


    public function scopeFiltered(Builder $query, $attributes)
    {
        $queryBy = [];
        foreach (request()->toArray() as $key => $value) {

            if (in_array($key, $attributes)) {
                array_push($queryBy, $key);
            }
        }
        $query->when(request('sorts'), function (Builder $q) {
            if (request('sorts') == 'new') {
                $q->orderBy('created_at', 'desc');
            }
            if (request('sorts') == 'asc') {
                $q->orderBy('price');
            }
            if (request('sorts') == 'desc') {
                $q->orderBy('price', 'desc');
            }
        })->when(request('price'), function (Builder $q) {
            $q->whereBetween('price', [
                request('price.from', 0),
                request('price.to', 10000)
            ]);
        })->when(request('brands'), function (Builder $q) {
            $q->whereIn('brand_id', request('brands'));

        })->when(request(), function (Builder $q) use ($queryBy) {
            foreach ($queryBy as $attributeName) {
                $attributeValues = request($attributeName);
                if ($attributeValues) {
                    $q->whereHas('attributes', function ($query) use ($attributeValues) {
                        $query->whereIn('attribute_value_id', $attributeValues);
                    });
                }
            }
        });


    }
}

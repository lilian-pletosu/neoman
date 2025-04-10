<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;

class Product extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;



    public $translatedAttributes = ['name', 'description'];

    protected $fillable = ['name', 'description', 'price', 'product_code', 'slug', 'brand_id', 'category_id', 'measurement_unit_id'];



    public function measurementUnit()
    {
        return $this->belongsTo(MeasurementUnit::class, 'measurement_unit_id');
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

    public function scopeSort(Builder $query)
    {
        return $query->when(request('sorts'), function (Builder $q) {
            if (request('sorts') == 'new') {
                $q->orderBy('created_at', 'desc');
            }
            if (request('sorts') == 'asc') {
                $q->orderBy('price');
            }
            if (request('sorts') == 'desc') {
                $q->orderBy('price', 'desc');
            }
        });
    }

    public function scopeSearch($query, $word)
    {
        return $query->where('slug', 'like', '%' . $word . '%')
            ->orWhereHas('translations', function ($q) use ($word) {
                $q->where('name', 'like', '%' . $word . '%');
                $q->orWhere('description', 'like', '%' . $word . '%');
            })
            ->limit(10)->get();
    }

    public function credits()
    {
        return $this->belongsToMany(Credit::class, 'product_credits');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}

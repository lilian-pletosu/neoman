<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    protected $table = 'brands';

    public array $translatedAttributes = ['description'];

    protected $fillable = [
        'name',
        'slug',
        'website',
        'description',
        'position',
        'is_enabled',
        'seo_title',
        'seo_description',
        'image'
    ];


    public function products()
    {
        return $this->hasMany(Product::class, 'brand_id');
    }

    public function scopeBrandsOfSubsubCategory($query, $category_id)
    {
        return $query->whereHas('products', function ($query) use ($category_id) {
            $query->whereHas('category', function ($query) use ($category_id) {
                $query->where('id', $category_id);
            });
            // get count of products for this brand of this subsubcategory
        })->withCount(['products' => function (Builder $query) use ($category_id) {
            $query->whereHas('category', function ($query) use ($category_id) {
                $query->where('id', $category_id);
            });
        }]);
    }

    public function scopeActive($query)
    {
        return $query->where('is_enabled', 1);
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'promotion_brand')->withPivot('brand_id', 'promotion_id');
    }
}

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

    public function scopeWithDiscountDetails($query)
    {
        return $query->addSelect([
            'has_discount' => Brand::select('is_enabled')
                ->where('is_enabled', true)
                ->whereIn('id', function ($query) {
                    $query->select('brand_id')
                        ->from('promotion_brand')
                        ->join('promotions', 'promotions.id', '=', 'promotion_brand.promotion_id')
                        ->where('promotions.status', 'active')
                        ->unionAll(
                            $query->newQuery()
                                ->select('category_id')
                                ->from('promotion_category')
                                ->join('promotions', 'promotions.id', '=', 'promotion_category.promotion_id')
                                ->where('promotions.status', 'active')
                        )
                        ->unionAll(
                            $query->newQuery()
                                ->select('sub_category_id')
                                ->from('promotion_sub_category')
                                ->join('promotions', 'promotions.id', '=', 'promotion_sub_category.promotion_id')
                                ->where('promotions.status', 'active')
                        )
                        ->unionAll(
                            $query->newQuery()
                                ->select('sub_sub_category_id')
                                ->from('promotion_sub_sub_category')
                                ->join('promotions', 'promotions.id', '=', 'promotion_sub_sub_category.promotion_id')
                                ->where('promotions.status', 'active')
                        );
                }),
            'promotion_price' => Brand::selectRaw('products.price - (products.price * promotions.discount / 100)')
                ->join('promotion_brand', 'brands.id', '=', 'promotion_brand.brand_id')
                ->join('promotions', 'promotions.id', '=', 'promotion_brand.promotion_id')
                ->whereColumn('brands.id', 'products.brand_id')
                ->where('promotions.status', 'active')
                ->union(
                    Category::selectRaw('products.price - (products.price * promotions.discount / 100)')
                        ->join('promotion_category', 'categories.id', '=', 'promotion_category.category_id')
                        ->join('promotions', 'promotions.id', '=', 'promotion_category.promotion_id')
                        ->where('promotions.status', 'active')
                )
                ->union(
                    SubCategory::selectRaw('products.price - (products.price * promotions.discount / 100)')
                        ->join('promotion_sub_category', 'subcategories.id', '=', 'promotion_sub_category.sub_category_id')
                        ->join('promotions', 'promotions.id', '=', 'promotion_sub_category.promotion_id')
                        // ->whereColumn('subcategories.id', 'products.sub_category_id')
                        ->where('promotions.status', 'active')
                )
                ->union(
                    SubSubCategory::selectRaw('products.price - (products.price * promotions.discount / 100)')
                        ->join('promotion_sub_sub_category', 'sub_subcategories.id', '=', 'promotion_sub_sub_category.sub_sub_category_id')
                        ->join('promotions', 'promotions.id', '=', 'promotion_sub_sub_category.promotion_id')
                        // ->whereColumn('sub_sub_categories.id', 'products.sub_sub_category_id')
                        ->where('promotions.status', 'active')
                ),
            'sale' => Brand::selectRaw('promotions.discount')
                ->join('promotion_brand', 'brands.id', '=', 'promotion_brand.brand_id')
                ->join('promotions', 'promotions.id', '=', 'promotion_brand.promotion_id')
                ->whereColumn('brands.id', 'products.brand_id')
                ->where('promotions.status', 'active')
                ->union(
                    Category::selectRaw('promotions.discount')
                        ->join('promotion_category', 'categories.id', '=', 'promotion_category.category_id')
                        ->join('promotions', 'promotions.id', '=', 'promotion_category.promotion_id')
                        // ->whereColumn('categories.id', 'products.category_id')
                        ->where('promotions.status', 'active')
                )
                ->union(
                    SubCategory::selectRaw('promotions.discount')
                        ->join('promotion_sub_category', 'subcategories.id', '=', 'promotion_sub_category.sub_category_id')
                        ->join('promotions', 'promotions.id', '=', 'promotion_sub_category.promotion_id')
                        // ->whereColumn('sub_categories.id', 'products.sub_category_id')
                        ->where('promotions.status', 'active')
                )
                ->union(
                    SubSubCategory::selectRaw('promotions.discount')
                        ->join('promotion_sub_sub_category', 'sub_subcategories.id', '=', 'promotion_sub_sub_category.sub_sub_category_id')
                        ->join('promotions', 'promotions.id', '=', 'promotion_sub_sub_category.promotion_id')
                        ->whereColumn('sub_subcategories.id', 'products.sub_sub_category_id')
                        ->where('promotions.status', 'active')
                )
        ]);
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
        return $this->subSubCategory->subCategory->category;
    }
}

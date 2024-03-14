<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
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

    // Function to search products based on keywords and filters (replace with your implementation)
    public static function search($keywords, $filters = [])
    {
        $query = self::query();

        // Preprocesarea cuvintelor cheie
        $relevantKeywords = ['vopsea', 'interior', 'latex', 'semi-mat', '10l'];
        $synonyms = [
            'latex' => ['latex', 'spektra latex'],
        ];
        $preprocessedKeywords = [];
        foreach ($keywords as $keyword) {

            if (in_array($keyword, $relevantKeywords)) {
                $preprocessedKeywords[] = $keyword;
            } else {
                foreach ($synonyms as $synonymGroup => $synonymsList) {
                    if (in_array($keyword, $synonymsList)) {
                        $preprocessedKeywords[] = $synonymGroup;
                        break;
                    }
                }
            }
        }

//        // Căutare bazată pe cuvinte cheie
//        $query->where(function ($query) use ($preprocessedKeywords) {
//            foreach ($preprocessedKeywords as $keyword) {
////                dd($keyword);
//                $query->orWhere('slug', $keyword);
//            }
//        });

        // Aplicarea filtrelor suplimentare
        if ($filters) {
            foreach ($filters as $field => $value) {
                $query->where($field, $value);
            }
        }

        // Ordonați după relevanță (bazat pe numărul de cuvinte cheie potrivite)
//        $query->orderByRaw('COUNT(JSON_CONTAINS(attributes, ?)) DESC', [$preprocessedKeywords]);

        // Returnarea rezultatelor
        return $query->get();
    }

}

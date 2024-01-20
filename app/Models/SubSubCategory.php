<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubSubCategory extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    public $timestamps = false;

    protected $table = 'sub_subcategories';
    public $translatedAttributes = ['name'];

    protected $fillable = ['slug', 'image', 'subcategory_id'];

    public function subcategory()
    {
        return $this->belongsTo(SubCategory::class, 'subcategory_id');
    }


}

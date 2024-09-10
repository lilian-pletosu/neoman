<?php

namespace App\Models;

use App\Models\Scopes\TranslateNameScope;
use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubSubCategory extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    public $timestamps = false;
    public $translatedAttributes = ['name'];
    protected $table = 'sub_subcategories';
    protected $fillable = ['slug', 'image', 'subcategory_id', 'is_active'];

    protected static function booted()
    {
        static::addGlobalScope(new TranslateNameScope);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }

    public function subcategory()
    {
        return $this->belongsTo(SubCategory::class, 'subcategory_id');
    }


}

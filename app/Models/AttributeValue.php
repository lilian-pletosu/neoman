<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    protected $table = 'attribute_values';

    public array $translatedAttributes = ['value'];

    protected $fillable = [
        'value',
        'slug',
        'attribute_id',
    ];

    public function attribute()
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }
}

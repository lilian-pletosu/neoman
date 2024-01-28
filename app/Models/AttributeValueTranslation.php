<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValueTranslation extends Model
{
    use HasFactory;

    protected $table = 'attribute_value_translations';

    protected $fillable = [
        'value',
        'attribute_value_id',
        'locale'
    ];

    public $timestamps = false;
}

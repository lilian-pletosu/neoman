<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubSubCategoryTranslation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'sub_subcategories_translations';
    protected $fillable = ['name'];
}

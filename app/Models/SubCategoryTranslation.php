<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategoryTranslation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'subcategory_translations';
    protected $fillable = ['name', 'sub_category_id'];
}

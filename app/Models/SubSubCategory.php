<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubSubCategory extends Model
{
    use HasFactory;

    protected $table = 'sub_subcategories';
    protected $fillable = [
        'name', 'slug', 'subcategory_id'
    ];

    public function product()
    {
        return $this->hasMany(Product::class, 'sub_subcategory_id');
    }
}

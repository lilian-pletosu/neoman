<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $table = 'banners';
    protected $fillable = ['image', 'link', 'title', 'is_active', 'page'];

    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }

    public function scopePage($query, $page)
    {
        return $query->where('page', $page);
    }


}

<?php

namespace App\Models;

use Astrotomic\Translatable\Contracts\Translatable as TranslatableContract;
use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Terms extends Model implements TranslatableContract
{
    use HasFactory;
    use Translatable;

    protected $table = 'terms';
    protected $fillable = ['slug'];

    public array $translatedAttributes = ['title', 'content'];
}

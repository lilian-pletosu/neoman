<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TermsTranslation extends Model
{
    use HasFactory;

    protected $table = 'terms_translations';
    protected $fillable = ['title', 'content', 'locale'];
    public $timestamps = false;
}

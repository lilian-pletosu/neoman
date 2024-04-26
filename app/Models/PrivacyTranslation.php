<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivacyTranslation extends Model
{
    use HasFactory;

    protected $table = 'privacy_translations';
    protected $fillable = ['title', 'content'];
    public $timestamps = false;

}

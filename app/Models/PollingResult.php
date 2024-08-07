<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PollingResult extends Model
{
    use HasFactory;

    protected $fillable = ['guid', 'data'];
}

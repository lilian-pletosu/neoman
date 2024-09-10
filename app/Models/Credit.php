<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    use HasFactory;

    protected $table = 'credits';
    protected $fillable = [
        'id', 'name', 'num_of_installments', 'interest_rate', 'type'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'credit_id');
    }

    public function scopeCreditType($query)
    {
        return $query->where('type', 'credit')->orderBy('num_of_installments', 'asc');
    }

    public function scopeInstallmentType($query)
    {
        return $query->where('type', 'installments')->orderBy('num_of_installments', 'asc');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_credits');
    }
}

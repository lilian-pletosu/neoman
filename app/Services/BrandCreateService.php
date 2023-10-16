<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandCreateService
{
    public function create(Request $request, $data)
    {
        $data['slug'] = Str::slug($data['name'], '_');
        $request->file('image')->store('public/brands');
        $data['image'] = '/brands/' . $request->file('image')->hashName();
        $request->image->move(public_path('brands'), $request->file('image')->hashName());

        Brand::create($data);
    }
}

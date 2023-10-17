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
        if ($request->file('image')) {
            $data['image'] = '/brands/' . $request->file('image')->hashName();
            $request->image->move(public_path('brands'), $request->file('image')->hashName());
        } else {
            $data['image'] = 'img/no_image.svg';
        }
//        Image::load($img)->width(64)->height(19)->optimize()->save(storage_path('brands') . 'image.png');
        Brand::create($data);
    }
}

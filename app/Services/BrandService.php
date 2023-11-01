<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandService
{
    public function create(Request $request, $data)
    {
        $data['slug'] = Str::slug($data['name'], '_');
        if ($request->file('image')) {
            $data['image'] = '/brands/' . $request->file('image')->hashName();
            $request->image->move(public_path('brands'), $request->file('image')->hashName());
        } else {
            $data['image'] = '/img/no_image.svg';
        }
//        Image::load($img)->width(64)->height(19)->optimize()->save(storage_path('brands') . 'image.png');
        Brand::create($data);
    }

    public function update(array $data, Brand $brand)
    {
        if ($data['image'] === null) {
            $data['image'] = $brand->image;
        } else {
            $fileName = $data['image']->hashName();
            $data['image']->move(public_path('brands'), $fileName);
            $data['image'] = '/brands/' . $fileName;//
        }
        $data['slug'] = Str::slug($data['name'], '_');
        $brand->update($data);
    }
}

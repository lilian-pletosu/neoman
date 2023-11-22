<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandService
{
    public function create(Request $request, $data)
    {

        $data['slug'] = array_key_exists('brand', $data) ? Str::slug($data['brand'], '_') : Str::slug('No name', '_');
        if ($request->file('image')) {
            $data['image'] = '/brands/' . $request->file('image')->hashName();
            $request->image->move(public_path('brands'), $request->file('image')->hashName());
        } else {
            $data['image'] = '/img/no_image.svg';
        }
        $brand = Brand::firstOrCreate(['name' => $data['brand']], [
            'slug' => Str::slug($data['brand'], '_'),
            'website' => Str::lower('www' . '.' . $data['brand'] . '.' . 'com',),
            'description' => $data['brand'] . ' ' . 'description',
            'seo_title' => $data['brand'],
            'seo_description' => $data['brand'] . ' ' . 'description',
            'is_enabled' => 1,
            'image' => 'image'
        ]);


        foreach (config('translatable.locales') as $locale) {
            $brand->translateOrNew($locale)->description = "{$data['description'] } $locale";
            $brand->save();
        }


        return $brand;
    }

    public function createWithProduct($data)
    {
        $brand = Brand::firstOrCreate(['name' => $data['brand']], [
            'slug' => Str::slug($data['brand'], '_'),
            'website' => Str::lower('www' . '.' . $data['brand'] . '.' . 'com',),
            'description' => $data['brand'] . ' ' . 'description',
            'seo_title' => $data['brand'],
            'seo_description' => $data['brand'] . ' ' . 'description',
            'is_enabled' => 1,
            'image' => 'image'
        ]);

        foreach (config('translatable.locales') as $locale) {
            $brand->translateOrNew($locale)->description = "{$data['brand']} . description . $locale";
            $brand->save();
        }

        return $brand;
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

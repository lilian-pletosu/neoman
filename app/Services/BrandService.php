<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandService
{
    public function create(Request $request, $data)
    {

        $data['slug'] = array_key_exists('name', $data) ? Str::slug($data['name'], '_') : Str::slug('No name', '_');
        if ($request->file('image')) {
            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('image')->extension();
            $data['image'] = '/storage/brands/' . $fileName;
            $imageContents = $request->file('image')->getContent();
            Storage::disk('brands')->put($fileName, $imageContents);
        } else {
            $data['image'] = '/img/no_image.svg';
        }
        $brand = Brand::firstOrCreate(['name' => $data['name']], [
            'slug' => Str::slug($data['name'], '_'),
            'website' => $data['website'],
            'description' => $data['description'],
            'seo_title' => $data['name'],
            'seo_description' => $data['name'] . ' ' . 'description',
            'is_enabled' => $data['is_enabled'],
            'image' => $data['image']
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

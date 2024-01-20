<?php

namespace App\Services;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SubcategoryService
{
    public function create(Request $request, $data)
    {

        $data['slug'] = array_key_exists('name', $data) ? Str::slug($data['name'], '_') : Str::slug('No name', '_');
        if ($request->file('image')) {

            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('image')->extension();

            $data['image'] = '/storage/subcategories/' . $fileName;
            $imageContents = $request->file('image')->getContent();
            Storage::disk('subcategories')->put($fileName, $imageContents);
        } else {
            $data['image'] = '/img/no_image.svg';
        }

        $subcategory = SubCategory::create($data);


        foreach (config('translatable.locales') as $locale) {
            $subcategory->translateOrNew($locale)->name = "{$data['name'] } $locale";
            $subcategory->save();
        }


        return $subcategory;
    }

//    public function createWithProduct($data)
//    {
//        $brand = SubCategory::firstOrCreate(['name' => $data['subcategory']], [
//            'slug' => Str::slug($data['brand'], '_'),
//            'website' => Str::lower('www' . '.' . $data['brand'] . '.' . 'com',),
//            'description' => $data['brand'] . ' ' . 'description',
//            'seo_title' => $data['brand'],
//            'seo_description' => $data['brand'] . ' ' . 'description',
//            'is_enabled' => 1,
//            'image' => 'image'
//        ]);
//
//        foreach (config('translatable.locales') as $locale) {
//            $brand->translateOrNew($locale)->description = "{$data['brand']} . description . $locale";
//            $brand->save();
//        }
//
//        return $brand;
//    }

    public function update($data, SubCategory $subcategory)
    {

        if (app()->currentLocale() == 'ru') {
            $data['slug'] = $subcategory->slug;
        } else {
            $data['slug'] = Str::slug($data['name'], '_');
        }

        if ($data['image'] === null) {
            $data['image'] = $subcategory->image;
        } else {
            $fileName = $data['image']->hashName();
            $imageContents = $data['image']->getContent();
            Storage::disk('subcategories')->put($fileName, $imageContents);
            $data['image'] = '/storage/subcategories/' . $fileName;
        }

        $subcategory->update($data);


    }
}

<?php

namespace App\Services;

use App\Models\SubSubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SubSubcategoryService
{
    public function create(Request $request, $data)
    {

        $data['slug'] = array_key_exists('name', $data) ? Str::slug($data['name'], '_') : Str::slug('No name', '_');
        if ($request->file('image')) {

            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('image')->extension();

            $data['image'] = '/storage/subSubcategories/' . $fileName;
            $imageContents = $request->file('image')->getContent();
            Storage::disk('subSubcategories')->put($fileName, $imageContents);
        } else {
            $data['image'] = '/img/no_image.svg';
        }
//        dd($data);

        $subSubcategory = SubSubCategory::create($data);


        $subSubcategory->translateOrNew(app()->getLocale())->name = $data['name'];
        $subSubcategory->save();


        return $subSubcategory;
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

    public function update(array $data, SubSubCategory $subSubCategory)
    {

        if (app()->currentLocale() == 'ru') {
            $data['slug'] = $subSubCategory->slug;
        } else {
            $data['slug'] = Str::slug($data['name'], '_');
        }

        if ($data['image'] === null) {
            $data['image'] = $subSubCategory->image;
        } else {
            $fileName = $data['image']->hashName();
            $imageContents = $data['image']->getContent();
            Storage::disk('subSubcategories')->put($fileName, $imageContents);
            $data['image'] = '/storage/subSubcategories/' . $fileName;
        }

        $subSubCategory->update($data);

    }
}

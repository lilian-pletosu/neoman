<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryService
{
    public function create(Request $request, $data)
    {

        $data['slug'] = array_key_exists('name', $request->all()) ? Str::slug($request['name'], '_') : Str::slug('No name', '_');
//        if ($request->file('image')) {
//            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('image')->extension();
//            $data['image'] = '/storage/brands/' . $fileName;
//            $imageContents = $request->file('image')->getContent();
//            Storage::disk('brands')->put($fileName, $imageContents);
//        } else {
//            $data['image'] = '/img/no_image.svg';
//        }
        $category = Category::create($data);


//        foreach (config('translatable.locales') as $locale) {
//            $brand->translateOrNew($locale)->description = "{$data['description'] } $locale";
//            $brand->save();
//        }


        return $category;
    }

//    public function firstOrCreate(string $subCategoryName)
//    {
//        return Category::firstOrCreate(['slug' => Str::slug($subCategoryName, '_')], [
//            'name' => $subCategoryName
//        ])->id;
//
//    }

    public function update($data, Category $category, Request $request)
    {
        if (app()->currentLocale() == 'ro') {
            $data['slug'] = Str::slug($data['name'], '_');
        }
//        if (!$request->file('form.image')) {
//            $data['image'] = $category->image;
//        } else {
//            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('form.image')->extension();
//
//            $data['image'] = '/storage/categories/' . $fileName;
//            $imageContents = $request->file('form.image')->getContent();
//            Storage::disk('categories')->put($fileName, $imageContents);
//        }

        $category->update($data);
//
//        $locale = app()->currentLocale();
//        $product->translateOrNew($locale)->name = $data['name'];
//        $product->translateOrNew($locale)->description = $data['description'];
//        $product->save();

    }
}

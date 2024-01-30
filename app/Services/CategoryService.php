<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryService
{
    private $currentLocale;
    private $rereserveLanguage;

    public function __construct()
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ru' ? 'ro' : 'ru';
    }

    public function create(Request $request, $data)
    {

        $data['slug'] = array_key_exists('name ro', $request->all()) ? Str::slug($request["name ro"], '_') : Str::slug('No name', '_');

        $category = Category::create($data);

        foreach (config('translatable.locales') as $locale) {
            foreach ((new Category())->translatedAttributes as $translatedAttribute) {
                $category->translateOrNew($locale)->$translatedAttribute = $data["$translatedAttribute $locale"] ?? $data[$translatedAttribute];
                $category->save();
            }

        }


        return $category;
    }


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

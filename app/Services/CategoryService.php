<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryService
{
    private $currentLocale;
    private $rereserveLanguage;

    public $translatedAttributes;

    public function __construct()
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ru' ? 'ro' : 'ru';
        $this->translatedAttributes = (new Category())->translatedAttributes;
    }

    public function createParent(Request $request, $data)
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

    public function createChildren(Request $request, $data, $level)
    {
        if ($request->file('image')) {
            $data['slug'] = array_key_exists('name_ro', $data) ? Str::slug($data['name_ro'], '_') : Str::slug('No name', '_');

            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('image')->extension();

            $data['image'] = '/storage/categories/' . $fileName;
            $imageContents = $request->file('image')->getContent();
            Storage::disk('categories')->put($fileName, $imageContents);
        } else {
            $data['slug'] = array_key_exists('name ro', $data) ? Str::slug($data['name ro'], '_') : Str::slug('No name', '_');

            $data['image'] = '/img/no_image.svg';
        }

        $data['level'] = $level;


        $category = Category::create($data);

        if ($request->file('image')) {
            foreach ($this->translatedAttributes as $translatableAttribute) {
                foreach (config('translatable.locales') as $locale) {
                    $category->translateOrNew($locale)->$translatableAttribute = $data[$translatableAttribute . '_' . $locale];
                    $category->save();
                }
            }
        } else {
            foreach ($this->translatedAttributes as $translatableAttribute) {
                foreach (config('translatable.locales') as $locale) {
                    $category->translateOrNew($locale)->$translatableAttribute = $data["$translatableAttribute $locale"];
                    $category->save();
                }
            }
        }

        return $category;
    }


    public function updateParent($data, Category $category, Request $request)
    {

        $data['slug'] = Str::slug($data['name ro'], '_');
        $category->update([
            'slug' => $data['slug'],
            'icon' => $data['icon'],
            'is_active' => $data['is_active'],
            'order' => $data['order'],
        ]);
        foreach ($this->translatedAttributes as $translatableAttribute) {
            foreach (config('translatable.locales') as $locale) {
                $category->translateOrNew($locale)->$translatableAttribute = $data["$translatableAttribute $locale"];
            }
        }
        $category->save();
    }
    public function updateChildren($data, Category $category, Request $request)
    {

        // $data['slug'] = Str::slug($data['name ro'], '_');
        // $category->update([
        //     'slug' => $data['slug'],
        //     'icon' => $data['icon'],
        //     'is_active' => $data['is_active'],
        //     'order' => $data['order'],
        // ]);
        // foreach ($this->translatedAttributes as $translatableAttribute) {
        //     foreach (config('translatable.locales') as $locale) {
        //         $category->translateOrNew($locale)->$translatableAttribute = $data["$translatableAttribute $locale"];
        //     }
        // }
        // $category->save();

        $data['form']['slug'] = Str::slug($data['form']['name ro'], '_');
        if ($data['image'] === null) {
            $data['form']['image'] = $category->image;
        } else {
            if (is_array($data['image'])) {
                $fileName = $data['image']['_value']->hashName();
                $imageContents = $data['image']['_value']->getContent();
                Storage::disk('categories')->put($fileName, $imageContents);
                $data['form']['image'] = '/storage/categories/' . $fileName;
            } else {
                $fileName = $data['image']->hashName();
                $imageContents = $data['image']->getContent();
                Storage::disk('categories')->put($fileName, $imageContents);
                $data['form']['image'] = '/storage/categories/' . $fileName;
            }
        }
        $category->update($data['form']);

        foreach ($this->translatedAttributes as $translatableAttribute) {
            foreach (config('translatable.locales') as $locale) {
                $category->translateOrNew($locale)->$translatableAttribute = $data['form']["$translatableAttribute $locale"];
            }
        }
        $category->save();
    }
}

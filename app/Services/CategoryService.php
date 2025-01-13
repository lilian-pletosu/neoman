<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
}

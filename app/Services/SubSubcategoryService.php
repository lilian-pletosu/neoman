<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubSubcategoryService
{

    private array $translatedAttributes;

    public function __construct()
    {
        $this->translatedAttributes = (new Category())->translatedAttributes;
    }


    public function create(Request $request, $data)
    {

        if ($request->hasFile('image')) {
            $data['slug'] = array_key_exists('name_ro', $data) ? Str::slug($data['name_ro'], '_') : Str::slug('No name', '_');

            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('image')->extension();

            $data['image'] = '/storage/categories/' . $fileName;
            $imageContents = $request->file('image')->getContent();
            Storage::disk('categories')->put($fileName, $imageContents);
        } else {
            $data['slug'] = array_key_exists('name ro', $data) ? Str::slug($data['name ro'], '_') : Str::slug('No name', '_');

            $data['image'] = '/img/no_image.svg';
        }

        $subSubcategory = Category::create($data);


        if ($request->hasFile('image')) {
            foreach ($this->translatedAttributes as $translatableAttribute) {
                foreach (config('translatable.locales') as $locale) {
                    $subSubcategory->translateOrNew($locale)->$translatableAttribute = $data[$translatableAttribute . '_' . $locale];
                    $subSubcategory->save();
                }
            }
        } else {
            foreach ($this->translatedAttributes as $translatableAttribute) {
                foreach (config('translatable.locales') as $locale) {
                    $subSubcategory->translateOrNew($locale)->$translatableAttribute = $data["$translatableAttribute $locale"];
                    $subSubcategory->save();
                }
            }
        }
        return $subSubcategory;
    }

    public function createWithProduct($data)
    {
        $data['image'] = '/img/no_image.svg';

        $subSubcategory = Category::firstOrCreate(['slug' => Str::slug($data['sub_subcategory'], '_')], [
            'slug' => Str::slug($data['sub_subcategory'], '_'),
            'image' => $data['image'],
            'level' => 3,
        ]);

        foreach (config('app.available_locales') as $locale) {
            foreach ($this->translatedAttributes as $translatedAttribute) {
                $subSubcategory->translateOrNew($locale)->$translatedAttribute = $data['sub_subcategory'];
            }
        }
        $subSubcategory->save();
        return $subSubcategory;
    }

    public function update(array $data, Category $subSubCategory)
    {
        $data['form']['slug'] = Str::slug($data['form']['name ro'], '_');

        if ($data['image'] === null) {
            $data['form']['image'] = $subSubCategory->image;
        } else {
            if (is_array($data['image'])) {
                $fileName = $data['image']['_value']->hashName();
                $imageContents = $data['image']['_value']->getContent();
            } else {
                $fileName = $data['image']->hashName();
                $imageContents = $data['image']->getContent();
            }
            Storage::disk('subSubcategories')->put($fileName, $imageContents);
            $data['form']['image'] = '/storage/subSubcategories/' . $fileName;
        }

        $subSubCategory->update($data['form']);
        foreach ($this->translatedAttributes as $translatableAttribute) {
            foreach (config('translatable.locales') as $locale) {
                $subSubCategory->translateOrNew($locale)->$translatableAttribute = $data['form']["$translatableAttribute $locale"];
            }
        }
        $subSubCategory->save();
    }
}

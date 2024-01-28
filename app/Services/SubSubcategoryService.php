<?php

namespace App\Services;

use App\Models\SubSubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SubSubcategoryService
{

    private array $translatedAttributes;

    public function __construct()
    {
        $this->translatedAttributes = (new SubSubCategory())->translatedAttributes;
    }


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

    public function createWithProduct($data)
    {
        $data['image'] = '/img/no_image.svg';
        $subSubcategory = SubSubCategory::firstOrCreate(['slug' => Str::slug($data['sub_subcategory'], '_')], [
            'slug' => Str::slug($data['sub_subcategory'], '_'),
            'image' => $data['image']
        ]);
        foreach (config('app.available_locales') as $locale) {
            foreach ($this->translatedAttributes as $translatedAttribute) {
                $xlsxKey = $translatedAttribute . ' ' . $locale;
                if (isset($data[$xlsxKey])) {
                    $subSubcategory->translateOrNew($locale)->$translatedAttribute = $data[$xlsxKey];
                } else {
                    $subSubcategory->translateOrNew($locale)->$translatedAttribute = $data['sub_subcategory'];
                }
            }
        }
        return $subSubcategory;
    }

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

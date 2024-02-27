<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BrandService
{

    public $request;
    private array $translatedAttributes;

    public function __construct(Request $request = null)
    {
        $this->request = $request;
        $this->translatedAttributes = (new Brand())->translatedAttributes;
    }

    public function create($data, bool $useSaveImage = true)
    {

        $data['slug'] = array_key_exists('name', $data) ? Str::slug($data['name'], '_') : Str::slug('No name', '_');
        if ($useSaveImage) {
            $data['image'] = $this->saveImage($this->request, $data);
        }

        $brand = Brand::firstOrCreate(['slug' => $data['slug']], [
            'name' => $data['name'],
            'website' => $data['website'],
            'seo_title' => $data['name'],
            'seo_description' => $data['name'] . ' ' . 'description',
            'is_enabled' => $data['is_enabled'] ?? 1,
            'image' => $data['image']
        ]);


        foreach (config('app.available_locales') as $locale) {
            foreach ($this->translatedAttributes as $translatedAttribute) {
                array_key_exists("$translatedAttribute $locale", $data) ?
                    $xlsxKey = $translatedAttribute . ' ' . $locale : $xlsxKey = $translatedAttribute . '_' . $locale;
                if (isset($data[$xlsxKey])) {
                    $brand->translateOrNew($locale)->$translatedAttribute = $data[$xlsxKey];
                }
            }
        }
        $brand->save();


        return $brand;
    }

    public function saveImage(Request $request, $data)
    {
        if ($request->file('image')) {
            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('image')->extension();
            $data['image'] = '/storage/brands/' . $fileName;
            $imageContents = $request->file('image')->getContent();
            Storage::disk('brands')->put($fileName, $imageContents);
            return $data['image'];
        } else {
            $data['image'] = '/img/no_image.svg';
            return $data['image'];
        }
    }

    public function createWithProduct($data)
    {
        $brand = Brand::firstOrCreate(['slug' => Str::slug($data['brand'], '_')], [
            'name' => $data['brand'],
            'website' => $data['site'] ?? Str::lower('www' . '.' . $data['brand'] . '.' . 'com',),
            'seo_title' => $data['brand'],
            'seo_description' => $data['brand'],
            'is_enabled' => 1,
            'image' => $data['image'] = '/img/no_image.svg'
        ]);


        foreach (config('app.available_locales') as $locale) {
            $data["description $locale"] = $data['brand'];
            foreach ($this->translatedAttributes as $translatedAttribute) {
                $xlsxKey = $translatedAttribute . ' ' . $locale;
                if (isset($data[$xlsxKey])) {
                    $brand->translateOrNew($locale)->$translatedAttribute = $data[$xlsxKey];
                }
            }
        }
        $brand->save();

        return $brand;
    }

    public function update(array $data, Brand $brand)
    {


        if ($data['image'] === null) {
            $data['image'] = $brand->image;
        } else {
            if (is_array($data['image'])) {
                $fileName = $data['image']['_value']->hashName();
                $imageContents = $data['image']['_value']->getContent();
                Storage::disk('brands')->put($fileName, $imageContents);
                $data['image'] = '/storage/brands/' . $fileName;
            } else {
                $fileName = $data['image']->hashName();
                $imageContents = $data['image']->getContent();
                Storage::disk('brands')->put($fileName, $imageContents);
                $data['image'] = '/storage/brands/' . $fileName;
            }

        }
        $data['form']['slug'] = Str::slug($data['form']['name'], '_');
        $brand->update([
            'name' => $data['form']['name'],
            'slug' => Str::slug($data['form']['name'], '_'),
            'website' => Str::lower('www' . '.' . $data['form']['name'] . '.' . 'com',),
            'seo_title' => $data['form']['name'],
            'seo_description' => $data['form']['description ro'],
            'is_enabled' => $data['form']['is_enabled'],
            'image' => $data['image']
        ]);
//
        foreach ($this->translatedAttributes as $translatableAttribute) {
            foreach (config('translatable.locales') as $locale) {
                $brand->translateOrNew($locale)->$translatableAttribute = $data['form']["$translatableAttribute $locale"];

            }
        }
        $brand->save();
    }
}

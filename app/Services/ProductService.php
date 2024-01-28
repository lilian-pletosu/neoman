<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductService
{
    public function create(Request $request, $data)
    {
        $data['slug'] = array_key_exists('title', $data) ? Str::slug($data['title'], '_') : Str::slug('No name', '_');
        if ($request->file('image')) {
            $data['image'] = '/products/' . $request->file('image')->hashName();
            $request->image->move(public_path('products'), $request->file('image')->hashName());
        } else {
            $data['image'] = '/img/no_image.svg';
        }
        try {
            $product = Product::firstOrCreate(['name' => $data['name']], [
                'slug' => $data['slug'],
                'description' => $data['description'],
                'price' => $data['price'],
                'brand_id' => $data['brand_id'],
                'sub_sub_category_id' => $data['sub_sub_category_id'],
                'product_code' => (new GenerateProductCode)((new Product())),
                'specifications_id' => null,
                'image' => 'image'
            ]);
            return $product;
        } catch (\Exception $exception) {
            dd($exception);
        }


    }

    public function update($data, Product $product, Request $request)
    {
        if (app()->currentLocale() == 'ru') {
            $data['slug'] = $product->slug;
        } else {
            $data['slug'] = Str::slug($data['name'], '_');
        }
        if (!$request->file('form.image')) {
            $data['image'] = $product->image;
        } else {
            $fileName = $data['slug'] . now()->toDateString() . '.' . $request->file('form.image')->extension();

            $data['image'] = '/storage/products/' . $fileName;
            $imageContents = $request->file('form.image')->getContent();
            Storage::disk('products')->put($fileName, $imageContents);
        }

        $product->attributes()->syncWithoutDetaching([21 => ['value' => '1 Tb']]);
        $product->attributes()->syncWithoutDetaching([19 => ['value' => '16 inch']]);


        $product->update($data);
//
//        $locale = app()->currentLocale();
//        $product->translateOrNew($locale)->name = $data['name'];
//        $product->translateOrNew($locale)->description = $data['description'];
//        $product->save();

    }
}

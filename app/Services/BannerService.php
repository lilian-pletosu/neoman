<?php

namespace App\Services;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class BannerService
{
    public function createBanner(Request $request)
    {
        $data['image'] = $this->saveImage($request);

        $banner = Banner::create([
            'image' => $data['image'],
            'link' => $request->link,
            'title' => $request->title,
            'is_active' => $request->is_active,
            'page' => $request->page
        ]);
        return $banner;
    }

    public function updateBanner(Request $request, Banner $banner)
    {
        if ($request->hasFile('image')) {
            $imagePath = str_replace('/storage', 'public', $banner->image);
            Storage::delete($imagePath);
            $data['image'] = $this->saveImage($request);
        } else $data['image'] = $banner->image;

        $banner->update([
            'image' => $data['image'],
            'link' => $request->form['link'],
            'title' => $request->form['title'],
            'is_active' => $request->form['is_active'],
            'page' => $request->form['page']
        ]);
        $banner->save();
    }

    public function saveImage(Request $request)
    {
        if ($request->file('image')) {
            $fileName = $request->file('image')->getFilename() . "." . $request->file('image')->extension();
            $data['image'] = '/storage/banners/' . $fileName;
            $imageContents = $request->file('image')->getContent();
            Storage::disk('banners')->put($fileName, $imageContents);
            return $data['image'];
        } else {
            $data['image'] = '/img/no_image.svg';
            return $data['image'];
        }
    }

    public function getHomeBanners()
    {
        return Banner::active()->page('home')->get();
    }

}

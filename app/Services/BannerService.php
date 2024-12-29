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

        Banner::create([
            'image' => $data['image'],
            'link' => $request->link,
            'title' => $request->title,
            'is_active' => $request->is_active,
            'page' => $request->page
        ]);
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
        if (is_array($request->file('image'))) {
            $fileName = $request->file('image')['_value']->getFilename() . "." . $request->file('image')['_value']->extension();
            $data['image'] = '/storage/banners/' . $fileName;
            $imageContents = $request->file('image')['_value']->getContent();
            Storage::disk('banners')->put($fileName, $imageContents);
            return $data['image'];
        }

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
        // get all banner for home page where title contains 'banner' string
        return Banner::active()->page('home')->where('title', 'LIKE', '%banner%')->get();
    }

    public function getCallActionBanner()
    {
        // get all banner for home page where title contains 'call to action' string
        return Banner::active()->page('home')->where('title', 'LIKE', '%action%')->first();
    }
}

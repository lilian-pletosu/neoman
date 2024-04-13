<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Services\BannerService;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public DataTableService $dataTableService;

    public function __construct(DataTableService $dataTableService)
    {
        $this->dataTableService = $dataTableService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $builder = $this->dataTableService
            ->setResource('Banner')
            ->setResourceColumns(['id', 'title', 'image', 'is_active', 'page'])
            ->paginate(10)
            ->sortBy('created_at', 'desc')
            ->setResourceRoute('admin.banners')
            ->setSearchRoute('admin.banners');

        return inertia('Admin/Banners', ['resourceType' => 'banners'])->loadData($builder);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return (new SchemaFormBuilder)('Banner', 'post', 'admin.banners.store');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|min:3|String',
            'link' => 'required',
            'is_active' => 'required',
            'page' => 'required',
            'image' => 'nullable|file|image|mimes:jpg,bmp,png,svg'
        ]);

        return (new BannerService)->createBanner($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return (new SchemaFormBuilder)('Banner', 'put', 'admin.banners.update', $id, null, true);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner)
    {
        if ($request->hasFile('image')) {
            $request->validate([
                'form.title' => 'required|min:3',
                'form.link' => 'required',
                'form.is_active' => 'required',
                'form.page' => 'required',
                'image._value' => 'nullable|image'
            ]);
        } else {
            $request->validate([
                'form.title' => 'required|min:3',
                'form.link' => 'required',
                'form.is_active' => 'required',
                'form.page' => 'required',
            ]);
        }
        (new BannerService)->updateBanner($request, $banner);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        $imagePath = str_replace('/storage', 'public', $banner->image);
        Storage::delete($imagePath);
        $banner->delete();

    }
}

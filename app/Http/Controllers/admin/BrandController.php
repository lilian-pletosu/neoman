<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Services\BrandService;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    private DataTableService $dataTableService;
    private string $route = 'admin.brands.index';


    public function __construct(DataTableService $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }

    public function index()
    {
        $builder = $this->dataTableService
            ->setResource('Brand')
            ->setResourceColumns(['id', 'image', 'name', 'description', 'website', 'is_enabled'])
            ->editInModal(true)
            ->paginate(10)
            ->setResourceRoute('admin.brands')
            ->setSearchRoute('admin.brands')
            ->sortBy('id');

        return inertia('Admin/Brands', ['resourceType' => 'brand'])->loadData($builder);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->hasFile('image')) {

            $data = $request->validate([
                'name' => 'required|min:3|String',
                "description_ro" => 'nullable|min:5|max:800|String',
                "description_ru" => 'nullable|min:5|max:800|String',
                'website' => 'nullable',
                'is_enabled' => 'required',
                'image' => 'nullable|file|image|mimes:jpg,bmp,png,svg']);
        } else {
            $data = $request->validate([
                'name' => 'required|min:3|String',
                'description ro' => 'required|min:5|max:800|String',
                'description ru' => 'required|min:5|max:800|String',
                'website' => 'required',
                'is_enabled' => 'required',
                'image' => 'nullable|file|image|mimes:jpg,bmp,png,svg']);
        }

        (new BrandService($request))->create($data, true);
        Cache::forget('brands');
        Cache::remember('brands', 10000, function () {
            return Brand::active()->orderBy('name')->get();
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): array
    {
        return (new SchemaFormBuilder)('Brand', 'post', 'admin.brands.store');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return $brand;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): array
    {
        return (new SchemaFormBuilder)("Brand", 'put', 'admin.brands.update', $id, null, true);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        if ($request->hasFile('image')) {
            $data = $request->validate([
                'form.name' => 'required|min:3',
                'form.description ro' => 'nullable|min:3',
                'form.description ru' => 'nullable|min:3',
                'form.website' => 'nullable',
                'form.is_enabled' => 'required',
                'image._value' => 'nullable|image'
            ]);
            $data['image'] = $request->file('image');
        } else {
            $data = $request->validate([
                'form.name' => 'required|min:3',
                'form.description ro' => 'nullable|min:3',
                'form.description ru' => 'nullable|min:3',
                'form.website' => 'nullable',
                'form.is_enabled' => 'required',
            ]);
            $data['image'] = null;

        }
        (new BrandService())->update($data, $brand);
        Cache::forget('brands');
        Cache::remember('brands', 10000, function () {
            return Brand::active()->orderBy('name')->get();
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $imagePath = str_replace('/storage', 'public', $brand->image);
        Storage::delete($imagePath);
        $brand->delete();
        Cache::forget('brands');
        Cache::remember('brands', 10000, function () {
            return Brand::active()->orderBy('name')->get();
        });
    }
}

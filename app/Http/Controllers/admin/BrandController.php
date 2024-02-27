<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BrandStoreRequest;
use App\Models\Brand;
use App\Services\BrandService;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    private DataTableService $dataTableService;


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
     * Show the form for creating a new resource.
     */
    public function create(): array
    {
        return (new SchemaFormBuilder)('Brand', 'post', 'admin.brands.store');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, BrandStoreRequest $brandRequest)
    {
        (new BrandService($request))->create($brandRequest->all(), true);
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
                'form.description ro' => 'required|min:3',
                'form.description ru' => 'required|min:3',
                'form.website' => 'required',
                'form.is_enabled' => 'required',
                'image._value' => 'nullable|image'
            ]);
            $data['image'] = $request->file('image');
        } else {
            $data = $request->validate([
                'form.name' => 'required|min:3',
                'form.description ro' => 'required|min:3',
                'form.description ru' => 'required|min:3',
                'form.website' => 'required',
                'form.is_enabled' => 'required',
            ]);
            $data['image'] = null;

        }
        return (new BrandService())->update($data, $brand);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $imagePath = str_replace('/storage', 'public', $brand->image);
        Storage::delete($imagePath);
        $brand->delete();
    }
}

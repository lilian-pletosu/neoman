<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubSubCategoryStoreRequest;
use App\Models\SubSubCategory;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use App\Services\SubSubcategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubSubcategoryController extends Controller
{


    private DataTableService $dataTableService;

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
            ->setResource('SubSubCategory')
            ->setResourceColumns(['id', 'name', 'slug', 'image'])
            ->setColumnsOrder(['id', 'name', 'slug', 'image'])
            ->setRelationColumn('subcategory', 'subcategory', ['name'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.categories.subSubcategories')
            ->setResourceRoute('admin.categories.subSubcategories')
            ->sortBy('id');

        return inertia('Admin/SubSubcategories', [
            'initialRoute' => 'admin.categories.subSubcategories',
            'resourceType' => 'subSubcategories'
        ])->loadData($builder);
    }

    public function create()
    {
        return (new SchemaFormBuilder)('SubSubCategory', 'post', 'admin.categories.subSubcategories.store');

    }


    public function store(Request $request, SubSubCategoryStoreRequest $storeRequest)
    {
        (new SubSubcategoryService())->create($request, $storeRequest->all());
    }

    public function show(string $id)
    {
        $subSubCategory = SubSubCategory::findOrfail($id);
        return $subSubCategory->loadAggregate(['subcategory'], 'name');
    }

    public function edit(string $id): array
    {
        return (new SchemaFormBuilder)('SubSubCategory', 'put', 'admin.categories.subSubcategories.update', $id);
    }

    public function update(Request $request, string $id)
    {
        $subSubCategory = SubSubcategory::find($id);
        (new SubSubcategoryService())->update($request->form, $subSubCategory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subSubcategory = SubSubCategory::find($id);

        // Ștergem imaginea asociată
        $imagePath = str_replace('/storage', 'public', $subSubcategory->image);
        Storage::delete($imagePath);


        // Ștergem subcategoria
        $subSubcategory->delete();

    }
}

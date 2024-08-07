<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\SubCategory;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use App\Services\SubcategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubcategoryController extends Controller
{


    private DataTableService $dataTableService;

    private string $route = 'admin.categories.subcategories.index';

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
            ->setResource('SubCategory')
            ->setResourceColumns(['id', 'name', 'slug', 'image', 'is_active'])
            ->setColumnsOrder(['id', 'name', 'slug', 'image'])
            ->setRelationColumn('category', 'category', ['name'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.categories.subcategories')
            ->setResourceRoute('admin.categories.subcategories')
            ->sortBy('id');

        return inertia('Admin/Subcategories', [
            'initialRoute' => 'admin.categories.subcategories',
            'resourceType' => 'subcategory'
        ])->loadData($builder);
    }

    public function create()
    {
        return (new SchemaFormBuilder)('SubCategory', 'post', 'admin.categories.subcategories.store');

    }


    public function store(Request $request)
    {
        if ($request->hasFile('image')) {
            $data = $request->validate([
                'name_ro' => 'required|min:3',
                'name_ru' => 'required|min:3',
                'category_id' => 'required',
                'image' => 'nullable|image|mimes:jpg,bmp,png,svg',
                'is_active' => 'required|boolean',
            ]);
        } else {
            $data = $request->validate([
                'name ro' => 'required|min:3',
                'name ru' => 'required|min:3',
                'category_id' => 'required',
                'image' => 'nullable|image|mimes:jpg,bmp,png,svg',
                'is_active' => 'required|boolean',
            ]);
        }

        (new SubcategoryService())->create($request, $data);
        return to_route($this->route);

    }

    public function show(SubCategory $subCategory)
    {
        return $subCategory->translations;

    }

    public function edit(string $id): array
    {
        return (new SchemaFormBuilder)('SubCategory', 'put', 'admin.categories.subcategories.update', $id, null, true);
    }

    public function update(Request $request, string $id)
    {

        if ($request->hasFile('image')) {
            $data = $request->validate([
                'form.name ro' => 'required|min:3',
                'form.name ru' => 'required|min:3',
                'form.category_id' => 'required',
                'image._value' => 'nullable|image',
                'form.is_active' => 'required|boolean'
            ]);
            $data['image'] = $request->file('image');
        } else {
            $data = $request->validate([
                'form.name ro' => 'required|min:3',
                'form.name ru' => 'required|min:3',
                'form.category_id' => 'required',
//                'image._value' => 'nullable|image',
                'form.is_active' => 'required|boolean'
            ]);
            $data['image'] = null;
        }
        $subCategory = SubCategory::find($id);
        (new SubcategoryService())->update($data, $subCategory);
        return to_route($this->route);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subcategory = SubCategory::find($id);

        // Ștergem imaginea asociată
        $imagePath = str_replace('/storage', 'public', $subcategory->image);
        Storage::delete($imagePath);


        // Ștergem subcategoria
        $subcategory->delete();

        return to_route($this->route);


    }
}

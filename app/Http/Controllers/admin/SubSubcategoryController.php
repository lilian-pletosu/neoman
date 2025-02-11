<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubSubCategory;
use App\Services\CategoryService;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use App\Services\SubSubcategoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubSubcategoryController extends Controller
{


    private DataTableService $dataTableService;

    private string $route = 'admin.categories.subSubcategories.index';

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
            ->setResource('Category')
            ->setResourceColumns(['id', 'name', 'slug', 'image', 'is_active'])
            ->setRelationColumn('parent', 'subcategory', ['name'])
            ->setColumnsOrder(['id', 'name'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.categories.subSubcategories')
            ->setResourceRoute('admin.categories.subSubcategories')
            ->sortBy('is_active', 'desc')
            ->where(['level', '=', 3]);

        return inertia('Admin/SubSubcategories', [
            'initialRoute' => 'admin.categories.subSubcategories',
            'resourceType' => 'subSubcategories'
        ])->loadData($builder);
    }

    public function create()
    {
        return (new SchemaFormBuilder)('SubSubCategory', 'post', 'admin.categories.subSubcategories.store');
    }


    public function store(Request $request)
    {

        if ($request->hasFile('image')) {
            $data = $request->validate([
                'name_ro' => 'required|min:3|String',
                'name_ru' => 'required|min:3|String',
                'parent_id' => 'required',
                'image' => 'nullable|file|image|mimes:jpg,bmp,png,svg',
                'is_active' => 'required|boolean'
            ]);
        } else {
            $data = $request->validate([
                'name ro' => 'required|min:3|String',
                'name ru' => 'required|min:3|String',
                'parent_id' => 'required',
                'image' => 'nullable|file|image|mimes:jpg,bmp,png,svg',
                'is_active' => 'required|boolean'
            ]);
        }
        (new CategoryService())->createChildren($request, $data, 3);
        return to_route($this->route);
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id): array
    {
        return (new SchemaFormBuilder)('Category', 'put', 'admin.categories.subSubcategories.update', $id, null, true, 'SubSubCategory');
    }

    public function update(Request $request, string $id)
    {
        if ($request->hasFile('image')) {
            $data = $request->validate([
                'form.name ro' => 'required|min:3',
                'form.name ru' => 'required|min:3',
                'form.parent_id' => 'required',
                'image._value' => 'nullable|image',
                'form.is_active' => 'required|boolean'
            ]);
            $data['image'] = $request->file('image');
        } else {
            $data = $request->validate([
                'form.name ro' => 'required|min:3',
                'form.name ru' => 'required|min:3',
                'form.parent_id' => 'required',
                'form.is_active' => 'required|boolean'
            ]);
            $data['image'] = null;
        }
        $category = Category::find($id);
        (new CategoryService())->updateChildren($data, $category, $request);
        return to_route($this->route);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);

        // Ștergem imaginea asociată
        $imagePath = str_replace('/storage', 'public', $category->image);
        Storage::delete($imagePath);


        // Ștergem subcategoria
        $category->delete();

        return to_route($this->route);
    }
}

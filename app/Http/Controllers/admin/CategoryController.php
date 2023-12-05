<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
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
            ->setResource('Category')
            ->setResourceColumns(['id', 'name', 'slug'])
            ->setColumnsOrder(['id', 'name'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.categories')
            ->setResourceRoute('admin.categories')
            ->sortBy('id');

        return inertia('Admin/Categories', [
            'initialRoute' => 'admin.categories',
            'resourceType' => 'category'
        ])->loadData($builder);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return (new SchemaFormBuilder)('Category', 'post', 'admin.category.store');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);
        $data['slug'] = Str::of($data['name'])->slug('_');;
        Category::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return $category;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return (new SchemaFormBuilder)('Category', 'put', 'admin.categories.update', $category->id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
    }
}

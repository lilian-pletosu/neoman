<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Services\DataTableService;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\SubSubCategory;

class PromotionController extends Controller
{

    private DataTableService $dataTableService;
    private string $route = 'admin.promotions.index';


    public function __construct(DataTableService $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Inertia::share('brands', Brand::orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());
        Inertia::share('categories', Category::orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());
        Inertia::share('subcategories', SubCategory::orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());
        Inertia::share('sub_subcategories', SubSubCategory::orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());

        $this->dataTableService
            ->setResource('Promotion')
            ->setResourceColumns(['id', 'name', 'description', 'start_date', 'end_date', 'discount', 'status'])
            ->setRelationColumn('brands', 'brand', ['name'])
            ->setRelationColumn('sub_subcategories', 'sub_subcategory', ['name'])
            ->setRelationColumn('categories', 'category', ['name'])
            ->setRelationColumn('subcategories', 'subcategory', ['name'])
            ->paginate(10)
            ->sortBy('created_at', 'desc')
            ->setSearchRoute('admin.promotions');


        return inertia('Admin/Promotions', [
            'initialRoute' => 'admin.promotions',
            'resourceType' => 'promotion',
        ])->loadData($this->dataTableService);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // 1. Validează datele
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'discount' => 'required|numeric|min:0|max:100',
            'status' => 'required|boolean',
            'brand' => 'nullable',
            'sub_subcategory' => 'nullable',
            'category' => 'nullable',
            'subcategory' => 'nullable',
        ]);

        // 2. Creează o nouă instanță de Promotion
        $promotion = new Promotion($validatedData);

        // 3. Salvează instanța în baza de date
        $promotion->save();


        if (isset($validatedData['brand'])) {
            $promotion->brands()->attach($validatedData['brand']);
        }
        if (isset($validatedData['subcategory'])) {
            $promotion->subcategories()->attach($validatedData['subcategory']);
        }
        if (isset($validatedData['category'])) {
            $promotion->categories()->attach($validatedData['category']);
        }
        if (isset($validatedData['sub_subcategory'])) {
            $promotion->sub_subcategories()->attach($validatedData['sub_subcategories']);
        }

        // 5. Redirecționează utilizatorul înapoi la pagina de listă a promoțiilor cu un mesaj de succes
        return redirect()->route('admin.promotions.index')->with('success', 'Promoția a fost creată cu succes.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(request $request, Promotion $promotion) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Promotion $promotion)
    {
        // 1. Validează datele
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'discount' => 'required|numeric|min:0|max:100',
            'status' => 'required|boolean',
            'brand' => 'nullable',
            'sub_subcategory' => 'nullable',
            'category' => 'nullable',
            'subcategory' => 'nullable',
        ]);

        $validatedData['status'] = $validatedData['status'] == 1 ? 'active' : 'inactive';


        // 2. Actualizează instanța de Promotion cu datele validate
        $promotion->update($validatedData);
        if (isset($validatedData['brand'])) {
            $promotion->brands()->sync($validatedData['brand']);
        }
        if (isset($validatedData['subcategory'])) {
            $promotion->subcategories()->sync($validatedData['subcategory']);
        }
        if (isset($validatedData['category'])) {
            $promotion->categories()->sync($validatedData['category']);
        }
        if (isset($validatedData['sub_subcategory'])) {
            $promotion->sub_subcategories()->sync($validatedData['sub_subcategory']);
        }

        $validatedData['status'] = $request->input('status') == 1 ? Promotion::STATUS_ACTIVE : Promotion::STATUS_INACTIVE;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        // Delete the promotion and its relationships
        $promotion->brands()->detach();
        $promotion->sub_subcategories()->detach();
        $promotion->subcategories()->detach();
        $promotion->categories()->detach();
        $promotion->products()->detach();

        $promotion->delete();
    }
}

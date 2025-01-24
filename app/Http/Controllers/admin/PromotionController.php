<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Promotion;
use Illuminate\Http\Request;
use App\Services\DataTableService;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Artisan;

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
        Inertia::share('brands', Brand::orderBy('name')->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());
        Inertia::share('categories', Category::where('level', 1)->orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());
        Inertia::share('subcategories', Category::where('level', 2)->orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());
        Inertia::share('sub_subcategories', Category::where('level', 3)->orderBy('name')->active()->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name, 'name' => $f->name])->toArray());

        $this->dataTableService
            ->setResource('Promotion')
            ->setResourceColumns(['id', 'name', 'description', 'start_date', 'end_date', 'discount', 'status'])
            ->setRelationColumn('brands', 'brand', ['name'])
            ->setRelationColumn('categories', 'category', ['name', 'level'])
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
        // dd($request->all());
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

        // dd($validatedData);

        // 2. Creează o nouă instanță de Promotion
        $promotion = new Promotion($validatedData);

        // 3. Salvează instanța în baza de date
        $promotion->save();


        if (isset($validatedData['brand'])) {
            $promotion->brands()->attach($validatedData['brand']);
        }

        $categoryIds = [];
        if (!empty($validatedData['category'])) {
            $categoryIds[] = $validatedData['category'];
        }
        if (!empty($validatedData['subcategory'])) {
            $categoryIds[] = $validatedData['subcategory'];
        }
        if (!empty($validatedData['sub_subcategory'])) {
            $categoryIds[] = $validatedData['sub_subcategory'];
        }

        if (!empty($categoryIds)) {
            $promotion->categories()->attach($categoryIds);
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


        $promotion->update($validatedData);

        // Handle brands sync
        $promotion->brands()->sync($validatedData['brand'] ?? []);

        // Handle categories sync
        $categoryIds = array_filter([
            $validatedData['category'] ?? null,
            $validatedData['subcategory'] ?? null,
            $validatedData['sub_subcategory'] ?? null
        ]);

        $promotion->categories()->sync($categoryIds);

        $validatedData['status'] = $request->input('status') == 1 ? Promotion::STATUS_ACTIVE : Promotion::STATUS_INACTIVE;

        Artisan::call('cache:clear');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        // Delete the promotion and its relationships
        $promotion->brands()->detach();
        $promotion->categories()->detach();
        $promotion->products()->detach();

        $promotion->delete();
        Artisan::call('cache:clear');
    }
}

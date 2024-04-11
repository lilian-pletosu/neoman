<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use App\Services\DataTableService;
use Illuminate\Http\Request;

class PromotionController extends Controller
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
        $this->dataTableService
            ->setResource('Promotion')
            ->setResourceColumns(['id', 'name', 'description', 'start_date', 'end_date', 'discount', 'status'])
            ->paginate(10)
            ->sortBy('created_at', 'desc')
            ->setSearchRoute('admin.promotions');


        return inertia('Admin/Promotions')->loadData($this->dataTableService);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

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
            $promotion->brands()->attach($validatedData['subcategory']);
        }
        if (isset($validatedData['category'])) {
            $promotion->brands()->attach($validatedData['category']);
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
    public function edit(Promotion $promotion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Promotion $promotion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        //
    }
}

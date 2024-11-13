<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Credit;
use App\Models\Product;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // I should group the credits by type
        $resources = Credit::with('products')->get()->groupBy('type');
        return inertia('Admin/Settings', ['resources' => $resources]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'nullable',
            'num_of_installments' => 'required',
            'interest_rate' => 'required',
            'type' => 'required',
            'products' => 'nullable|array',
        ]);
        $data['name'] = $request->type;

        $credit = Credit::create($data);

        // Extrage ID-urile produselor și sincronizează
        if (!empty($data['products'])) {
            $productIds = collect($data['products'])->pluck('id')->toArray();
            $credit->products()->sync($productIds);
        }
        return redirect()->back()->with('toast', 'Credit adăugat cu succes');
    }

    /**
     * Display the specified resource.
     */
    public function show(Credit $credit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Credit $credit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Credit $setting)
    {
        if ($request->form['type'] == 'credit') $data = $request->validate([
            'form.name' => 'nullable',
            'form.num_of_installments' => 'required',
            'form.interest_rate' => 'required',
            'form.type' => 'required',
        ]);
        $data['form']['name'] = $request->form['type'];
        $setting->update($data['form']);

        return redirect()->back()->with('toast', 'Credit actualizat cu succes');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Credit $setting)
    {
        $setting->delete();
        return redirect()->back()->with('toast', 'Credit șters cu succes');
    }

    public function fetchProducts()
    {
        return Product::select('name', 'id')->get();
    }
}

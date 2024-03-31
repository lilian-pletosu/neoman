<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\DataTableBuilder;
use App\Services\DataTableService;
use Illuminate\Http\Request;

class OrderController extends Controller
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
            ->setResource('Order')
            ->setResourceColumns(['order_number', 'first_name', 'last_name', 'products', 'total_price', 'status', 'created_at'])
            ->paginate(10)
            ->sortBy('created_at', 'desc')
            ->setSearchRoute('admin.orders');

        return inertia('Admin/Orders', [
            'initialRoute' => 'admin.orders',
            'resourceType' => 'orders'
        ])->loadData($builder);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

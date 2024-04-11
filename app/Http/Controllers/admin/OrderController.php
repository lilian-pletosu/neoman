<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AttributeValue;
use App\Models\Order;
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
            ->setResourceColumns(['id', 'order_number', 'full_name', 'total_price', 'status', 'created_at'])
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
    public function show($id)
    {
        $order = Order::findOrFail($id);
        $products = $order->products;

        foreach ($products as $key => $product) {
            if (AttributeValue::find($product['color_value'])) {
                $product['color_value'] = AttributeValue::find($product['color_value'])->translate()->value;
                $products[$key] = $product;
            } else {
                $product['color_value'] = null;
                $products[$key] = $product;
            }

        }

        $order->products = $products;


        return $order;

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
        if ($request->type == 'deleteProduct') {
            $order = Order::findOrFail($id);
            $products = $order->products;
            $index = null;
            foreach ($products as $key => $product) {
                if ($product['id'] == $request->product_id) {
                    $index = $key;
                    $order['total_price'] -= $product['total_price'];
                    break;
                }
            }
            if ($index !== null) {
                unset($products[$index]);
            }

            $order->products = array_values($products);
            $order->save();

            if (empty($order->products)) {
                $this->destroy($id);
            }
        }
        if ($request->type == 'updateStatus') {
            $order = Order::findOrFail($id);
            $newStatus = $request->status;
            $order->status = $newStatus;
            $order->save();
        }
        if ($request->type == 'updateDeliveryPrice') {
            $order = Order::findOrFail($id);
            $new_delivery_price = $request->delivery_price;
            $order->delivery_price = $new_delivery_price;
            $order->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Order::destroy($id);

    }
}

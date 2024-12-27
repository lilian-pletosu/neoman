<?php

namespace App\Http\Controllers\admin;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\AttributeValue;
use App\Services\DataTableService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{


    private DataTableService $dataTableService;
    private string $route = 'admin.orders.index';


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
            ->setResourceColumns(['id', 'order_number', 'full_name', 'total_price', 'status', 'created_at', 'type'])
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
        if (array_key_exists('id', $products)) {
            $products['brand'] = $products['brand']['name'];
            $products['color_value'] = $products['attributes']['culoare']['values'][0]['value'] ?? null;
            $products = [$products];
        } else {
            foreach ($products as $key => $product) {
                if (AttributeValue::find($product['color_value'])) {
                    $product['color_value'] = AttributeValue::find($product['color_value'])->translate()->value ?? '';
                    $products[$key] = $product;
                } else {
                    $product['color_value'] = null;
                    $products[$key] = $product;
                }
            }
        }
        $order->load('credit');
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

        if ($request->type == 'updateOrder') {

            $request->validate([
                'field' => 'required|string',
                'value' => 'required|string'
            ]);


            $order = Order::findOrFail($id);
            $order[$request->field] = $request->value;
            $order->save();
        }

        if ($request->type == 'updateStatus') {
            try {
                $order = Order::findOrFail($id);
                $order->status = $request->status;
                $order->save();

                Mail::raw("test", function ($message) {
                    $message->to('lilianpletosu7@gmail.com')->subject('test');
                });
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
        if ($request->type == 'updateDeliveryPrice') {
            $order = Order::findOrFail($id);
            $new_delivery_price = $request->delivery_price;
            $order->delivery_price = $new_delivery_price;
            $order->save();
        }
        return to_route($this->route);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Order::destroy($id);
    }
}

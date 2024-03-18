<?php

namespace App\Services;

class CookieService
{
    public function AddIncart($productId)
    {

        $itemsCart = request()->cookie('cart');

        $items = $itemsCart ? unserialize($itemsCart) : [];

        if (!$itemsCart) {
            $items[] = $productId;
            $cookie = cookie('cart', serialize($items), 300); // Name, Value, Minutes
            return response('Cookie has been set')->cookie($cookie);

        } else {
            if (in_array($productId, unserialize($itemsCart))) {
                return response(trans('app_context.product_exist'), 400);
            } else {
                $items[] = $productId;
                $cookie = cookie('cart', serialize($items), 300); // Name, Value, Minutes
                return response(trans('app_context.new_product_added'))->cookie($cookie);
            }
        }
    }

    public function DeleteProductInCart($productId)
    {

        $itemsCart = request()->cookie('cart');

        $items = $itemsCart ? unserialize($itemsCart) : [];
//        $product = Product::where('id', $productId)->first();

        if ($itemsCart) {
            if (($key = array_search($productId, $items)) !== false) {
                unset($items[$key]);
            }
            $cookie = cookie('cart', serialize($items), 300); // Name, Value, Minutes
            return response(trans('app_context.product_was_deleted'))->cookie($cookie);
        }
        return response();
    }


    public function cookieCount()
    {
        return count(unserialize(\request()->cookie('cart')));
    }

}

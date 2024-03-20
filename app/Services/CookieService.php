<?php

namespace App\Services;

class CookieService
{
    public function addInCart($productId)
    {
        return $this->addInCookie($productId, 'cart');
    }

    public function removeProductFromCart($productId)
    {
        return $this->deleteProductFromCookie($productId, 'cart');
    }


    public function addInWishlist($productId)
    {
        return $this->addInCookie($productId, 'wishlist');
    }

    public function removeProductFromWishlist($productId)
    {
        return $this->deleteProductFromCookie($productId, 'wishlist');
    }


    public function addInCookie($productId, string $storageName)
    {

        $itemsCart = request()->cookie($storageName);

        $items = $itemsCart ? unserialize($itemsCart) : [];

        if (!$itemsCart) {
            $items[] = $productId;
            $cookie = cookie($storageName, serialize($items), 262656); // Name, Value, Minutes
            return response(trans('app_context.new_product_added'))->cookie($cookie);

        } else {
            if (in_array($productId, unserialize($itemsCart))) {
                return response(trans('app_context.product_exist'), 400);
            } else {
                $items[] = $productId;
                $cookie = cookie($storageName, serialize($items), 262656); // Name, Value, Minutes
                return response(trans('app_context.new_product_added'))->cookie($cookie);
            }
        }
    }

    public function deleteProductFromCookie($productId, string $storageName)
    {
        $itemsCart = request()->cookie($storageName);

        $items = $itemsCart ? unserialize($itemsCart) : [];

        if ($itemsCart) {
            if (($key = array_search($productId, $items)) !== false) {
                unset($items[$key]);
            }
            $cookie = cookie($storageName, serialize($items), 262656); // Name, Value, Minutes
            return response(trans('app_context.product_was_deleted'))->cookie($cookie);
        }
        return response();
    }


}

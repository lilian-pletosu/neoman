<?php

namespace App\Services;

use App\Models\Product;

class CookieService
{
    public function addInCart($productId, $colorId)
    {
        return $this->addInCookie($productId, $colorId, 'cart');
    }

    public function removeProductFromCart($productId)
    {
        return $this->deleteProductFromCookie($productId, 'cart');
    }

    public function fetchAllProductsFromCart()
    {
        foreach ($this->getProducts('cart') as $product) {

        }
    }

    public function updateQtyOfProductFromCart($productId, $qty)
    {
        $items = $this->getProducts('cart');
        if (request()->cookie('cart')) {
            foreach ($items as $index => $product) {
                if ($product['id'] == $productId) {
                    $items[$index]['qty'] = max($qty, 1);
                    $items[$index]['total_price'] = $product['price'] * max($qty, 1);;
                    break;
                }
            }

            $cookie = cookie('cart', serialize($items), 262656);
            return response(trans('app_context.product_updated'))->cookie($cookie);
        }
    }


    public function addInWishlist($productId)
    {
        return $this->addInCookie($productId, '', 'wishlist');
    }

    public function removeProductFromWishlist($productId)
    {
        return $this->deleteProductFromCookie($productId, 'wishlist');
    }

    public function getProducts(string $storageName)
    {
        $products = [];
        if (request()->cookie($storageName)) {
            foreach (unserialize(\request()->cookie($storageName)) as $product) {
                $products[] = $product;
            }
        }
        return $products;
    }


    public function addInCookie($productId, $colorId, string $storageName)
    {

        $itemsCart = request()->cookie($storageName);

        $items = $itemsCart ? unserialize($itemsCart) : [];

        $productDb = Product::where('id', $productId)->with(['images', 'brand', 'subSubCategory.subcategory.category'])->first();

        $product = [
            'id' => $productDb->id,
            'name' => $productDb->name,
            'brand' => $productDb->brand->name,
            'image' => $productDb->images[0]->image1,
            'price' => $productDb->price,
            'total_price' => $productDb->price,
            'qty' => 1,
            'color_value' => $colorId
        ];

        if (!$itemsCart) {
            $items[] = $product;
            $cookie = cookie($storageName, serialize($items), 262656); // Name, Value, Minutes
            return response(trans('app_context.new_product_added'))->cookie($cookie);

        } else {
            if (in_array($product, unserialize($itemsCart))) {
                return response(trans('app_context.product_exist'), 400);
            } else {
                $items[] = $product;
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
            foreach ($items as $index => $product) {
                if ($product['id'] == $productId) {
                    unset($items[$index]);
                    $cookie = cookie($storageName, serialize($items), 262656);
                    return response(trans('app_context.product_was_deleted'))->cookie($cookie);
                }
            }
        }
        return response();
    }


}

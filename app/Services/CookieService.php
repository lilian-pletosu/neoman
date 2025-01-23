<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Redis;

class CookieService
{



    private function getStorageKey($storageName)
    {
        $userId = $_COOKIE['user_id'] ?? null;

        if (!$userId) {
            $userId = uniqid('user_', true);
            setcookie('user_id', $userId, time() + (180 * 24 * 60 * 60), '/');
        }

        return $storageName . '_' . $userId;
    }




    public function addInCart($productId, $colorId)
    {
        return $this->addInCookie($productId, 'cart', $colorId);
    }

    public function addInWishlist($productId)
    {
        return $this->addInCookie($productId, 'wishlist');
    }

    public function getProducts(string $storageName)
    {
        $storageKey = $this->getStorageKey($storageName);
        $items = Redis::get($storageKey);
        return json_decode($items, true) ?? [];
    }

    public function removeProductFromCart($productId)
    {
        return $this->deleteProductFromCookie($productId, 'cart');
    }

    public function removeProductFromWishlist($productId)
    {
        return $this->deleteProductFromCookie($productId, 'wishlist');
    }

    public function addInCookie($productId, string $storageName, $colorId = null)
    {
        $storageKey = $this->getStorageKey($storageName);
        $items = $this->getProducts($storageName);

        $productDb = Product::withDiscountDetails()
            ->where('id', $productId)
            ->with(['images', 'brand', 'category'])
            ->first();

        $newProduct = [
            'id' => $productDb->id,
            'name' => $productDb->name ?? '',
            'slug' => $productDb->slug ?? '',
            'brand' => $productDb->brand->name ?? '',
            'image' => $productDb->images[0]->image1,
            'price' => $productDb->price ?? 0,
            'promotion_price' => $productDb->promotion_price,
            'has_discount' => $productDb->has_discount,
            'sale' => $productDb->sale,
            'total_price' => $productDb->has_discount ? $productDb->promotion_price : $productDb->price,
            'qty' => 1,
            'color_value' => $colorId ?? null
        ];

        $productExists = false;

        if (!empty($items)) {
            foreach ($items as &$item) {
                if ($item['id'] == $newProduct['id'] && $item['color_value'] == $newProduct['color_value']) {
                    $item['qty'] += 1;
                    $item['total_price'] = $item['has_discount']
                        ? $item['promotion_price'] * $item['qty']
                        : $item['price'] * $item['qty'];
                    $productExists = true;
                    break;
                }
            }
        }

        if (!$productExists) {
            $items[] = $newProduct;
        }

        Redis::set($storageKey, json_encode($items), 'EX', 262656);

        return response(
            $productExists
                ? trans('app_context.product_already_exist_cart')
                : trans('app_context.new_product_added')
        );
    }


    public function deleteProductFromCookie($productId, string $storageName)
    {
        $storageKey = $this->getStorageKey($storageName);
        $items = $this->getProducts($storageName);

        foreach ($items as $index => $product) {
            if ($product['id'] == $productId) {
                unset($items[$index]);
                Redis::set($storageKey, json_encode(array_values($items)), 'EX', 262656);
                return response(trans('app_context.product_was_deleted'));
            }
        }

        return response(trans('app_context.product_not_found'));
    }

    public function updateQtyOfProductFromCart($productId, $qty)
    {
        $storageKey = $this->getStorageKey('cart');
        $items = $this->getProducts('cart');

        foreach ($items as &$product) {
            if ($product['id'] == $productId) {
                $product['qty'] = max($qty, 1);
                $product['total_price'] = $product['has_discount']
                    ? round($product['promotion_price'] * $product['qty'], 2)
                    : $product['price'] * $product['qty'];

                Redis::set($storageKey, json_encode($items), 'EX', 262656);
                return response(trans('app_context.product_updated'));
            }
        }
    }





    public function delWishlist()
    {
        $storageKey = $this->getStorageKey('wishlist');
        Redis::del($storageKey);
        return response('success');
    }
    public function delCart()
    {
        $storageKey = $this->getStorageKey('cart');
        Redis::del($storageKey);
        return response('success');
    }

    public function wishlistToCart()
    {
        $cartItems = $this->getProducts('cart');
        $wishlistItems = $this->getProducts('wishlist');

        if ($wishlistItems) {
            foreach ($wishlistItems as $product) {
                $cartItems[] = $product;
            }
        }

        Redis::set($this->getStorageKey('cart'), json_encode($cartItems), 'EX', 262656);
        Redis::del($this->getStorageKey('wishlist'));

        return response('success');
    }
}

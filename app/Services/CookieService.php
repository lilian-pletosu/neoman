<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class CookieService
{
    public function addInCart($productId, $colorId)
    {
        return $this->addInCookie($productId, 'cart', $colorId);
    }

    public function forgetWishlist()
    {
        $cookie = $this->forgetCookie('wishlist');
        return response('success')->cookie($cookie);
    }


    public function wishlistToCart(): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $itemsCart = Cache::get('cart');
        $itemsWishlist = Cache::get('wishlist');

        $itemsCart = $itemsCart ?? [];
        $itemsWishlist = $itemsWishlist ?? [];

        if ($itemsWishlist) {
            foreach ($itemsWishlist as $product) {
                $itemsCart[] = $product;
            }
            Cache::forget('cart');
            Cache::remember('cart', 262656, function () use ($itemsCart) {
                return $itemsCart;
            });
        } else {
            Cache::forget('cart');
            Cache::remember('cart', 262656, function () use ($itemsCart) {
                return $itemsCart;
            });
        }
        Cache::forget('wishlist');
        return response('success');
    }

    public function removeProductFromCart($productId)
    {
        return $this->deleteProductFromCookie($productId, 'cart');
    }

    public function updateQtyOfProductFromCart($productId, $qty)
    {
        $items = $this->getProducts('cart');
        if (Cache::get('cart')) {
            foreach ($items as $index => $product) {
                if ($product['id'] == $productId) {
                    $items[$index]['qty'] = max($qty, 1);
                    $items[$index]['total_price'] = $product['has_discount'] ? round($product['promotion_price'] * max($qty, 1), 2) : $product['price'] * max($qty, 1);

                    break;
                }
            }
            Cache::forget('cart');

            Cache::remember('cart', 262656, function () use ($items) {
                return $items;
            });
            return response(trans('app_context.product_updated'));
        }
    }


    public function addInWishlist($productId)
    {
        return $this->addInCookie($productId, 'wishlist');
    }

    public function removeProductFromWishlist($productId)
    {
        return $this->deleteProductFromCookie($productId, 'wishlist');
    }

    public function getProducts(string $storageName)
    {
        $products = [];
        if (Cache::get($storageName)) {
            foreach (Cache::get($storageName) as $product) {
                $products[] = $product;
            }
        }
        return $products;
    }


    public function addInCookie($productId, string $storageName, $colorId = null)
    {
        $itemsCart = Cache::get($storageName);
        $items = $itemsCart ?? [];

        $productDb = Product::withDiscountDetails()->where('id', $productId)->with(['images', 'brand', 'subSubCategory.subcategory.category'])->first();
        $product = [
            'id' => $productDb->id,
            'name' => $productDb->name,
            'brand' => $productDb->brand->name,
            'image' => $productDb->images[0]->image1,
            'price' => $productDb->price,
            'promotion_price' => $productDb->promotion_price,
            'has_discount' => $productDb->has_discount,
            'sale' => $productDb->sale,
            'total_price' => $productDb->has_discount ? $productDb->promotion_price : $productDb->price,
            'qty' => 1,
            'color_value' => $colorId ?? null
        ];

        if (!$itemsCart) {
            $items[] = $product;
            Cache::forget($storageName);
            Cache::remember($storageName, 262656, function () use ($items) {
                return $items;
            });
            return response(trans('app_context.new_product_added'));
        } else {
            foreach ($items as $item) {
                if ($item['id'] == $product['id'] && $item['color_value'] == $product['color_value']) {
                    $item['qty'] += 1;
                    $item['total_price'] = $item['has_discount'] ? $item['promotion_price'] * $item['qty'] : $item['price'] * $item['qty'];
                    return response(trans('app_context.product_already_exist_cart'));
                }
            }
            $items[] = $product;
//            dd( $items);
            Cache::forget($storageName);

            Cache::remember($storageName, 262656, function () use ($items) {
                return $items;
            });
        }

        return response(trans('app_context.new_product_added'));
    }


    public function deleteProductFromCookie($productId, string $storageName)
    {
        $itemsCart = Cache::get($storageName);

        $items = $itemsCart ?? [];

        if ($itemsCart) {
            foreach ($items as $index => $product) {
                if ($product['id'] == $productId) {
                    unset($items[$index]);
                    Cache::forget($storageName);

                    Cache::remember($storageName, 262656, function () use ($items) {
                        return $items;
                    });
                    return response(trans('app_context.product_was_deleted'));
                }
            }
        }
        return response();
    }

    public function forgetCookie($storageName)
    {
        Cache::forget($storageName);
        return response('success');
    }


}

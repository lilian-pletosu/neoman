<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Redis;

class CookieService
{
    public function addInCart($productId, $colorId)
    {
        return $this->addInCookie($productId, 'cart', $colorId);
    }

    public function addInCookie($productId, string $storageName, $colorId = null)
    {
        $itemsCart = Redis::get($storageName);
        $items = json_decode($itemsCart) ?? [];

        $productDb = Product::withDiscountDetails()
            ->where('id', $productId)
            ->with(['images', 'brand', 'subSubCategory.subcategory.category'])
            ->first();

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

        $productExists = false;

        foreach ($items as &$item) {
            if ($item->id == $product['id'] && $item->color_value == $product['color_value']) {
                $item->qty += 1;
                $item->total_price = $item->has_discount
                    ? $item->promotion_price * $item->qty
                    : $item->price * $item->qty;
                $productExists = true;
                break;
            }
        }

        if (!$productExists) {
            $items[] = $product;
        }

        Redis::set($storageName, json_encode($items), 'EX', 262656);

        if ($productExists) {
            return response(trans('app_context.product_already_exist_cart'));
        }

        return response(trans('app_context.new_product_added'));

    }

    public function delWishlist()
    {
        $cookie = $this->delCookie('wishlist');
        return response('success')->cookie($cookie);
    }

    public function delCookie($storageName)
    {
        Redis::del($storageName);
        return response('success');
    }

    public function wishlistToCart(): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $itemsCart = Redis::get('cart');
        $itemsWishlist = Redis::get('wishlist');

        // Decodăm datele JSON în array-uri asociative
        $itemsCart = $itemsCart ? json_decode($itemsCart, true) : [];
        $itemsWishlist = $itemsWishlist ? json_decode($itemsWishlist, true) : [];

        if ($itemsWishlist) {
            foreach ($itemsWishlist as $product) {
                $itemsCart[] = $product;
            }
        }

        Redis::set('cart', json_encode($itemsCart), 'EX', 262656);

        Redis::del('wishlist');

        return response('success');

    }

    public function removeProductFromCart($productId)
    {
        return $this->deleteProductFromCookie($productId, 'cart');
    }

    public function deleteProductFromCookie($productId, string $storageName)
    {
        $itemsCart = Redis::get($storageName);
        $items = json_decode($itemsCart, true) ?? [];

        if (!empty($items)) {
            foreach ($items as $index => $product) {
                if ($product['id'] == $productId) {
                    unset($items[$index]);

                    // Rescriem array-ul modificat în Redis
                    Redis::set($storageName, json_encode(array_values($items)), 'EX', 262656);

                    return response(trans('app_context.product_was_deleted'));
                }
            }
        }

// Dacă produsul nu a fost găsit sau lista este goală, returnăm un răspuns gol sau un alt mesaj.
        return response(trans('app_context.product_not_found'));

    }

    public function updateQtyOfProductFromCart($productId, $qty)
    {
        $items = $this->getProducts('cart');
        if ($items) {
            foreach ($items as $index => $product) {
                if ($product->id == $productId) {
                    // Actualizăm cantitatea și prețul total
                    $items[$index]->qty = max($qty, 1);
                    $items[$index]->total_price = $product->has_discount
                        ? round($product->promotion_price * $items[$index]->qty, 2)
                        : $product->price * $items[$index]->qty;

                    // Salvăm modificările în Redis
                    Redis::set('cart', json_encode($items), 'EX', 262656);
                    return response(trans('app_context.product_updated'));
                }
            }
        }
    }

    public function getProducts(string $storageName)
    {
        $products = [];
        if (json_decode(Redis::get($storageName))) {
            foreach (json_decode(Redis::get($storageName)) as $product) {
                $products[] = $product;
            }
        }
        return $products;
    }

    public function addInWishlist($productId)
    {
        return $this->addInCookie($productId, 'wishlist');
    }

    public function removeProductFromWishlist($productId)
    {
        return $this->deleteProductFromCookie($productId, 'wishlist');
    }


}

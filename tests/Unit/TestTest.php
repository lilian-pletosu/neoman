<?php

namespace Tests\Unit;

use App\Services\CookieService;
use Tests\TestCase;

class TestTest extends TestCase
{
    protected $cookieService;

    public function setUp(): void
    {
        parent::setUp();
        $this->cookieService = new CookieService();
    }

    public function productIsAddedInCart()
    {
        $productId = 1;
        $colorId = 1;

        $response = $this->cookieService->addInCart($productId, $colorId);

        $this->assertEquals('primul', $response->getContent());
    }

    public function wishlistIsForgotten()
    {
        $response = $this->cookieService->forgetWishlist();

        $this->assertEquals('success', $response->getContent());
    }

    public function wishlistIsMovedToCart()
    {
        $response = $this->cookieService->wishlistToCart();

        $this->assertEquals('success', $response->getContent());
    }

    public function productIsRemovedFromCart()
    {
        $productId = 1;

        $response = $this->cookieService->removeProductFromCart($productId);

        $this->assertEquals(trans('app_context.product_was_deleted'), $response->getContent());
    }

    public function quantityOfProductFromCartIsUpdated()
    {
        $productId = 1;
        $qty = 2;

        $response = $this->cookieService->updateQtyOfProductFromCart($productId, $qty);

        $this->assertEquals(trans('app_context.product_updated'), $response->getContent());
    }

    public function productIsAddedInWishlist()
    {
        $productId = 1;

        $response = $this->cookieService->addInWishlist($productId);

        $this->assertEquals('primul', $response->getContent());
    }

    public function productIsRemovedFromWishlist()
    {
        $productId = 1;

        $response = $this->cookieService->removeProductFromWishlist($productId);

        $this->assertEquals(trans('app_context.product_was_deleted'), $response->getContent());
    }
}

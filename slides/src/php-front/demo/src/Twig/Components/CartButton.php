<?php

namespace App\Twig\Components;

use App\Service\Cart;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveListener;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
final class CartButton
{
    use DefaultActionTrait;

    public int $productCount = 0;

    public function __construct(private readonly Cart $cart){
        $this->productCount = $cart->count();
    }

    #[LiveListener('productAdded')]
    #[LiveListener('productRemoved')]
    public function updateProductCount()
    {
        $this->productCount = $this->cart->count();
    }

}

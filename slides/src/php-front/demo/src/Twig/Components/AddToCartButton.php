<?php

namespace App\Twig\Components;

use App\Service\Cart;
use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveAction;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\ComponentToolsTrait;
use Symfony\UX\LiveComponent\DefaultActionTrait;

#[AsLiveComponent]
final class AddToCartButton
{
    use DefaultActionTrait;
    use ComponentToolsTrait;

    #[LiveProp]
    public int $productId = 0;

    public function __construct(private Cart $cart){

    }

    public function isInCart (): bool {
        return $this->cart->hasProduct($this->productId);
    }

    #[LiveAction]
    public function add(): void
    {
        $this->cart->addProduct($this->productId);
        $this->emit('productAdded');
    }

    #[LiveAction]
    public function remove(): void
    {
        $this->cart->removeProduct($this->productId);
        $this->emit('productRemoved');
    }


}

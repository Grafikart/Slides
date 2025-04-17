<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class Cart {

    private const CART_KEY = 'cart';

    public function __construct(
        private RequestStack $requestStack
    )
    {
    }

    public function addProduct(int $productId): void
    {
        $cart = $this->getCart();
        $cart[$productId] = ($cart[$productId] ?? 0) + 1;
        $this->getSession()->set(self::CART_KEY, $cart);
    }

    public function removeProduct(int $productId): void
    {
        $cart = $this->getCart();
        unset($cart[$productId]);

        $this->getSession()->set(self::CART_KEY, $cart);
    }

    public function hasProduct(int $productId): bool
    {
        if ($productId <= 0) {
            throw new \RuntimeException("Product Id should not be null");
        }
        return isset($this->getCart()[$productId]);
    }

    public function count(): int
    {
        return count($this->getCart());
    }

    private function getSession(): SessionInterface
    {
        return $this->requestStack->getSession();
    }

    private function getCart(): array
    {
        return $this->getSession()->get(self::CART_KEY, []);
    }

}

<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class ShopController extends AbstractController
{

    #[Route('/shop', name: 'shop')]
    public function index(ProductRepository $productRepository)
    {
        $products = $productRepository->findAll();
        return $this->render('shop/index.html.twig', [
            'products' => $products
        ]);
    }

}

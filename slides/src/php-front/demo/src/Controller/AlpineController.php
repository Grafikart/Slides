<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AlpineController extends AbstractController
{

    #[Route('alpine', name: 'alpine')]
    public function index(): Response
    {
        return $this->render('alpine/index.html.twig');
    }

}

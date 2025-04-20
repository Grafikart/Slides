<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class SpaController extends AbstractController {


    #[Route('/spa', name: 'spa', methods: ['GET'])]
    public function home()
    {
        return $this->render('spa/index.html.twig');
    }
}
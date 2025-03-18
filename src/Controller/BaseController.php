<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class BaseController extends AbstractController
{
    #[Route(path: '/', name: 'shop_index')]
    public function index(): Response
    {
        return $this->render('shop.html.twig', [
            'controller_name' => 'BaseController',
        ]);
    }

    #[Route(path: 'admin', name: 'admin_dashboard')]
    public function admin()
    {
        return $this->render('admin.html.twig');
    }
}

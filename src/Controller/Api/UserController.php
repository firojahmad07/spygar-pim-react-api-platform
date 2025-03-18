<?php

namespace App\Controller\Api;

use App\Entity\Security\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

final class UserController extends AbstractController
{
    public function __construct(
        private Security $security
    ) {
    }
    
    #[Route('/api/user', name: 'logged_in_user')]
    public function index(): JsonResponse
    {
        /** @var User|null $user */
        $user = $this->security->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'Unauthorized'], 401);
        }

        return $this->json($user, 200, [], ['groups' => ['user:read']]);
    }
}

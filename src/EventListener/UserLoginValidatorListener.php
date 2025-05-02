<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use App\Entity\Security\User;

class UserLoginValidatorListener
{
    public function __construct(private RequestStack $requestStack) {}

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $user = $event->getUser();

        if (!$user instanceof User) {
            return;
        }

        $path = $this->requestStack->getCurrentRequest()->getPathInfo();

        // Check active status
        if (!$user->isStatus()) {
            throw new UnauthorizedHttpException('', 'Your account is disabled.');
        }

        // Admin login path check
        if (str_starts_with($path, '/api/login/admin') && $user->getUserType() !== 'ADMIN') {
            throw new UnauthorizedHttpException('', 'Only admins can log in here.');
        }

        // Customer login path check
        if (str_starts_with($path, '/api/login/customer') && $user->getUserType() !== 'CUSTOMER') {
            throw new UnauthorizedHttpException('', 'Only customers can log in here.');
        }
    }
}

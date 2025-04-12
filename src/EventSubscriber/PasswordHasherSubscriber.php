<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Security\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class PasswordHasherSubscriber implements EventSubscriberInterface
{
    const ALLOWED_METHODS = [Request::METHOD_POST];
    public function __construct(
        private UserPasswordHasherInterface $userPasswordHasher
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['hashUserPassword', EventPriorities::PRE_WRITE],
        ];
    }


    public function hashUserPassword(ViewEvent $event): void
    {
        return;

        // $user = $event->getControllerResult();
        // $method = $event->getRequest()->getMethod();

        // // dump("we are her");die;
        // if(!$user instanceof User || !in_array($method, [Request::METHOD_POST]) ) {
        //     return;
        // }

        // $user->setPassword($this->userPasswordHasher->hashPassword($user, $user->getPassword()));
    }
}
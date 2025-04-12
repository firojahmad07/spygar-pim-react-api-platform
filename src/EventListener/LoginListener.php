<?php

namespace App\EventListener;

use Symfony\Component\Security\Http\Event\LoginSuccessEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class LoginListener
{
    public function __construct(private EntityManagerInterface $em) {}

    public function __invoke(LoginSuccessEvent $event): void
    {
        $user = $event->getUser();

        if ($user instanceof UserInterface) {

            $timezone = new \DateTimeZone('Asia/Kolkata');
            $user->setLastLogin(new \DateTimeImmutable('now', $timezone));
            $this->em->persist($user);
            $this->em->flush();
        }
    }
}

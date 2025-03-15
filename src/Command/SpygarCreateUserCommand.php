<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\Security\User;
use App\Repository\Security\UserRepository;
use Doctrine\ORM\EntityManagerInterface;


#[AsCommand(
    name: 'spygar:create:user',
    description: 'Add a short description for your command',
)]
class SpygarCreateUserCommand extends Command
{
    public function __construct(
        private UserPasswordHasherInterface $userPasswordHasher,
        private UserRepository $userRepository,
        private EntityManagerInterface $entityManager
    )
    {
        parent::__construct();
    }
    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $users = static::USER_FIXTURE_DATA();
        foreach($users as $user)
        {
            $userInstance = $this->userRepository->findOneBy([
                'username' => $user['username'],
                'email' => $user['email']
            ]);

            $userInstance = !empty($userInstance) ? $userInstance : new User;

            $userInstance->setFirstName($user['firstName']);
            $userInstance->setLastName($user['lastName']);
            $userInstance->setUsername($user['username']);
            $userInstance->setEmail($user['email']);

            $password = $this->userPasswordHasher->hashPassword($userInstance, $user['password']);
            $userInstance->setPassword($password);

            $userInstance->setUserType($user['userType']);
            $userInstance->setStatus($user['status']);
            $userInstance->setCreated($user['created']);
            $userInstance->setRoles($user['roles']);

            $this->entityManager->persist($userInstance);
            $this->entityManager->flush();
        }

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }

    public static function USER_FIXTURE_DATA(): array
    {
        return [
            [
                "firstName" => "John",
                "lastName" => "Doe",
                "username" => "admin",
                "email" => "john@spygar.com",
                "password" => "admin123",
                "userType" => "ADMIN",
                "status" => true,
                "created" => new \DateTime(),
                "roles" => ['ROLE_ADMIN']
            ]
        ];
    }
}

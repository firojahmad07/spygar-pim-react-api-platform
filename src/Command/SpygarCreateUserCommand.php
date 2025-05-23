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
use App\Entity\Security\Role;
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
    ) {
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

        // $this->loadRoles();
        $this->loadUsers();

        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        return Command::SUCCESS;
    }

    // public function loadRoles()
    // {
    //     $roleFixtureData = static::ROLE_FIXTURE_DATA();
    //     foreach ($roleFixtureData as $roleData) {
    //         $roleInstance = $this->roleRepository->findOneBy([
    //             'code' => $roleData['code'],
    //         ]);

    //         $roleInstance = !empty($roleInstance) ? $roleInstance : new Role;

    //         $roleInstance->setCode($roleData['code']);
    //         $roleInstance->setPermissions($roleData['permissions']);
    //         $roleInstance->setTranslations($roleData['translations']);

    //         $this->entityManager->persist($roleInstance);
    //         $this->entityManager->flush();
    //     }
    // }

    public function loadUsers()
    {
        $users = static::USER_FIXTURE_DATA();
        foreach ($users as $user) {
            $userInstance = $this->userRepository->findOneBy(['email' => $user['email']]);

            $userInstance = !empty($userInstance) ? $userInstance : new User;

            $userInstance->setFirstName($user['firstName']);
            $userInstance->setLastName($user['lastName']);
            $userInstance->setEmail($user['email']);

            $password = $this->userPasswordHasher->hashPassword($userInstance, $user['password']);
            $userInstance->setPassword($password);

            $userInstance->setUserType($user['userType']);
            $userInstance->setStatus($user['status']);
            $userInstance->setCreated($user['created']);

            // if (is_array($user['roles'])) {

            //     foreach ($user['roles'] as  $role) {
            //         $roleInstance = $this->roleRepository->findOneBy(['code' => $role]);
            //         if (empty($roleInstance)) {
            //             continue;
            //         }

            //     }
            // }
            // dump($user['roles']);
            $userInstance->setRoles($user['roles']);

            $this->entityManager->persist($userInstance);
            $this->entityManager->flush();
        }
    }

    public static function USER_FIXTURE_DATA(): array
    {
        return [
            [
                "firstName" => "John",
                "lastName" => "Doe",
                "email" => "john@spygar.com",
                "password" => "Admin123",
                "userType" => "ADMIN",
                "status" => true,
                "created" => new \DateTime(),
                "roles" => ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
            ],
            [
                "firstName" => "Firoj",
                "lastName" => "Ahmad",
                "email" => "firoj.ahmad@spygar.com",
                "password" => "Admin123",
                "userType" => "CUSTOMER",
                "status" => true,
                "created" => new \DateTime(),
                "roles" => ['ROLE_ADMIN']
            ]
        ];
    }

    public static function ROLE_FIXTURE_DATA(): array
    {
        return [
            [
                "code" => "ROLE_ADMIN",
                "permissions" => [
                    "user" => ['create', 'list', 'edit', 'delete'],
                    "products" => ['create', 'list', 'edit', 'delete']
                ],
                "translations" => [
                    "de_DE" => "Admin",
                    "en_US" => "Admin",
                    "fr_FR" => "Admin"
                ]
            ],

            [
                "code" => "ROLE_SUPER_ADMIN",
                "permissions" => [
                    "user" => ['create', 'list', 'edit', 'delete'],
                    "products" => ['create', 'list', 'edit', 'delete']
                ],
                "translations" => [
                    "de_DE" => "Super admin",
                    "en_US" => "Super admin",
                    "fr_FR" => "Super admin"
                ]
            ],
            [
                "code" => "ROLE_CUSTOMER",
                "permissions" => [
                    "CART" => ['create', 'list', 'edit', 'delete'],
                    "WATCHLIST" => ['create', 'list', 'edit', 'delete'],
                    "PRODUCTS" => ['list', 'view']
                ],
                "translations" => [
                    "de_DE" => "Customer",
                    "en_US" => "Customer",
                    "fr_FR" => "Customer"
                ]
            ]
        ];
    }
}

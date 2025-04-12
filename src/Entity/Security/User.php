<?php

namespace App\Entity\Security;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\Security\UserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Serializer\Annotation\Groups;
use App\State\UserPasswordHasher;
use App\Entity\Storage\Asset;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[UniqueEntity(fields: ["username"], groups: ['user:create', 'user:update'])]
#[UniqueEntity(fields: ["email"], groups: ['user:create', 'user:update'])]
#[ApiResource(
    normalizationContext:[
        'groups' => ['user:read']
    ],
    operations:[
        new Get(
            security: "is_granted('IS_AUTHENTICATED_FULLY')",
            // security: "is_granted('IS_AUTHENTICATED_FULLY') and object == user",
            
        ),
        new GetCollection(
            security: "is_granted('IS_AUTHENTICATED_FULLY')"
        ),

        new Post(
            security: "is_granted('IS_AUTHENTICATED_FULLY')",
            processor: UserPasswordHasher::class,
            // validationContext
            denormalizationContext: [
                'groups' => ['user:create']
            ],
        ),
        new Patch(
            security: "is_granted('IS_AUTHENTICATED_FULLY')",
            processor: UserPasswordHasher::class,
            denormalizationContext: [
                'groups' => ['user:update']
            ],
            validationContext: [
                'groups' => ['user:update']
            ]
        ),
        new Patch(
            uriTemplate: '/user/{id}/reset-password',
            security: "is_granted('IS_AUTHENTICATED_FULLY')",
            processor: UserPasswordHasher::class,
            denormalizationContext: ['groups' => ['user:reset-password']],
            validationContext: ['groups' => ['user:reset-password']]
        )
    ]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(groups:['user:create', 'user:update'])]
    #[Assert\Length(min: 3, max:30)]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank(groups:['user:create', 'user:update'])]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 150)]
    #[Assert\NotBlank(groups:['user:create', 'user:update'])]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(groups:['user:create', 'user:update'])]
    #[Assert\Email(groups:['user:create', 'user:update'])]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?string $email = null;

    #[ORM\Column(type: 'json')]
    #[Assert\NotBlank(groups:['user:create', 'user:update'])]
    #[Groups(['user:create', 'user:update'])]
    private array $roles;

    #[ORM\Column(length: 255)]
    #[Groups(['user:create'])]
    #[Assert\NotBlank(groups:['user:create'])]
    #[Assert\Regex(
        pattern: "/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{5,}/",
        message: "Password lenght must be 5 characters long and contain at least one digit, Upper and lower case",
        groups:['user:create']
    )]
    private ?string $password = null;


    #[Assert\NotBlank()]
    #[Groups(['user:create'])]
    #[Assert\Expression(
        expression: "this.getPassword() == this.getConfirmPassword()",
        message: "Password does not match",
        groups:['user:create']
    )]
    private ?string $confirmPassword = null;

    #[Assert\NotBlank(groups:['user:reset-password'])]
    #[UserPassword(groups:['user:reset-password'])]
    #[Groups(['user:reset-password'])]
    private ?string $oldPassword = null;
    
    #[Assert\NotBlank(groups:['user:reset-password'])]
    #[Groups(['user:reset-password'])]
    #[Assert\Regex(
        pattern: "/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{5,}/",
        message: "Password lenght must be 5 characters long and contain at least one digit, Upper and lower case",
        groups:['user:reset-password']
    )]
    private ?string $newPassword = null;

    #[Assert\NotBlank(groups:['user:reset-password'])]
    #[Groups(['user:reset-password'])]
    #[Assert\Expression(
        expression: "this.getNewPassword() === this.getNewConfirmPassword()",
        message: "Password does not match",
        groups:['user:reset-password']
    )]
    private ?string $newConfirmPassword = null;


    #[ORM\Column(length: 50)]
    #[Assert\NotBlank(groups:['user:update', 'user:update'])]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[Assert\Choice(choices: ['ADMIN', 'CUSTOMER'], message: 'User type must be either ADMIN or CUSTOMER.', groups: ['user:update'])]
    private ?string $userType = null;

    #[ORM\Column]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?bool $status = null;
    
    #[ORM\OneToOne(targetEntity: Asset::class, inversedBy: 'user', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['user:read', 'user:update'])]
    private ?Asset $avatar = null;


    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['user:read'])]
    private ?\DateTimeInterface $lastLogin = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $updated = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    #[Groups(['user:read'])]
    public function getFullName()
    {
        return $this->firstName . " " . $this->lastName;
    }
    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function getUserIdentifier(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function setOldPassword(string $oldPassword): static
    {
        $this->oldPassword = $oldPassword;

        return $this;
    }

    public function getOldPassword(): string
    {
        return $this->oldPassword;
    }

    public function setNewPassword(string $newPassword): static
    {
        $this->newPassword = $newPassword;

        return $this;
    }

    public function getNewPassword(): string|null
    {
        return $this->newPassword;
    }


    public function setNewConfirmPassword(string $newConfirmPassword): static
    {
        $this->newConfirmPassword = $newConfirmPassword;

        return $this;
    }

    public function getNewConfirmPassword(): string
    {
        return $this->newConfirmPassword;
    }

    public function getConfirmPassword(): ?string
    {
        return $this->confirmPassword;
    }

    public function setConfirmPassword(string $confirmPassword): static
    {
        $this->confirmPassword = $confirmPassword;

        return $this;
    }


    public function getRoles(): array
    {
        $roles = $this->roles;

        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getUserType(): ?string
    {
        return $this->userType;
    }

    public function setUserType(string $userType): static
    {
        $this->userType = $userType;

        return $this;
    }

    public function isStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getLastLogin(): ?\DateTimeInterface
    {
        return $this->lastLogin;
    }

    public function setLastLogin(?\DateTimeInterface $lastLogin): static
    {
        $this->lastLogin = $lastLogin;

        return $this;
    }

    // Getter and setter for $avatar
    public function getAvatar(): ?Asset
    {
        return $this->avatar;
    }

    public function setAvatar(?Asset $avatar): void
    {
        $this->avatar = $avatar;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): static
    {
        $this->created = $created;

        return $this;
    }

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(?\DateTimeInterface $updated): static
    {
        $this->updated = $updated;

        return $this;
    }
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $this->created = new \DateTimeImmutable();
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->updated = new \DateTime();
    }
}

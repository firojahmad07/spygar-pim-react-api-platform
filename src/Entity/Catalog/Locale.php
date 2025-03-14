<?php

namespace App\Entity\Catalog;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use App\Repository\Catalog\LocaleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;

#[ORM\Entity(repositoryClass: LocaleRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: [
                'groups' => ['locale:read']
            ]
            ),
        new Patch(
            denormalizationContext: [
                'groups' => ['locale:update']
            ]
        )
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'code' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id','isActive'])]

class Locale
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['locale:read', 'locale:update'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['locale:read'])]
    private ?string $code = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['locale:read', 'locale:update'])]
    private ?bool $isActive = null;
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(?bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }

    #[Groups(['locale:read'])]
    public function getLabel()
    {
        return \Locale::getDisplayName($this->code);
    }
}

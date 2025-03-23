<?php

namespace App\Entity\Catalog;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\Catalog\CurrencyRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Patch;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiFilter;

#[ORM\Entity(repositoryClass: CurrencyRepository::class)]
#[ApiResource(
    operations:[
        new GetCollection(
            normalizationContext: [
                'groups' => ['currency:read']
            ]
            ),
        new Patch(
            denormalizationContext: [
                'groups' => ['currency:update']
            ]
        )
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'isActive' => 'exact', 'code' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['id','isActive'])]

class Currency
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['currency:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['currency:read'])]
    private ?string $code = null;

    #[ORM\Column]
    #[Groups(['currency:read', 'currency:update'])]
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

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;

        return $this;
    }
}

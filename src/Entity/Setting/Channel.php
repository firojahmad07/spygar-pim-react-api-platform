<?php

namespace App\Entity\Setting;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Catalog\Category;
use App\Repository\Setting\ChannelRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ChannelRepository::class)]
#[ApiResource]
class Channel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $code = null;

    #[ORM\Column(type: Types::SIMPLE_ARRAY)]
    private array $currencies = [];

    #[ORM\Column(type: Types::SIMPLE_ARRAY)]
    private array $locales = [];

    #[ORM\OneToOne(inversedBy: 'channel', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $categoryTree = null;

    #[ORM\Column(type: Types::SIMPLE_ARRAY, nullable: true)]
    private ?array $translations = null;

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

    public function getCurrencies(): array
    {
        return $this->currencies;
    }

    public function setCurrencies(array $currencies): static
    {
        $this->currencies = $currencies;

        return $this;
    }

    public function getLocales(): array
    {
        return $this->locales;
    }

    public function setLocales(array $locales): static
    {
        $this->locales = $locales;

        return $this;
    }

    public function getCategoryTree(): ?Category
    {
        return $this->categoryTree;
    }

    public function setCategoryTree(Category $categoryTree): static
    {
        $this->categoryTree = $categoryTree;

        return $this;
    }

    public function getTranslations(): ?array
    {
        return $this->translations;
    }

    public function setTranslations(?array $translations): static
    {
        $this->translations = $translations;

        return $this;
    }
}

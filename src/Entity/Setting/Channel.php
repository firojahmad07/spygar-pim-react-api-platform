<?php

namespace App\Entity\Setting;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Catalog\Category;
use App\Repository\Setting\ChannelRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: ChannelRepository::class)]
#[ApiResource(
    operations: [
        new Get(
            
        ),
        new GetCollection(
            normalizationContext:[
                'groups' => ['channel:read']
            ]
        ),
        new Post(
            denormalizationContext:[
                'groups' => ['channel:write']
            ]
        ),
        new Patch(
            denormalizationContext:[
                'groups' => ['channel:update']
            ]
        ),
        new Delete()
    ]
)]
class Channel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['channel:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['channel:read', 'channel:write'])]
    private ?string $code = null;

    #[ORM\Column(type: Types::JSON)]
    #[Groups(['channel:read', 'channel:write', 'channel:update'])]
    private array $currencies = [];

    #[ORM\Column(type: Types::JSON)]
    #[Groups(['channel:read', 'channel:write', 'channel:update'])]
    private array $locales = [];

    #[ORM\ManyToMany(targetEntity: Category::class, mappedBy: "channels")]
    #[Groups(['channel:read', 'channel:write', 'channel:update'])]
    private Collection $categories;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    #[Groups(['channel:read', 'channel:write', 'channel:update'])]
    private ?array $translations = null;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
    }

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
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
            $category->addChannel($this);
        }
        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->categories->contains($category)) {
            $this->categories->removeElement($category);
            $category->removeChannel($this);
        }
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

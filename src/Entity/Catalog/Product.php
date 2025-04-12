<?php

namespace App\Entity\Catalog;

use ApiPlatform\Metadata\Patch;
use App\Repository\Catalog\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Storage\Asset;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[UniqueEntity(fields: ["identifier"], groups: ['product:create', 'product:update'])]
#[ApiResource(
    normalizationContext: ['groups' => ['product:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            denormalizationContext: [
                "groups" => ['product:create']
            ],
            validationContext: [
                "groups" => ['product:create']
            ]
        ),
        new Patch(
            denormalizationContext: [
                "groups" => ['product:update']
            ]
        ),
        new Delete()
    ]
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(groups:['product:read', 'product:create'])]
    #[Groups(['product:read', 'product:create', 'product:update'])]
    private ?string $identifier = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Asset::class, cascade: ['persist', 'remove'])]
    #[Groups(['product:read', 'product:update'])]
    private Collection $assets;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['product:read', 'product:create'])]

    private ?\DateTimeInterface $created = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['product:read', 'product:create'])]
    private ?\DateTimeInterface $updated = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['product:read', 'product:create'])]
    private ?bool $published = null;

    public function __construct()
    {
        $this->assets = new ArrayCollection();
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdentifier(): ?string
    {
        return $this->identifier;
    }

    public function setIdentifier(string $identifier): static
    {
        $this->identifier = $identifier;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): static
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

    public function getPublished(): ?bool
    {
        return $this->published;
    }

    public function setPublished(?bool $published): static
    {
        $this->published = $published;

        return $this;
    }
    public function getAssets(): Collection
    {
        return $this->assets;
    }
    
    public function addAsset(Asset $asset): self
    {
        if (!$this->assets->contains($asset)) {
            $this->assets[] = $asset;
            $asset->setProduct($this); // assumes Asset has setProduct()
        }
    
        return $this;
    }
    
    public function removeAsset(Asset $asset): self
    {
        if ($this->assets->removeElement($asset)) {
            // set the owning side to null (unless already changed)
            if ($asset->getProduct() === $this) {
                $asset->setProduct(null);
            }
        }
    
        return $this;
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

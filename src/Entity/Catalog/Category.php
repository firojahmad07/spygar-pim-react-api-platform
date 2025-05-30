<?php

namespace App\Entity\Catalog;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Entity\Setting\Channel;
use App\Repository\Catalog\CategoryRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations:[
        new Get(
            normalizationContext: [
                'groups' => ['category:read-single']
            ],
        ),
        new GetCollection(
            normalizationContext: [
                'groups' => ['category:read']
            ],
        ),
        new Post(
            denormalizationContext: [
                'groups' => ['category:write']
            ] 
        ),
        new Patch(
            denormalizationContext: [
                'groups' => ['category:partial-update']
            ]
        )
    ]
)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['category:read', 'category:read-single', 'channel:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['category:read', 'category:read-single', 'category:write', 'channel:read'])]
    private ?string $code = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: "children")]
    #[ORM\JoinColumn(name: "parent_id", referencedColumnName: "id", onDelete: "SET NULL")]
    #[Groups(['category:read', 'category:write'])]
    private ?self $parent = null;

    #[ORM\OneToMany(mappedBy: "parent", targetEntity: self::class)]
    #[Groups(['category:read', 'category:read-single'])]
    private Collection $children;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['category:read', 'category:read-single'])]
    private ?\DateTimeInterface $created = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    #[Groups(['category:read', 'category:read-single', 'category:partial-update', 'channel:read'])]
    private ?array $translations = null;

    #[ORM\ManyToMany(targetEntity: Channel::class, inversedBy: "categories")]
    #[ORM\JoinTable(name: "category_channel")]
    private Collection $channels;

    public function __construct()
    {
        $this->children = new ArrayCollection();
        $this->channels = new ArrayCollection();
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

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): self
    {
        $this->parent = $parent;
        return $this;
    }

    public function getChildren(): Collection
    {
        return $this->children;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    #[ORM\PrePersist]
    public function setCreated(): static
    {
        $this->created = new \DateTime();

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

    public function getChannels(): Collection
    {
        return $this->channels;
    }

    public function addChannel(Channel $channel): self
    {
        if (!$this->channels->contains($channel)) {
            $this->channels->add($channel);
            $channel->addCategory($this);
        }
        return $this;
    }

    public function removeChannel(Channel $channel): self
    {
        if ($this->channels->contains($channel)) {
            $this->channels->removeElement($channel);
            $channel->removeCategory($this);
        }
        return $this;
    }
}

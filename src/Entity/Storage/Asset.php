<?php 
namespace App\Entity\Storage;

use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use App\Entity\Security\User;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\Api\AssetController;
use Doctrine\ORM\Mapping\PreRemove;
use ApiPlatform\OpenApi\Model;
use App\Entity\Catalog\Product;
use App\Validator\Constraints\AssetNotUsedAsAvatar;

#[ORM\Entity]
#[Vich\Uploadable]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: ['groups' => ['asset:read']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            controller: AssetController::class,
            input: false, // 👈 THIS is important
            inputFormats: ['multipart' => ['multipart/form-data']],
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary'
                                    ]
                                ]
                            ]
                        ]
                    ])
                )
            )
        ),
        new Delete()
    ]
)]
class Asset
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['asset:read', 'product:read', 'user:read'])]
    private $id;

    #[Vich\UploadableField(mapping: 'asset_storage', fileNameProperty: 'fileName')]
    #[Groups(['asset:create'])]
    private ?File $file = null;

    #[ORM\Column(nullable: true)]
    // #[Assert\NotNull]
    #[Groups(['asset:read', 'product:read', 'user:read'])]
    private ?string $fileName = null;

    #[ORM\Column(nullable: true)]
    // #[Assert\NotNull]
    #[Groups(['asset:read', 'user:read'])]
    private ?string $filePath = null;
    
    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'images')]
    #[Groups(['asset:write'])]
    #[AssetNotUsedAsAvatar]
    private ?Product $product = null;

    #[ORM\OneToOne(mappedBy: 'avatar', targetEntity: User::class)]
    private ?User $user = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): self
    {
        $this->file = $file;

        if ($file !== null) {
            $this->updatedAt = new \DateTimeImmutable();
        }

        return $this;
    }

    public function getFileName() 
    {
        return $this->fileName;
    }

    public function setFileName(string $fileName) 
    {
        $this->fileName = $fileName;

        return $this;
    }
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    // Uncomment and use this if Product relation is re-enabled
    public function getProduct(): ?Product
    {
        return $this->product;
    }
    
    public function setProduct(?Product $product): self
    {
        $this->product = $product;
    
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
    
    #[PreRemove]
    public function unlinkUserAvatar(): void
    {
        if ($this->user !== null) {
            $this->user->setAvatar(null);
        }
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

}

<?php

namespace App\Controller\Api;

use App\Entity\Storage\Asset;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Vich\UploaderBundle\Handler\UploadHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

#[AsController]
class AssetController
{
    public function __construct(
        private EntityManagerInterface $em,
        private UploadHandler $uploadHandler,
        private SerializerInterface $serializer,
        private ParameterBagInterface $parameters
    ) {}

    public function __invoke(Request $request): JsonResponse
    {
        /** @var UploadedFile|null $uploadedFile */
        $uploadedFile = $request->files->get('file');
        $uploadDirectoryPath = $this->parameters->get('upload_path');
        // dump($uploadedFile);die;
        if (!$uploadedFile) {
            throw new \RuntimeException('No file uploaded');
        }

        $asset = new Asset();
        $asset->setFile($uploadedFile);
        // triggers VichUploader to handle it
        $upload = $this->uploadHandler->upload($asset, 'file');
        $fileName = $asset->getFileName();
        $asset->setFilePath($uploadDirectoryPath . '/' . $fileName);
        $this->em->persist($asset);
        $this->em->flush();
        

        $json = $this->serializer->serialize($asset, 'jsonld', ['groups' => ['asset:read']]);

        return new JsonResponse($json, 201, [], true);
    }
}

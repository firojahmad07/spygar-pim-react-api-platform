<?php

namespace App\Repository\Catalog;

use App\Entity\Catalog\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Category>
 */
class CategoryRepository extends ServiceEntityRepository
{
    private $entityManager;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
        $this->entityManager = $this->getEntityManager();
    }

    public function saveData(array $record) 
    {
        $parent = $this->findOneBy(['code' => $record['parent']]);
        $categoryInstance = $this->findOneBy(['code' => $record['code']]);
        $categoryInstance = !empty($categoryInstance) ? $categoryInstance : new Category;
        $categoryInstance->setCode($record['code']);

        if (!empty($parent)) {
            $categoryInstance->setParent($parent);
        }
        $categoryInstance->setCreated(new \DateTime());
        $categoryInstance->setTranslations($this->getTranslations($record));
        
        $this->entityManager->persist($categoryInstance);
        $this->entityManager->flush();
    }

    public function getTranslations($record)
    {
        $skippedKeys = ['id', 'code', 'parent'];
        $translations = [];
        foreach($record as $key => $value) {
            if (in_array($key, $skippedKeys)) {
                continue;
            }
            $localeCode = preg_replace('/^.*-/', '', $key);
            $translations[$localeCode] = $value;
        }

        return $translations;
    }
    //    /**
    //     * @return Category[] Returns an array of Category objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('c.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Category
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

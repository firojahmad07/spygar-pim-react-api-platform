<?php

namespace App\Repository\Catalog;

use App\Entity\Catalog\Locale;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Locale>
 */
class LocaleRepository extends ServiceEntityRepository
{
    private $entityManager;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Locale::class);
        $this->entityManager = $this->getEntityManager();
    }

    public function saveData(array $record) 
    {
        $localeInstance = $this->findOneBy(['code' => $record['code']]);
        $localeInstance = !empty($localeInstance) ? $localeInstance : new Locale;
        
        $localeInstance->setCode($record['code']);
        $localeInstance->setIsActive(false);

        $this->entityManager->persist($localeInstance);
        $this->entityManager->flush();
    }
    //    /**
    //     * @return Locale[] Returns an array of Locale objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('l')
    //            ->andWhere('l.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('l.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Locale
    //    {
    //        return $this->createQueryBuilder('l')
    //            ->andWhere('l.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

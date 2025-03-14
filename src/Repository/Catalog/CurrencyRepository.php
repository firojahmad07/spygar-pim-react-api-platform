<?php

namespace App\Repository\Catalog;

use App\Entity\Catalog\Currency;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Currency>
 */
class CurrencyRepository extends ServiceEntityRepository
{
    private $entityManager;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Currency::class);
        $this->entityManager = $this->getEntityManager();
    }

    public function saveData(array $record) 
    {
        $currencyInstance = $this->findOneBy(['code' => $record['code']]);
        $currencyInstance = !empty($currencyInstance) ? $currencyInstance : new Currency;
        $currencyInstance->setCode($record['code']);
        $active = ("1" == $record['activated']) ? true : false;
        $currencyInstance->setIsActive($active);

        $this->entityManager->persist($currencyInstance);
        $this->entityManager->flush();
    }
    //    /**
    //     * @return Currency[] Returns an array of Currency objects
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

    //    public function findOneBySomeField($value): ?Currency
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

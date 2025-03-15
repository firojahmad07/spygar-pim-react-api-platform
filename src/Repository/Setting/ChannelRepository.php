<?php

namespace App\Repository\Setting;

use App\Entity\Setting\Channel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\Catalog\CategoryRepository;

/**
 * @extends ServiceEntityRepository<Channel>
 */
class ChannelRepository extends ServiceEntityRepository
{
    private $entityManager;
    public function __construct(
        ManagerRegistry $registry,
        private CategoryRepository $categoryRepository
    ) {
        parent::__construct($registry, Channel::class);
        $this->entityManager = $this->getEntityManager();
    }

    public function saveData(array $record) 
    {
        dump($record);
        $channelInstance    = $this->findOneBy(['code' => $record['code']]);
        $categroyInstance   = $this->categoryRepository->findOneBy(['code' => $record['tree'], 'parent' => null]);
        $channelInstance    = !empty($channelInstance) ? $channelInstance : new Channel;

        $locales    = explode(',', $record['locales']);
        $currencies = explode(',', $record['currencies']);

        $channelInstance->setCode($record['code']);
        $channelInstance->setLocales($locales);
        $channelInstance->setCurrencies($currencies);
        $channelInstance->addCategory($categroyInstance);
        $channelInstance->setTranslations($this->getTranslations($record));

    
        $this->entityManager->persist($channelInstance);
        $this->entityManager->flush();
    }

    public function getTranslations($record)
    {
        $skippedKeys = ['locales', 'code', 'currencies', 'tree'];
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
    //     * @return Channel[] Returns an array of Channel objects
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

    //    public function findOneBySomeField($value): ?Channel
    //    {
    //        return $this->createQueryBuilder('c')
    //            ->andWhere('c.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}

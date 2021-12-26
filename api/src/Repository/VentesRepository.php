<?php

namespace App\Repository;

use App\Entity\Ventes;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Ventes|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ventes|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ventes[]    findAll()
 * @method Ventes[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VentesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ventes::class);
    }

    // /**
    //  * @return Ventes[] Returns an array of Ventes objects
    //  */

    public function findGroupeByDate()
    {


        $entityManager = $this->getEntityManager();

        /*$result = $entityManager->createQueryBuilder('Ventes')
        ->select(' YEAR(Ventes.date) AS gByear , MONTH(Ventes.date) AS gBmonth , AVG(Ventes.prix_moyen_m2)')
        ->groupBy('gByear,gBmonth')
        ->getQuery()
        ->getResult(); */
     


       /* $query = $entityManager->createQuery(
            'SELECT  to_char(p.timestamp, "YYYY")  as annee, p.prix_moyen_m2 as moy
            FROM App\Entity\Ventes p'

        );*/


       
    
        return $this->createQueryBuilder('a')
            ->select("to_char(a.date, 'YYYY') AS year , to_char(a.date ,'MM') AS month , AVG(a.prix_moyen_m2) as moy")
            ->groupBy('year,month')
            ->orderBy('month', 'ASC')
            ->getQuery()
            ->getResult();

        }


        //return $query->getResult();

    



        public function findNbVentes(string $type,string $date_debut, string $date_fin)
        
        {

            switch ($type) {
                case "year":
                    $query =  $this->createQueryBuilder('a')
                    ->select("to_char(a.date, 'YYYY') AS year , sum(a.nombre_ventes) as nombre_ventes")
                    ->where("a.date BETWEEN '$date_debut' AND  '$date_fin' ")
                    ->groupBy('year')
                    ->orderBy('year', 'ASC')
                    ->getQuery()
                    ->getResult();
                    break;
                case "month":
                    $query =  $this->createQueryBuilder('a')
                    ->select("to_char(a.date, 'YYYY') AS year , to_char(a.date ,'MM') AS month , sum(a.nombre_ventes) as nombre_ventes")
                    ->where("a.date BETWEEN '$date_debut' AND  '$date_fin' ")
                    ->groupBy('year,month')
                    ->orderBy('month', 'ASC')
                    ->getQuery()
                    ->getResult();
                    break;
                case "day":
                    $query =  $this->createQueryBuilder('a')
                    ->select("a.date as date , a.nombre_ventes as nombre_ventes")
                    ->where("a.date BETWEEN '$date_debut' AND  '$date_fin' ")
                    ->orderBy('date', 'ASC')
                    ->getQuery()
                    ->getResult();
                    break;
                }


        return $query;
    }




    /*
    public function findOneBySomeField($value): ?Ventes
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

}

<?php

namespace App\DataFixtures;

use App\Entity\Ventes;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use EasyRdf\Literal\Date;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        if (($open = fopen(dirname(__FILE__).'/data/valeursfoncieres-2021-s1.csv', "r")) !== FALSE) {
            $a=0;
            while (($data = fgetcsv($open, 1000, "|")) !== FALSE && $a<10000) {
                $array[] = $data;
                $vente = new Ventes();
                $vente->setDate(new DateTime())
                ->setPrixMoyenM2(123)
                ->setNombreVentes(123)
                ->setRegion($data[9]);

                $manager->persist($vente);
                $a++;
            }

            fclose($open);
        }
        // $product = new Product();
        // $manager->persist($product);

        $manager->flush();
    }
}

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

        //set php memory limit
        ini_set('memory_limit', '18024M');

        //create an empty list of Ventes
        $listVente = array();

        if (($open = fopen(dirname(__FILE__) . '/data/valeursfoncieres-2021-s1.csv', "r")) !== FALSE) {
            $a = 0;
            while (($data = fgetcsv($open, 0, "|")) !== FALSE /*&& $a < 50000*/) {
                //skip the first line
                if ($a > 1) {
                    $array[] = $data;

                    //if type = aprtement or maison
                    $type = $data[36];
                    if (strcmp($type, "Maison") == 0 || strcmp($type, "Appartement") == 0) {

                        //if it's a "Vente"
                        $typeVente = $data[9];
                        $valeurFociere = (int) $data[10];
                        $surface = (int) $data[42];
                        $date = $data[8];

                        if (strcmp($typeVente, "Vente") == 0 && $valeurFociere > 0 && $surface > 0) {
                            $str_arr = explode("/", $date);
                            $date = $str_arr[1] . "/" . $str_arr[0] . "/" . $str_arr[2];
                            //if this key doesn't exist
                            if (!array_key_exists($date, $listVente)) {


                                //set date to the english format 

                                // $str_arr = explode("/", $date);
                                // $date = $str_arr[1] . "/" . $str_arr[0] . "/" . $str_arr[2];


                                $prix_moy_m² =  $valeurFociere /  $surface;


                                $vente = new Ventes();
                                $vente->setDate(new DateTime($date))
                                    ->setPrixMoyenM2($prix_moy_m²)
                                    ->setNombreVentes(1)
                                    ->setRegion(gettype($data[42]));


                                $listVente[$date] = $vente;
                            } else { //if key exists
                                $vente = $listVente[$date];
                                $prix_moy_m² = $vente->getPrixMoyenM2();
                                $vente->setNombreVentes($vente->getNombreVentes() + 1);

                                $prix_moy_m² = ($prix_moy_m² + ($valeurFociere / $surface)); // $vente->getNombreVentes();
                                $vente->setPrixMoyenM2($prix_moy_m²);

                                $listVente[$date] = $vente;
                            }
                        }
                    }
                }
                $a++;
            }

            fclose($open);
        }
        // $product = new Product();
        // $manager->persist($product);

        foreach ($listVente as &$vente) {
            $vente->setPrixMoyenM2($vente->getPrixMoyenM2() / $vente->getNombreVentes());
            $manager->persist($vente);
        }


        $manager->flush();
    }
}

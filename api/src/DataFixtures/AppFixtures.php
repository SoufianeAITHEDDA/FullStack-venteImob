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
        //all french' regions
        $regions = $this->getRegion();
        if (($open = fopen(dirname(__FILE__) . '/data/valeursfoncieres-2021-s1.csv', "r")) !== FALSE ) {
            $a = 0;
            while (($data = fgetcsv($open, 0, "|")) !== FALSE && $a < 400000) {
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
                        $numDepartement = $data[18];
                        
                        if(strcmp($numDepartement[0], "0") == 0){
                            $numDepartement = $numDepartement[1] ; 
                            $numDepartement = $numDepartement;
                            
                        }
                        //var_dump(date())
                        $region = $regions[$numDepartement];
                        
                        

                        if (strcmp($typeVente, "Vente") == 0 && $valeurFociere > 0 && $surface > 0) {
                            $str_arr = explode("/", $date);
                            $date = $str_arr[1] . "/" . $str_arr[0] . "/" . $str_arr[2];
                            //if this key doesn't exist
                            $key = $date."_".$region;
                            if (!array_key_exists($key, $listVente)) {
                                //set date to the english format 

                                // $str_arr = explode("/", $date);
                                // $date = $str_arr[1] . "/" . $str_arr[0] . "/" . $str_arr[2];

                                
                                $prix_moy_m² =  $valeurFociere /  $surface;


                                $vente = new Ventes();
                                $vente->setDate(new DateTime($date))
                                    ->setPrixMoyenM2($prix_moy_m²)
                                    ->setNombreVentes(1)
                                    ->setRegion($region);


                                $listVente[$key] = $vente;
                            } else { //if key exists
                                $vente = $listVente[$key];
                                $prix_moy_m² = $vente->getPrixMoyenM2();
                                $vente->setNombreVentes($vente->getNombreVentes() + 1);

                                $prix_moy_m² = ($prix_moy_m² + ($valeurFociere / $surface)); // $vente->getNombreVentes();
                                $vente->setPrixMoyenM2($prix_moy_m²);

                                $listVente[$key] = $vente;
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


 //departement => region
 public function getRegion(): array{

    $regions = array();
    if (($open = fopen(dirname(__FILE__) . '/data/departements-region.csv', "r")) !== FALSE ) {
        
        while (($data = fgetcsv($open, 0, ",")) !== FALSE ) {
            
                $array[] = $data;
                $key = $data[0];
                $regions[$key] = $data[2];
        }
        fclose($open);
    }



return $regions;
        
}


   
    
}

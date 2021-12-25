<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VentesRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\getbymonth;

#[ORM\Entity(repositoryClass: VentesRepository::class)]
#[ApiResource(collectionOperations: [
    'get',
    'getbymonths' => [
        'method' => 'GET',
        'path' => '/ventes/months',
        'controller' => getbymonth::class,
    ],
])]
class Ventes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'date')]
    private $date;

    #[ORM\Column(type: 'string', length: 255)]
    private $region;

    #[ORM\Column(type: 'float')]
    private $prix_moyen_m2;

    #[ORM\Column(type: 'integer')]
    private $nombre_ventes;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getPrixMoyenM2(): ?float
    {
        return $this->prix_moyen_m2;
    }

    public function setPrixMoyenM2(float $prix_moyen_m2): self
    {
        $this->prix_moyen_m2 = $prix_moyen_m2;

        return $this;
    }

    public function getNombreVentes(): ?int
    {
        return $this->nombre_ventes;
    }

    public function setNombreVentes(int $nombre_ventes): self
    {
        $this->nombre_ventes = $nombre_ventes;

        return $this;
    }
}

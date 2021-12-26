<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use App\Repository\VentesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]

class findGroupByP extends AbstractController
{
    private $ventesRepository;

    public function __construct (VentesRepository $ventesRepository)
    {
        $this->ventesRepository = $ventesRepository;
    }

    public function __invoke(Request $request): iterable
    {

    $type = $request->query->get('type');
    $date_debut = $request->query->get('date_debut');
    $date_fin = $request->query->get('date_fin');

    echo $type;
    

    return $this->ventesRepository->findNbVentes($type,$date_debut,$date_fin);
    }
}

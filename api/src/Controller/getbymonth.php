<?php

namespace App\Controller;

use App\Repository\VentesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]

class getbymonth extends AbstractController
{
    private $ventesRepository;

    public function __construct(VentesRepository $ventesRepository)
    {
        $this->ventesRepository = $ventesRepository;
    }

    public function __invoke(): iterable
    {
    return $this->ventesRepository->findGroupeByDate();
    }
}


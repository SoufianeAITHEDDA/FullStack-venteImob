<?php

namespace App\Tests\Api;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\Ventes;


class VentesTest extends ApiTestCase
{
    public function testgetventes()
    {
        $response = static::createClient()->request('GET', '/ventes',[
            'headers' => ['Content-Type' => 'application/json']
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains([
            '@context' => '/contexts/Ventes',
            '@type' =>     'hydra:Collection',
            'hydra:member' => [
                '@type'=> 'Ventes',
                'region'=> 'Auvergne-Rhône-Alpes',
                          
            ],
        ]);
    }

    public function testgetprix_M2parmonth()
    {
        $response = static::createClient()->request('GET', '/ventes/months',[
            'headers' => ['Content-Type' => 'application/json']
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains([
            '@context' => '/contexts/Ventes',
            '@type' =>     'hydra:Collection',
            'hydra:member' => [
                'year'=> '2021',
                "month"=> '01'          
            ],
        ]);
    }

    public function testgetparmonth()
    {
        $response = static::createClient()->request('GET', '/ventes/months',[
            'headers' => ['Content-Type' => 'application/json']
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains([
            '@context' => '/contexts/Ventes',
            '@type' =>     'hydra:Collection',
            'hydra:member' => [
                'year'=> '2021',
                "month"=> '01'          
            ],
        ]);
    }


    public function testgetfind()
    {
        $response = static::createClient()->request('GET', '/ventes/find?type=month&date_debut=01-01-2021&date_fin=05-01-2021',[
            'headers' => ['Content-Type' => 'application/json']
        ]);

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');

        $this->assertResponseStatusCodeSame(200);
        $this->assertJsonContains([
            '@id'=> '/ventes',
            '@context' => '/contexts/Ventes',
            '@type' =>     'hydra:Collection',
            'hydra:member' => [
                'year'=> '2021',
                "month"=> '01'          
            ],
        ]);
    }

}

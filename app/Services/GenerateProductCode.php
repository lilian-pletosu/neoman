<?php

namespace App\Services;

use Faker\Factory;

class GenerateProductCode
{
    private Factory $generator;

    public function __construct()
    {
        $this->generator = new Factory();
    }

    public function __invoke()
    {
        $code = $this->generator->create()->unique()->buildingNumber;
        $date = today()->day . today()->month . today()->year;
        return $date . $code;

    }
}

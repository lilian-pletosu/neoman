<?php

namespace App\Services;

use Faker\Factory;
use Illuminate\Database\Eloquent\Model;

class GenerateProductCode
{
    private Factory $generator;

    public function __construct()
    {
        $this->generator = new Factory();
    }

    public function __invoke(Model $model)
    {
        $code = $this->generateCode();
        if ($model::where('product_code', $code)->first()) {
            return $this->generateCode();
        }
        return $code;
    }

    /**
     * @return Factory
     */
    private function generateCode(): int
    {
        return $this->generator->create()->unique()->buildingNumber;
    }

}

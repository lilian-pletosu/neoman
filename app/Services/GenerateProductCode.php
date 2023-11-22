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
        $rand = random_int(0, 99999);
        return str_pad($rand, 5, 0, STR_PAD_LEFT);
    }

}

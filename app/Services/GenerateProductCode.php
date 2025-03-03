<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class GenerateProductCode
{
    public function __invoke(Model $model)
    {
        $code = $this->generateCode();
        if ($model::where('product_code', $code)->first()) {
            return $this->__invoke($model);
        }
        return $code;
    }

    private function generateCode(): string
    {
        return substr(str_replace('-', '', Uuid::uuid4()->toString()), 0, 10);
    }
}

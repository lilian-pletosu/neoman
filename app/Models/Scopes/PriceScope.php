<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class PriceScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $builder->when(
            $model->getConnection()->getSchemaBuilder()->hasColumn($model->getTable(), 'price'),
            function (Builder $query) use ($model) {
                $query->addSelect([
                    'price' => $model->getConnection()->raw('FORMAT(price, 2) as formatted_price')
                ]);
            }
        );
    }
}

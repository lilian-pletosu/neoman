<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TranslateNameScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model)
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ro' ? 'ru' : 'ro';

        $builder->with(['translations' => function ($query) use ($currentLocale, $reserveLanguage) {
            $query->where('locale', $currentLocale)
                ->orWhere('locale', $reserveLanguage);
        }]);
    }
}

<?php

namespace App\SchemaForms;

use App\Models\SubSubCategory;

class AttributeSchema
{

    public function __invoke()
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ru' ? 'ro' : 'ru';
        return [
            [
                'name' => "name ${currentLocale}",
                'value' => '',
                'type' => 'text',
                'placeholder' => "name ${currentLocale}",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => "name ${reserveLanguage}",
                'value' => '',
                'type' => 'text',
                'placeholder' => "name ${reserveLanguage}",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'category_id',
                'value' => '',
                'type' => 'select',
                'label' => 'sub_sub_category',
                'placeholder' => 'sub_sub_category',
                'options' => SubSubCategory::orderBy('name')->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->getTranslation()->name ?? $f->getTranslation($reserveLanguage)->name])->toArray(),
                'rules' => [
                    'required'
                ],
            ],
        ];
    }
}

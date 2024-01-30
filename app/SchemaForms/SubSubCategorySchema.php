<?php

namespace App\SchemaForms;

use App\Models\SubCategory;

class SubSubCategorySchema
{
    public function __invoke()
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ru' ? 'ro' : 'ru';
        return [
            [
                'name' => "name $currentLocale",
                'value' => '',
                'type' => 'text',
                'placeholder' => "name $currentLocale",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => "name $reserveLanguage",
                'value' => '',
                'type' => 'text',
                'placeholder' => "name $reserveLanguage",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],

            [
                'name' => 'subcategory_id',
                'value' => '',
                'type' => 'select',
                'placeholder' => 'name',
                'label' => 'subcategory',
                'hydrated_by' => 'name',
                'options' => SubCategory::orderBy('name')->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name])->toArray(),
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'image',
                'value' => '',
                'type' => 'file',
                'label' => 'image',
                'placeholder' => 'image',
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
        ];
    }
}

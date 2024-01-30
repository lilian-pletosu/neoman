<?php

namespace App\SchemaForms;

class CategorySchema
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

//            [
//                'name' => 'currency',
//                'value' => '',
//                'type' => 'select',
//                'placeholder' => 'currency',
//                'options' => array_map(fn($c) => ['id' => $c, 'value' => $c], config('currencies')),
//                'rules' => [
//                    'required'
//                ],
//            ],

//                [
//                    'name' => 'type_id',
//                    'value' => '',
//                    'type' => 'select',
//                    'placeholder' => 'type',
//                    'label' => 'machinery_type',
//                    'hydrated_by' => 'machinery_type',
//                    'options' => MachineryType::getSelectableList(),
//                    'rules' => [
//                        'required'
//                    ],
//                ],
        ];
    }
}

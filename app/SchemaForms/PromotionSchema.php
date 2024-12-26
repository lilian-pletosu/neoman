<?php

namespace App\SchemaForms;

class PromotionSchema
{
    public function __invoke()
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ro' ? 'ru' : 'ro';
        return [
            [
                'name' => 'name',
                'value' => '',
                'type' => 'text',
                'placeholder' => 'name',
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => "description",
                'value' => '',
                'type' => 'textarea',
                'placeholder' => "description",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'is_enabled',
                'value' => '',
                'type' => 'select',
                'label' => 'Status',
                'placeholder' => 'status',
                'options' => [['id' => 0, 'value' => 'inactive'], ['id' => 1, 'value' => 'active']],
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

<?php

namespace App\SchemaForms;

class BrandSchema
{
    public function __invoke()
    {
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
                'name' => 'description',
                'value' => '',
                'type' => 'textarea',
                'placeholder' => 'description',
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'website',
                'value' => '',
                'type' => 'text',
                'placeholder' => 'website',
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'is_enabled',
                'value' => '',
                'type' => 'select',
                'placeholder' => 'status',
                'options' => ['active', 'inactive'],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'image',
                'value' => '',
                'type' => 'file',
                'placeholder' => 'image',
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

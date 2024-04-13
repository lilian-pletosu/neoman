<?php

namespace App\SchemaForms;

class BannerSchema
{
    public function __invoke()
    {
        return [
            [
                'name' => 'title',
                'value' => '',
                'type' => 'text',
                'placeholder' => 'name',
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'link',
                'value' => '',
                'type' => 'text',
                'placeholder' => 'link',
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],

            [
                'name' => 'is_active',
                'value' => '',
                'type' => 'select',
                'label' => 'Status',
                'placeholder' => 'status',
                'options' => [['id' => 0, 'value' => 'inactive'], ['id' => 1, 'value' => 'active']],
                'rules' => [
                    'required'
                ],
            ], [
                'name' => 'page',
                'value' => '',
                'type' => 'select',
                'label' => 'Page',
                'placeholder' => 'page',
                'options' => array_map(fn($c) => ['id' => $c, 'value' => $c], config('pages')),
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

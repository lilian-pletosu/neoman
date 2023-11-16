<?php

namespace App\SchemaForms;

use App\Models\Brand;

class ProductSchema
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
                'name' => 'price',
                'value' => '',
                'type' => 'number',
                'placeholder' => 'price',
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'brand_id',
                'value' => '',
                'type' => 'select',
                'placeholder' => 'brand',
                'options' => Brand::orderBy('name')->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name])->toArray(),
                'rules' => [
                    'required'
                ],
            ],
//            [
//                'name' => 'image',
//                'value' => '',
//                'type' => 'file',
//                'placeholder' => 'image',
//                'options' => [],
//                'rules' => [
//                    'required'
//                ],
//            ],

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

<?php

namespace App\SchemaForms;

use App\Models\Brand;
use App\Models\SubSubCategory;

class ProductSchema
{

    public function __invoke()
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ro' ? 'ru' : 'ro';
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
                'name' => "description $currentLocale",
                'value' => '',
                'type' => 'textarea',
                'placeholder' => "description $currentLocale",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => "description $reserveLanguage",
                'value' => '',
                'type' => 'textarea',
                'placeholder' => "description $reserveLanguage",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'price',
                'value' => '12.0',
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
                'label' => 'Brand',
                'placeholder' => 'brand',
                'options' => Brand::orderBy('name')->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name])->toArray(),
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => 'sub_sub_category_id',
                'value' => '',
                'type' => 'select',
                'label' => 'sub_sub_category',
                'placeholder' => 'sub_sub_category',
                'options' => SubSubCategory::orderBy('name')->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->getTranslation()->name ?? $f->getTranslation($reserveLanguage)->name])->toArray(),
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


        ];
    }
}

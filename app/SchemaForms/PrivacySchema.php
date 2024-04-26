<?php

namespace App\SchemaForms;

class PrivacySchema
{

    public function __invoke()
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ro' ? 'ru' : 'ro';
        return [
            [
                'name' => "title $currentLocale",
                'value' => '',
                'type' => 'text',
                'placeholder' => "title $currentLocale",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => "title $reserveLanguage",
                'value' => '',
                'type' => 'text',
                'placeholder' => "title $reserveLanguage",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => "content $currentLocale",
                'value' => '',
                'type' => 'textarea',
                'placeholder' => "content $currentLocale",
                'options' => [],
                'rules' => [
                    'required'
                ],
            ],
            [
                'name' => "content $reserveLanguage",
                'value' => '',
                'type' => 'textarea',
                'placeholder' => "content $reserveLanguage",
                'options' => [],
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

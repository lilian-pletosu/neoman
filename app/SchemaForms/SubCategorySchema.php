<?php

namespace App\SchemaForms;

use App\Models\Category;

class SubCategorySchema
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
                'name' => 'parent_id',
                'value' => '',
                'type' => 'select',
                'placeholder' => 'name',
                'label' => 'category',
                'hydrated_by' => 'name',
                'options' => Category::active()->where('level', 1)->orderBy('name')->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name])->toArray(),
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

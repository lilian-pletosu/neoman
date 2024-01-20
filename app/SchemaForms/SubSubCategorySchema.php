<?php

namespace App\SchemaForms;

use App\Models\SubCategory;

class SubSubCategorySchema
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

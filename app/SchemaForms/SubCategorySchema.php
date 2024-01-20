<?php

namespace App\SchemaForms;

use App\Models\Category;

class SubCategorySchema
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
                'name' => 'category_id',
                'value' => '',
                'type' => 'select',
                'placeholder' => 'name',
                'label' => 'category',
                'hydrated_by' => 'name',
                'options' => Category::orderBy('name')->get()->map(fn($f) => ['id' => $f->id, 'value' => $f->name])->toArray(),
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

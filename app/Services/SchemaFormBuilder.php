<?php

namespace App\Services;

class SchemaFormBuilder
{


    public function __invoke(string $model,
                             string $method,
                             string $endpoint,
                             int    $resourceId = null,
                             string $relation = null,
                             bool   $hasTranslate = false,
                             string $routeParamName = null)
    {
        //for lang
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ru' ? 'ro' : 'ru';


        //input, textarea, select, checkbox, radio,

        $schemaClass = new ("\App\SchemaForms\\{$model}Schema");

        $relations = [];

        //try to fetch the resource
        if ($resourceId) {

            $modelClass = new ("\App\Models\\{$model}");
            $resource = $modelClass->find($resourceId);


            if (!$hasTranslate) {
                //loop the schema fields and attach the value from the model
                $schema = array_map(function ($s) use ($resource) {
                    $s['value'] = $resource->{$s['name']}; //read from model or empty
                    return $s;
                }, $schemaClass());
            } // --------------------------------
            else {

                $schema = array_map(function ($s) use ($resource) {
                    if (array_key_exists(1, explode(' ', $s['name']))) {
                        $s['value'] = $resource->translate(explode(' ', $s['name'])[1])->{explode(' ', $s['name'])[0]}; //read from model or empty
                    } else {
                        $s['value'] = $resource->{explode(' ', $s['name'])[0]}; //read from model or empty
                    }
                    return $s;
                }, $schemaClass());
            }


            $relations = $resource->$relation?->toArray();


        } else {
            $schema = $schemaClass();
        }

        return [
            'resourceName' => $routeParamName ? strtolower($routeParamName) : strtolower($model),
            'method' => $method,
            'endpoint' => $endpoint,
            'resourceId' => $resourceId,
            'fields' => $schema,
            'relations' => $relations
        ];
    }

    /* example of output

       return [
           'method' => 'post',
           'endpoint' => '/customers',
           'resourceId'  => 1,
           'fields'  => [
               'first_name' => [
                   'value' => 'Dan',
                   'type'  => 'text',
                   'options' => []
               ],
               'last_name' => [
                   'value'    => 'Pletosu',
                   'type'      => 'text',
                   'options' => []
               ]
         ]
       ];

       */

}

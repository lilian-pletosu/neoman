<?php

namespace App\Services;

class SchemaFormBuilder
{


    public function __invoke(string $model,
                             string $method,
                             string $endpoint,
                             int    $resourceId = null,
                             string $relation = null,
                             string $routeParamName = null)
    {
        //input, textarea, select, checkbox, radio,

        $schemaClass = new ("\App\SchemaForms\\{$model}Schema");

        $relations = [];

        //try to fetch the resource
        if ($resourceId) {

            $modelClass = new ("\App\Models\\{$model}");
            $resource = $modelClass->find($resourceId);

            //loop the schema fields and attach the value from the model
            $schema = array_map(function ($s) use ($resource) {
                $s['value'] = $resource->{$s['name']}; //read from model or empty
                return $s;
            }, $schemaClass());


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

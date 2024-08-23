<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DataTableService
{


    public array $resourceColumns = ['*'];
    public array $relations = [];
    public string $resourceName;
    public bool $editInModal = true;
    public array $filters;
    public string $resourceRoute = '';
    public string $searchRoute = '';
    public array $formatters = [];
    public array $columnsOrder = [];
    private Model $resource;
    private Builder $query;  //this is checked on vue js side, as empty
    private int|null $perPage = 20;
    private array $extraColumns = [];
    private array $relationFields = [];
    private string $defaultSortField;
    private string $defaultSortDirection = 'asc';
    private array $whereConditions = [];

    public function __construct()
    {
        $this->filters = request()->all(['search', 'field', 'direction']);
    }

    /**
     * providing the model against to query;
     * @param string $model
     */
    public function setResource(string $model): string|static
    {
        $class = "\App\Models\\$model";

        try {
            new $class instanceof Model;
        } catch (ModelNotFoundException $exception) {
            return $exception->getMessage();
        }

        $this->resourceName = strtolower($model);
        $this->resource = (new $class());
        $this->query = $class::query();

        return $this;
    }

    /**
     * set the model columns that will be displayed in table;
     *
     * these columns will be sortable;
     *
     * @param array $columns
     * @return DataTableService
     */
    public function setResourceColumns(array $columns): static
    {
        //set the selectable and searcheable columns of intended resource
        $this->resourceColumns = $columns;

        //set as sortable field the very first column of the given list (array); this sortable may be changed later
        $this->defaultSortField = current($columns);

        // Set the default order of the fields for listing in datatable
        $this->columnsOrder = $columns;

        return $this;
    }

    /**
     * request more resource columns as needed;
     *
     * useful when call a belongsTo relation and therefore need to provide the foreign key;
     *
     * these extra columns will be hidden, not listed in the table columns;
     *
     * @param array $extraColumns
     * @return $this
     */
    public function expandResourceQuery(array $extraColumns): static
    {
        $this->extraColumns = ['id', ...$extraColumns];

        return $this;
    }

    /**
     * set the model's relation's fields to be displayed as column;
     *
     * these related data will appear concatenated;
     *
     * there may be selected one or more columns to be concatenated in the final column data;
     *
     * also, the column with related data may have a custom label (table column head)
     *
     * multiple relations and / or columns from the same related model can be set individually
     *
     * @param string $relation
     * @param string $label
     * @param array $fields
     * @param string $separator
     * @return $this
     */
    public function setRelationColumn(string $relation, string $label, array $fields, string $separator = ', '): static
    {
        //do snake() the relation name to fit on Vue side the name of the relation with the relations as key
        //as long as Laravel does snake() the name of relations returned by json to Vue
        $this->relations[] = ['label' => $label, 'relation' => Str::of($relation)->snake(), 'fields' => $fields, 'separator' => $separator];

        //append the fields for an exising relation to that list, as required in queries later on
        $existing = $this->relationFields[$relation] ?? [];
        $this->relationFields[$relation] = array_unique(array_merge($existing, $fields));

        array_push($this->columnsOrder, $label);

        return $this;
    }

    /**
     * indicate if the link on each item will open edit modal or redirect to edit route;
     *
     * default true;
     *
     * @param bool $editInModal
     * @return $this
     */
    public function editInModal(bool $editInModal): static
    {
        $this->editInModal = $editInModal;

        return $this;
    }

    /**
     * default true
     *
     * @param bool $cloneRecipe
     * @return $this
     */
    public function cloneRecipe(bool $cloneRecipe): static
    {
        $this->cloneRecipe = $cloneRecipe;

        return $this;
    }

    /**
     * provide the route base name where submission or get requests of filter or search will hit;
     *
     * @param string searchRoute
     * @return $this
     */
    public function setSearchRoute(string $searchRoute): static
    {
        $this->searchRoute = $searchRoute;

        return $this;
    }

    /**
     * provide the route base name where submission or get requests of filter or search will hit;
     *
     * @param string $resourceRoute
     * @return $this
     */
    public function setResourceRoute(string $resourceRoute): static
    {
        $this->resourceRoute = $resourceRoute;

        return $this;
    }

    public function setInventoryCategoryPageRoute(array $route): static
    {
        $this->inventoryCategoryPageRoute = $route;
        return $this;
    }

    /**
     * force the table to be sorted;
     *
     * default is sorted anyway by the first given model field;
     *
     * @param string $field
     * @param string $direction
     * @return $this
     */
    public function sortBy(string $field, string $direction = 'asc'): static
    {
        $this->defaultSortField = $field;
        $this->defaultSortDirection = $direction;

        return $this;
    }

    /**
     * Reordering the columns by parameters
     * @param array $list
     * @return $this
     */
    public function setColumnsOrder(array $list): static
    {
        // $this->columnsOrder = $list;
        $this->columnsOrder = [...$list, ...array_diff($this->columnsOrder, $list)];

        return $this;
    }

    /**
     * set formatting rules on fields
     */
    public function applyFormat($set): static
    {
        $this->formatters = $set;
        return $this;
    }

    /**
     * load statuses from $this->>resource
     */
    public function availableAssetStatus(): static
    {
        $this->assetsStatus = $this->resource->select('status')->whereNotNull('status')->distinct()->get()->pluck('status')->toArray();

        return $this;
    }

    public function aggregateBy(string $function, string $field, string $group_by, string $alias, $nonzero = true)
    {
        $this->aggregatedCriteria['function'] = $function; //eg: sum, avg, count
        $this->aggregatedCriteria['field'] = $field;    //eg: id, cost,
        $this->aggregatedCriteria['group_by'] = $group_by; //eg: id, category_id, type_id
        $this->aggregatedCriteria['alias'] = $alias; //eg: sum(cost) as total_cost
        $this->aggregatedCriteria['nonzero'] = $nonzero; //default true

        return $this;
    }

    public function getQuery()
    {
        return $this->query;
    }

    /**
     * prepare data to export
     * @return array
     */
    public function getData()
    {
        return [
            'resources' => $this->run(),
            'editInModal' => $this->editInModal,
            'filters' => $this->filters,
            'columns' => $this->resourceColumns,
            'relationColumns' => $this->relations,
            'resourceRoute' => $this->resourceRoute,
            'searchRoute' => $this->searchRoute,
            'formatters' => $this->formatters ?? [],
            'columnsOrder' => $this->columnsOrder ?? [],
        ];

    }

    /**
     * collect parameters and run the query to fetch the data;
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function run(): object
    {

        $foreignKeysInSelect = [];

        /*
           append required keys as fields in resource model based on registered BelongsTo relations, avoiding
           injecting them in ResourceColumns and so, avoiding listing them as table columns,
           but satisfying the the relation query condition
        */
        foreach ($this->relationFields as $relation => $fields) {
            if ($this->resource->$relation() instanceof \Illuminate\Database\Eloquent\Relations\BelongsTo) {
                $foreignKeysInSelect[] = $this->resource->$relation()->getForeignKeyName();
            }
        }

        /*
         limit the selection to the indicated columns: do unique to avoid sql error on duplicated fields:
         the duplicated may occur when are given the field to be selected but also, set a relation for which the
         foreign key is set automatically
        */
        $this->query->select(...array_unique([...$this->extraColumns, ...$foreignKeysInSelect, ...$this->resourceColumns]));

        //apply where conditions
        foreach ($this->whereConditions as $condition) {
            // If condition key exists in request as url params let it override the default condition
            if (!request()->has($condition[0])) {
                $this->query->where($condition[0], $condition[1], $condition[2]);
            }
        }

        //temporary testing group by and sum aggregated functions
        if (!empty($this->aggregatedCriteria)) {
            $this->query->selectRaw(" {$this->aggregatedCriteria['function']}({$this->aggregatedCriteria['field']}) as {$this->aggregatedCriteria['alias']}")
                ->groupBy($this->aggregatedCriteria['group_by']);

            // default true including results with zero value; run condition on false;
            if (!$this->aggregatedCriteria['nonzero']) {
                $this->query->where("{$this->aggregatedCriteria['field']}", '>', 0);
            }
        }

        //append the relations to query
        foreach ($this->relationFields as $relation => $fields) {

            //check for the foreign key to the given relation (HasMany or HasOne)
            //this is to avoid requesting extra fields in method params, since the foreign ksy may be extracted automatically
            $foreignKeyInRelation = '';

            if ($this->resource->$relation() instanceof \Illuminate\Database\Eloquent\Relations\HasMany
                ||
                $this->resource->$relation() instanceof \Illuminate\Database\Eloquent\Relations\HasOne) {

                $foreignKeyInRelation = $this->resource->$relation()->getForeignKeyName() . ',';
            }

            $this->query->with($relation
                //make sure to have id
                . ':id,'
                //make sure to have foreign key selected
                . $foreignKeyInRelation
                //and now the fields
                . implode(',', $fields));
        }

        //check and set status filter
        // at this moment just for Assets
        //the params is triggered by a link from DataTable vue

        //if there is a search for something, define the searchable fields and relations
        if (request('search')) {

            $attributes = $this->resourceColumns;
            $searchTerm = request('search');

            $this->query->where(function (Builder $query) use ($attributes, $searchTerm) {
                foreach ($attributes as $attribute) {
                    $query->orWhere(DB::raw("LOWER({$attribute})"), 'LIKE', "%{$searchTerm}%");
                }
            });


            //build the search on relations
            foreach ($this->relationFields as $relation => $fields) {
                $this->query->orWhereHas($relation, function ($query) use ($fields, $searchTerm) {
                    $query->where(function (Builder $query) use ($fields, $searchTerm) {
                        // Keep condition for warehouse when searching through related fields.

                        /*
                         * $query->where('warehouse_id','=',2);
                         *
                         * apply the global conditions from $this->where inside subqueries
                         *
                         */
                        foreach ($this->whereConditions as $condition) {
                            // If condition key exists in request as url params let it override the default condition
                            if (!request()->has($condition[0])) {
                                //pay attention to $query local variable wich should be augmented, not the global $this->query
                                $query->where($condition[0], $condition[1], $condition[2]);
                            }
                        }

                        // encapsulate the conditions applied on fields of relation (orWhere)
                        // inside a 'where' block conditioning with AND warehouse, garage
                        // in other words, allowing searchTerm only inside filtered by garage or warehouse
                        $query->where(function (Builder $query) use ($fields, $searchTerm) {

                            foreach ($fields as $attribute) {
                                $query->orWhere($attribute, 'LIKE', "%{$searchTerm}%");
                            }

                        });
                    });
                });
            }
        }


        //apply ordering on resource model
        if (request()->has(['field', 'direction'])) {
            $this->query->orderBy(request('field'), request('direction'));
        } else {
            $this->query->orderBy($this->defaultSortField, $this->defaultSortDirection);

            $this->filters['field'] = $this->defaultSortField;
            $this->filters['direction'] = $this->defaultSortDirection;
        }

        /*
         * the resource Columns has two roles: indicating fields to be run the  query for,
         * and to propagate the fields available on frontent DataTable logic
         * so, after building the query but before returning the fields, push the aggregated alias as usable field,
         * as the aggregated field must not be as selectable field, but it is returned by the aggregated query
         */
        if (!empty($this->aggregatedCriteria)) {
            $this->resourceColumns[] = $this->aggregatedCriteria['alias'];
        }

        return $this->query
            ->paginate($this->perPage)
            ->withQueryString();
    }

    /**
     * @param array $condition
     * @return $this
     */
    public function where(array $condition): static
    {
        if (is_array($condition)) {
            $this->whereConditions[] = $condition;
        }

        return $this;
    }

    /**
     * set items per page: default 10
     *
     * @param int $number
     * @return $this
     */
    public function paginate(int $number): static
    {
        $this->perPage = $number;

        return $this;
    }
}

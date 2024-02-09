<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AttributeController extends Controller
{
    public DataTableService $dataTableService;


    private $currentLocale;
    private $reserveLanguage;

    private $translatedAttributes;

    public function __construct(DataTableService $dataTableService)
    {
        $this->dataTableService = $dataTableService;
        $this->translatedAttributes = (new Attribute())->translatedAttributes;
        $this->currentLocale = app()->currentLocale();
        $this->reserveLanguage = $this->currentLocale == 'ru' ? 'ro' : 'ru';
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $builder = $this->dataTableService
            ->setResource('attribute')
            ->setResourceColumns(['id', 'name', 'slug'])
            ->setRelationColumn('subSubcategory', 'subSubCategory', ['name'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.attributes')
            ->setResourceRoute('admin.attributes')
            ->sortBy('id');

        return inertia('Admin/Attributes', [
            'initialRoute' => 'admin.attributes',
            'resourceType' => 'attribute',
        ])->loadData($builder);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return (new SchemaFormBuilder)('Attribute', 'post', 'admin.attributes.store');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name ro' => 'required|min:3',
            'name ru' => 'required|min:3',
            'sub_sub_category_id' => 'required',
        ]);
        $data['slug'] = Str::slug($data['name ro'], '_');

        $attribute = Attribute::firstOrCreate(['slug' => $data['slug'], 'sub_sub_category_id' => $data['sub_sub_category_id']], []);

        foreach (config('app.available_locales') as $locale) {
            foreach ($this->translatedAttributes as $translatedAttribute) {
                $attribute->translateOrNew($locale)->$translatedAttribute = $data["name $locale"];
            }
        }
        $attribute->save();

    }

    /**
     * Display the specified resource.
     */
    public function show(Attribute $attribute)
    {
        $data = [
            'id' => $attribute->id,
            "name $this->currentLocale" => $attribute->translate($this->currentLocale)->name,
            "name $this->reserveLanguage" => $attribute->translate($this->reserveLanguage)->name,
            "sub_sub_category_id" => $attribute->sub_sub_category_id,
            'slug' => $attribute->slug
        ];

        return $data;


    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attribute $attribute)
    {
        return (new SchemaFormBuilder)('Attribute', 'post', 'admin.attributes.store', $attribute->id, null, true);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attribute $attribute)
    {
        $data = $request->validate([
            'form.name ro' => 'required|min:3',
            'form.name ru' => 'required|min:3',
            'form.sub_sub_category_id' => 'required'
        ]);
        $data['slug'] = Str::slug($data['form']['name ro'], '_');

        $attribute->update([
            'slug' => $data['slug'],
            'sub_sub_category_id' => $data['form']['sub_sub_category_id']
        ]);

        foreach (config('app.available_locales') as $locale) {
            foreach ($this->translatedAttributes as $translatedAttribute) {
                $attribute->translateOrNew($locale)->$translatedAttribute = $data['form']["name $locale"];
            }
        }
        $attribute->save();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attribute $attribute)
    {
        $attribute->delete();
    }
}

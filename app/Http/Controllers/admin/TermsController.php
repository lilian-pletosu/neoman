<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Terms;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TermsController extends Controller
{
    private string $route = 'admin.terms.index';

    private DataTableService $dataTableService;


    public function __construct(DataTableService $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }


    function index()
    {

        $builder = $this->dataTableService
            ->setResource('Terms')
            ->setResourceColumns(['id', 'title', 'content'])
            ->setColumnsOrder(['id', 'title', 'content'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.terms')
            ->setResourceRoute('admin.terms')
            ->sortBy('id');

        return inertia('Admin/Terms', [
            'initialRoute' => 'admin.terms',
            'resourceType' => 'terms',
        ])->loadData($builder);
    }

    public function create()
    {
        return (new SchemaFormBuilder)('Terms', 'post', 'admin.terms.store');
    }

    public function store(Request $request)
    {

        $data = $request->validate([
            'title ro' => 'required',
            'title ru' => 'required',
            'content ro' => 'required',
            'content ru' => 'required',
        ]);

        $data['slug'] = Str::slug($data['title ro'], '_');

        $terms = Terms::create($data);

        foreach (config('translatable.locales') as $locale) {
            foreach ((new Terms())->translatedAttributes as $translatedAttribute) {
                $terms->translateOrNew($locale)->$translatedAttribute = $data["$translatedAttribute $locale"] ?? $data[$translatedAttribute];
            }
        }
        $terms->save();
    }

    public function show(Terms $terms)
    {
        return $terms;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): array
    {
        return (new SchemaFormBuilder)('Terms', 'put', 'admin.terms.update', $id, null, true);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $terms = Terms::find($id);
        $data = $request->validate([
            'form.title ro' => 'required',
            'form.title ru' => 'required',
            'form.content ro' => 'required',
            'form.content ru' => 'required',
        ]);

        $formData = $request->form;
        $terms->update([
            'slug' => Str::slug($formData['title ro'], '_')
        ]);


        foreach (config('translatable.locales') as $locale) {
            $terms->translateOrNew($locale)->title = $formData["title {$locale}"];
            $terms->translateOrNew($locale)->content = $formData["content {$locale}"];
        }
        $terms->save();


        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $terms = Terms::find($id);
        $terms->delete();
        return to_route($this->route);
    }
}

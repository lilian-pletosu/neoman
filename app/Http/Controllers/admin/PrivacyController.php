<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Privacy;
use App\Services\DataTableService;
use App\Services\SchemaFormBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PrivacyController extends Controller
{
    private string $route = 'admin.privacy.index';

    private DataTableService $dataTableService;


    public function __construct(DataTableService $dataTableService)


    {
        $this->dataTableService = $dataTableService;
    }


    function index()
    {
        $builder = $this->dataTableService
            ->setResource('Privacy')
            ->setResourceColumns(['id', 'title', 'content'])
            ->setColumnsOrder(['id', 'title', 'content'])
            ->editInModal(true)
            ->paginate(10)
            ->setSearchRoute('admin.privacy')
            ->setResourceRoute('admin.privacy')
            ->sortBy('id');

        return inertia('Admin/Privacy', [
            'initialRoute' => 'admin.privacy',
            'resourceType' => 'privacy',
        ])->loadData($builder);
    }

    public function create()
    {
        return (new SchemaFormBuilder)('Privacy', 'post', 'admin.privacy.store');
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

        $privacy = Privacy::create($data);
        foreach (config('translatable.locales') as $locale) {
            foreach ((new Privacy())->translatedAttributes as $translatedAttribute) {
                $privacy->translateOrNew($locale)->$translatedAttribute = $data["$translatedAttribute $locale"] ?? $data[$translatedAttribute];
            }
            $privacy->save();
        }
    }

    public function show(Privacy $privacy)
    {
        return $privacy;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): array
    {
        return (new SchemaFormBuilder)('Privacy', 'put', 'admin.privacy.update', $id, null, true);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Privacy $privacy)
    {
        $data = $request->validate([
            'form.title ro' => 'required',
            'form.title ru' => 'required',
            'form.content ro' => 'required',
            'form.content ru' => 'required',
        ]);

        $formData = $request->form;
        $privacy->slug = Str::slug($formData['title ro'], '_');

        foreach (config('translatable.locales') as $locale) {
            $privacy->translateOrNew($locale)->title = $formData["title {$locale}"];
            $privacy->translateOrNew($locale)->content = $formData["content {$locale}"];
        }

        $privacy->save();

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $privacy = Privacy::find($id);
        $privacy->delete();
        return to_route($this->route);
    }
}

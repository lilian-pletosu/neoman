<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AboutController extends Controller
{
    private string $route = 'admin.about_us.index';
    private array $translatedAttributes = ['content'];


    function index()
    {

        return inertia('Admin/About', [
            'initialRoute' => 'admin.privacy',
            'resources' => About::first()?->translate() ?? null,
            'resourceType' => 'about',
        ]);
    }

    public function create()
    {
        //        return (new SchemaFormBuilder)('Privacy', 'post', 'admin.privacy.store');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'content.*' => 'required',
        ]);

        $about = About::create([
            'slug' => Str::slug($data['title'], '_')
        ]);

        foreach (config('app.available_locales') as $locale) {
            $about->translateOrNew($locale)->title = $data['title'];
            $about->translateOrNew($locale)->content = $data['content'][$locale];
        }

        $about->save();
    }


    public function show(About $about)
    {
        return $about;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $about = About::findOrFail($id);
        $currentLocale = app()->currentLocale();

        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required',
        ]);

        $about->update([
            'slug' => Str::slug($data['title'], '_')
        ]);

        $about->translateOrNew($currentLocale)->title = $data['title'];
        $about->translateOrNew($currentLocale)->content = $data['content'];

        $about->save();

        return to_route($this->route);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $about = About::find($id);
        $about->delete();
        return to_route($this->route);
    }
}

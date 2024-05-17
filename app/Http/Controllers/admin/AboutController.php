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
            'resources' => About::first(),
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
        $data['slug'] = Str::slug($data['title'], '_');

        $about = About::create(['slug' => $data['slug']]);

        foreach (config('app.available_locales') as $locale) {
            // Iterează prin fiecare atribut tradus
            foreach ($data['content'] as $lang => $content) {
                // Verifică dacă limba curentă corespunde limbii din iterația curentă
                if ($lang === $locale) {
                    // Setează conținutul pentru atributul tradus corespunzător limbii
                    $about->translateOrNew($locale)->content = $content;
                    // Salvează modificările pentru această limbă
                    $about->save();
                }
            }
        }
        return to_route($this->route);
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
        $about = About::find($id);
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required',
        ]);
        $data['slug'] = Str::slug($data['title'], '_');
        $about->update($data);
        foreach (config('app.available_locales') as $locale) {
            foreach ($this->translatedAttributes as $translatedAttribute) {
                $about->translateOrNew($locale)->$translatedAttribute = $data[$translatedAttribute];
            }
            $about->save();
        }

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

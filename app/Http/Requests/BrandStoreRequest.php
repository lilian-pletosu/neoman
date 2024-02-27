<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $currentLocale = app()->currentLocale();
        $reserveLanguage = $currentLocale == 'ro' ? 'ru' : 'ro';
        return [
            'name' => 'required|min:3|String',
            "description_$currentLocale" => 'required|min:5|String',
            "description_$reserveLanguage" => 'required|min:5|String',
            'website' => 'required',
            'is_enabled' => 'required',
            'image' => 'nullable|file|image|mimes:jpg,bmp,png,svg'

        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandEditRequest extends FormRequest
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
        return [
            'form.name' => 'required|min:3|String',
            'form.description' => 'required|min:5|String',
            'form.website' => 'required',
            'form.is_enabled' => 'required',
            'form.image' => 'sometimes|nullable|file|image|mimes:jpg,bmp,png,svg'

        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
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
            'form.description' => 'required',
            'form.brand_id' => 'required',
            'form.category_id' => 'required',
            'form.price' => 'required|numeric',
            //            'form.image' => 'nullable|file|image|mimes:jpg,bmp,png,svg'

        ];
    }
}

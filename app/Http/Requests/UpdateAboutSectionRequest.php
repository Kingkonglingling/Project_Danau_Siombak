<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAboutSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        // kalau route ini hanya untuk admin + auth middleware, true aman
        return true;
    }

    public function rules(): array
    {
        return [
            'title'    => ['required', 'string', 'max:200'],
            'content'  => ['required', 'string'],
            'location' => ['required', 'string', 'max:200'],
            'image'    => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ];
    }

    public function attributes(): array
    {
        return [
            'title'    => 'judul',
            'content'  => 'deskripsi',
            'location' => 'alamat lokasi',
            'image'    => 'gambar',
        ];
    }

    public function messages(): array
    {
        return [
            'image.image' => 'File harus berupa gambar.',
            'image.mimes' => 'Format gambar harus jpg/jpeg/png/webp.',
            'image.max'   => 'Ukuran gambar maksimal 4MB.',
        ];
    }
}

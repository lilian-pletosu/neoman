@component('mail::message')
# Un client a găsit produsul la un preț mai mic

Detalii client:
- Nume: {{ $data['name'] }}
- Telefon: {{ $data['phone'] }}
- Produsul căutat: {{ $data['product']['name'] }}
- Prețul produsului la noi: {{ $data['product']['price'] }}
- Sursa unde produsul a fost găsit: {{ $data['product_link'] }}

{{ config('app.name') }}
@endcomponent

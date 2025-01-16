@component('mail::message')
# Solicitare nouă pentru apel

Detalii client:
- Nume: {{ $data['name'] }}
- Telefon: {{ $data['phone'] }}

Vă rugăm să contactați clientul cât mai curând posibil.

{{ config('app.name') }}
@endcomponent
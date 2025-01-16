@component('mail::message')
# Mesaj recepționat din formularul de contact

Detalii client:
- Nume: {{ $data['name'] }}
- Telefon: {{ $data['phone'] }}
- Email: {{ $data['email'] }}
- Mesaj: {{ $data['message'] }}
- Opțiune: {{ $data['option']  }}


{{ config('app.name') }}
@endcomponent
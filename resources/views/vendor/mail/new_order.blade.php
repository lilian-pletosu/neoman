@component('mail::message')
    {{ __('app_context.received_order') }}

    {{ __('app_context.hello_user'), $order->full_name }}

    {{ __('app_context.thanks_for_order') }}


    {{--@component('mail::button')--}}
    {{--{{ __('Accept Invitation') }}--}}
    {{--@endcomponent--}}

    {{ __('If you did not expect to receive an invitation to this team, you may discard this email.') }}
@endcomponent


{{--    <!DOCTYPE html>--}}
{{--<html lang="en">--}}
{{--<head>--}}
{{--    <meta charset="UTF-8">--}}
{{--    <meta name="viewport" content="width=device-width, initial-scale=1.0">--}}
{{--    <title>Comandă recepționată</title>--}}
{{--    <style>--}}
{{--        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');--}}
{{--    </style>--}}
{{--</head>--}}
{{--<body class="bg-gray-100 p-4">--}}
{{--<div class="max-w-md mx-auto bg-white p-8 rounded shadow-md">--}}
{{--    <h2 class="text-2xl font-semibold mb-4">Comandă recepționată</h2>--}}
{{--    <p class="mb-4">Bună ziua, {{ $order->full_name }}!</p>--}}

{{--    <p>Vă mulțumim pentru comandă! Cererea dvs. este acceptată. Vă vom contacta în curând pentru confirmare. Vom fi--}}
{{--        bucuroși să vă răspundem la întrebări.</p>--}}

{{--    <p>Ora comenzii: {{ $order->created_at->format('d.m.Y / H:i') }}</p>--}}
{{--    <p>Telefon: {{ $order->phone }}</p>--}}
{{--    <p>Email: {{ $order->email }}</p>--}}
{{--    <p>Adresă: {{$order->city}},{{$order->address}}</p>--}}
{{--    @if($order->commment)--}}
{{--        <p>Comentariu: {{ $order->comment}}</p>--}}
{{--    @endif--}}
{{--    <hr>--}}

{{--    <table>--}}
{{--        <tr>--}}
{{--            <th>Denumirea</th>--}}
{{--            <th>Cantitate</th>--}}
{{--            <th>Preț</th>--}}
{{--        </tr>--}}
{{--        @foreach($order->products as $product)--}}
{{--            <tr>--}}
{{--                <td>{{$product['name']}}</td>--}}
{{--                <td>{{$product['qty']}}</td>--}}
{{--                <td>{{$product['price']}}</td>--}}
{{--            </tr>--}}
{{--        @endforeach--}}
{{--    </table>--}}


{{--    <p>Total de plată: {{ $order->total_price }} lei</p>--}}

{{--    <p class="mt-4">Cu drag,<br>Echipa Neoman!</p>--}}
{{--</div>--}}
{{--</body>--}}
{{--</html>--}}

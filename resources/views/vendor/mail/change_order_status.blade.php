@php
    $productHeader = __('app_context.product');
    $colorHeader = __('app_context.color');
    $qtyHeader = __('app_context.qty');
    $priceHeader = __('app_context.price');
@endphp

<x-mail::layout>

    <x-slot name="header">
        <x-mail::header url="{{config('app.url')}}">
            #AppTeam
        </x-mail::header>
    </x-slot>

    # Comanda nr. {{$order['order_number']}}!


    <x-slot name="subcopy">
        Comanda dvs. cu nr. <b>{{$order['order_number']}}</b>, a fost
        <b>{{ trans("app_context" . "." .$order->status->value) }}</b>.


        <x-mail::subcopy>
            <h3>Iată detaliile comenzei:</h3>
            Data și ora comenzei: {{ \Illuminate\Support\Carbon::parse($order['created_at'])->format('d.m.Y, h:m') }}
            <br>
            Telefon: {{$order['phone']}} <br>
            Email: {{$order['email']}} <br>
            Adresă: {{$order['address']}} <br>
        </x-mail::subcopy>


        <x-mail::table>
            | {{ $productHeader }} | {{ $colorHeader }} | {{ $qtyHeader }} | {{ $priceHeader }} |
            |:-----------|:----------------:|:------------:| --------:|
            @foreach($order['products'] as $product)
                | {{$product['name']}} | {{$product['color_value']}} | {{$product['qty']}} | {{$product['price']}} |
            @endforeach
        </x-mail::table>
        <hr>
        <h2>Preț produse: {{$order['total_price']}} {{__('app_context.lei')}}</h2>
        <h2>Livrare: {{$order['delivery_price']}} {{__('app_context.lei')}}</h2>
        <h1>Total: {{$order['total_price'] + $order['delivery_price']}} {{__('app_context.lei')}}</h1>

        <x-mail::subcopy>
            Dacă ai întrebări sau nelămuriri, nu ezita să ne contactezi la adresa de
            email {{ config('mail.from.address') }} sau la numărul de telefon {{ config('mail.from.phone') }}.
        </x-mail::subcopy>

        <x-slot name="footer">
            <x-mail::footer>
                © {{ date('Y') }} {{ config('app.name') }}. @lang('Toate drepturile rezervate.')
            </x-mail::footer>
        </x-slot>
    </x-slot>

</x-mail::layout>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Status comandă actualizat</title>
    <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    </style>
</head>
<body class="bg-gray-100 p-4">
<div class="max-w-md mx-auto bg-white p-8 rounded shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Statusul comenzii a fost actualizat</h2>
    <p class="mb-4">Bună {{ $order->full_name }},</p>

    <p>Comanda ta a fost {{ trans("app_context" . "." .$order->status->value) }} cu succes. Iată detaliile comenzii:</p>

    <ul class="mb-4">
        @foreach($order->products as $product)
            <li>{{ $product['name'] }} - {{ $product['qty'] }} bucăți x {{ $product['price'] }} lei</li>
        @endforeach
    </ul>

    <p>Total de plată: {{ $order->total_price }} lei</p>

    <p class="mt-4">Cu drag,<br>Neoman!</p>
</div>
</body>
</html>

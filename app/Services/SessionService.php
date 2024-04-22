<?php

namespace App\Services;

class SessionService
{
    public function AddVisitedProductInSession($product)
    {
        // Verificăm dacă există deja o sesiune pentru produsele vizitate recent
        if (request()->session()->has('last')) {
            // Obținem lista de produse vizitate recent din sesiune
            $visitedProducts = request()->session()->get('last');
            // Verificăm dacă produsul curent nu există deja în lista de produse vizitate recent
            if ($product) {
                if (!in_array($product->id, $visitedProducts)) {
                    // Adăugăm ID-ul produsului curent la începutul listei de produse vizitate recent
                    array_unshift($visitedProducts, $product->id);
                    // Verificăm dacă lista depășește 10 produse
                    if (count($visitedProducts) > 10) {
                        // Eliminăm cel mai vechi produs din lista
                        array_pop($visitedProducts);
                    }
                    // Actualizăm lista de produse vizitate recent în sesiune
                    request()->session()->put('last', $visitedProducts);
                }
            }
        } else {
            // Dacă nu există o sesiune pentru produsele vizitate recent, creăm una nouă cu produsul curent
            request()->session()->put('last', [$product->id]);
        }

    }
}

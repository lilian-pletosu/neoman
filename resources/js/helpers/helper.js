export function refreshPage() {
    location.reload();
}

export function formatPrice(price) {
    // Verificăm dacă numărul are zecimale nenule
    if (price % 1 !== 0) {
        // Dacă are zecimale nenule, afișăm și zecimalele
        return price.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    } else {
        // Dacă nu are zecimale nenule, afișăm doar partea întreagă
        return price.toLocaleString('fr-FR');
    }
}

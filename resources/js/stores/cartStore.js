import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";

export const useCartStore = defineStore('cart', () => {
    const countCart = ref(0)
    const products = ref({})
    const totalPrice = ref(0);
    const message = ref("");
    const success = ref(true)
    const shipping = ref(50)
    const notification = ref(false);

    async function addProductInCart(productId) {
        if (checkIfProductExistInCart(productId)) {
            await removeProductInCart(productId).finally(() => {
                notification.value = true;
                success.value = true
            }).then(() => notification.value = false);
        } else {

            notification.value = true;
            axios.get(route('api.cartAdd', {productCode: productId})).then(async (response) => {
                message.value = response.data
                success.value = true
                notification.value = false;
            }).finally(() => fetchCount()).catch((error) => {
                success.value = false
                message.value = error.response.data
                notification.value = false;
            });
        }

    }

    async function removeProductInCart(productId) {
        axios.delete(route('api.cartRemove', {productCode: productId})).then(async (response) => message.value = response.data).finally(() => fetchCount());
    }

    async function fetchCount() {
        try {
            const response = await fetch(route('api.cartCount'));
            const data = await response.json(); // Obțineți conținutul răspunsului ca obiect JSON
            countCart.value = data.count // Afisează obiectul JSON în consolă
            products.value = data.products
            totalPrice.value = data.totalPrice

            return data;
        } catch (error) {
            console.error('A apărut o eroare în timpul solicitării pentru numărul de produse din coș:', error);
        }
    }


    function checkIfProductExistInCart(productId) {
        for (const [key, item] of Object.entries(products.value)) {
            if (productId === item.id) {
                return true;
            }
        }
        return false;
    }


    return {
        checkIfProductExistInCart,
        addProductInCart,
        countCart,
        products,
        fetchCount,
        removeProductInCart,
        message,
        success,
        totalPrice,
        shipping,
        notification
    }
})

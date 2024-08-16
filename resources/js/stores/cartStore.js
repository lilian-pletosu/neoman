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

    async function addProductInCart(productId, colorId) {

        notification.value = true;
        axios.get(route('api.cartAdd', {productId: productId, colorId: colorId})).then(async (response) => {
            message.value = response.data
            success.value = true
            notification.value = false;
        }).finally(() => fetchCount());
        // }

    }


    async function updateQtyOfProduct(productId, qty) {
        axios.get(route('api.cart.updateQtyOfProduct', {productId: productId, qty: qty})).then((res) => {
        }).finally(() => fetchCount());
    }

    async function removeProductInCart(productId) {

        axios.delete(route('api.cartRemove', {productID: productId})).then(async (response) => message.value = response.data).finally(() => fetchCount());
    }

    async function fetchCount() {
        try {
            const response = await fetch(route('api.getCart'));
            const data = await response.json(); // Obțineți conținutul răspunsului ca obiect JSON
            countCart.value = data.count // Afisează obiectul JSON în consolă
            products.value = data.products
            totalPrice.value = data.total_price

            // return data;
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

    function cartForget() {
        axios.get(route('api.cartForget'));
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
        notification,
        updateQtyOfProduct,
        cartForget
    }
})

import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";

export const useWishlistStore = defineStore('wishlist', () => {
    const wishlistCount = ref(0)
    const products = ref({})
    const message = ref("");
    const success = ref(true)
    const notification = ref(false);

    async function addProductInWishlist(productId) {
        if (checkIfProductExistInWishlist(productId)) {
            await removeProductFromWishlist(productId).finally(() => {
                notification.value = true;
                success.value = true
            }).then(() => notification.value = false);
        } else {

            notification.value = true;
            axios.get(route('api.add_wishlist', {productCode: productId})).then(async (response) => {
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

    async function transferProductsToCart() {
        axios.get(route('api.transferProducts')).then(async (response) => {

            message.value = response.data
            success.value = true
            notification.value = true;
            await forgetWishlist();
        }).finally(() => fetchCount()).catch((error) => {
            success.value = false
            message.value = error.response.data
            notification.value = false;
        });
    }


    async function forgetWishlist() {
        await axios.get(route('api.forget_wishlist')).then(() => fetchCount());
    }


    async function removeProductFromWishlist(productId) {
        axios.delete(route('api.wishlistRemove', {productCode: productId})).then(async (response) => message.value = response.data).finally(() => fetchCount());
    }

    async function fetchCount() {
        try {
            const response = await fetch(route('api.wishlistCount'));
            const data = await response.json(); // Obțineți conținutul răspunsului ca obiect JSON
            wishlistCount.value = data.count // Afisează obiectul JSON în consolă
            products.value = data.products

            return data;
        } catch (error) {
            console.error('A apărut o eroare în timpul solicitării pentru numărul de produse din coș:', error);
        }
    }


    function checkIfProductExistInWishlist(productId) {
        for (const [key, item] of Object.entries(products.value)) {
            if (productId === item.id) {
                return true;
            }
        }
        return false;
    }


    return {
        checkIfProductExistInWishlist,
        addProductInWishlist,
        wishlistCount,
        products,
        fetchCount,
        removeProductFromWishlist,
        message,
        success,
        notification,
        transferProductsToCart
    }
})

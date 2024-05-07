<script setup>
const props = defineProps({
    order: {
        required: true,
        default: {}
    }
})

function calculateInstallmentWithInterest(productPrice, numOfInstallments, interestRate) {
    let interest_rate = productPrice * (interestRate / 100);
    let finalPrice = productPrice + interest_rate;
    let installment = finalPrice / numOfInstallments;
    return installment.toFixed();
}
</script>

<template>
    <table class="text-red-700 text-lg border">
        <tr class="border">
            <td class="border">{{ __('order_type') }}</td>
            <td class="border">{{ __(order.credit?.type) }}</td>
        </tr>
        <tr class="border">
            <td class="border">{{ __('num_of_installments') }}</td>
            <td class="border">{{ order.credit?.num_of_installments }}</td>
        </tr>
        <tr class="border">
            <td class="border">{{ __('interest_rate') }}</td>
            <td class="border">{{ parseFloat(order.credit?.interest_rate, 0) }}%</td>
        </tr>
        <tr class="border">
            <td class="border">{{ __('installment') }}</td>
            <td class="border">{{
                    calculateInstallmentWithInterest(order?.products[0].price, order.credit?.num_of_installments, order.credit?.interest_rate)
                }} {{ __('lei') }}
            </td>
        </tr>
    </table>

</template>

<style scoped>

</style>

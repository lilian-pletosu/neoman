<script setup>
import { ref } from "vue";

const props = defineProps({
    details: {
        required: true,
        type: Object,
    },
    product: {
        required: true,
        type: Object,
    },
});

const selectedOffer = ref(null);

const emits = defineEmits(["selectedOffer"]);

function calculateInstallmentWithInterest(
    productPrice,
    numOfInstallments,
    interestRate
) {
    let interest_rate = productPrice * (interestRate / 100);
    let finalPrice = productPrice + interest_rate;
    let installment = finalPrice / numOfInstallments;
    return installment.toFixed();
}
</script>

<template>
    <fieldset class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div v-if="details.length != 0" v-for="detail in details">
            <label
                :for="detail.id"
                class="block cursor-pointer bg-slate-300/20 rounded-lg border border-slate-300/20 group/offer p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-[#1FC8F3]"
                :class="{
                    'has-[:checked]:border-blue-500':
                        selectedType !== null && selectedType === detail.id,
                }"
            >
                <div class="relative flex flex-row gap-6">
                    <span
                        class="absolute px-2 text-xs font-extrabold text-white bg-red-500 rounded-lg -right-3 -top-3"
                        >{{ parseInt(detail.interest_rate) }}%</span
                    >
                    <span
                        class="flex items-center font-extrabold"
                        :class="
                            selectedOffer === detail.id
                                ? 'text-white'
                                : 'text-[#022425] dark:text-slate-300'
                        "
                    >
                        <p class="text-5xl">{{ detail.num_of_installments }}</p>
                    </span>

                    <span
                        class="flex flex-col mt-1 text-2xl"
                        :class="
                            selectedOffer === detail.id
                                ? 'text-white'
                                : 'text-[#022425] dark:text-slate-300'
                        "
                    >
                        <p class="">
                            {{ __("installments") }}
                        </p>
                        <p class="">
                            {{
                                calculateInstallmentWithInterest(
                                    product.price,
                                    detail.num_of_installments,
                                    detail.interest_rate
                                )
                            }}
                            {{ __("lei") }}
                        </p>
                    </span>
                </div>
                <input
                    type="radio"
                    :name="detail.name"
                    @change="$emit('selectedOffer', selectedOffer)"
                    :value="detail.id"
                    v-model="selectedOffer"
                    :id="detail.id"
                    class="sr-only"
                />
            </label>
        </div>
    </fieldset>
</template>

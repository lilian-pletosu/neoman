<script setup>
import {useForm} from "@inertiajs/vue3";
import {route} from "ziggy-js";
import PrimaryButton from "@/Components/PrimaryButton.vue";

const props = defineProps({
    product: {
        required: true,
        type: Object,
    },
})

const emits = defineEmits(['submitSuccess'])


const form = useForm({
    phone: '',
    products: props.product,
    total_price: props.product.has_discount ? props.product.promotion_price : props.product.price,
    type: 'fast_order'
});

function submit() {
    form.post(route('set_order'), {
        onSuccess: () => {
            form.reset();
        },
        onFinish: () => {
            emits('submitSuccess');
        }
    });
}
</script>

<template>
    <form @submit.prevent="submit" class="space-y-4">
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label for="phone"
                   class="block col-span-2 mb-2 text-sm font-medium text-gray-900  dark:text-white">{{
                    __('phone')
                }}
                <input type="tel" name="phone" v-model="form.phone" id="phone" placeholder="012345678"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                <span class="text-red-500" v-if="form.errors.phone">{{ __(form.errors.phone) }}</span>
            </label>

        </div>
        <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
                       class="flex justify-center w-full h-10 hover:bg-slate-400">
            {{
                __('submit')
            }}
        </PrimaryButton>
    </form>
</template>

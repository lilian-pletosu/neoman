<script setup>
import {Link, useForm} from "@inertiajs/vue3";
import {route} from "ziggy-js";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import {watch} from "vue";

const props = defineProps({
    product: {
        required: true,
        type: Object,
    },
    selectedOffer: {
        required: true,
    },
    selectedType: {
        required: true,
    }
})

const emits = defineEmits(['submitSuccess'])

const form = useForm({
    full_name: '',
    phone: '',
    terms: false,
    products: props.product,
    credit_id: props.selectedOffer,
    total_price: props.product.price,
    type: props.selectedType,
});

function submit() {
    form.post(route('set_order'), {
        onSuccess: () => {
            form.reset();
        }
    });
}

watch(() => props.selectedOffer, (value) => {
    form.credit_id = value;
});
watch(() => props.selectedType, (value) => {
    form.type = value;
});
</script>

<template>
    <form @submit.prevent="submit" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label for="full_name"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                    __('full_name')
                }}
                <input type="text" name="full_name" id="full_name"
                       v-model="form.full_name"
                       :placeholder="__('example')+ ': Ion Popescu'"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                <span class="text-red-500" v-if="form.errors.full_name">{{ __(form.errors.full_name) }}</span>
            </label>
            <label for="phone"
                   class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                    __('phone')
                }}
                <input type="tel" name="phone" v-model="form.phone" id="phone" placeholder="012345678"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                <span class="text-red-500" v-if="form.errors.phone">{{ __(form.errors.phone) }}</span>
            </label>

            <span class="flex gap-1 sm:col-span-2">
                                             <input type="checkbox" name="terms" id="terms" required
                                                    v-model="form.terms"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                                                 {{ __('accord_terms') }} <Link :href="route('privacy_page')"
                                                                                class="text-blue-800 underline">{{
                    __('privacy')
                }}</Link>
            </span>
        </div>
        <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
                       class="w-full h-10 flex justify-center hover:bg-slate-400">
            {{
                __('submit')
            }}
        </PrimaryButton>
    </form>
</template>

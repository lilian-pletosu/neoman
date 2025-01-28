TermsPage.vue
<script setup>
import FrontLayout from "@/Layouts/FrontLayout.vue";
import { useForm } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { ref } from "vue";

const props = defineProps({
    contacts: Object,
});

const form = useForm({
    name: "",
    email: "",
    phone: "",
    message: "",
    option: "",
});

const showSuccess = ref(false);

const submitForm = () => {
    form.post(route("contacts.store"), {
        preserveScroll: true,
        onSuccess: () => {
            showSuccess.value = true;
            form.reset();
        },
    });
};
</script>

<template>
    <FrontLayout :title="__('contact')"
        meta-description="Părerea ta este importantă pentru noi și ne dorim să știm ce părere ai despre noi."
        meta-keywords="contact neoman, suport clienti, reclamatii, livrare moldova, colaborare, asistenta tehnica, service chisinau, contact magazin online"
        :current-url="route('contacts.index')" :current-language="$page.props.locale">
        <div class="py-4">
            <h1 class="text-2xl font-bold font-mulish dark:text-white">
                {{ __("contact") }}
            </h1>
            <hr class="my-4" />
            <section class="">
                <div class="px-4 pb-4 mx-auto sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5 dark:text-white">
                        <div class="lg:col-span-2 lg:py-12">
                            <p class="max-w-xl text-lg font-semibold font-mulish">
                                {{ __("your_opinion_counts_for_us") }}
                            </p>
                            <hr class="py-2" />
                            <span class="max-w-xl text-lg font-light font-mulish">{{ __("write_us") }}</span>

                            <div class="mt-8">
                                <a href="tel:+37378107017" class="text-2xl font-bold text-pink-600">
                                    +373 78 107 017
                                </a>
                                <address class="mt-2 not-italic">
                                    Adresa juridică mun. Chișinău, sec. Centru, str. Tecuci, 3/1, ap. 196
                                </address>
                            </div>
                        </div>

                        <div class="p-8 bg-white rounded-lg shadow lg:col-span-3 lg:p-12 border-1 border-slate-600">
                            <form v-if="!showSuccess" @submit.prevent="submitForm" class="space-y-4">
                                <div>
                                    <label class="sr-only" for="name">{{
                                        __("name")
                                        }}</label>
                                    <input v-model="form.name" class="w-full p-3 text-sm border-gray-200 rounded-lg"
                                        :placeholder="__('name')" type="text" id="name" />
                                    <span class="py-1 text-red-600" v-if="form.errors.name">{{ __(form.errors.name)
                                        }}*</span>
                                </div>

                                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label class="sr-only" for="email">{{
                                            __("email")
                                            }}</label>
                                        <input v-model="form.email"
                                            class="w-full p-3 text-sm border-gray-200 rounded-lg"
                                            :placeholder="__('email')" type="email" id="email" />
                                        <span class="py-1 text-red-600" v-if="form.errors.email">{{
                                            __(form.errors.email) }}*</span>
                                    </div>

                                    <div>
                                        <label class="sr-only" for="phone">{{
                                            __("phone")
                                            }}</label>
                                        <input v-model="form.phone"
                                            class="w-full p-3 text-sm border-gray-200 rounded-lg"
                                            :placeholder="__('phone')" type="tel" id="phone" />
                                        <span class="py-1 text-red-600" v-if="form.errors.phone">{{
                                            __(form.errors.phone) }}*</span>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                    <div>
                                        <label for="Option1"
                                            class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabindex="0">
                                            <input class="sr-only" id="Option1" type="radio" tabindex="-1"
                                                value="reclamation" v-model="form.option" name="reclamation" />

                                            <span class="text-sm">
                                                {{ __("reclamation") }}
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label for="Option2"
                                            class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabindex="0">
                                            <input class="sr-only" id="Option2" type="radio" tabindex="-1"
                                                value="delivery" v-model="form.option" name="delivery" />

                                            <span class="text-sm">
                                                {{ __("delivery") }}</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label for="Option3"
                                            class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabindex="0">
                                            <input class="sr-only" id="Option3" type="radio" tabindex="-1"
                                                value="collaboration" v-model="form.option" name="collaboration" />

                                            <span class="text-sm">
                                                {{ __("collaboration") }}
                                            </span>
                                        </label>
                                    </div>
                                    <span class="py-1 text-red-600" v-if="form.errors.option">{{ __(form.errors.option)
                                        }}*</span>
                                </div>

                                <div>
                                    <label class="sr-only" for="message">{{
                                        __("message")
                                        }}</label>

                                    <textarea class="w-full p-3 text-sm border-gray-200 rounded-lg"
                                        :placeholder="__('message')" v-model="form.message" rows="8"
                                        id="message"></textarea>
                                    <span class="py-1 text-red-600" v-if="form.errors.message">{{
                                        __(form.errors.message) }}*</span>
                                </div>

                                <div class="mt-4">
                                    <PrimaryButton :class="{
                                        'opacity-25': form.processing,
                                    }" :disabled="form.processing">
                                        {{ __("send") }}
                                    </PrimaryButton>
                                </div>
                            </form>
                            <div v-if="showSuccess" class="p-6 bg-white md:mx-auto">
                                <svg viewBox="0 0 24 24" class="w-16 h-16 mx-auto my-6 text-green-600">
                                    <path fill="currentColor"
                                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                    </path>
                                </svg>
                                <div class="text-center">
                                    <h3 class="text-base font-semibold text-center text-gray-900 md:text-2xl">
                                        {{ __("message_was_send") }}!
                                    </h3>
                                    <p>{{ __("success_message") }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </FrontLayout>
</template>

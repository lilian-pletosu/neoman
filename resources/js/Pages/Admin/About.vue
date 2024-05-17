<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {getCurrentInstance, ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import InputEditorAboutUs from "@/Components/InputEditorAboutUs.vue";
import AboutUsContent from "@/Components/AboutUsContent.vue";

const app = getCurrentInstance();


const props = defineProps({
    resources: Object
});


const isOpen = ref(false);

const openModal = () => {
    isOpen.value = true;
};

const closeModal = () => {
    isOpen.value = false;
};


</script>
<template>
    <admin-layout :current-route="initialRoute" title="AboutUs">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('about_us') }}</h3>
                        <span class="secondary-text">{{ __('here_is_all_info_about_us') }}</span>
                    </div>
                    <div v-if="!resources" class="flex-shrink-0">
                        <primary-button @click="openModal" class="mx-2">{{
                                __('create')
                            }}
                        </primary-button>
                    </div>
                </div>
                <div class="flex flex-col  ">
                    <div class="overflow-x-auto rounded-lg ">
                        <div class="flex-shrink-0 ">
                            <div class="flex flex-col mt-8 ">
                                <div class="overflow-x-auto rounded-lg p-2 ">
                                    <section>
                                        <AboutUsContent v-if="resources" :resources="resources"/>
                                        <div v-else
                                             class="flex justify-center border-t pt-3">
                                            {{ __('no_content') }}...
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal :show="isOpen" @close="closeModal" :actions="false" :closeable="true" max-width="6xl">
                    <div class="flex flex-col gap-4 p-4 ">
                        <div class="flex justify-between">
                            <h3 class="primary-text">{{ __('create_content_about_us') }}</h3>
                        </div>
                        <InputEditorAboutUs
                            @cancel="closeModal" @close="closeModal()" :key="resources?.id"/>
                    </div>
                </Modal>
            </div>
        </div>
    </admin-layout>
</template>


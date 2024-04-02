<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import DataTable from "@/Components/DataTable.vue";
import Modal from "@/Components/Modal.vue";
import {ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";


const props = defineProps({
    initialRoute: {
        type: String
    },
    resources: Object
});


let isModalOpen = ref(false);
let promotion = ref({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    discount: '',
    status: '',
    // Alte câmpuri...
});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const addPromotion = async () => {
    await axios.post('/api/promotions', promotion.value);
    closeModal();
    // Reîncărcați promoțiile...
};

</script>
<template>
    <admin-layout :current-route="initialRoute" title="Promotions">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('promotions') }}</h3>
                        <span class="secondary-text">{{ __('here_is_all_promotions') }}</span>
                    </div>
                    <div class="flex-shrink-0">
                        <primary-button @click="openModal" class="mx-2">{{
                                __('create')
                            }}
                        </primary-button>
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
                        <div class="flex-shrink-0">
                            <div class="flex flex-col mt-8">
                                <div class="overflow-x-auto rounded-lg">
                                    <data-table
                                        @emit-click="order => modal(order)"
                                        :resources="resources"
                                        :columnsOrder="$page.props.columnsOrder"
                                        :columns="$page.props.columns"
                                        :initial-route="$page.props.initialRoute"
                                        :search-route="$page.props.searchRoute"/>
                                </div>
                            </div>
                            <div>
                                <h2 class="flex justify-center" v-if="resources.data.length === 0">{{
                                        __('no_promotions')
                                    }}...</h2>
                            </div>
                        </div>
                    </div>
                    <Modal :show="isModalOpen" :actions="false" @close="closeModal" max-width="6xl">


                        <div class="flex p-8 w-full">
                            <form @submit.prevent="addPromotion">
                                <div class="w ">
                                    <input v-model="promotion.name" type="text" placeholder="Nume" required>
                                    <textarea v-model="promotion.description" placeholder="Descriere"
                                              required></textarea>
                                    <input v-model="promotion.start_date" type="date" placeholder="Data de început"
                                           required>
                                    <input v-model="promotion.end_date" type="date" placeholder="Data de sfârșit"
                                           required>
                                    <input v-model="promotion.discount" type="number" placeholder="Discount" required>
                                    <select v-model="promotion.status">
                                        <option value="1">Activ</option>
                                        <option value="0">Inactiv</option>
                                    </select>

                                    <!-- Select pentru produse -->
                                    <select v-model="promotion.products">
                                        <option v-for="product in products" :value="product.id">{{
                                                product.name
                                            }}
                                        </option>
                                    </select>

                                    <!-- Select pentru branduri -->
                                    <select v-model="promotion.brands">
                                        <option v-for="brand in brands" :value="brand.id">{{ brand.name }}</option>
                                    </select>

                                    <!-- Select pentru subsubcategorii -->
                                    <select v-model="promotion.subsubcategories">
                                        <option v-for="subsubcategory in subsubcategories" :value="subsubcategory.id">
                                            {{ subsubcategory.name }}
                                        </option>
                                    </select>

                                </div>
                                <button type="submit" class="btn btn-primary">Adaugă</button>
                            </form>
                        </div>

                    </Modal>
                </div>
            </div>
        </div>
    </admin-layout>
</template>


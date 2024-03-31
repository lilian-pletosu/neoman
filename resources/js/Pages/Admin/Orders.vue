<template>
    <admin-layout :current-route="initialRoute" title="Orders">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                <div class="mb-4 flex items-center justify-between">
                    <div>
                        <h3 class="primary-text">{{ __('orders') }}</h3>
                        <span class="secondary-text">This is a list of latest transactions</span>
                    </div>
                    <div class="flex-shrink-0">
                        <a href="#" class="text-link-blue">View all</a>
                    </div>
                </div>
                <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
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
                                    __('no_orders')
                                }}...</h2>
                        </div>
                        <Modal :show="modalIsOpen" :actions="false" @close="modal" max-width="4xl">
                            <div class="grid grid-cols-1 p-4 pt-10 gap-4">
                                <div class="flex rounded items-center space-x-3">
                                    <p class="font-bold sm:text-xl font-mulish">{{ __('order_number') }}: {{
                                            order.order_number
                                        }}</p>
                                    <div class="rounded p-0.5 text-center  shadow "
                                         :class="{
                                                        'status-pending': order.status === 'pending',
                                                        'status-confirmed': order.status === 'confirmed',
                                                        'status-shipped': order.status === 'shipped',
                                                        'status-delivered': order.status === 'delivered',
                                                     }">
                                        <p class="text-black">{{ __(order.status) }}</p>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-black text-sm text-slate-500">{{ __('date') }}:
                                        {{ useDateFormat(order.created_at, "DD.MM.YYYY", {locales: 'rum'}).value }}</p>
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <span class="text-sm text-slate-500">Numele</span>
                                        <div class="p-1 border container-custom-rounded">
                                            <p>{{ order.first_name }}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span class="text-sm text-slate-500">Prenumele</span>
                                        <div class="p-1 border container-custom-rounded">
                                            <p>{{ order.last_name }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span class="text-sm text-slate-500 font-mulish">{{ __('products') }}</span>
                                    <div class="bg-slate-50 container-custom-rounded border">


                                        <table class="min-w-full">
                                            <thead class="bg-gray-200 border-b">
                                            <tr>
                                                <th scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    #
                                                </th>
                                                <th scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ __('product') }}
                                                </th>
                                                <th scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ __('qty') }}
                                                </th>
                                                <th scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ __('color') }}
                                                </th>
                                                <th scope="col"
                                                    class="hidden sm:block text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    {{ __('brand') }}
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(product, index) in order.products"
                                                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {{ ++index }}
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Mark
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Otto
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    @mdo
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>


                                    </div>
                                </div>

                            </div>
                        </Modal>
                    </div>
                </div>


            </div>

        </div>
    </admin-layout>
</template>

<script setup>
import {defineComponent, ref} from 'vue'
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {Link} from "@inertiajs/vue3";
import vSelect from 'vue-select'
import DataTable from "@/Components/DataTable.vue";
import Modal from "@/Components/Modal.vue";
import {useDateFormat} from "@vueuse/core";


defineProps({
    initialRoute: {
        type: String
    },
    resourceType: {
        type: String
    },
    resources: {
        type: Object,
        required: true
    }
});
defineComponent({
    name: "Products",

    components: {
        AdminLayout,
        Link,
        vSelect,
    },

    data() {
        return {
            data: Array
        }
    }

})
const notification = ref(false);
const type = ref('modal');
const method = ref('POST');
const notifyType = ref();

const modalIsOpen = ref(false);
const res = ref();

const showNotify = (type) => {
    notifyType.value = type;
    notification.value = !notification.value;
    setTimeout(() => {
        notification.value = !notification.value
    }, 2000);
}
const order = ref();

function modal(resource) {
    if (resource) order.value = resource;
    modalIsOpen.value = !modalIsOpen.value;
}
</script>

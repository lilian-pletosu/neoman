<template>
    <admin-layout :current-route="initialRoute" :title="Products">
        <div class="w-full grid grid-cols-1  gap-4">
            <div class="container-rounded ">

                    <div class="mb-4 flex items-center justify-between">
                        <div>
                            <h3 class="primary-text">{{__('products')}}</h3>
                            <span class="secondary-text">This is a list of latest transactions</span>
                        </div>
                        <div class="flex-shrink-0">
                            <a href="#" class="text-link-blue">View all</a>
                        </div>
                    </div>
                    <div class="flex flex-col mt-8">
                        <div class="overflow-x-auto rounded-lg">
                            <div class="align-middle inline-block min-w-full">
                                <div class="shadow overflow-hidden sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Transactions
                                            </th>
                                            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date & Time
                                            </th>
                                            <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                        <tr>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                Payment from <span class="font-semibold">Bonnie Green</span>
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 23 ,2021
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                $2300
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                                Payment refund to <span class="font-semibold">#00910</span>
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 23 ,2021
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                -$670
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                Payment failed from <span class="font-semibold">#087651</span>
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 18 ,2021
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                $234
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                                Payment from <span class="font-semibold">Lana Byrd</span>
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 15 ,2021
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                $5000
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                Payment from <span class="font-semibold">Jese Leos</span>
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 15 ,2021
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                $2300
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50">
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                                Payment from <span class="font-semibold">THEMESBERG LLC</span>
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 11 ,2021
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                $560
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                Payment from <span class="font-semibold">Lana Lysle</span>
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                Apr 6 ,2021
                                            </td>
                                            <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                $1437
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


            </div>

        </div>
    </admin-layout>
</template>

<script setup>
import {defineComponent} from 'vue'
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {Link} from "@inertiajs/vue3";
import vSelect from 'vue-select'
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import { Select, initTE } from "tw-elements";


defineProps({
    initialRoute: {
       type: String
   },
});
 defineComponent({
    name: "Products",

    components: {
        AdminLayout,
        Link,
        vSelect,
        Dropdown,
        Select,
        initTE
    },
})
</script>

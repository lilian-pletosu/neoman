<template>
  <div class="flex mb-4 ">
    <div class="flex sm:w-full md:w-5/12 lg:w-1/2 xl:w-4/12 relative">
      <input type="search" @change="search" v-model="searchText" :aria-label="__('search')"
             :placeholder="__('search...')"
             class="block rounded-md border-gray-300 shadow-sm focus:border-teal-500 flex-auto pr-10"/>
      <x-circle-icon class="w-5 absolute right-2 top-2/4 transform -translate-y-2/4 cursor-pointer text-gray-500"
                     @click="clearSearch"/>
    </div>
    <div class="flex">
      <primary-button class="mx-1 w-full h-full" @click="search">{{ __('search') }}</primary-button>
    </div>
  </div>

  <div class="align-middle inline-block min-w-full">
    <div class="shadow overflow-hidden rounded-lg sm:rounded-tr-md ">
      <table class="min-w-full divide-y divide-gray-200 ps--scrolling-x">
        <thead class="bg-gray-50">
        <tr>
          <th v-for="(column) in columnsOrder" scope="col" :key="column"
              class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
            {{ __(column) }}
          </th>
        </tr>
        </thead>
        <tbody class="bg-white ">
        <tr v-for="(resource, index) in resources.data" :key="index" class="hover:bg-gray-100">
          <template v-for="(columnInOrder) in columnsOrder">
            <template v-for="column in columns">
              <template v-if="column === columnInOrder">
                <td class="py-2 px-6 text-sm text-gray-900 whitespace-nowrap"
                    v-html="resource[columnInOrder]">
                </td>
              </template>
            </template>
            <template v-if="$page.props.relationColumns"
                      v-for=" relationColumn in $page.props.relationColumns">
              <td class="py-2 px-6 text-sm text-gray-900 whitespace-nowrap hover"
                  v-if="relationColumn.label === columnInOrder"
              >
                {{ resource[relationColumn.relation][relationColumn.fields] }}
              </td>
            </template>
          </template>
        </tr>
        </tbody>

      </table>

    </div>
    <div class="flex place-content-center mt-4">
      <pagination :links="resources.links"/>
    </div>
  </div>

</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import Pagination from "@/Components/Pagination.vue";
import {router} from "@inertiajs/vue3";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import {XCircleIcon} from "@heroicons/vue/20/solid/index.js";


const app = getCurrentInstance();
let searchText = ref();

const search = () => {

  submit()
}

const submit = () => {
  router.get(route('admin.products.index', {
    search: searchText.value
  }, {preserveState: true}))
};

const clearSearch = () => {
  searchText.value = "";
  router.get(route('admin.products.index', {
    search: searchText.value
  }, {preserveState: true}))
}

onMounted(() => {
  searchText.value = app.appContext.config.globalProperties.$page.props.filters.search
})

defineProps({
  resources: {
    type: Object
  },
  columnsOrder: {
    type: Array
  },
  columns: {
    type: Array
  }
});

</script>

<style scoped>

</style>

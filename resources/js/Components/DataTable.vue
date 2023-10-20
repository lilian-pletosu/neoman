<template>
  <div class="flex mb-4">
    <div class="flex lg:w-1/2 xl:w-4/12 relative">
      <input type="text" id="search" @input="search" v-model="searchText" :aria-label="__('search')"
             :placeholder="__('search...')"
             class="block flex rounded-md border-gray-300 shadow-sm focus:border-teal-500 flex-auto pr-10"/>
      <x-circle-icon class="w-5 absolute right-2 top-2/4 transform -translate-y-2/4 cursor-pointer text-gray-500"
                     @click="clearSearch"/>
    </div>
    <div class="flex">
      <primary-button class="mx-1 w-full h-full" @click="search">{{ __('search') }}</primary-button>
    </div>
  </div>

  <div class="flex flex-col mt-8">
    <div class="overflow-x-auto md:overflow-hidden flex rounded-lg">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 ">
            <thead class="bg-gray-50">
            <tr>
              <th v-for="(column) in columnsOrder" scope="col" :key="column"
                  class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  :class="{'hidden xl:block' : column === 'description'}">
                {{ __(column) }}
              </th>
            </tr>
            </thead>
            <tbody class="bg-white">
            <tr v-for="(resource, index) in resources.data" :key="index" class=" hover:bg-gray-100 ">
              <template v-for="(columnInOrder) in columnsOrder">
                <template v-for="column in columns">
                  <template v-if="column === columnInOrder">
                    <td @click="emitClick(resource)"
                        class="py-2 px-6 text-sm text-gray-900 whitespace-nowrap  text-center"
                        :class="{ 'hidden    xl:block' : columnInOrder === 'description'}">
                      <template v-if="columnInOrder === 'image'">
                        <img v-if="resource[columnInOrder]" class="w-16"
                             :src="resource[columnInOrder]"
                             alt="image"/>
                      </template>
                      <template v-else>
                        <div class="rounded w-14 flex justify-center"
                             :class="{'bg-green-400 font-semibold ' : resource[columnInOrder] === 1,
                                                     'bg-red-400 font-semibold' : resource[columnInOrder] === 0}">
                          {{ __(applyFormat(column, resource[columnInOrder])) }}
                        </div>
                      </template>
                    </td>
                  </template>
                </template>
                <template v-if="$page.props.relationColumns"
                          v-for=" relationColumn in $page.props.relationColumns">
                  <td class="py-2 px-6 text-sm text-gray-900 whitespace-nowrap hover"
                      v-if="relationColumn.label === columnInOrder">
                    {{ resource[relationColumn.relation][relationColumn.fields] }}
                  </td>
                </template>
              </template>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="flex place-content-start mt-4">
          <pagination :links="resources.links"/>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import Pagination from "@/Components/Pagination.vue";
import {router, useForm} from "@inertiajs/vue3";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import {XCircleIcon} from "@heroicons/vue/20/solid/index.js";


defineProps({
  resources: {
    type: Object
  },
  columnsOrder: {
    type: Array
  },
  columns: {
    type: Array
  },
  searchRoute: {
    type: String,
    required: true
  },
  initialRoute: {
    type: String,
    required: true
  }
});
const app = getCurrentInstance();
let searchText = ref();

let form = useForm({});

const search = () => {
  submitSearch()
}

const submitSearch = () => {
  router.visit(route(`${app.props.searchRoute}.index`, {
    search: searchText.value,
  }, {only: ['resources']}))
};

const emit = defineEmits(['emitClick']);

const emitClick = (res) => {
  emit('emitClick', res);
}


const applyFormat = (columnName, columnValue) => {
  if (columnName === 'is_enabled') {
    if (columnValue === 1) {
      return 'active';
    }
    return 'inactive';

  }

  if (columnName === 'description') {
    return app.appContext.config.globalProperties.truncate(columnValue, 50);
  }
  return columnValue;
}

function applyTypeInput(columnName) {
  if (columnName === 'image' || columnName === 'file') {
    return 'file';
  }
  return 'text';
}


const clearSearch = () => {
  searchText.value = "";
  router.visit(route(`${app.props.searchRoute}.index`, {
    search: searchText.value,
  }),)
}

onMounted(() => {
  searchText.value = app.appContext.config.globalProperties.$page.props.filters.search
  document.querySelector('input[id="search"]').focus();
})


</script>

<style scoped>

</style>

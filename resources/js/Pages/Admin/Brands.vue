<template>
  <admin-layout :current-route="initialRoute" :title="Products">

    <div class="w-full grid grid-cols-1  gap-4">
      <div class="container-rounded ">

        <div class="mb-4 flex items-center justify-between">
          <div>
            <h3 class="primary-text">{{ __('brands') }}</h3>
            <span class="secondary-text">This is a list of latest transactions</span>
          </div>
          <div class="flex-shrink-0">
            <primary-button @click="modalCreateBrand" class="mx-2">{{ __('create') }}</primary-button>
            <secondary-button>{{ __('import') }}</secondary-button>
          </div>
        </div>
        <div class="flex flex-col mt-8">
          <div class="overflow-x-auto rounded-lg">
            <data-table :resources="resources" :columnsOrder="$page.props.columnsOrder"
                        :columns="$page.props.columns" :search-route="$page.props.searchRoute"/>
          </div>
        </div>


        <Modal :show="isOpen" @close="isOpen" :closeable="true">
          <div class="container-rounded">
            <template v-if="createBrand">
              <div class="flex flex-col">
                <h1 class="primary-text">{{ __('create_brand') }}</h1>
                <p class="secondary-text">{{ __('complete_all_fields') }}</p>
              </div>
              <div>
                <form @submit.prevent="submit" method="POST">
                  <div class="my-4 text-sm text-gray-600">
                    <black-input v-model="form.name" :label="__('name')"
                                 :error-message="__(form.errors.name)"/>
                    <black-input v-model="form.description" :label="__('description')"
                                 :error-message="__(form.errors.description)"/>
                    <black-input v-model="form.website" :label="__('website')"
                                 :error-message="__(form.errors.website)"/>
                    <black-selector @update:status="setStatus" :options="{1: 'active', 0: 'inactive'}"
                                    :error-message="__(form.errors.is_enabled)"/>

                    <div class="my-5">
                      <label for="image" class="block mb-2 text-sm font-medium text-gray-900 ">{{ __('image') }}</label>

                      <input @input="form.image = $event.target.files[0]"
                             class="block  text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                             id="image" type="file">
                    </div>
                  </div>
                  <div class="mt-6  flex justify-end">
                    <SecondaryButton class="mx-2" @click="modalCreateBrand"> {{ __('cancel') }}</SecondaryButton>
                    <PrimaryButton type="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
                  </div>
                </form>
              </div>
            </template>
            <template v-if="importBrands">
              <div class="flex flex-col">
                <h1 class="primary-text">{{ __('create_brand') }}</h1>
                <p class="secondary-text">{{ __('complete_all_fields') }}</p>
              </div>
              <div>
                <form @submit.prevent="submit">
                  <div class="my-4 text-sm text-gray-600">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">{{ __('name') }}</label>
                    <input type="text" id="name"
                           class="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required>
                    <label for="name"
                           class="block mb-2 text-sm font-medium text-gray-900 ">{{ __('description') }}</label>
                    <input type="text" id="name"
                           class="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">{{ __('website') }}</label>
                    <input type="url" id="name"
                           class="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required>
                    <label for="status" class="block mb-2 text-sm font-medium text-gray-900 ">{{ __('status') }}</label>
                    <select id="countries"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>{{ __('select_status') }}</option>
                      <option value="1">{{ __('active') }}</option>
                      <option value="2">{{ __('inactive') }}</option>

                    </select>
                    <progress v-if="form.progress" :value="form.progress.percentage" max="100"
                              class="flex w-full">
                      {{ form.progress.percentage }}%
                    </progress>
                    <!--                  <div class="text-red-500" v-if="form.errors.file">{{ __(form.errors.file) }}*</div>-->

                  </div>


                  <div class="mt-6  flex justify-end">
                    <SecondaryButton class="mx-2" @click="modalCreateBrand"> {{ __('cancel') }}</SecondaryButton>
                    <PrimaryButton type="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
                  </div>
                </form>
              </div>
            </template>
          </div>
        </Modal>


      </div>

    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import DataTable from "@/Components/DataTable.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Modal from "@/Components/Modal.vue";
import {ref} from "vue";
import {useForm} from "@inertiajs/vue3";
import BlackInput from "@/Components/BlackInput.vue";
import BlackSelector from "@/Components/BlackSelector.vue";
import {notify} from "notiwind";

defineProps({
  initialRoute: {
    type: String
  },
  resources: {
    type: Object,
    required: true
  }
});
const isOpen = ref(false);
const createBrand = ref(false);
const importBrands = ref(false);


const setStatus = (status) => {
  form.is_enabled = status;
}
const modalCreateBrand = () => {
  createBrand.value = !createBrand.value
  isOpen.value = !isOpen.value;
  form.clearErrors()
  form.reset()
}
const form = useForm({
  name: '',
  description: '',
  website: '',
  is_enabled: '',
  image: null
})

function submit() {
  form.post(route('admin.brands.store'), {
    onSuccess() {
      modalCreateBrand();
      form.reset();
      notify({
        group: 'success',
        title: 'Success',
        text: 'Brand created success!'
      }, 400000);
    }
  });
}

</script>

<template>
  <admin-layout :current-route="initialRoute" title="Brands">
    <custom-notification message="Brand success created!" type="success" :show="notification"/>

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
            <data-table
                @emit-click="args => schemaForm(args)"
                :resources="resources"
                :columnsOrder="$page.props.columnsOrder"
                :columns="$page.props.columns"
                :initial-route="$page.props.initialRoute"
                :search-route="$page.props.searchRoute"/>
          </div>
        </div>
        <div>
          <h2 class="flex justify-center" v-if="resources.data.length === 0">{{ __('no_brands') }}...</h2>
        </div>
        <Modal :show="isOpen" @close="modalCreateBrand">
          <div class="container-rounded">
            <template v-if="createBrand">
              <div class="flex flex-col">
                <h1 class="primary-text">{{ __('create_brand') }}</h1>
                <p class="secondary-text">{{ __('complete_all_fields') }}</p>
              </div>
              <div>
                <form @submit.prevent="submitCreate" method="POST">
                  <div class="my-4 text-sm text-gray-600">
                    <black-input v-model="form1.name" :label="__('name')"
                                 :error-message="__(form1.errors.name)"/>
                    <black-input v-model="form1.description" :label="__('description')"
                                 :error-message="__(form1.errors.description)"/>
                    <black-input v-model="form1.website" :label="__('website')"
                                 :error-message="__(form1.errors.website)"/>
                    <black-selector @update:status="args => setStatus(args)" :value="form1.is_enabled"
                                    :error-message="__(form1.errors.is_enabled)"
                                    :options="{ 1: 'active', 0: 'inactive'}"
                                    :model-value="form1.is_enabled"/>
                    <div class="my-5">
                      <label for="image" class="block mb-2 text-sm font-medium text-gray-900 ">{{
                          __('image')
                        }}</label>

                      <input @input="form1.image = $event.target.files[0]"
                             class="block  text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                             id="image" type="file">
                    </div>
                  </div>
                  <div class="mt-6  flex justify-end">
                    <SecondaryButton class="mx-2" @click="modalCreateBrand"> {{
                        __('cancel')
                      }}
                    </SecondaryButton>
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
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">{{
                        __('name')
                      }}</label>
                    <input type="text" id="name"
                           class="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required>
                    <label for="name"
                           class="block mb-2 text-sm font-medium text-gray-900 ">{{
                        __('description')
                      }}</label>
                    <input type="text" id="name"
                           class="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">{{
                        __('website')
                      }}</label>
                    <input type="url" id="name"
                           class="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required>
                    <label for="status" class="block mb-2 text-sm font-medium text-gray-900 ">{{
                        __('status')
                      }}</label>
                    <select id="status"
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
                    <SecondaryButton class="mx-2" @click="modalCreateBrand"> {{
                        __('cancel')
                      }}
                    </SecondaryButton>
                    <PrimaryButton type="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
                  </div>
                </form>
              </div>
            </template>
          </div>
        </Modal>
        <schema-form-builder type="edit"
                             :modal-is-open="modalIsOpen"
                             @close="schemaForm"
                             :resource="res"
                             :endpoint="initialRoute"
                             method="PUT"
                             :fields="$page.props.columnsOrder"/>

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
import CustomNotification from "@/Components/CustomNotification.vue";
import SchemaFormBuilder from "@/Components/SchemaFormBuilder.vue";
import BlackSelector from "@/Components/BlackSelector.vue";


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
const notification = ref(false);


const setStatus = (status) => {
  form1.is_enabled = status;
}

const modalIsOpen = ref(false);
const res = ref();

const clickit = () => {
  notification.value = !notification.value;
  setTimeout(() => {
    notification.value = !notification.value
  }, 2000);
}
const modalCreateBrand = () => {
  createBrand.value = !createBrand.value
  isOpen.value = !isOpen.value;
  form1.clearErrors()
  form1.reset()
}
const form1 = useForm({
  name: '',
  description: '',
  website: '',
  is_enabled: '',
  image: null
})

function submitCreate() {
  form1.post(route('admin.brands.store'), {
    onSuccess() {
      modalCreateBrand();
      form1.reset();
      clickit();
    }
  });
}


function schemaForm(resource) {
  modalIsOpen.value = !modalIsOpen.value;
  if (resource) {
    console.log(resource)
    res.value = resource;
  }
}

</script>


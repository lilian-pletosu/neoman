<script setup>
import Modal from "@/Components/Modal.vue";
import {useForm} from "@inertiajs/vue3";
import BlackInput from "@/Components/BlackInput.vue";
import {onMounted, onUpdated, ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";

// const form = useForm({});
const form = useForm({});

const cloneFields = ref();

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: 'modal'
  },
  fields: {
    type: [],
    required: true
  },
  method: {
    type: String,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  modalIsOpen: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    default: 'Modal title'
  },
  subtitle: {
    type: String,
    default: 'Modal subtitle'
  },
  resource: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  cloneFields.value = props.fields
})

onUpdated(() => {
  if (props.resource) {
    cloneFields.value.forEach(field => {
      form[field] = props.resource[field];
    });
  }
})

function submit() {

  // form.put(route('admin.brands.update', {brand: props.resource.id}));
  form['test'] = 'test';
  console.log(form);
  form.put(route('admin.brands.update', {brand: props.resource.id}))
}
</script>

<template>
  <Modal :show="modalIsOpen" max-width="2xl">
    <div class="container-rounded">
      <div class="">
        <div class="flex  flex-col">
          <template v-if="type === 'modal'">
            <h1 class="primary-text ">{{ __(title) }}</h1>
            <p class="secondary-text">{{ __(subtitle) }}</p>
          </template>
          <template v-else-if="type === 'edit'">
            <h1 class="primary-text">Edit Resource</h1>
            {{ form }}
            <form @submit.prevent="submit">
              <template v-for="field in cloneFields">
                <black-input type="text" @update:modelValue="args => form[field] = args" :model-value="resource[field]"
                             :label="field"/>
              </template>
              <div class="mt-6  flex justify-end">
                <SecondaryButton class="mx-2" @click=""> {{
                    __('cancel')
                  }}
                </SecondaryButton>
                <PrimaryButton type="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
              </div>
            </form>
          </template>
          <template v-else-if="type === 'create'">
            <h1 class="primary-text">Create Resource</h1>
          </template>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>

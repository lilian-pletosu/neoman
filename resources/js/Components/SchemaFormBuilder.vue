<script setup>
import Modal from "@/Components/Modal.vue";
import {useForm} from "@inertiajs/vue3";
import BlackInput from "@/Components/BlackInput.vue";
import {getCurrentInstance, onMounted, onUpdated, ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import BlackSelector from "@/Components/BlackSelector.vue";
import CustomInputFile from "@/Components/CustomInputFile.vue";

let form = useForm({});
const app = getCurrentInstance();
const emit = defineEmits(['close-modal'])

const cloneFields = ref();
const schemaForm = ref({});

const props = defineProps({
    type: {
        type: String,
        required: true,
        default: 'modal'
    },
    resourceRoute: {
        type: String,
        required: true
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

function fetchFields() {
    if (props.type === 'edit') {
        fetch(route(`${props.resourceRoute}.edit`, {brand: props.resource.id}))
            .then(response => response.json())
            .then(data => {
                schemaForm.value = data;
                form = useForm(app.appContext.config.globalProperties.fetchedSchemaFormBuild(data))
            })
    }
}

onUpdated(() => {
    fetchFields()
})

function submit() {
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
                        <form @submit.prevent="submit()">
                            <template v-for="field in schemaForm.fields">
                                <template v-if="field.type === 'text' || field.type === 'textarea' ">
                                    <black-input :type="field.type" @update:modelValue="args => form[field.name] = args"
                                                 :model-value="form[field.name]"
                                                 :label="__(field.placeholder)"/>
                                </template>
                                <template v-if="field.type === 'select'">
                                    <black-selector @update:status="args => form[field.name] = (args)"
                                                    :value="form[field.name]"
                                                    :error-message="__(form.errors[field.name])"
                                                    :options="{ 1: 'active', 0: 'inactive'}"
                                                    :model-value="form[field.name]"/>
                                </template>
                                <template v-if="field.type === 'file'">
                                    <custom-input-file
                                        @update:file="args => form[field.name] = args"
                                        v-model="form[field.name]"/>
                                </template>
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
                        <div class="flex flex-col">
                            <h1 class="primary-text">{{ __('create_brand') }}</h1>
                            <p class="secondary-text">{{ __('complete_all_fields') }}</p>
                        </div>
                        <div>
                            <form @submit.prevent="submitCreate" method="POST">
                                {{ form1 }}

                                <div class="my-4 text-sm text-gray-600">
                                    <black-input v-model="form.name" :label="__('name')"
                                                 :error-message="__(form.errors.name)"/>
                                    <black-input v-model="form.description" :label="__('description')"
                                                 :error-message="__(form1.errors.description)"/>
                                    <black-input v-model="form.website" :label="__('website')"
                                                 :error-message="__(form1.errors.website)"/>
                                    <black-selector @update:status="args => setStatus(args)"
                                                    :value="form.is_enabled"
                                                    :error-message="__(form1.errors.is_enabled)"
                                                    :options="{ 1: 'active', 0: 'inactive'}"
                                                    :model-value="form.is_enabled"/>
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
                                    <SecondaryButton class="mx-2" @close="emit('close-modal')"> {{
                                            __('cancel')
                                        }}
                                    </SecondaryButton>
                                    <PrimaryButton type="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </Modal>
</template>

<style scoped>

</style>

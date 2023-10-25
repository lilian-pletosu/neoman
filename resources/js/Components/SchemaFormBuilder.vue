<script setup>
import Modal from "@/Components/Modal.vue";
import {router, useForm} from "@inertiajs/vue3";
import BlackInput from "@/Components/BlackInput.vue";
import {getCurrentInstance, onMounted, onUpdated, ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import BlackSelector from "@/Components/BlackSelector.vue";

let form = useForm({});
const app = getCurrentInstance();
const emit = defineEmits(['close-modal', 'showNotify'])

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
    if (props.type == 'create') {
        fetch(route(`${props.resourceRoute}.create`))
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
    if (props.type == 'edit') {
        router.post(route(`${props.resourceRoute}.update`, {brand: props.resource.id}), {
            _method: 'put',
            form: form,
        })
    }
    if (props.type == 'create') {
        form.post(route(`${props.resourceRoute}.create`,))
        form.reset()
    }

}
</script>

<template>
    <Modal :show="modalIsOpen" max-width="2xl">
        <div class="container-rounded">
            <div class="">
                <div class="flex  flex-col">
                    <template v-if="type === 'modal'">
                        <h1 class="primary-text ">{{ __('modal_title') }}</h1>
                        <p class="secondary-text">{{ __('subtitle') }}</p>
                    </template>
                    <template v-else-if="type === 'edit'">
                        <h1 class="primary-text">Edit Resource</h1>
                        <form @submit.prevent="submit()">
                            <template v-for="field in schemaForm.fields">
                                <template v-if="['text', 'textarea'].includes(field.type)">
                                    <black-input :type="field.type" @update:modelValue="args => form[field.name] = args"
                                                 :model-value="form[field.name]"
                                                 :error-message="__($page.props.errors[`form.${field.name}`])"
                                                 :label="__(field.placeholder)"/>
                                </template>
                                <template v-if="['select'].includes(field.type)">
                                    <black-selector @update:status="args => form[field.name] = (args)"
                                                    :value="form[field.name]"
                                                    :error-message="__($page.props.errors[`form.${field.name}`])"
                                                    :options="{ 1: 'active', 0: 'inactive'}"
                                                    :model-value="form[field.name]"/>
                                </template>
                                <template v-if="['file'].includes(field.type)">
                                    <div class="my-5">
                                        <label for="image"
                                               class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                                __('image')
                                            }}</label>
                                        <input @change="form.image = $event.target.files[0]"
                                               class="block text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                               :id="field.name" :type="field.type">
                                    </div>
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
                            <form @submit.prevent="submit">

                                <div class="my-4 text-sm text-gray-600">
                                    <template v-for="(field, key) in schemaForm.fields">
                                        {{ }}
                                        <template v-if="['text', 'textarea'].includes(field.type)">
                                            <black-input v-model="form[field.name]" :type="field.type"
                                                         :label="__(field.name)"
                                                         :error-message="__(form.errors[field.name])"/>
                                        </template>
                                        <template v-if="['select'].includes(field.type)">
                                            <black-selector @update:status="args => form[field.name] = args"
                                                            :value="form[field.name]"
                                                            :error-message="__(form.errors[field.name])"
                                                            :options="{ 1: 'active', 0: 'inactive'}"
                                                            :model-value="form[field.name]"/>
                                        </template>
                                        <template v-if="['file'].includes(field.type)">
                                            <div class="my-5">
                                                <label for="image"
                                                       class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                                        __('image')
                                                    }}</label>

                                                <input @input="form.image = $event.target.files[0]"
                                                       class="block  text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                       :id="field.name" type="file">
                                            </div>
                                        </template>
                                    </template>

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

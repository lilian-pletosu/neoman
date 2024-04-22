<script setup>
import Modal from "@/Components/Modal.vue";
import {router, useForm} from "@inertiajs/vue3";
import {getCurrentInstance, onMounted, onUpdated, ref} from "vue";
import BlackInput from "@/Components/BlackInput.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import BlackSelector from "@/Components/BlackSelector.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Description from "@/Components/Description.vue";
import ImageSlider from "@/Components/ImageSlider.vue";
import ProgressCustom from "@/Components/ProgressCustom.vue";


let formEdit = useForm({});
let formCreate = useForm({});
let formImport = useForm({
    file: null,
});
const app = getCurrentInstance();
const emit = defineEmits(['close-modal', 'showNotify'])
const errors = ref({});
let importFile = ref({});
let image = ref({});

const cloneFields = ref();
const schemaForm = ref({});
const resourceModal = ref({});

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
    },
    columns: {
        type: Array,
        required: true
    },
    resourceType: {
        type: String
    }
})

onMounted(() => {
    cloneFields.value = props.fields
    fetchFieldsCreate();
})


async function fetchEditFormData() {
    if (['edit'].includes(props.type) && props.resource) {
        await fetch(route(`${props.resourceRoute}.edit`, props.resource.id))
            .then(response => response.json())
            .then(data => {
                schemaForm.value = data;
                formEdit = useForm(app.appContext.config.globalProperties.fetchedSchemaFormBuild(data))
                console.log(formEdit);
            })
    }
}

async function fetchResourceData() {
    if (['modal'].includes(props.type) && props.resource) {

        await fetch(route(`${props.resourceRoute}.show`, props.resource.id))
            .then(response => response.json())
            .then(data => {

                resourceModal.value = data;
            })
    }
}

async function fetchFieldsCreate() {
    // if (props.type == 'create') {
    await fetch(route(`${props.resourceRoute}.create`))
        .then(response => response.json())
        .then(data => {
            schemaForm.value = data;
            formCreate = useForm(app.appContext.config.globalProperties.fetchedSchemaFormBuild(data))
        })
    // }
}

onUpdated(() => {
    fetchEditFormData();
    fetchResourceData();
})

const closeModalWithNotify = (typeNotify) => {
    emit('close-modal');
    emit("showNotify", typeNotify)
}

const closeCreateForm = () => {
    emit('close-modal');
    formCreate.reset();
}

function submit() {
    if (props.type == 'edit') {
        router.post(route(`${props.resourceRoute}.update`, props.resource.id), {
            _method: 'put',
            image: image,
            form: formEdit,
        }, {
            only: ['errors', 'resources'],
            onSuccess: params => {
                closeCreateForm();
                image = {}
            }
        })
    }
    if (props.type == 'create') {
        formCreate.post(route(`${props.resourceRoute}.store`), {
            onSuccess: params => {
                console.log(params);
                closeCreateForm()
                emit('showNotify', props.type)
            }
        })
    }
    if (['import'].includes(props.type)) {
        formImport.post(route(`importResource`, props.resourceType), {
            onSuccess: () => {
                closeCreateForm()
                emit('showNotify', props.type)
            },
            onProgress: (progress) => {
                formImport.process = progress
            }
        })
    }
}

const deleteResource = (resId) => {
    router.delete(route(`${props.resourceRoute}.destroy`, props.resource.id), {
        onBefore: () => confirm(`Are you sure you want to delete this ${props.resourceType}?`),
        onSuccess: () => closeModalWithNotify('delete'),
        onError: (err) => console.log(err)
    })
}

const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    this.formEdit[field.name] = file;
}

</script>

<template>
    <Modal :modal-type="type" :show="modalIsOpen" max-width="2xl" @edit="type = 'edit'"
           @delete="deleteResource(resource.id)">
        <div class="container-rounded">
            <div class="">
                <div class="flex  flex-col">
                    <!--        View Resource            -->
                    <template v-if="type === 'modal'">
                        <h1 class="primary-text ">{{ __(`view_${resourceType}`) }}</h1>

                        <div class="columns-2md">
                            <template v-if="resource.image != null && resource.image != 'image'">
                                <div class="w-full mt-4 flex justify-center border border-solid">
                                    <img class="w-1/2" :src="resource.image" alt="">
                                </div>
                            </template>
                            <template v-if="resource.image === 'image'">
                                <div class="w-full mt-4 flex justify-center border border-solid">
                                    <img class=""
                                         :src="'/img/no_image.svg'"
                                         alt="image else"/>
                                </div>
                            </template>
                            <template v-if="resource.images">
                                <div v-for="filed in $page.props.relationColumns">
                                    <template v-if="['image', 'images'].includes(filed.label)">
                                        <div class="w-full mt-4 flex justify-center border border-solid">
                                            <ImageSlider :columns="$page.props.relationColumns"
                                                         :resource-type="resourceType"
                                                         :images="resource.images"/>
                                        </div>
                                    </template>
                                </div>
                            </template>

                            <div class="columns-2 p-2">
                                <description :resource="resource" :resource-modal="resourceModal" :columns="columns"/>
                            </div>
                        </div>
                    </template>
                    <!--        Edit Section            -->
                    <template v-else-if="type === 'edit'">
                        <h1 class="primary-text">{{ __(`edit_${resourceType}`) }}</h1>
                        <form @submit.prevent="submit">
                            <template v-for="field in schemaForm.fields">
                                <template v-if="['text', 'textarea', 'number'].includes(field.type)">
                                    <black-input :type="field.type"
                                                 @update:modelValue="args => formEdit[field.name] = args"
                                                 :model-value="formEdit[field.name]"
                                                 :error-message="__($page.props.errors[`form.${field.name}`])"
                                                 :label="__(field.placeholder)"/>
                                </template>
                                <template v-if="['select'].includes(field.type)">
                                    <black-selector
                                        @update:status="args => formEdit[field.name] = args"
                                        :value="formEdit[field.name]"
                                        :label="__(field.label)"
                                        :error-message="__($page.props.errors[`form.${field.name}`])"
                                        :options="field.options"
                                    />
                                </template>

                                <template v-if="['file'].includes(field.type)">
                                    <div class="my-5">
                                        <label for="image"
                                               class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                                __('image')
                                            }}</label>
                                        <!--                                        <input @change="handleFileUpload(event, field)"-->
                                        <!--                                               class="block text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"-->
                                        <!--                                               :id="field.name" :type="field.type">-->
                                        <input @input="image = $event.target.files[0]"
                                               class="block  text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                               :id="field.name" type="file">
                                    </div>
                                </template>
                            </template>
                            <div class="mt-6  flex justify-end">
                                <SecondaryButton @click="emit('close-modal')" class="mx-2"> {{
                                        __('cancel')
                                    }}
                                </SecondaryButton>
                                <PrimaryButton type="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
                            </div>
                        </form>
                    </template>
                    <!--        Create Section           -->
                    <template v-else-if="type === 'create'">
                        <div class="flex flex-col">
                            <h1 class="primary-text">{{ __(`create_${resourceType}`) }}</h1>
                            <p class="secondary-text">{{ __('complete_all_fields') }}</p>
                        </div>
                        <div>
                            <form @submit.prevent="submit">

                                <div class="my-4 text-sm text-gray-600">
                                    <template v-for="(field, key) in schemaForm.fields">
                                        <template v-if="['text', 'textarea', 'number'].includes(field.type)">
                                            <black-input v-model="formCreate[field.name]" :type="field.type"
                                                         :label="__(field.name)"
                                                         :error-message="__(formCreate.errors[field.name])"/>
                                        </template>
                                        <template v-if="['select'].includes(field.type)">
                                            <black-selector @update:status="args => formCreate[field.name] = args"
                                                            :value="formCreate[field.name]"
                                                            :label="__(field.label)"
                                                            :error-message="__(formCreate.errors[field.name])"
                                                            :options="field.options"
                                                            :model-value="formCreate[field.name]"/>
                                        </template>
                                        <template v-if="['file'].includes(field.type)">
                                            <div class="my-5">
                                                <label for="image"
                                                       class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                                        __(field.label)
                                                    }}</label>

                                                <input @input="formCreate.image = $event.target.files[0]"
                                                       class="block  text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                       :id="field.name" type="file">
                                                <progress v-if="formCreate.progress"
                                                          :value="formCreate.progress.percentage" max="100">
                                                    {{ formCreate.progress.percentage }}%
                                                </progress>
                                            </div>
                                        </template>
                                    </template>

                                </div>
                                <div class="mt-6  flex justify-end">
                                    <SecondaryButton class="mx-2" @click="closeCreateForm"> {{
                                            __('cancel')
                                        }}
                                    </SecondaryButton>
                                    <PrimaryButton type="submit" class="mx-2">{{ __('submit') }}</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </template>
                    <!--        Import Section            -->
                    <template v-else-if="type === 'import'">
                        <div class="flex flex-col">
                            <h1 class="primary-text">{{ __(`import_${resourceType}`) }}</h1>
                            <p class="secondary-text">{{ __('upload_excel_file') }}</p>
                        </div>
                        <div>

                            <div class="my-4 text-sm text-gray-600">
                                <div class="my-5">
                                    <label for="image"
                                           class="block mb-2 text-sm font-medium text-gray-900 ">{{
                                            __('excel_file')
                                        }}</label>

                                    <input @input="formImport.file = $event.target.files[0]"
                                           class="block  text-sm w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                           type="file">

                                </div>
                                <div v-if="formImport.progress" class="w-full  py-1">
                                    <ProgressCustom v-model="formImport.progress.percentage"/>
                                </div>
                                <span class="">{{ errors.import }}</span>


                            </div>
                            <div class="mt-6  flex justify-end">
                                <SecondaryButton class="mx-2" @click="closeCreateForm"> {{
                                        __('cancel')
                                    }}
                                </SecondaryButton>
                                <PrimaryButton @click="submit()" class="mx-2">{{ __('submit') }}</PrimaryButton>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </Modal>
</template>



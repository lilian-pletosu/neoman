<script setup>
import { onMounted, ref, watch } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import BlackInput from "@/Components/BlackInput.vue";
import BlackSelector from "@/Components/BlackSelector.vue";
import { TrashIcon } from "@heroicons/vue/20/solid";
import CustomInputFile from "@/Components/CustomInputFile.vue";
import { useForm, router } from "@inertiajs/vue3";
import { PencilSquareIcon } from "@heroicons/vue/16/solid/index.js";
import { usePage } from "@inertiajs/vue3";

const props = defineProps({
    initialRoute: {
        type: String,
    },
    resourceType: {
        type: String,
    },
    product: {
        type: Object,
    },
    creditsSettings: {
        type: Object,
    },
    subSubCategories: {
        type: Array,
    },
    brands: {
        type: Array,
    },
});

const page = usePage();

const closeModal = () => {
    isOpen.value = false;
    form.reset();
};
const isOpen = ref(false);

const form = useForm({
    num_of_installments: "",
    interest_rate: "",
    type: "",
});

const formImage = useForm({
    image: null,
});

const credits = ref([]);
const installments = ref([]);

const filtredCredits = () => {
    credits.value = props.product.credits.filter((credit) => {
        return credit.type === "credit";
    });
};

const filtredInstallments = () => {
    installments.value = props.product.credits.filter((credit) => {
        return credit.type === "installments";
    });
};

const submitCredits = () => {
    router.post(
        route("admin.update-credits-options", {
            product: props.product,
        }),
        {
            form: form,
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                filtredCredits();
                filtredInstallments();
            },
        }
    );
};

const images = ref([]);
const isOrderChanged = ref(false);

const startDrag = (event, index) => {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("index", index);
};

const onOver = (event) => event.target.classList.add("on-over");
const onLeave = (event) => event.target.classList.remove("on-over");

const onDrop = (event, index) => {
    isOrderChanged.value = true;

    onLeave(event);
    const draggedIndex = parseInt(event.dataTransfer.getData("index"));
    const draggedItem = images.value[draggedIndex];
    images.value.splice(draggedIndex, 1); // Înlătură elementul de la poziția inițială
    images.value.splice(index, 0, draggedItem); // Inserează elementul la noua poziție
};
function imageUrls() {
    // Extragem primul obiect din array-ul product și selectăm doar valorile care încep cu "image" și nu sunt null
    const imagesObject = props.product.images[0];
    return Object.entries(imagesObject)
        .filter(([key, value]) => key.startsWith("image") && value !== null)
        .map(([, value]) => value);
}

onMounted(() => {
    filtredCredits();
    filtredInstallments();
    // after 1 second, we will get the image urls
    images.value = imageUrls();
});

const submitSortedImages = () => {
    router.put(
        route("admin.update-images-order", {
            product: props.product,
        }),
        {
            images: images.value,
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                isOrderChanged.value = false;
            },
        }
    );
};
const uploadedImage = ref(null);

const deleteCredit = (creditId) => {
    router.delete(
        route("admin.delete-credit-from-product", {
            product: props.product.id,
            credit: creditId,
        }),
        {
            preserveScroll: true,
            onSuccess: () => {
                filtredCredits();
                filtredInstallments();
            },
            only: ["product"],
        }
    );
};

const submitImage = () => {
    router.post(
        route("admin.update-product-image", {
            product: props.product,
        }),
        {
            image: uploadedImage.value,
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                images.value = imageUrls();
            },
        }
    );
};

const deleteImage = (image) => {
    router.put(
        route("admin.delete-product-image", {
            product: props.product,
        }),
        {
            image: image,
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                images.value = imageUrls();
            },
        }
    );
};

const deleteProduct = () => {
    const choise = confirm("Ești sigur că vrei să ștergi acest produs?");
    if (choise) {
        router.delete(
            route("admin.products.destroy", {
                product: props.product,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit(route("admin.products.index"));
                },
            }
        );
    }
};

const productForm = useForm({
    [`name ${page.props.current_locale}`]: props.product.name,
    [`description ${page.props.current_locale}`]: props.product.description,
    sub_sub_category_id: props.product.sub_sub_category_id,
    brand_id: props.product.brand_id,
    price: props.product.price,
});
const editProduct = ref(false);
const startEditProduct = () => {
    editProduct.value = true;
};

const closeEditProduct = () => {
    editProduct.value = false;
    productForm.reset();
};

const submitEditProduct = () => {
    router.put(
        route("admin.products.update", {
            product: props.product,
        }),
        productForm,
        {
            preserveScroll: true,
            onSuccess: () => {
                editProduct.value = false;
            },
        }
    );
};

watch(isOrderChanged, () => {
    submitSortedImages();
});
</script>

<template>
    <admin-layout :current-route="initialRoute" title="Products">
        <div class="grid w-full grid-cols-1 gap-4">
            <div class="relative container-rounded">
                <span
                    class="absolute flex items-center justify-center gap-3 top-1 right-2"
                >
                    <PencilSquareIcon
                        v-if="!editProduct"
                        @click="startEditProduct"
                        class="w-6 cursor-pointer text-slate-500 hover:text-slate-700"
                    />
                    <TrashIcon
                        @click="deleteProduct"
                        class="w-6 cursor-pointer text-slate-500 hover:text-red-700"
                    />
                </span>
                <div class="max-w-full px-4 mx-auto sm:px-6 lg:px-8">
                    <div class="flex flex-col -mx-4 md:flex-row">
                        <div class="px-4 md:flex-1">
                            <div
                                class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4"
                            >
                                <img
                                    class="object-cover w-full h-full"
                                    :src="product.images_image1"
                                    alt="Product Image"
                                />
                            </div>
                            <div class="flex mb-4 -mx-2">
                                <div
                                    class="flex gap-2 cursor-move"
                                    v-for="(image, index) in images"
                                    :key="index"
                                    draggable="true"
                                    @dragenter.prevent
                                    @dragstart="startDrag($event, index)"
                                    @drop="onDrop($event, index)"
                                    @dragover.prevent="onOver($event)"
                                    @dragleave.prevent="onLeave($event)"
                                >
                                    <div class="relative p-4">
                                        <img
                                            :src="image"
                                            class="w-20 h-20"
                                            :alt="`Image ${index + 1}`"
                                        />
                                        <TrashIcon
                                            @click="deleteImage(image)"
                                            class="absolute top-0 right-0 w-3.5 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex items-center gap-4 border"
                                v-if="images.length != 4"
                            >
                                <input
                                    @change="
                                        uploadedImage = $event.target.files[0]
                                    "
                                    class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="image"
                                    type="file"
                                />
                                <SecondaryButton @click="submitImage"
                                    >Încarcă</SecondaryButton
                                >
                            </div>
                        </div>
                        <div class="px-4 md:flex-1">
                            <h2
                                class="mb-2 text-2xl font-bold text-gray-800 dark:text-white"
                            >
                                {{ product.name }}
                            </h2>
                            <p
                                class="mb-4 text-sm text-gray-600 dark:text-gray-300"
                            >
                                {{ product.description }}
                            </p>
                            <div class="flex mb-4">
                                <div class="mr-4">
                                    <span
                                        class="font-bold text-gray-700 dark:text-gray-300"
                                        >{{ __("sub_sub_category") }}:
                                    </span>
                                    <span
                                        class="text-gray-600 dark:text-gray-300"
                                    >
                                        {{ product.sub_sub_category.name }}
                                    </span>
                                </div>
                                <div class="mr-4">
                                    <span
                                        class="font-bold text-gray-700 dark:text-gray-300"
                                        >{{ __("brand") }}:
                                    </span>
                                    <span
                                        class="text-gray-600 dark:text-gray-300"
                                    >
                                        {{ product.brand_name }}
                                    </span>
                                </div>
                            </div>
                            <div class="flex mb-4">
                                <div class="mr-4">
                                    <span
                                        class="font-bold text-gray-700 dark:text-gray-300"
                                        >{{ __("price") }}:
                                    </span>
                                    <span
                                        class="text-gray-600 dark:text-gray-300"
                                    >
                                        {{ product.price }} MDL</span
                                    >
                                </div>
                            </div>

                            <div class="mb-4">
                                <span
                                    class="font-bold text-gray-700 dark:text-gray-300"
                                    >{{ __("credit") }}:</span
                                >
                                <div
                                    class="flex flex-wrap items-center gap-2 mt-2"
                                >
                                    <span
                                        v-for="credit in credits"
                                        :key="credit.id"
                                        class="relative px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 group/credit"
                                    >
                                        {{ credit.num_of_installments }}
                                        {{ __("months") }} -
                                        {{ credit.interest_rate }} %
                                        <TrashIcon
                                            @click="deleteCredit(credit.id)"
                                            class="absolute top-0 right-0 hidden w-3.5 h-3.5 cursor-pointer group-hover/credit:flex group-hover/credit:text-red-400"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div class="mb-4">
                                <span
                                    class="font-bold text-gray-700 dark:text-gray-300"
                                    >{{ __("installments") }}:</span
                                >
                                <div class="flex items-center mt-2">
                                    <span
                                        v-for="installment in installments"
                                        :key="installment.id"
                                        class="relative px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 group/installment"
                                    >
                                        {{ installment.num_of_installments }}
                                        {{ __("months") }} -
                                        {{ installment.interest_rate }} %
                                        <TrashIcon
                                            @click="
                                                deleteCredit(installment.id)
                                            "
                                            class="absolute top-0 right-0 hidden w-3.5 h-3.5 cursor-pointer group-hover/installment:flex group-hover/installment:text-red-400"
                                        />
                                    </span>
                                </div>
                                <div class="flex mt-6 mb-4 -mx-2">
                                    <div class="w-full px-2">
                                        <button
                                            @click="isOpen = true"
                                            class="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded-full dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700"
                                        >
                                            Adaugă posibilitățile de creditare
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        :show="isOpen"
                        :closeable="true"
                        @close="closeModal"
                        :actions="false"
                    >
                        <div class="flex flex-col w-full gap-2 p-4 mt-8">
                            <div class="flex justify-between gap-2">
                                <black-input
                                    type="text"
                                    class="w-full"
                                    v-model="form.num_of_installments"
                                    label="Număr de luni"
                                />
                                <black-input
                                    type="text"
                                    class="w-full"
                                    v-model="form.interest_rate"
                                    label="Rata dobânzii"
                                />
                            </div>
                            <black-selector
                                v-model="form.type"
                                @update:status="form.type = $event"
                                :options="[
                                    {
                                        id: 'credit',
                                        value: 'credit',
                                        label: 'Credit',
                                    },
                                    {
                                        id: 'installments',
                                        value: 'installments',
                                        label: 'Installments',
                                    },
                                ]"
                                :value="form.type"
                                :error-message="__(form.errors.type)"
                                :label="__('type')"
                            />
                        </div>
                        <div class="flex justify-end mt-6 mb-4">
                            <SecondaryButton class="mx-2" @click="closeModal">
                                {{ __("cancel") }}
                            </SecondaryButton>
                            <PrimaryButton
                                @click="submitCredits"
                                class="mx-2"
                                >{{ __("submit") }}</PrimaryButton
                            >
                        </div>
                    </Modal>
                    <Modal
                        :show="editProduct"
                        :closeable="true"
                        @close="closeEditProduct"
                        :actions="false"
                    >
                        <div class="flex flex-col w-full gap-2 p-4 mt-8 h-3/4">
                            <div class="flex justify-between gap-2">
                                <black-input
                                    type="text"
                                    class="w-full"
                                    v-model="
                                        productForm[
                                            `name ${page.props.current_locale}`
                                        ]
                                    "
                                    :label="__('title')"
                                />
                            </div>
                            <black-input
                                type="textarea"
                                class="w-full h-auto"
                                v-model="
                                    productForm[
                                        `description ${page.props.current_locale}`
                                    ]
                                "
                                :label="__('description')"
                            />
                            <black-selector
                                v-model="productForm.sub_sub_category_id"
                                @update:status="
                                    productForm.sub_sub_category_id = $event
                                "
                                :options="subSubCategories"
                                :value="productForm.sub_sub_category_id"
                                :error-message="
                                    __(form.errors.sub_sub_category_id)
                                "
                                :label="__('sub_sub_category')"
                            />
                            <black-selector
                                v-model="productForm.brand_id"
                                @update:status="productForm.brand_id = $event"
                                :options="brands"
                                :value="productForm.brand_id"
                                :error-message="__(form.errors.brand_id)"
                                :label="__('brand')"
                            />
                            <black-input
                                type="number"
                                class="w-full h-auto"
                                v-model="productForm.price"
                                :label="__('price')"
                            />
                        </div>
                        <div class="flex justify-end mt-6 mb-4">
                            <SecondaryButton
                                class="mx-2"
                                @click="closeEditProduct"
                            >
                                {{ __("cancel") }}
                            </SecondaryButton>
                            <PrimaryButton
                                @click="submitEditProduct"
                                class="mx-2"
                                >{{ __("submit") }}</PrimaryButton
                            >
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    </admin-layout>
</template>

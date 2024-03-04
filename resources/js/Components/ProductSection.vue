<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import {ArrowLeftIcon, ArrowRightIcon, HeartIcon} from "@heroicons/vue/24/outline/index.js";
import {ref} from "vue";

const currentSlide = ref(1);

const changeSlide = (direction) => {
    if (direction == 'next') {
        if (Object.keys(props.products).length - 3 < currentSlide.value) {
            currentSlide.value = 1
        } else {
            currentSlide.value++;

        }

    } else {
        if (currentSlide === 1) {
            currentSlide.value--;
        } else {
            currentSlide.value = 1;

        }
    }
}

const props = defineProps({
    products: {
        type: Object,
    },
    title: String,
    sale: {
        type: Boolean,
        default: false,
    },
    salePercents: {
        type: Number,
        default: 0
    }

});
</script>


<template>
    <div class="mb-6 py-12  space-y-10">
        <div class="flex  items-center justify-between px-4 sm:px-6 lg:px-0">
            <div class="flex items-center space-x-2">
                <div v-if="sale">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" id="sale">
                        <path fill="#e6e6dc"
                              d="M64 32c0 17.673-14.327 32-32 32C14.325 64 0 49.673 0 32 0 14.327 14.325 0 32 0c17.673 0 32 14.327 32 32z"></path>
                        <path fill="#d0cfbf"
                              d="m6.483 51.258.018.02a32 32 0 0 0 1.546 1.853v.02l.135.134a32 32 0 0 0 .01.01 32 32 0 0 0 1.283 1.33 32 32 0 0 0 1.28 1.254 32 32 0 0 0 .01.01 32 32 0 0 0 .01.01 32 32 0 0 0 .101.088 32 32 0 0 0 .07.062l.127.127a32 32 0 0 0 .315.293l-.23-.232a32 32 0 0 0 .403.36 32 32 0 0 0 .303.23l-.246-.247a32 32 0 0 0 .674.541 32 32 0 0 0 .303.243l.096.096a32 32 0 0 0 1.244.945 32 32 0 0 0 2.726 1.672 32 32 0 0 0 2.881 1.392 32 32 0 0 0 3.004 1.096 32 32 0 0 0 3.1.791 32 32 0 0 0 3.162.479 32 32 0 0 0 3.192.16 32 32 0 0 0 2.264-.08 32 32 0 0 0 3.174-.386 32 32 0 0 0 3.12-.7 32 32 0 0 0 3.038-1.009 32 32 0 0 0 1.256-.562 32 32 0 0 0 2.668-1.322 32 32 0 0 0 .927-.532 32 32 0 0 0 .553-.326v.01a32 32 0 0 0 .29-.166 32 32 0 0 0 2.6-1.861 32 32 0 0 0 2.405-2.112 32 32 0 0 0 2.18-2.34 32 32 0 0 0 1.935-2.546 32 32 0 0 0 1.672-2.727 32 32 0 0 0 1.39-2.88 32 32 0 0 0 1.098-3.005 32 32 0 0 0 .791-3.1 32 32 0 0 0 .479-3.161 32 32 0 0 0 .16-3.196 32 32 0 0 0-.08-2.264 32 32 0 0 0-.156-1.277L61 25.69h-.01l.01-.012-10.88 2.916-1.577-1.574a1.696 1.696 0 0 0-.369-.303l-9.062-9.064a7.7 7.7 0 0 0-7.245-2.14 7.807 7.807 0 0 0-1.724-.198v.01c-4.27 0-7.707 3.417-7.707 7.662v3.487H14.713a1.71 1.71 0 0 0-1.678 1.369 1.692 1.692 0 0 0-.035.343v15.741l-4.953 1.328v5.563l-1.566.42z"></path>
                        <path fill="#ff9300" d="m61 37.969-15.322 4.107V29.802L61 25.695l-4.556 8.659z"></path>
                        <path fill="#ff7c00" d="m45.204 41.061 9.39 4.108V32.895l-9.39-4.108z"></path>
                        <path fill="#ff9300" d="M16.322 48.62 6.48 51.257a32 32 0 0 0 9.842 8.62V48.618z"></path>
                        <path fill="#ff7c00" d="M8.047 45.272v7.886a32 32 0 0 0 9.388 7.3V49.378l-9.388-4.107z"></path>
                        <path
                            style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;marker:none;-inkscape-font-specification:Sans"
                            fill="#1a1a1a"
                            d="M30.156 1002.938c-4.67 0-8.468 3.756-8.468 8.406v9.5a.75.75 0 1 0 1.5 0v-9.5c0-3.84 3.099-6.907 6.968-6.907 3.87 0 6.938 3.066 6.938 6.907v9.5a.75.75 0 1 0 1.5 0v-9.5c0-4.65-3.768-8.407-8.438-8.407z"
                            color="#000" font-family="Sans" font-weight="400" overflow="visible"
                            transform="translate(0 -988.362)"></path>
                        <path fill="#e42c34"
                              d="M19.857 26.48c-.95 0-1.715.767-1.715 1.718v32.601A32 32 0 0 0 32 64a32 32 0 0 0 17-4.906V28.198c0-.95-.765-1.717-1.715-1.717H19.857z"></path>
                        <path fill="#e42c34"
                              d="M18.238 26.48c-1.002 0-1.81.767-1.81 1.718v31.744A32 32 0 0 0 32 64a32 32 0 0 0 17-4.906V28.198c0-.95-.806-1.717-1.809-1.717H18.238z"></path>
                        <path fill="#e6e6e6"
                              d="M27.571 32.484a1.715 1.715 0 1 1-3.43.001 1.715 1.715 0 0 1 3.43 0zm15.429 0a1.715 1.715 0 1 1-3.43.001 1.715 1.715 0 0 1 3.43 0z"></path>
                        <path
                            style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;marker:none;-inkscape-font-specification:Sans"
                            fill="#1a1a1a"
                            d="M33.563 1002.938c-4.67 0-8.438 3.787-8.438 8.437v9.469a.75.75 0 1 0 1.5 0v-9.469a6.908 6.908 0 0 1 6.938-6.938c3.87 0 6.968 3.098 6.968 6.938v9.469a.75.75 0 1 0 1.5 0v-9.469c0-4.65-3.798-8.438-8.468-8.438z"
                            color="#000" font-family="Sans" font-weight="400" overflow="visible"
                            transform="translate(0 -988.362)"></path>
                        <path fill="#bb2c34"
                              d="M14.714 26.48c-.95 0-1.714.767-1.714 1.718V57.7a32 32 0 0 0 5.142 3.098V28.198c0-.95.765-1.717 1.715-1.717h-5.143z"></path>
                        <path fill="#9a2c34"
                              d="M14.714 26.481A1.71 1.71 0 0 0 13 28.197v.017a2.571 2.115 0 0 0 1.285 1.819 2.571 2.115 0 0 0 2.572 0 2.571 2.115 0 0 0 1.286-1.82 2.571 2.115 0 0 0 0-.016c0-.95.764-1.716 1.714-1.716h-5.143z"></path>
                        <path fill="#333" fill-opacity=".423"
                              d="m49 36.258-35.992 9.627v11.824a32 32 0 0 0 .236.178L49 48.262V36.258z"></path>
                        <path fill="#ffb400"
                              d="M54.593 32.791 8.047 45.27v7.888a32 32 0 0 0 3.507 3.446l43.04-11.537V32.79z"></path>
                        <path style="line-height:125%;-inkscape-font-specification:Bebas Neue Bold" fill="#fff"
                              d="M24.714 1033.582c.025.593.196 1.019.515 1.277s.638.487.956.688c.32.2.49.511.515.932-.001.228-.049.404-.142.525a.672.672 0 0 1-.384.244c-.164.044-.292.034-.385-.038-.093-.072-.14-.221-.142-.45v-.461l-.96.257v.398c0 .52.128.886.383 1.098.255.212.632.253 1.132.122.5-.134.876-.38 1.131-.728.255-.35.383-.784.383-1.305-.024-.593-.196-1.018-.514-1.276a9.915 9.915 0 0 0-.957-.688c-.318-.2-.49-.511-.515-.932.001-.229.046-.405.133-.528a.636.636 0 0 1 .375-.246c.163-.044.288-.03.376.045.087.075.132.228.133.457v.268l.96-.258v-.203c0-.52-.126-.887-.377-1.1-.252-.213-.624-.255-1.12-.125-.494.132-.867.377-1.118.725-.251.347-.377.782-.378 1.302zm5.83-3.115-1.488.399-1.034 6.746.933-.25.175-1.22 1.247-.335.176 1.127 1.025-.275zm-.795 1.36.49 3.14-.98.262zm2.293 4.707 2.688-.72v-.924l-1.672.448v-5.545l-1.016.272zm4.156-6.659 1.755-.47v-.924l-2.771.743v6.469l2.77-.743v-.924l-1.754.47v-1.894l1.394-.374v-.924l-1.394.374z"
                              font-family="Bebas Neue Bold" font-size="9.24" font-weight="700" letter-spacing="0"
                              transform="translate(0 -988.362)" word-spacing="0"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h2>
            </div>
            <div class="w-16 flex space-x-2">
                <div @click="changeSlide('back')"
                     class="rounded-3xl flex items-center justify-center border border-slate-600 w-full h-auto">
                    <arrow-left-icon class="w-4"/>
                </div>
                <div @click="changeSlide('next')"
                     class="rounded-3xl flex  justify-center border border-slate-600 w-full h-auto">
                    <arrow-right-icon class="w-4"/>
                </div>
            </div>
        </div>
        <div class="flex  overflow-x-auto  hide-scrollbar   space-x-2">
            <!-- Card -->
            <div v-for="product in products">
                <div
                    class="group flex-shrink-0 w-64 h-96 border relative transition-transform group-hover:-translate-x-1:ease-in-out border-gray-200 rounded-lg overflow-hidden">
                    <div v-if="sale"
                         class="text-[#A41313] flex items-center absolute border border-[#A41313] rounded-full px-2 py-0.5 shadow-xs bg-[#FFDCDC] left-1.5 top-1.5">
                        <p>-20%</p>
                    </div>
                    <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <p class=" text-1-secondary ">{{ product.name }}</p>
                        <div class="flex justify-between ">
                            <div class="w-12">
                                <img class="mix-blend-multiply" :src="product.brand.image" :alt="product.brand.name">
                            </div>
                            <heart-icon class="w-4"/>
                        </div>
                        <p class="text-md text-slate-500 line-through">{{ product.price }} MDL</p>
                        <div class="flex">
                            <p class="text-xl text-slate-900 font-medium -translate-x-1 transition-transform delay-150 ease-linear group-hover:-translate-x-64  e:hidden">
                                {{
                                    (product.price - (product.price * 20 / 100)).toFixed(2)
                                }} lei</p>
                            <button
                                class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded translate-x-64 transition-transform delay-150 ease-linear group-hover:-translate-x-1/4">
                                Cumpără acum
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>



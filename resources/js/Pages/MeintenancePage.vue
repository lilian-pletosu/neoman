<script setup lang="ts">
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div
            class="max-w-screen-md px-4 py-8 mx-auto text-center lg:py-16 lg:px-12"
        >
            <ApplicationLogo class="w-48 mx-auto mb-4" />
            <h1
                class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white"
            >
                Ne cerem scuze!
            </h1>
            <p
                class="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400"
            >
                Site-ul este in mentenanta!
            </p>
            <div
                class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
            >
                <img
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/maintenance/maintenance.svg"
                    alt=""
                />
            </div>
        </div>
    </section>
</template>

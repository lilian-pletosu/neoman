<template>
    <body class=" dark:bg-dark">
    <Head :title="title">
        <meta name="description" content="Alături la fiecare etapă în viață!">
    </Head>

    <FrontNavBar :is-dark="isDark" @darkMode="toggleDark"/>

    <div class="w-full ">


        <div class="">
            <front-header @call="openModal"/>
        </div>

        <div id="main-content" class="flex-col justify-between h-screen">
            <main class="">
                <div class="">
                    <slot name="carousel"/>
                </div>
                <div class="dark:bg-dark px-4 sm:px-[80px] md:px-[100px] lg:px-60 ">
                    <slot/>
                </div>
                <div
                    class="fixed md:hidden  z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
                    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
                        <button data-tooltip-target="tooltip-home" type="button"
                                class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                            <svg
                                class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                            </svg>
                            <span class="sr-only">Home</span>
                        </button>
                        <div id="tooltip-home" role="tooltip"
                             class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Home
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button data-tooltip-target="tooltip-wallet" type="button"
                                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                            <svg
                                class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"/>
                                <path
                                    d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z"/>
                            </svg>
                            <span class="sr-only">Wallet</span>
                        </button>
                        <div id="tooltip-wallet" role="tooltip"
                             class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Wallet
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <div class="flex items-center justify-center">
                            <button data-tooltip-target="tooltip-new" type="button"
                                    class="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                                <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M9 1v16M1 9h16"/>
                                </svg>
                                <span class="sr-only">New item</span>
                            </button>
                        </div>
                        <div id="tooltip-new" role="tooltip"
                             class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Create new item
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button data-tooltip-target="tooltip-settings" type="button"
                                class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                            <svg
                                class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
                            </svg>
                            <span class="sr-only">Settings</span>
                        </button>
                        <div id="tooltip-settings" role="tooltip"
                             class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Settings
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button data-tooltip-target="tooltip-profile" type="button"
                                class="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                            <svg
                                class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                            <span class="sr-only">Profile</span>
                        </button>
                        <div id="tooltip-profile" role="tooltip"
                             class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Profile
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                </div>


                <div data-dial-init class="hidden  md:block fixed end-6 bottom-6 group">
                    <div id="speed-dial-menu-default" class="flex flex-col items-center hidden mb-4 space-y-2">
                        <button type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left"
                                class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 18 18">
                                <path
                                    d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"/>
                            </svg>
                            <span class="sr-only">Share</span>
                        </button>
                        <div id="tooltip-share" role="tooltip"
                             class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Share
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="left"
                                class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"/>
                                <path
                                    d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"/>
                            </svg>
                            <span class="sr-only">Print</span>
                        </button>
                        <div id="tooltip-print" role="tooltip"
                             class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Print
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button type="button" data-tooltip-target="tooltip-download" data-tooltip-placement="left"
                                class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                <path
                                    d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span class="sr-only">Download</span>
                        </button>
                        <div id="tooltip-download" role="tooltip"
                             class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Download
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        <button type="button" data-tooltip-target="tooltip-copy" data-tooltip-placement="left"
                                class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 18 20">
                                <path
                                    d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"/>
                                <path
                                    d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"/>
                            </svg>
                            <span class="sr-only">Copy</span>
                        </button>
                        <div id="tooltip-copy" role="tooltip"
                             class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Copy
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                    <button type="button" data-dial-toggle="speed-dial-menu-default"
                            aria-controls="speed-dial-menu-default" aria-expanded="false"
                            class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ring-4 ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                        <phone-icon class="w-6 animate-pulse"/>
                        <span class="sr-only">Open actions menu</span>
                    </button>
                </div>
                <front-modal
                    title="Revenim cu un apel"
                    :visible="isModalVisible"
                    @close="closeModal"
                />


                <footer class="bg-1 dark:bg-1 ove">
                    <div class="container p-6 mx-auto">
                        <div class="lg:flex">
                            <div class="w-full -mx-6 lg:w-2/5">
                                <div class="px-6">
                                    <a href="/">
                                        <application-logo class="flex w-4 "/>
                                    </a>

                                    <p class="max-w-sm font-mulish mt-2 text-gray-500 dark:text-gray-400">Neoman -
                                        destinația ta
                                        online pentru o gamă variată de produse de cea mai înaltă calitate! Suntem
                                        mândri să îți oferim o selecție extinsă de articole, acoperind nevoile atât ale
                                        celor mici, cât și ale adulților, din diverse categorii. </p>

                                    <div class="flex mt-6 -mx-2">
                                        <a href="#"
                                           class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                           aria-label="Instagram">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                            </svg>
                                        </a>

                                        <a href="https://www.facebook.com/neoman.online"
                                           class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                           aria-label="Facebook">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                            </svg>
                                        </a>

                                    </div>
                                </div>
                            </div>

                            <div class="mt-6 lg:mt-0 lg:flex-1">
                                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    <div>
                                        <h3 class="text-gray-700 uppercase dark:text-white">{{ __('about') }}</h3>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Company</a>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">community</a>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Careers</a>
                                    </div>

                                    <div>
                                        <h3 class="text-gray-700 uppercase dark:text-white">Blog</h3>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Tec</a>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Music</a>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Videos</a>
                                    </div>

                                    <div>
                                        <h3 class="text-gray-700 uppercase dark:text-white">Products</h3>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Mega
                                            cloud</a>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Aperion
                                            UI</a>
                                        <a href="#"
                                           class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Meraki
                                            UI</a>
                                    </div>

                                    <div>
                                        <h3 class="text-gray-700 uppercase dark:text-white">Contact</h3>
                                        <span
                                            class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">+1 526 654 8965</span>
                                        <span
                                            class="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">example@email.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="h-px my-6 bg-gray-200 border-none dark:bg-gray-700">

                        <div>
                            <p class="text-center text-gray-500 dark:text-gray-400"> &copy; Neoman {{ currentYear }} -
                                All rights
                                reserved</p>
                        </div>
                    </div>

                </footer>
            </main>
        </div>

    </div>


    </body>

</template>

<script setup>
import FrontHeader from "@/Components/FrontHeader.vue";
import FrontNavBar from "@/Components/FrontNavBar.vue";
import {Head} from '@inertiajs/vue3'
import {PhoneIcon} from "@heroicons/vue/24/solid/index.js";

import {useDark, useToggle} from "@vueuse/core";
import {ref} from "vue";
import FrontModal from "@/Components/FrontModal.vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";


const isDark = ref();
const setDark = useDark();
const changeTheme = useDark({
    onChanged(dark) {
        useToggle(setDark)
        isDark.value = dark;
    }
})

const toggleDark = useToggle(changeTheme);

const props = defineProps({
    currentRoute: String,
    title: String
});

const isModalVisible = ref(false);

const openModal = () => {
    isModalVisible.value = true;
};
const closeModal = () => {
    isModalVisible.value = false;
};

</script>




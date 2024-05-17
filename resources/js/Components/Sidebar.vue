<template>
    <aside id="sidebar" :class="{'hidden' : hidden}"
           class="  h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col min-w-64 w-auto transition-width duration-75"
           aria-label="Sidebar">
        <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
            <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div class="flex-1 px-3 bg-white divide-y space-y-1">
                    <ul class="space-y-2 pb-2">
                        <li>
                            <Link :href="route('admin.dashboard')"
                                  class="text-base  font-normal rounded-lg flex items-center p-2  group"
                                  :class="checkRoute(route('admin.dashboard')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">
                                <svg class="w-6 h-6 text-gray-500   transition duration-75"
                                     :class="checkRoute(route('admin.dashboard')) ? 'text-gray-900' : 'group-hover:text-gray-900'"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span class="ml-3">{{ __('dashboard') }}</span>
                            </Link>
                        </li>
                        <li>
                            <Link :href="route('admin.products.index')"
                                  class="text-base  font-normal rounded-lg flex items-center p-2  group"
                                  :class="checkRoute(route('admin.products.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">
                                <shopping-bag-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                                   :class="checkRoute(route('admin.products.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('products') }}</span>
                            </Link>
                        </li>
                        <li>

                            <Link :href="route('admin.orders.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.orders.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">
                                <truck-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                            :class="checkRoute(route('admin.orders.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('orders') }}</span>
                                <span v-show="app.appContext.config.globalProperties.$page.props.order_count > 0"
                                      class="animate-pulse inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">{{
                                        app.appContext.config.globalProperties.$page.props.order_count
                                    }}</span>

                            </Link>
                        </li>
                        <li @click="openList">
                            <div
                                class="text-base font-normal rounded-lg flex items-center p-2 group"
                                :class="{
                                    'bg-gray-100 text-gray-900': checkRoute(route('admin.categories.index')) || checkRoute(route('admin.categories.subcategories.index')),
                                    'hover:bg-gray-100': !state.openCollapse,
                                    'transition duration-300 ease-in-out': true,
                                  }">
                                <adjustments-horizontal-icon
                                    class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                    :class="checkRoute(route('admin.categories.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('categories') }}</span>
                                <span
                                    class="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                </span>
                            </div>
                            <ul v-if="state.openCollapse" class="pl-4">
                                <li>
                                    <Link :href="route('admin.categories.index')"
                                          class="text-base font-normal rounded-lg flex items-center p-2 group"
                                          :class="checkRoute(route('admin.categories.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">
                                        <arrow-right-icon
                                            class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                            :class="checkRoute(route('admin.categories.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                        <span class="ml-3 flex-1 whitespace-nowrap">{{ __('categories') }}</span>

                                    </Link>
                                </li>
                                <li
                                    :class="checkRoute(route('admin.categories.subcategories.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'"
                                    class="rounded-lg">
                                    <Link
                                        :href="route('admin.categories.subcategories.index')"
                                        class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <arrow-right-icon
                                            class="w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900"
                                        />
                                        <span class="ml-3">{{ __('subcategories') }}</span>
                                    </Link>
                                </li>
                                <li
                                    :class="checkRoute(route('admin.categories.subSubcategories.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'"
                                    class="rounded-lg">
                                    <Link
                                        :href="route('admin.categories.subSubcategories.index')"
                                        class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <arrow-right-icon
                                            class="w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900"
                                        />
                                        <span class="ml-3">{{ __('sub_subcategories') }}</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link :href="route('admin.attributes.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.attributes.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">
                                <swatch-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                             :class="checkRoute(route('admin.brands.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('attributes') }}</span>
                            </Link>
                        </li>
                        <li>
                            <Link :href="route('admin.brands.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.brands.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">
                                <rocket-launch-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                                    :class="checkRoute(route('admin.brands.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('brands') }}</span>
                            </Link>
                        </li>
                        <li>
                            <Link :href="route('admin.associations.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.associations.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">
                                <puzzle-piece-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                                   :class="checkRoute(route('admin.associations.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('associations') }}</span>
                            </Link>
                        </li>

                        <li>
                            <Link :href="route('admin.promotions.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.promotions.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">

                                <fire-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                           :class="checkRoute(route('admin.promotions.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('promotions') }}</span>
                            </Link>
                        </li>
                        <li>
                            <Link :href="route('admin.banners.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.banners.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">

                                <view-columns-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                                   :class="checkRoute(route('admin.banners.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('banners') }}</span>
                            </Link>
                        </li>
                        <li>
                            <Link :href="route('admin.privacy.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.privacy.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">

                                <shield-exclamation-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                                         :class="checkRoute(route('admin.privacy.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('privacy') }}</span>
                            </Link>
                        </li>
                        <li>
                            <Link :href="route('admin.about_us.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.about_us.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">

                                <user-group-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                                 :class="checkRoute(route('admin.about_us.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('about_us') }}</span>
                            </Link>
                        </li>
                        <li>
                            <Link :href="route('admin.settings.index')"
                                  class="text-base font-normal rounded-lg flex items-center p-2 group"
                                  :class="checkRoute(route('admin.settings.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">

                                <cog6-tooth-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                                 :class="checkRoute(route('admin.settings.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('settings') }}</span>
                            </Link>
                        </li>
                    </ul>
                    <div class="space-y-2 pt-2  ">

                        <div class="hover:bg-gray-200 mt-auto">
                            <Link :href="route('logout')"
                                  method="post" target="_blank"
                                  class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                <arrow-left-on-rectangle-icon
                                    class="w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900"
                                />
                                <span class="ml-3">{{ __('logout') }}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>

</template>

<script setup>
import {Link} from "@inertiajs/vue3";
import {
    AdjustmentsHorizontalIcon,
    ArrowLeftOnRectangleIcon,
    ArrowRightIcon,
    Cog6ToothIcon,
    FireIcon,
    PuzzlePieceIcon,
    RocketLaunchIcon,
    ShieldExclamationIcon,
    ShoppingBagIcon,
    SwatchIcon,
    TruckIcon,
    UserGroupIcon,
    ViewColumnsIcon
} from "@heroicons/vue/20/solid/index.js";
import {getCurrentInstance, reactive} from "vue";

const app = getCurrentInstance();
const state = reactive({
    openCollapse: false,
});

const checkRoute = (route) => {
    if (app.appContext.config.globalProperties.$page.props.ziggy.location === route) {
        return true;
    }
    return false;
}

const openList = () => {
    return state.openCollapse = !state.openCollapse;
}


defineProps({
    currentRoute: {
        type: String
    },
    hidden: {
        type: Boolean
    }

})

</script>


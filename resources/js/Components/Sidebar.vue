<template>
  <aside id="sidebar" :class="{'hidden' : hidden}"
         class="fixed z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
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
              </Link>
            </li>
            <li>
              <Link :href="route('admin.categories.index')"
                    class="text-base font-normal rounded-lg flex items-center p-2 group"
                    :class="checkRoute(route('admin.categories.index')) ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'">
                <adjustments-horizontal-icon class="w-6 transition duration-75 text-gray-500 flex-shrink-0"
                                             :class="checkRoute(route('admin.categories.index')) ? 'text-gray-900' : 'group-hover:text-gray-900'"/>
                <span class="ml-3 flex-1 whitespace-nowrap">{{ __('categories') }}</span>
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
  FireIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ShoppingBagIcon,
  TruckIcon,
  ViewColumnsIcon
} from "@heroicons/vue/20/solid/index.js";
import {getCurrentInstance} from "vue";

const app = getCurrentInstance();

const checkRoute = (route) => {
  if (app.appContext.config.globalProperties.$page.props.ziggy.location === route) {
    return true;
  }
  return false;
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


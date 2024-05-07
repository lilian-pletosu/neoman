import { getCurrentInstance, reactive, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, withDirectives, vShow, useSSRContext, defineComponent, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { Link, Head } from "@inertiajs/vue3";
import { ShoppingBagIcon, TruckIcon, AdjustmentsHorizontalIcon, ArrowRightIcon, SwatchIcon, RocketLaunchIcon, PuzzlePieceIcon, FireIcon, ViewColumnsIcon, ShieldExclamationIcon, UserGroupIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from "@heroicons/vue/20/solid/index.js";
import { _ as _sfc_main$5 } from "./Dropdown-7075589d.js";
import { route } from "ziggy-js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { Notification, NotificationGroup } from "notiwind";
const _sfc_main$4 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    currentRoute: {
      type: String
    },
    hidden: {
      type: Boolean
    }
  },
  setup(__props) {
    const app = getCurrentInstance();
    const state = reactive({
      openCollapse: false
    });
    const checkRoute = (route2) => {
      if (app.appContext.config.globalProperties.$page.props.ziggy.location === route2) {
        return true;
      }
      return false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        id: "sidebar",
        class: [{ "hidden": __props.hidden }, "fixed z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col min-w-64 w-auto transition-width duration-75"],
        "aria-label": "Sidebar"
      }, _attrs))}><div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0"><div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto"><div class="flex-1 px-3 bg-white divide-y space-y-1"><ul class="space-y-2 pb-2"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.dashboard"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.dashboard")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="${ssrRenderClass([checkRoute(_ctx.route("admin.dashboard")) ? "text-gray-900" : "group-hover:text-gray-900", "w-6 h-6 text-gray-500 transition duration-75"])}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"${_scopeId}></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"${_scopeId}></path></svg><span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.__("dashboard"))}</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: ["w-6 h-6 text-gray-500 transition duration-75", checkRoute(_ctx.route("admin.dashboard")) ? "text-gray-900" : "group-hover:text-gray-900"],
                fill: "currentColor",
                viewBox: "0 0 20 20",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createVNode("path", { d: "M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" }),
                createVNode("path", { d: "M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" })
              ], 2)),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.__("dashboard")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.products.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.products.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ShoppingBagIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.products.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("products"))}</span>`);
          } else {
            return [
              createVNode(unref(ShoppingBagIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.products.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("products")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.orders.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.orders.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TruckIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.orders.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("orders"))}</span><span style="${ssrRenderStyle(unref(app).appContext.config.globalProperties.$page.props.order_count > 0 ? null : { display: "none" })}" class="animate-pulse inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200"${_scopeId}>${ssrInterpolate(unref(app).appContext.config.globalProperties.$page.props.order_count)}</span>`);
          } else {
            return [
              createVNode(unref(TruckIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.orders.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("orders")), 1),
              withDirectives(createVNode("span", { class: "animate-pulse inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200" }, toDisplayString(unref(app).appContext.config.globalProperties.$page.props.order_count), 513), [
                [vShow, unref(app).appContext.config.globalProperties.$page.props.order_count > 0]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><div class="${ssrRenderClass([{
        "bg-gray-100 text-gray-900": checkRoute(_ctx.route("admin.categories.index")) || checkRoute(_ctx.route("admin.categories.subcategories.index")),
        "hover:bg-gray-100": !state.openCollapse,
        "transition duration-300 ease-in-out": true
      }, "text-base font-normal rounded-lg flex items-center p-2 group"])}">`);
      _push(ssrRenderComponent(unref(AdjustmentsHorizontalIcon), {
        class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.categories.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
      }, null, _parent));
      _push(`<span class="ml-3 flex-1 whitespace-nowrap">${ssrInterpolate(_ctx.__("categories"))}</span><span class="bg-gray-200 text-gray-800 ml-3 text-sm font-medium inline-flex items-center justify-center px-2 rounded-full"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></span></div>`);
      if (state.openCollapse) {
        _push(`<ul class="pl-4"><li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.categories.index"),
          class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.categories.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowRightIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.categories.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, _parent2, _scopeId));
              _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("categories"))}</span>`);
            } else {
              return [
                createVNode(unref(ArrowRightIcon), {
                  class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.categories.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
                }, null, 8, ["class"]),
                createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("categories")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="${ssrRenderClass([checkRoute(_ctx.route("admin.categories.subcategories.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100", "rounded-lg"])}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.categories.subcategories.index"),
          class: "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900" }, null, _parent2, _scopeId));
              _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.__("subcategories"))}</span>`);
            } else {
              return [
                createVNode(unref(ArrowRightIcon), { class: "w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900" }),
                createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.__("subcategories")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="${ssrRenderClass([checkRoute(_ctx.route("admin.categories.subSubcategories.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100", "rounded-lg"])}">`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("admin.categories.subSubcategories.index"),
          class: "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowRightIcon), { class: "w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900" }, null, _parent2, _scopeId));
              _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.__("sub_subcategories"))}</span>`);
            } else {
              return [
                createVNode(unref(ArrowRightIcon), { class: "w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900" }),
                createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.__("sub_subcategories")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.attributes.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.attributes.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SwatchIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.brands.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("attributes"))}</span>`);
          } else {
            return [
              createVNode(unref(SwatchIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.brands.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("attributes")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.brands.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.brands.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(RocketLaunchIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.brands.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("brands"))}</span>`);
          } else {
            return [
              createVNode(unref(RocketLaunchIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.brands.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("brands")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.associations.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.associations.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PuzzlePieceIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.associations.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("associations"))}</span>`);
          } else {
            return [
              createVNode(unref(PuzzlePieceIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.associations.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("associations")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.promotions.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.promotions.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(FireIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.promotions.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("promotions"))}</span>`);
          } else {
            return [
              createVNode(unref(FireIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.promotions.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("promotions")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.banners.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.banners.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ViewColumnsIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.banners.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("banners"))}</span>`);
          } else {
            return [
              createVNode(unref(ViewColumnsIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.banners.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("banners")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.privacy.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.privacy.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ShieldExclamationIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.privacy.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("privacy"))}</span>`);
          } else {
            return [
              createVNode(unref(ShieldExclamationIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.privacy.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("privacy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.privacy.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.privacy.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UserGroupIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.privacy.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("about_us"))}</span>`);
          } else {
            return [
              createVNode(unref(UserGroupIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.privacy.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("about_us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin.settings.index"),
        class: ["text-base font-normal rounded-lg flex items-center p-2 group", checkRoute(_ctx.route("admin.settings.index")) ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Cog6ToothIcon), {
              class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.settings.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
            }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3 flex-1 whitespace-nowrap"${_scopeId}>${ssrInterpolate(_ctx.__("settings"))}</span>`);
          } else {
            return [
              createVNode(unref(Cog6ToothIcon), {
                class: ["w-6 transition duration-75 text-gray-500 flex-shrink-0", checkRoute(_ctx.route("admin.settings.index")) ? "text-gray-900" : "group-hover:text-gray-900"]
              }, null, 8, ["class"]),
              createVNode("span", { class: "ml-3 flex-1 whitespace-nowrap" }, toDisplayString(_ctx.__("settings")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="space-y-2 pt-2"><div class="hover:bg-gray-200 mt-auto">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("logout"),
        method: "post",
        target: "_blank",
        class: "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ArrowLeftOnRectangleIcon), { class: "w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-3"${_scopeId}>${ssrInterpolate(_ctx.__("logout"))}</span>`);
          } else {
            return [
              createVNode(unref(ArrowLeftOnRectangleIcon), { class: "w-6 transition duration-75 text-gray-500 flex-shrink-0 group-hover:text-gray-900" }),
              createVNode("span", { class: "ml-3" }, toDisplayString(_ctx.__("logout")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></aside>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Sidebar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "ShortLogo",
  __ssrInlineRender: true,
  props: {
    w: {
      default: "w-10"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        class: __props.w,
        viewBox: "0 0 475 483",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, _attrs))}><g filter="url(#filter0_d_1_26)"><path d="M472.5 427L45.5 0H165.5L384 218.5V0H472.5V427Z" fill="#83E509"></path><path d="M2 478.5V54.5L432 478.5H306L91 263.5V478.5H2Z" fill="#1FC8F2"></path></g><defs><filter id="filter0_d_1_26" x="0" y="0" width="474.5" height="482.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="2"></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_26"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_26" result="shape"></feBlend></filter></defs></svg>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ShortLogo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = defineComponent({
  components: {
    ShortLogo: _sfc_main$3,
    Dropdown: _sfc_main$5
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    route,
    changeMenuIcon() {
      this.isOpen = !this.isOpen;
    }
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_short_logo = resolveComponent("short-logo");
  const _component_Dropdown = resolveComponent("Dropdown");
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: "bg-white fixed z-30 w-full" }, _attrs))}><div class="px-3 py-3 lg:px-5 lg:pl-3"><div class="flex items-center justify-between"><div class="flex items-center justify-start"><button aria-expanded="true" aria-controls="sidebar" class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"><svg class="${ssrRenderClass([{ "hidden": _ctx.isOpen }, "w-6 h-6"])}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg><svg class="${ssrRenderClass([{ "hidden": !_ctx.isOpen }, "w-6 h-6"])}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button><a href="/admin/dashboard" class="text-2xl font-bold flex items-center lg:ml-2.5">`);
  _push(ssrRenderComponent(_component_short_logo, {
    w: "w-7",
    class: "mr-2"
  }, null, _parent));
  _push(`<span class="self-center whitespace-nowrap">Neoman</span></a><form action="#" method="GET" class="hidden lg:block lg:pl-32"><label for="topbar-search" class="sr-only">Search</label><div class="mt-1 relative lg:w-64"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg></div><input type="text" name="email" id="topbar-search" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Search"></div></form></div><div class="flex items-center"><div class="flex items-center"><div class="hidden lg:flex items-center"><span class="text-base font-normal text-gray-500 mr-5">${ssrInterpolate(_ctx.__("hi"))}, ${ssrInterpolate(_ctx.$page.props.auth.user.name)} ❤️</span></div><span class="text-base font-normal text-gray-500 mr-5">`);
  _push(ssrRenderComponent(_component_Dropdown, { align: _ctx.left }, {
    trigger: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"${_scopeId}><img${ssrRenderAttr("src", "/flags/" + _ctx.$page.props.current_locale + "_64.png")} class="w-5 inline mr-2"${_scopeId}><svg class="-mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
      } else {
        return [
          createVNode("span", { class: "inline-flex rounded-md" }, [
            createVNode("button", {
              type: "button",
              class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
            }, [
              createVNode("img", {
                src: "/flags/" + _ctx.$page.props.current_locale + "_64.png",
                class: "w-5 inline mr-2"
              }, null, 8, ["src"]),
              (openBlock(), createBlock("svg", {
                class: "-mr-0.5 h-4 w-4",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                  "clip-rule": "evenodd"
                })
              ]))
            ])
          ])
        ];
      }
    }),
    content: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<ul class="px-2"${_scopeId}><li class="hover:bg-gray-100"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("language", { "locale": "ru" }))}${_scopeId}>Русский</a></li><li class="hover:bg-gray-100"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("language", { "locale": "ro" }))}${_scopeId}>Română</a></li></ul>`);
      } else {
        return [
          createVNode("ul", { class: "px-2" }, [
            createVNode("li", { class: "hover:bg-gray-100" }, [
              createVNode("a", {
                href: _ctx.route("language", { "locale": "ru" })
              }, "Русский", 8, ["href"])
            ]),
            createVNode("li", { class: "hover:bg-gray-100" }, [
              createVNode("a", {
                href: _ctx.route("language", { "locale": "ro" })
              }, "Română", 8, ["href"])
            ])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</span></div></div></div></div></nav>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {
  __name: "CustomNotification",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "success"
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["absolute sm:bottom-16 right-4", { "hidden": !__props.show }]
      }, _attrs))}><div class="${ssrRenderClass([{ "bg-red-400": __props.type === "wrong", "bg-green-400": __props.type === "success" }, "flex items-center text-white max-w-sm w-full shadow-md rounded-lg overflow-hidden mx-auto"])}"><div class="border-r flex justify-center px-2">`);
      if (__props.type === "success") {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.type === "wrong") {
        _push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center px-2 py-3"><div class="mx-3"><p>${ssrInterpolate(__props.message)}</p></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CustomNotification.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = defineComponent({
  components: { CustomNotification: _sfc_main$1, Notification, NotificationGroup, NavBar, Sidebar: _sfc_main$4, Head },
  props: {
    currentRoute: String,
    title: String
  },
  data() {
    return {
      sidebarHidden: Boolean
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarHidden = !this.sidebarHidden;
    }
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  const _component_nav_bar = resolveComponent("nav-bar");
  const _component_Sidebar = resolveComponent("Sidebar");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Head, { title: _ctx.title }, null, _parent));
  _push(`<div>`);
  _push(ssrRenderComponent(_component_nav_bar, { onSidebar: _ctx.toggleSidebar }, null, _parent));
  _push(`<div class="flex overflow-auto bg-white">`);
  _push(ssrRenderComponent(_component_Sidebar, {
    hidden: _ctx.sidebarHidden,
    "current-route": _ctx.currentRoute
  }, null, _parent));
  _push(`<div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div><div id="main-content " class="flex flex-col justify-between h-screen w-full bg-gray-50 relative lg:ml-64"><main><div class="px-4 pt-[88px]">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></main><footer class="hover:content-around bg-white items-center md:justify-between lg:content-end shadow rounded-lg p-4 md:p-6 xl:p-8 my-6 mx-4"><div class="flex items-center sm:justify-center space-x-6"><p class="text-center text-sm text-gray-500"> © ${ssrInterpolate(_ctx.currentYear)} <a href="https://itsimple.online" class="hover:underline" target="_blank"><b>ITSimple</b></a>. ${ssrInterpolate(_ctx.__("rights_reserved"))}. </p></div></footer></div></div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AdminLayout as A,
  _sfc_main$1 as _
};

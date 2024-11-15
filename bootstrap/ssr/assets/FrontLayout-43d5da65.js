import { ref, unref, mergeProps, withCtx, createVNode, toDisplayString, renderSlot, useSSRContext, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, getCurrentInstance, reactive, onMounted, resolveComponent, useAttrs, watch, computed, onUnmounted, watchEffect, onBeforeMount } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrLooseEqual, ssrLooseContain } from "vue/server-renderer";
import { _ as _sfc_main$g } from "./ApplicationLogo-caba15c6.js";
import { XMarkIcon, DevicePhoneMobileIcon, HeartIcon, ShoppingCartIcon, Bars4Icon, MagnifyingGlassIcon, Bars3Icon, ChevronDownIcon, ChevronUpIcon, ArrowPathIcon } from "@heroicons/vue/24/outline/index.js";
import { Link, router, useForm, Head } from "@inertiajs/vue3";
import { defineStore } from "pinia";
import axios from "axios";
import { onClickOutside, watchDebounced, useColorMode, useScrollLock, useScroll, useDark, useToggle } from "@vueuse/core";
import { TransitionRoot, Dialog, TransitionChild, DialogPanel } from "@headlessui/vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuSub, DropdownMenuItem, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuArrow, ToastProvider, ToastRoot, ToastDescription, ToastViewport } from "radix-vue";
import { Icon } from "@iconify/vue";
import { route as route$1 } from "ziggy-js";
import { _ as _sfc_main$h } from "./Dropdown-7075589d.js";
import { ChatBubbleLeftRightIcon } from "@heroicons/vue/24/solid/index.js";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { _ as _sfc_main$i } from "./ShortLogo-3a83a5f7.js";
const useCartStore = defineStore("cart", () => {
  const countCart = ref(0);
  const products = ref({});
  const totalPrice = ref(0);
  const message = ref("");
  const success = ref(true);
  const shipping = ref(50);
  const notification = ref(false);
  async function addProductInCart(productId, colorId) {
    notification.value = true;
    axios.get(route("api.cartAdd", { productId, colorId })).then(async (response) => {
      message.value = response.data;
      success.value = true;
      notification.value = false;
    }).finally(() => fetchCount());
  }
  async function updateQtyOfProduct(productId, qty) {
    axios.get(route("api.cart.updateQtyOfProduct", { productId, qty })).then((res) => {
    }).finally(() => fetchCount());
  }
  async function removeProductInCart(productId) {
    axios.delete(route("api.cartRemove", { productID: productId })).then(async (response) => message.value = response.data).finally(() => fetchCount());
  }
  async function fetchCount() {
    try {
      const response = await fetch(route("api.getCart"));
      const data = await response.json();
      countCart.value = data.count;
      products.value = data.products;
      totalPrice.value = data.total_price;
    } catch (error) {
      console.error("A apărut o eroare în timpul solicitării pentru numărul de produse din coș:", error);
    }
  }
  function checkIfProductExistInCart(productId) {
    for (const [key, item] of Object.entries(products.value)) {
      if (productId === item.id) {
        return true;
      }
    }
    return false;
  }
  return {
    checkIfProductExistInCart,
    addProductInCart,
    countCart,
    products,
    fetchCount,
    removeProductInCart,
    message,
    success,
    totalPrice,
    shipping,
    notification,
    updateQtyOfProduct
  };
});
const useWishlistStore = defineStore("wishlist", () => {
  const wishlistCount = ref(0);
  const products = ref({});
  const message = ref("");
  const success = ref(true);
  const notification = ref(false);
  async function addProductInWishlist(productId) {
    if (checkIfProductExistInWishlist(productId)) {
      await removeProductFromWishlist(productId).finally(() => {
        notification.value = true;
        success.value = true;
      }).then(() => notification.value = false);
    } else {
      notification.value = true;
      axios.get(route("api.add_wishlist", { productCode: productId })).then(async (response) => {
        message.value = response.data;
        success.value = true;
        notification.value = false;
      }).finally(() => fetchCount()).catch((error) => {
        success.value = false;
        message.value = error.response.data;
        notification.value = false;
      });
    }
  }
  async function transferProductsToCart() {
    axios.get(route("api.transferProducts")).then(async (response) => {
      message.value = response.data;
      success.value = true;
      notification.value = true;
    }).finally(() => fetchCount()).catch((error) => {
      success.value = false;
      message.value = error.response.data;
      notification.value = false;
    });
  }
  async function removeProductFromWishlist(productId) {
    axios.delete(route("api.wishlistRemove", { productCode: productId })).then(async (response) => message.value = response.data).finally(() => fetchCount());
  }
  async function fetchCount() {
    try {
      const response = await fetch(route("api.wishlistCount"));
      const data = await response.json();
      wishlistCount.value = data.count;
      products.value = data.products;
      return data;
    } catch (error) {
      console.error("A apărut o eroare în timpul solicitării pentru numărul de produse din coș:", error);
    }
  }
  function checkIfProductExistInWishlist(productId) {
    for (const [key, item] of Object.entries(products.value)) {
      if (productId === item.id) {
        return true;
      }
    }
    return false;
  }
  return {
    checkIfProductExistInWishlist,
    addProductInWishlist,
    wishlistCount,
    products,
    fetchCount,
    removeProductFromWishlist,
    message,
    success,
    notification,
    transferProductsToCart
  };
});
const _sfc_main$f = {
  __name: "ReusableSidebar",
  __ssrInlineRender: true,
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ["close"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        as: "template",
        show: __props.open
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-40",
              onClose: ($event) => _ctx.$emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: " transition-opacity ease-linear duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black bg-opacity-25"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 z-40 h-screen"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transition ease-in-out duration-300 transform",
                    "enter-from": "translate-x-full",
                    "enter-to": "translate-x-0",
                    leave: "transition ease-in-out duration-300 transform",
                    "leave-from": "translate-x-0",
                    "leave-to": "translate-x-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "ml-auto h-full w-full max-w-xs md:max-w-md lg:max-w-lg flex-col overflow-y-auto bg-white shadow-xl" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-center justify-between px-4"${_scopeId4}><h2 class="text-xl font-medium text-gray-900"${_scopeId4}>${ssrInterpolate(__props.title)}</h2><button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"${_scopeId4}><span class="sr-only"${_scopeId4}>${ssrInterpolate(_ctx.__("close"))}</span>`);
                              _push5(ssrRenderComponent(unref(XMarkIcon), {
                                class: "h-6 w-6",
                                "aria-hidden": "false"
                              }, null, _parent5, _scopeId4));
                              _push5(`</button></div>`);
                              ssrRenderSlot(_ctx.$slots, "content", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-center justify-between px-4" }, [
                                  createVNode("h2", { class: "text-xl font-medium text-gray-900" }, toDisplayString(__props.title), 1),
                                  createVNode("button", {
                                    type: "button",
                                    class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                    onClick: ($event) => _ctx.$emit("close")
                                  }, [
                                    createVNode("span", { class: "sr-only" }, toDisplayString(_ctx.__("close")), 1),
                                    createVNode(unref(XMarkIcon), {
                                      class: "h-6 w-6",
                                      "aria-hidden": "false"
                                    })
                                  ], 8, ["onClick"])
                                ]),
                                renderSlot(_ctx.$slots, "content")
                              ];
                            }
                          }),
                          _: 3
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "ml-auto h-full w-full max-w-xs md:max-w-md lg:max-w-lg flex-col overflow-y-auto bg-white shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-between px-4" }, [
                                createVNode("h2", { class: "text-xl font-medium text-gray-900" }, toDisplayString(__props.title), 1),
                                createVNode("button", {
                                  type: "button",
                                  class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                  onClick: ($event) => _ctx.$emit("close")
                                }, [
                                  createVNode("span", { class: "sr-only" }, toDisplayString(_ctx.__("close")), 1),
                                  createVNode(unref(XMarkIcon), {
                                    class: "h-6 w-6",
                                    "aria-hidden": "false"
                                  })
                                ], 8, ["onClick"])
                              ]),
                              renderSlot(_ctx.$slots, "content")
                            ]),
                            _: 3
                          })
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: " transition-opacity ease-linear duration-300",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "transition-opacity ease-linear duration-300",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 z-40 h-screen" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "transition ease-in-out duration-300 transform",
                        "enter-from": "translate-x-full",
                        "enter-to": "translate-x-0",
                        leave: "transition ease-in-out duration-300 transform",
                        "leave-from": "translate-x-0",
                        "leave-to": "translate-x-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "ml-auto h-full w-full max-w-xs md:max-w-md lg:max-w-lg flex-col overflow-y-auto bg-white shadow-xl" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-between px-4" }, [
                                createVNode("h2", { class: "text-xl font-medium text-gray-900" }, toDisplayString(__props.title), 1),
                                createVNode("button", {
                                  type: "button",
                                  class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                  onClick: ($event) => _ctx.$emit("close")
                                }, [
                                  createVNode("span", { class: "sr-only" }, toDisplayString(_ctx.__("close")), 1),
                                  createVNode(unref(XMarkIcon), {
                                    class: "h-6 w-6",
                                    "aria-hidden": "false"
                                  })
                                ], 8, ["onClick"])
                              ]),
                              renderSlot(_ctx.$slots, "content")
                            ]),
                            _: 3
                          })
                        ]),
                        _: 3
                      })
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative z-40",
                onClose: ($event) => _ctx.$emit("close")
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: " transition-opacity ease-linear duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black bg-opacity-25" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 z-40 h-screen" }, [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "transition ease-in-out duration-300 transform",
                      "enter-from": "translate-x-full",
                      "enter-to": "translate-x-0",
                      leave: "transition ease-in-out duration-300 transform",
                      "leave-from": "translate-x-0",
                      "leave-to": "translate-x-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DialogPanel), { class: "ml-auto h-full w-full max-w-xs md:max-w-md lg:max-w-lg flex-col overflow-y-auto bg-white shadow-xl" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center justify-between px-4" }, [
                              createVNode("h2", { class: "text-xl font-medium text-gray-900" }, toDisplayString(__props.title), 1),
                              createVNode("button", {
                                type: "button",
                                class: "-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400",
                                onClick: ($event) => _ctx.$emit("close")
                              }, [
                                createVNode("span", { class: "sr-only" }, toDisplayString(_ctx.__("close")), 1),
                                createVNode(unref(XMarkIcon), {
                                  class: "h-6 w-6",
                                  "aria-hidden": "false"
                                })
                              ], 8, ["onClick"])
                            ]),
                            renderSlot(_ctx.$slots, "content")
                          ]),
                          _: 3
                        })
                      ]),
                      _: 3
                    })
                  ])
                ]),
                _: 3
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ReusableSidebar.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    xmlns: "http://www.w3.org/2000/svg",
    "data-name": "Layer 1",
    viewBox: "0 0 650 512",
    id: "empty-cart"
  }, _attrs))}><circle cx="337.969" cy="243.395" r="167.695" fill="#dbe8ec"></circle><path fill="#dbe8ec" d="M574.58343,223.75715V205.64747a13.02087,13.02087,0,0,0-13.02086-13.02087H505.60333a13.02086,13.02086,0,0,1-13.02086-13.02086V161.49606a13.02087,13.02087,0,0,1,13.02086-13.02087h21.45112a13.02087,13.02087,0,0,0,13.02086-13.02087V117.34464a13.02087,13.02087,0,0,0-13.02086-13.02087H143.13523a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968a13.02087,13.02087,0,0,0,13.02087,13.02087h0a13.02087,13.02087,0,0,1,13.02086,13.02087v18.10968a13.02086,13.02086,0,0,1-13.02086,13.02086H82.7824a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968A13.02087,13.02087,0,0,0,82.7824,236.778h59.75769A13.02087,13.02087,0,0,1,155.561,249.79889v18.10976c.31905,16.57135-35.82964,13.02087-43.02086,13.02087h-.04775a13.02087,13.02087,0,0,0-13.02087,13.02087V312.06a13.02087,13.02087,0,0,0,13.02087,13.02087h32.85852a13.02087,13.02087,0,0,1,13.02087,13.02087v18.10976a13.02087,13.02087,0,0,1-13.02087,13.02087H108.43743a13.02087,13.02087,0,0,0-13.02086,13.02087V400.3629a13.02086,13.02086,0,0,0,13.02086,13.02086H524.045a13.02087,13.02087,0,0,0,13.02087-13.02086V382.25322A13.02087,13.02087,0,0,0,524.045,369.23235H502.75526a13.02087,13.02087,0,0,1-13.02087-13.02087V338.10172a13.02087,13.02087,0,0,1,13.02087-13.02087h36.62008A13.02087,13.02087,0,0,0,552.39621,312.06V293.95039a13.02087,13.02087,0,0,0-13.02087-13.02087H521.30005a13.02087,13.02087,0,0,1-13.02087-13.02087V249.79889A13.02087,13.02087,0,0,1,521.30005,236.778h40.26252A13.02087,13.02087,0,0,0,574.58343,223.75715Z"></path><circle cx="340.677" cy="148.55" r="46.959" fill="#3086a3"></circle><path fill="none" stroke="#f9ae2b" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M324.05253,138.77179q-.00092-.08715-.00092-.17432a16.62566,16.62566,0,1,1,16.86682,16.62391v15.09678"></path><line x1="419.668" x2="451.971" y1="116.939" y2="116.939" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="419.668" x2="451.971" y1="126.25" y2="126.25" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="419.668" x2="451.971" y1="135.56" y2="135.56" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="119.153" x2="151.456" y1="293.762" y2="293.762" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="119.153" x2="151.456" y1="303.072" y2="303.072" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="119.153" x2="151.456" y1="312.383" y2="312.383" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="481.64" x2="513.943" y1="360.156" y2="360.156" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="481.64" x2="513.943" y1="369.467" y2="369.467" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><line x1="481.64" x2="513.943" y1="378.777" y2="378.777" fill="none" stroke="#3086a3" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line><circle cx="520.577" cy="300.496" r="13.807" fill="#b9d4db"></circle><circle cx="484.141" cy="310.461" r="7.159" fill="#b9d4db"></circle><circle cx="502.32" cy="266.711" r="10.228" fill="#b9d4db"></circle><circle cx="206.393" cy="389.674" r="16.428" fill="#b9d4db"></circle><circle cx="175.001" cy="377.974" r="8.557" fill="#b9d4db"></circle><circle cx="182.861" cy="348.886" r="4.936" fill="#b9d4db"></circle><circle cx="210.185" cy="352.378" r="11.833" fill="#b9d4db"></circle><circle cx="218.423" cy="143.059" r="16.428" fill="#b9d4db"></circle><circle cx="219.09" cy="109.564" r="8.557" fill="#b9d4db"></circle><circle cx="276.085" cy="114.564" r="7.406" fill="#b9d4db"></circle><circle cx="249.141" cy="107.367" r="4.936" fill="#b9d4db"></circle><circle cx="254.877" cy="134.31" r="11.833" fill="#b9d4db"></circle><path fill="#409cb5" d="M480.85793,233.2431H202.6215L193.549,210.24282h287.309a2.72176,2.72176,0,0,1,2.72176,2.72176v17.55676A2.72176,2.72176,0,0,1,480.85793,233.2431Z"></path><path fill="#f9ae2b" d="M440.32266,354.08924H251.1267a4.53627,4.53627,0,0,1-4.24692-2.94208L202.6215,233.2431h268.547l-26.4204,117.30658A4.53627,4.53627,0,0,1,440.32266,354.08924Z"></path><path fill="#3086a3" d="M457.56233,293.66888c-19.355,1.24146-38.71,1.89087-58.065,2.33216-9.6775.27637-19.355.33777-29.03251.50036l-29.0325.16578q-29.0325.02636-58.065-.65723c-19.355-.43945-38.71-1.09216-58.065-2.34107,19.355-1.2489,38.71-1.90148,58.065-2.34106q29.03249-.65185,58.065-.6571l29.0325.16565c9.6775.16259,19.355.224,29.03251.50048C418.8523,291.778,438.20731,292.42755,457.56233,293.66888Z"></path><path fill="#3086a3" d="M419.70359 233.2431c-1.1026 10.54578-2.78772 20.96045-4.64789 31.33558q-2.82669 15.55462-6.30877 30.96154-3.46357 15.41108-7.56577 30.67835c-1.38006 5.08618-2.80926 10.16137-4.33484 15.21484-.78927 2.52075-1.54083 5.05-2.361 7.56384l-.632 1.90967a4.91879 4.91879 0 01-1.18194 1.85889 4.67456 4.67456 0 01-3.81363 1.32349 4.373 4.373 0 003.11981-1.90845 3.91413 3.91413 0 00.633-1.61035l.25211-1.93872c.3367-2.62269.742-5.22986 1.10959-7.84571.78815-5.21948 1.6727-10.41736 2.60638-15.60412q2.82738-15.55444 6.31671-30.95972 3.47562-15.40833 7.57367-30.67664C413.23631 253.37482 416.17866 243.24335 419.70359 233.2431zM311.58605 354.0893a4.68121 4.68121 0 01-3.92411-1.458 6.69642 6.69642 0 01-1.156-1.8822l-.89646-1.85706c-1.1946-2.47632-2.32068-4.97827-3.4844-7.46619-2.27786-4.9945-4.463-10.02368-6.60287-15.06994q-6.39166-15.14906-12.15434-30.53431-5.78044-15.37866-10.948-30.9873c-3.41577-10.41675-6.65956-20.89807-9.33894-31.59119 5.01886 9.815 9.47332 19.8418 13.75582 29.93323q6.391 15.14941 12.14673 30.53723 5.76888 15.38306 10.94045 30.99012c1.70927 5.20788 3.37323 10.43273 4.94449 15.69238.76086 2.63916 1.55934 5.26416 2.28932 7.91479l.54693 1.98828a5.88655 5.88655 0 00.66687 1.77539A4.37022 4.37022 0 00311.58605 354.0893z"></path><circle cx="298.105" cy="428.058" r="18.743" fill="#409cb5"></circle><circle cx="298.105" cy="428.058" r="8.651" fill="#dbe8ec"></circle><circle cx="406.224" cy="428.058" r="18.743" fill="#409cb5"></circle><circle cx="406.224" cy="428.058" r="8.651" fill="#dbe8ec"></circle><path fill="#3086a3" d="M343.09231,233.2431c1.83931,9.99671,3.08253,20.02881,4.14664,30.07178q1.55889,15.06646,2.44714,30.173.9072,15.1053,1.161,30.24952c.13792,10.098.0925,20.207-.55473,30.35193-1.84722-9.99622-3.09265-20.02833-4.15473-30.07129q-1.5582-15.06666-2.43905-30.17347-.89487-15.106-1.15285-30.25012C342.40978,253.49628,342.453,243.38739,343.09231,233.2431Z"></path><path fill="#409cb5" d="M437.93777,399.80133H268.38406a3.00011,3.00011,0,0,1-2.801-1.92578L167.38479,141.898H115.37112a3,3,0,0,1,0-6h54.07593a3.0001,3.0001,0,0,1,2.801,1.92578l98.19824,255.97754H437.93777a3,3,0,0,1,0,6Z"></path><rect width="39.6" height="18.36" x="103.858" y="130.248" fill="#409cb5" rx="2"></rect><circle cx="340.677" cy="179.6" r="2.7" fill="#f9ae2b"></circle></svg>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Svg/EmptyCartSvg.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const EmptyCartSvg = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender]]);
function formatPrice(price) {
  if (price % 1 !== 0) {
    return price.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    return price.toLocaleString("fr-FR");
  }
}
const _sfc_main$d = {
  __name: "Cart",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const cartStore = useCartStore();
    const emits = __emit;
    const props = __props;
    const target = ref(null);
    onClickOutside(target, () => {
      if (props.isOpen)
        emits("close");
    });
    const deleteProductFromCart = (id) => {
      cartStore.removeProductInCart(id);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$f, mergeProps({
        open: __props.isOpen,
        title: _ctx.__("cart"),
        onClose: ($event) => _ctx.$emit("close")
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col justify-between" style="${ssrRenderStyle({ "height": "93vh" })}"${_scopeId}><div class="overflow-y-auto"${_scopeId}>`);
            if (unref(cartStore).products.length !== 0) {
              _push2(`<div class="border-t p-2"${_scopeId}><ul class=""${_scopeId}><!--[-->`);
              ssrRenderList(unref(cartStore).products, (product) => {
                _push2(`<li${ssrRenderAttr("id", product.name)} class="grid grid-cols-4 gap-2 my-3"${_scopeId}><div class="col-span-1 p-0.5 overflow-hidden rounded-md border border-gray-200"${_scopeId}><img${ssrRenderAttr("alt", product.name)}${ssrRenderAttr("src", product.image)} class="w-24 h-24 object-contain mx-auto"${_scopeId}></div><div class="col-span-2 flex flex-col justify-between"${_scopeId}><p class="font-medium text-xs md:text-base text-gray-900"${_scopeId}>${ssrInterpolate(product.name)}</p><div class="flex flex-1 items-end text-sm"${_scopeId}><div class="flex space-x-2 items-center"${_scopeId}><p class="text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.__("qty"))}: </p><div class="border flex items-center px-4 rounded"${_scopeId}><span class="text-sm sm:text-xl cursor-default"${_scopeId}>-</span><input id=""${ssrRenderAttr("value", product.qty)} class="w-12 h-8 border-none" disabled min="1" name="" style="${ssrRenderStyle({ "text-align": "center" })}" type="number"${_scopeId}><span class="text-sm sm:text-xl cursor-default"${_scopeId}>+</span></div></div></div></div><div class="col-span-1 flex flex-col justify-between items-end"${_scopeId}>`);
                if (!product.has_discount) {
                  _push2(`<p class=""${_scopeId}>${ssrInterpolate(product.price.toFixed(2) * product.qty)} ${ssrInterpolate(_ctx.__("lei"))}</p>`);
                } else {
                  _push2(`<p class=""${_scopeId}>${ssrInterpolate(((product == null ? void 0 : product.promotion_price.toFixed(2)) * product.qty).toFixed(1))} ${ssrInterpolate(_ctx.__("lei"))}</p>`);
                }
                _push2(`<div${_scopeId}><button class="font-medium text-indigo-600 hover:text-indigo-500" type="button"${_scopeId}><svg height="1.5em" viewBox="0 0 24 24" width="1.5em" xmlns="http://www.w3.org/2000/svg"${_scopeId}><g fill="none"${_scopeId}><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"${_scopeId}></path><path d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z" fill="currentColor"${_scopeId}></path></g></svg></button></div></div></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<div class="mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(EmptyCartSvg, { class: "w-8/12 mx-auto" }, null, _parent2, _scopeId));
              _push2(`<span class="flex justify-center font-mulish font-medium text-xl"${_scopeId}>${ssrInterpolate(_ctx.__("empty_cart"))}</span></div>`);
            }
            _push2(`</div>`);
            if (unref(cartStore).products.length !== 0) {
              _push2(`<div class="static border-t border-gray-200 px-4 pt-2 sm:px-6 flex-col"${_scopeId}><div class="flex justify-between text-base font-medium text-gray-900"${_scopeId}><p${_scopeId}>${ssrInterpolate(_ctx.__("subtotal"))}</p><p${_scopeId}>${ssrInterpolate(unref(formatPrice)(unref(cartStore).totalPrice))} ${ssrInterpolate(_ctx.__("lei"))}</p></div><p class="mt-0.5 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(_ctx.__("shipping_message"))}</p><div class="mt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("cart"),
                class: "flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("checkout"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("checkout")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="mt-6 flex justify-center text-center text-sm text-gray-500"${_scopeId}><p${_scopeId}>${ssrInterpolate(_ctx.__("or"))} <button class="font-medium text-indigo-600 hover:text-indigo-500" type="button"${_scopeId}>${ssrInterpolate(_ctx.__("continue_shopping"))} <span aria-hidden="true"${_scopeId}> →</span></button></p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "flex flex-col justify-between",
                style: { "height": "93vh" }
              }, [
                createVNode("div", { class: "overflow-y-auto" }, [
                  unref(cartStore).products.length !== 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "border-t p-2"
                  }, [
                    createVNode("ul", { class: "" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).products, (product) => {
                        return openBlock(), createBlock("li", {
                          id: product.name,
                          key: product.id,
                          class: "grid grid-cols-4 gap-2 my-3"
                        }, [
                          createVNode("div", { class: "col-span-1 p-0.5 overflow-hidden rounded-md border border-gray-200" }, [
                            createVNode("img", {
                              alt: product.name,
                              src: product.image,
                              class: "w-24 h-24 object-contain mx-auto"
                            }, null, 8, ["alt", "src"])
                          ]),
                          createVNode("div", { class: "col-span-2 flex flex-col justify-between" }, [
                            createVNode("p", { class: "font-medium text-xs md:text-base text-gray-900" }, toDisplayString(product.name), 1),
                            createVNode("div", { class: "flex flex-1 items-end text-sm" }, [
                              createVNode("div", { class: "flex space-x-2 items-center" }, [
                                createVNode("p", { class: "text-gray-500" }, toDisplayString(_ctx.__("qty")) + ": ", 1),
                                createVNode("div", { class: "border flex items-center px-4 rounded" }, [
                                  createVNode("span", {
                                    class: "text-sm sm:text-xl cursor-default",
                                    onClick: ($event) => unref(cartStore).updateQtyOfProduct(product.id, --product.qty)
                                  }, "-", 8, ["onClick"]),
                                  createVNode("input", {
                                    id: "",
                                    value: product.qty,
                                    class: "w-12 h-8 border-none",
                                    disabled: "",
                                    min: "1",
                                    name: "",
                                    style: { "text-align": "center" },
                                    type: "number",
                                    onInput: ($event) => unref(cartStore).updateQtyOfProduct(product.id, $event.target.value)
                                  }, null, 40, ["value", "onInput"]),
                                  createVNode("span", {
                                    class: "text-sm sm:text-xl cursor-default",
                                    onClickCapture: ($event) => unref(cartStore).updateQtyOfProduct(product.id, ++product.qty)
                                  }, "+", 40, ["onClickCapture"])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "col-span-1 flex flex-col justify-between items-end" }, [
                            !product.has_discount ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: ""
                            }, toDisplayString(product.price.toFixed(2) * product.qty) + " " + toDisplayString(_ctx.__("lei")), 1)) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: ""
                            }, toDisplayString(((product == null ? void 0 : product.promotion_price.toFixed(2)) * product.qty).toFixed(1)) + " " + toDisplayString(_ctx.__("lei")), 1)),
                            createVNode("div", null, [
                              createVNode("button", {
                                class: "font-medium text-indigo-600 hover:text-indigo-500",
                                type: "button",
                                onClick: ($event) => deleteProductFromCart(product.id)
                              }, [
                                (openBlock(), createBlock("svg", {
                                  height: "1.5em",
                                  viewBox: "0 0 24 24",
                                  width: "1.5em",
                                  xmlns: "http://www.w3.org/2000/svg"
                                }, [
                                  createVNode("g", { fill: "none" }, [
                                    createVNode("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
                                    createVNode("path", {
                                      d: "M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z",
                                      fill: "currentColor"
                                    })
                                  ])
                                ]))
                              ], 8, ["onClick"])
                            ])
                          ])
                        ], 8, ["id"]);
                      }), 128))
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-8"
                  }, [
                    createVNode(EmptyCartSvg, { class: "w-8/12 mx-auto" }),
                    createVNode("span", { class: "flex justify-center font-mulish font-medium text-xl" }, toDisplayString(_ctx.__("empty_cart")), 1)
                  ]))
                ]),
                unref(cartStore).products.length !== 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "static border-t border-gray-200 px-4 pt-2 sm:px-6 flex-col"
                }, [
                  createVNode("div", { class: "flex justify-between text-base font-medium text-gray-900" }, [
                    createVNode("p", null, toDisplayString(_ctx.__("subtotal")), 1),
                    createVNode("p", null, toDisplayString(unref(formatPrice)(unref(cartStore).totalPrice)) + " " + toDisplayString(_ctx.__("lei")), 1)
                  ]),
                  createVNode("p", { class: "mt-0.5 text-sm text-gray-500" }, toDisplayString(_ctx.__("shipping_message")), 1),
                  createVNode("div", { class: "mt-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("cart"),
                      class: "flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.__("checkout")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "mt-6 flex justify-center text-center text-sm text-gray-500" }, [
                    createVNode("p", null, [
                      createTextVNode(toDisplayString(_ctx.__("or")) + " ", 1),
                      createVNode("button", {
                        class: "font-medium text-indigo-600 hover:text-indigo-500",
                        type: "button",
                        onClick: ($event) => _ctx.$emit("close")
                      }, [
                        createTextVNode(toDisplayString(_ctx.__("continue_shopping")) + " ", 1),
                        createVNode("span", { "aria-hidden": "true" }, " →")
                      ], 8, ["onClick"])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Cart.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {
  __name: "Wishlist",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "fetchCart"],
  setup(__props, { emit: __emit }) {
    const wishlistStore = useWishlistStore();
    const cartStore = useCartStore();
    const emits = __emit;
    const props = __props;
    const target = ref(null);
    onClickOutside(target, () => {
      if (props.isOpen)
        emits("close");
    });
    const transferProductsToCart = () => {
      wishlistStore.transferProductsToCart().then(() => {
        cartStore.fetchCount().then(() => {
          emits("fetchCart");
        });
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$f, mergeProps({
        title: _ctx.__("wishlist"),
        open: __props.isOpen,
        onClose: ($event) => _ctx.$emit("close")
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col justify-between" style="${ssrRenderStyle({ "height": "93vh" })}"${_scopeId}><div class="overflow-y-auto border-t"${_scopeId}>`);
            if (unref(wishlistStore).products.length !== 0) {
              _push2(`<div class="p-2"${_scopeId}><ul role="list" class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(unref(wishlistStore).products, (product) => {
                _push2(`<li class="grid grid-cols-4 gap-2 py-3"${ssrRenderAttr("id", product.name)}${_scopeId}><div class="col-span-1 p-0.5 overflow-hidden rounded-md border border-gray-200"${_scopeId}><img${ssrRenderAttr("src", product.images[0].image1)}${ssrRenderAttr("alt", product.name)} class="w-24 h-24 object-contain mx-auto"${_scopeId}></div><div class="col-span-2 flex flex-col justify-between"${_scopeId}><p class="font-medium text-xs md:text-base text-gray-900"${_scopeId}>${ssrInterpolate(product.name)}</p></div><div class="col-span-1 flex flex-col justify-between items-end"${_scopeId}><div${_scopeId}><button type="button" class="font-medium text-indigo-600 hover:text-indigo-500"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"${_scopeId}><g fill="none"${_scopeId}><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"${_scopeId}></path><path fill="currentColor" d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"${_scopeId}></path></g></svg></button></div></div></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            } else {
              _push2(`<div class="mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(EmptyCartSvg, { class: "w-8/12 mx-auto" }, null, _parent2, _scopeId));
              _push2(`<span class="flex justify-center font-mulish font-medium text-xl"${_scopeId}>${ssrInterpolate(_ctx.__("wishlist_empty"))}</span></div>`);
            }
            _push2(`</div>`);
            if (unref(wishlistStore).products.length !== 0) {
              _push2(`<div class="border-t border-gray-200 px-4 sm:px-6"${_scopeId}><div class="mt-6"${_scopeId}><p class="flex items-center cursor-pointer justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"${_scopeId}>${ssrInterpolate(_ctx.__("add_all_products_in_cart"))}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "flex flex-col justify-between",
                style: { "height": "93vh" }
              }, [
                createVNode("div", { class: "overflow-y-auto border-t" }, [
                  unref(wishlistStore).products.length !== 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-2"
                  }, [
                    createVNode("ul", {
                      role: "list",
                      class: "divide-y divide-gray-200"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(wishlistStore).products, (product) => {
                        return openBlock(), createBlock("li", {
                          class: "grid grid-cols-4 gap-2 py-3",
                          key: product.id,
                          id: product.name
                        }, [
                          createVNode("div", { class: "col-span-1 p-0.5 overflow-hidden rounded-md border border-gray-200" }, [
                            createVNode("img", {
                              src: product.images[0].image1,
                              alt: product.name,
                              class: "w-24 h-24 object-contain mx-auto"
                            }, null, 8, ["src", "alt"])
                          ]),
                          createVNode("div", { class: "col-span-2 flex flex-col justify-between" }, [
                            createVNode("p", { class: "font-medium text-xs md:text-base text-gray-900" }, toDisplayString(product.name), 1)
                          ]),
                          createVNode("div", { class: "col-span-1 flex flex-col justify-between items-end" }, [
                            createVNode("div", null, [
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => unref(wishlistStore).removeProductFromWishlist(product.id),
                                class: "font-medium text-indigo-600 hover:text-indigo-500"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  width: "1.5em",
                                  height: "1.5em",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("g", { fill: "none" }, [
                                    createVNode("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
                                    createVNode("path", {
                                      fill: "currentColor",
                                      d: "M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z"
                                    })
                                  ])
                                ]))
                              ], 8, ["onClick"])
                            ])
                          ])
                        ], 8, ["id"]);
                      }), 128))
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-8"
                  }, [
                    createVNode(EmptyCartSvg, { class: "w-8/12 mx-auto" }),
                    createVNode("span", { class: "flex justify-center font-mulish font-medium text-xl" }, toDisplayString(_ctx.__("wishlist_empty")), 1)
                  ]))
                ]),
                unref(wishlistStore).products.length !== 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "border-t border-gray-200 px-4 sm:px-6"
                }, [
                  createVNode("div", { class: "mt-6" }, [
                    createVNode("p", {
                      onClick: transferProductsToCart,
                      class: "flex items-center cursor-pointer justify-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    }, toDisplayString(_ctx.__("add_all_products_in_cart")), 1)
                  ])
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Wishlist.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = {
  __name: "BigMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const app = getCurrentInstance();
    const toggleState = ref(false);
    ref(false);
    ref(false);
    ref("pedro");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRoot), mergeProps({
        open: toggleState.value,
        "onUpdate:open": ($event) => toggleState.value = $event
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DropdownMenuTrigger), {
              "aria-label": "",
              class: "relative justify-center items-center bg-[#043B3D] md:w-3/12 dark:bg-dark"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "children", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "children")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(DropdownMenuPortal), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DropdownMenuContent), {
                    "side-offset": 5,
                    class: "z-50 outline-none w-96 bg-white rounded-md p-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(app).appContext.config.globalProperties.$page.props.menu, (category) => {
                          _push4(ssrRenderComponent(unref(DropdownMenuSub), {
                            onScroll: ($event) => console.log("scroll")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (category.subcategory.length <= 0) {
                                  _push5(ssrRenderComponent(unref(DropdownMenuItem), {
                                    value: category.slug,
                                    class: "z-50 py-6 cursor-pointer group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                    onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"${_scopeId5}><p${_scopeId5}>${category.icon}</p></div><p class="text-lg"${_scopeId5}>${ssrInterpolate(category.name)}</p>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                            createVNode("p", {
                                              innerHTML: category.icon
                                            }, null, 8, ["innerHTML"])
                                          ]),
                                          createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (category.subcategory.length > 0) {
                                  _push5(ssrRenderComponent(unref(DropdownMenuSubTrigger), {
                                    class: "z-50 py-6 cursor-pointer group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1",
                                    value: "more toolsz",
                                    onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"${_scopeId5}><p${_scopeId5}>${category.icon}</p></div><p class="text-lg"${_scopeId5}>${ssrInterpolate(category.name)}</p><div class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(unref(Icon), { icon: "radix-icons:chevron-right" }, null, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                            createVNode("p", {
                                              innerHTML: category.icon
                                            }, null, 8, ["innerHTML"])
                                          ]),
                                          createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1),
                                          createVNode("div", { class: "ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                            createVNode(unref(Icon), { icon: "radix-icons:chevron-right" })
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<div${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(DropdownMenuPortal), { class: "" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(DropdownMenuSubContent), {
                                        "align-offset": -5,
                                        "side-offset": 2,
                                        class: "z-50 cursor-pointer w-auto outline-none bg-white rounded-md p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<div class="columns-3"${_scopeId6}><!--[-->`);
                                            ssrRenderList(category.subcategory, (subcategory) => {
                                              _push7(`<div class="break-inside-avoid mb-4"${_scopeId6}>`);
                                              if (category.subcategory.length <= 0) {
                                                _push7(ssrRenderComponent(unref(DropdownMenuItem), {
                                                  class: "py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                                  onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`<p class="text-lg"${_scopeId7}>${ssrInterpolate(subcategory.name)}</p>`);
                                                    } else {
                                                      return [
                                                        createVNode("p", { class: "text-lg" }, toDisplayString(subcategory.name), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              _push7(ssrRenderComponent(unref(DropdownMenuSub), null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`<div class="flex items-center group/submenu"${_scopeId7}><span class="invisible group-hover/submenu:visible"${_scopeId7}>`);
                                                    _push8(ssrRenderComponent(unref(Icon), {
                                                      height: "16",
                                                      icon: "mingcute:right-line",
                                                      width: "16"
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(`</span><p class="font-bold"${_scopeId7}>${ssrInterpolate(subcategory.name)}</p></div><!--[-->`);
                                                    ssrRenderList(subcategory.sub_subcategory, (sub_subcategory) => {
                                                      _push8(ssrRenderComponent(unref(DropdownMenuItem), {
                                                        class: "group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative",
                                                        onClick: ($event) => unref(router).get(unref(route$1)("products_page", { subSubcategory: sub_subcategory.slug }))
                                                      }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(`<div class="flex items-center group/subsubmenu"${_scopeId8}><span class="invisible group-hover/subsubmenu:visible"${_scopeId8}>`);
                                                            _push9(ssrRenderComponent(unref(Icon), {
                                                              height: "16",
                                                              icon: "mingcute:right-line",
                                                              width: "16"
                                                            }, null, _parent9, _scopeId8));
                                                            _push9(`</span><p class="w-[300px] text-base group-hover/subsubmenu:font-medium"${_scopeId8}>${ssrInterpolate(sub_subcategory.name)}</p></div>`);
                                                          } else {
                                                            return [
                                                              createVNode("div", { class: "flex items-center group/subsubmenu" }, [
                                                                createVNode("span", { class: "invisible group-hover/subsubmenu:visible" }, [
                                                                  createVNode(unref(Icon), {
                                                                    height: "16",
                                                                    icon: "mingcute:right-line",
                                                                    width: "16"
                                                                  })
                                                                ]),
                                                                createVNode("p", { class: "w-[300px] text-base group-hover/subsubmenu:font-medium" }, toDisplayString(sub_subcategory.name), 1)
                                                              ])
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                    });
                                                    _push8(`<!--]-->`);
                                                  } else {
                                                    return [
                                                      createVNode("div", { class: "flex items-center group/submenu" }, [
                                                        createVNode("span", { class: "invisible group-hover/submenu:visible" }, [
                                                          createVNode(unref(Icon), {
                                                            height: "16",
                                                            icon: "mingcute:right-line",
                                                            width: "16"
                                                          })
                                                        ]),
                                                        createVNode("p", {
                                                          class: "font-bold",
                                                          onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                        }, toDisplayString(subcategory.name), 9, ["onClick"])
                                                      ]),
                                                      (openBlock(true), createBlock(Fragment, null, renderList(subcategory.sub_subcategory, (sub_subcategory) => {
                                                        return openBlock(), createBlock(unref(DropdownMenuItem), {
                                                          class: "group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative",
                                                          onClick: ($event) => unref(router).get(unref(route$1)("products_page", { subSubcategory: sub_subcategory.slug }))
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "flex items-center group/subsubmenu" }, [
                                                              createVNode("span", { class: "invisible group-hover/subsubmenu:visible" }, [
                                                                createVNode(unref(Icon), {
                                                                  height: "16",
                                                                  icon: "mingcute:right-line",
                                                                  width: "16"
                                                                })
                                                              ]),
                                                              createVNode("p", { class: "w-[300px] text-base group-hover/subsubmenu:font-medium" }, toDisplayString(sub_subcategory.name), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["onClick"]);
                                                      }), 256))
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                              _push7(`</div>`);
                                            });
                                            _push7(`<!--]--></div>`);
                                          } else {
                                            return [
                                              createVNode("div", { class: "columns-3" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(category.subcategory, (subcategory) => {
                                                  return openBlock(), createBlock("div", { class: "break-inside-avoid mb-4" }, [
                                                    category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                                      key: 0,
                                                      class: "py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                                      onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("p", { class: "text-lg" }, toDisplayString(subcategory.name), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"])) : createCommentVNode("", true),
                                                    createVNode(unref(DropdownMenuSub), null, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "flex items-center group/submenu" }, [
                                                          createVNode("span", { class: "invisible group-hover/submenu:visible" }, [
                                                            createVNode(unref(Icon), {
                                                              height: "16",
                                                              icon: "mingcute:right-line",
                                                              width: "16"
                                                            })
                                                          ]),
                                                          createVNode("p", {
                                                            class: "font-bold",
                                                            onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                          }, toDisplayString(subcategory.name), 9, ["onClick"])
                                                        ]),
                                                        (openBlock(true), createBlock(Fragment, null, renderList(subcategory.sub_subcategory, (sub_subcategory) => {
                                                          return openBlock(), createBlock(unref(DropdownMenuItem), {
                                                            class: "group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative",
                                                            onClick: ($event) => unref(router).get(unref(route$1)("products_page", { subSubcategory: sub_subcategory.slug }))
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode("div", { class: "flex items-center group/subsubmenu" }, [
                                                                createVNode("span", { class: "invisible group-hover/subsubmenu:visible" }, [
                                                                  createVNode(unref(Icon), {
                                                                    height: "16",
                                                                    icon: "mingcute:right-line",
                                                                    width: "16"
                                                                  })
                                                                ]),
                                                                createVNode("p", { class: "w-[300px] text-base group-hover/subsubmenu:font-medium" }, toDisplayString(sub_subcategory.name), 1)
                                                              ])
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["onClick"]);
                                                        }), 256))
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]);
                                                }), 256))
                                              ])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(DropdownMenuSubContent), {
                                          "align-offset": -5,
                                          "side-offset": 2,
                                          class: "z-50 cursor-pointer w-auto outline-none bg-white rounded-md p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "columns-3" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(category.subcategory, (subcategory) => {
                                                return openBlock(), createBlock("div", { class: "break-inside-avoid mb-4" }, [
                                                  category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                                    key: 0,
                                                    class: "py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                                    onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("p", { class: "text-lg" }, toDisplayString(subcategory.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])) : createCommentVNode("", true),
                                                  createVNode(unref(DropdownMenuSub), null, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center group/submenu" }, [
                                                        createVNode("span", { class: "invisible group-hover/submenu:visible" }, [
                                                          createVNode(unref(Icon), {
                                                            height: "16",
                                                            icon: "mingcute:right-line",
                                                            width: "16"
                                                          })
                                                        ]),
                                                        createVNode("p", {
                                                          class: "font-bold",
                                                          onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                        }, toDisplayString(subcategory.name), 9, ["onClick"])
                                                      ]),
                                                      (openBlock(true), createBlock(Fragment, null, renderList(subcategory.sub_subcategory, (sub_subcategory) => {
                                                        return openBlock(), createBlock(unref(DropdownMenuItem), {
                                                          class: "group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative",
                                                          onClick: ($event) => unref(router).get(unref(route$1)("products_page", { subSubcategory: sub_subcategory.slug }))
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "flex items-center group/subsubmenu" }, [
                                                              createVNode("span", { class: "invisible group-hover/subsubmenu:visible" }, [
                                                                createVNode(unref(Icon), {
                                                                  height: "16",
                                                                  icon: "mingcute:right-line",
                                                                  width: "16"
                                                                })
                                                              ]),
                                                              createVNode("p", { class: "w-[300px] text-base group-hover/subsubmenu:font-medium" }, toDisplayString(sub_subcategory.name), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["onClick"]);
                                                      }), 256))
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]);
                                              }), 256))
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                    key: 0,
                                    value: category.slug,
                                    class: "z-50 py-6 cursor-pointer group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                    onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                        createVNode("p", {
                                          innerHTML: category.icon
                                        }, null, 8, ["innerHTML"])
                                      ]),
                                      createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value", "onClick"])) : createCommentVNode("", true),
                                  category.subcategory.length > 0 ? (openBlock(), createBlock(unref(DropdownMenuSubTrigger), {
                                    key: 1,
                                    class: "z-50 py-6 cursor-pointer group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1",
                                    value: "more toolsz",
                                    onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                        createVNode("p", {
                                          innerHTML: category.icon
                                        }, null, 8, ["innerHTML"])
                                      ]),
                                      createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1),
                                      createVNode("div", { class: "ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                        createVNode(unref(Icon), { icon: "radix-icons:chevron-right" })
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])) : createCommentVNode("", true),
                                  createVNode("div", null, [
                                    createVNode(unref(DropdownMenuPortal), { class: "" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(DropdownMenuSubContent), {
                                          "align-offset": -5,
                                          "side-offset": 2,
                                          class: "z-50 cursor-pointer w-auto outline-none bg-white rounded-md p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "columns-3" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(category.subcategory, (subcategory) => {
                                                return openBlock(), createBlock("div", { class: "break-inside-avoid mb-4" }, [
                                                  category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                                    key: 0,
                                                    class: "py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                                    onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("p", { class: "text-lg" }, toDisplayString(subcategory.name), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"])) : createCommentVNode("", true),
                                                  createVNode(unref(DropdownMenuSub), null, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center group/submenu" }, [
                                                        createVNode("span", { class: "invisible group-hover/submenu:visible" }, [
                                                          createVNode(unref(Icon), {
                                                            height: "16",
                                                            icon: "mingcute:right-line",
                                                            width: "16"
                                                          })
                                                        ]),
                                                        createVNode("p", {
                                                          class: "font-bold",
                                                          onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                        }, toDisplayString(subcategory.name), 9, ["onClick"])
                                                      ]),
                                                      (openBlock(true), createBlock(Fragment, null, renderList(subcategory.sub_subcategory, (sub_subcategory) => {
                                                        return openBlock(), createBlock(unref(DropdownMenuItem), {
                                                          class: "group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative",
                                                          onClick: ($event) => unref(router).get(unref(route$1)("products_page", { subSubcategory: sub_subcategory.slug }))
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode("div", { class: "flex items-center group/subsubmenu" }, [
                                                              createVNode("span", { class: "invisible group-hover/subsubmenu:visible" }, [
                                                                createVNode(unref(Icon), {
                                                                  height: "16",
                                                                  icon: "mingcute:right-line",
                                                                  width: "16"
                                                                })
                                                              ]),
                                                              createVNode("p", { class: "w-[300px] text-base group-hover/subsubmenu:font-medium" }, toDisplayString(sub_subcategory.name), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["onClick"]);
                                                      }), 256))
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]);
                                              }), 256))
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                        _push4(ssrRenderComponent(unref(DropdownMenuArrow), { class: "fill-white" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.menu, (category) => {
                            return openBlock(), createBlock(unref(DropdownMenuSub), {
                              onScroll: ($event) => console.log("scroll")
                            }, {
                              default: withCtx(() => [
                                category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                  key: 0,
                                  value: category.slug,
                                  class: "z-50 py-6 cursor-pointer group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                  onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                      createVNode("p", {
                                        innerHTML: category.icon
                                      }, null, 8, ["innerHTML"])
                                    ]),
                                    createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value", "onClick"])) : createCommentVNode("", true),
                                category.subcategory.length > 0 ? (openBlock(), createBlock(unref(DropdownMenuSubTrigger), {
                                  key: 1,
                                  class: "z-50 py-6 cursor-pointer group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1",
                                  value: "more toolsz",
                                  onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                      createVNode("p", {
                                        innerHTML: category.icon
                                      }, null, 8, ["innerHTML"])
                                    ]),
                                    createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1),
                                    createVNode("div", { class: "ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                      createVNode(unref(Icon), { icon: "radix-icons:chevron-right" })
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])) : createCommentVNode("", true),
                                createVNode("div", null, [
                                  createVNode(unref(DropdownMenuPortal), { class: "" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(DropdownMenuSubContent), {
                                        "align-offset": -5,
                                        "side-offset": 2,
                                        class: "z-50 cursor-pointer w-auto outline-none bg-white rounded-md p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "columns-3" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(category.subcategory, (subcategory) => {
                                              return openBlock(), createBlock("div", { class: "break-inside-avoid mb-4" }, [
                                                category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                                  key: 0,
                                                  class: "py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                                  onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("p", { class: "text-lg" }, toDisplayString(subcategory.name), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick"])) : createCommentVNode("", true),
                                                createVNode(unref(DropdownMenuSub), null, {
                                                  default: withCtx(() => [
                                                    createVNode("div", { class: "flex items-center group/submenu" }, [
                                                      createVNode("span", { class: "invisible group-hover/submenu:visible" }, [
                                                        createVNode(unref(Icon), {
                                                          height: "16",
                                                          icon: "mingcute:right-line",
                                                          width: "16"
                                                        })
                                                      ]),
                                                      createVNode("p", {
                                                        class: "font-bold",
                                                        onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                      }, toDisplayString(subcategory.name), 9, ["onClick"])
                                                    ]),
                                                    (openBlock(true), createBlock(Fragment, null, renderList(subcategory.sub_subcategory, (sub_subcategory) => {
                                                      return openBlock(), createBlock(unref(DropdownMenuItem), {
                                                        class: "group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative",
                                                        onClick: ($event) => unref(router).get(unref(route$1)("products_page", { subSubcategory: sub_subcategory.slug }))
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("div", { class: "flex items-center group/subsubmenu" }, [
                                                            createVNode("span", { class: "invisible group-hover/subsubmenu:visible" }, [
                                                              createVNode(unref(Icon), {
                                                                height: "16",
                                                                icon: "mingcute:right-line",
                                                                width: "16"
                                                              })
                                                            ]),
                                                            createVNode("p", { class: "w-[300px] text-base group-hover/subsubmenu:font-medium" }, toDisplayString(sub_subcategory.name), 1)
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["onClick"]);
                                                    }), 256))
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]);
                                            }), 256))
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["onScroll"]);
                          }), 256)),
                          createVNode(unref(DropdownMenuArrow), { class: "fill-white" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DropdownMenuContent), {
                      "side-offset": 5,
                      class: "z-50 outline-none w-96 bg-white rounded-md p-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.menu, (category) => {
                          return openBlock(), createBlock(unref(DropdownMenuSub), {
                            onScroll: ($event) => console.log("scroll")
                          }, {
                            default: withCtx(() => [
                              category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                key: 0,
                                value: category.slug,
                                class: "z-50 py-6 cursor-pointer group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                    createVNode("p", {
                                      innerHTML: category.icon
                                    }, null, 8, ["innerHTML"])
                                  ]),
                                  createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["value", "onClick"])) : createCommentVNode("", true),
                              category.subcategory.length > 0 ? (openBlock(), createBlock(unref(DropdownMenuSubTrigger), {
                                key: 1,
                                class: "z-50 py-6 cursor-pointer group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1",
                                value: "more toolsz",
                                onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                    createVNode("p", {
                                      innerHTML: category.icon
                                    }, null, 8, ["innerHTML"])
                                  ]),
                                  createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1),
                                  createVNode("div", { class: "ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                    createVNode(unref(Icon), { icon: "radix-icons:chevron-right" })
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["onClick"])) : createCommentVNode("", true),
                              createVNode("div", null, [
                                createVNode(unref(DropdownMenuPortal), { class: "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(DropdownMenuSubContent), {
                                      "align-offset": -5,
                                      "side-offset": 2,
                                      class: "z-50 cursor-pointer w-auto outline-none bg-white rounded-md p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "columns-3" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(category.subcategory, (subcategory) => {
                                            return openBlock(), createBlock("div", { class: "break-inside-avoid mb-4" }, [
                                              category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                                key: 0,
                                                class: "py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                                onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("p", { class: "text-lg" }, toDisplayString(subcategory.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick"])) : createCommentVNode("", true),
                                              createVNode(unref(DropdownMenuSub), null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "flex items-center group/submenu" }, [
                                                    createVNode("span", { class: "invisible group-hover/submenu:visible" }, [
                                                      createVNode(unref(Icon), {
                                                        height: "16",
                                                        icon: "mingcute:right-line",
                                                        width: "16"
                                                      })
                                                    ]),
                                                    createVNode("p", {
                                                      class: "font-bold",
                                                      onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                    }, toDisplayString(subcategory.name), 9, ["onClick"])
                                                  ]),
                                                  (openBlock(true), createBlock(Fragment, null, renderList(subcategory.sub_subcategory, (sub_subcategory) => {
                                                    return openBlock(), createBlock(unref(DropdownMenuItem), {
                                                      class: "group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative",
                                                      onClick: ($event) => unref(router).get(unref(route$1)("products_page", { subSubcategory: sub_subcategory.slug }))
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("div", { class: "flex items-center group/subsubmenu" }, [
                                                          createVNode("span", { class: "invisible group-hover/subsubmenu:visible" }, [
                                                            createVNode(unref(Icon), {
                                                              height: "16",
                                                              icon: "mingcute:right-line",
                                                              width: "16"
                                                            })
                                                          ]),
                                                          createVNode("p", { class: "w-[300px] text-base group-hover/subsubmenu:font-medium" }, toDisplayString(sub_subcategory.name), 1)
                                                        ])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["onClick"]);
                                                  }), 256))
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]);
                                          }), 256))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["onScroll"]);
                        }), 256)),
                        createVNode(unref(DropdownMenuArrow), { class: "fill-white" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DropdownMenuTrigger), {
                "aria-label": "",
                class: "relative justify-center items-center bg-[#043B3D] md:w-3/12 dark:bg-dark"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "children")
                ]),
                _: 3
              }),
              createVNode(unref(DropdownMenuPortal), null, {
                default: withCtx(() => [
                  createVNode(unref(DropdownMenuContent), {
                    "side-offset": 5,
                    class: "z-50 outline-none w-96 bg-white rounded-md p-1.5 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.menu, (category) => {
                        return openBlock(), createBlock(unref(DropdownMenuSub), {
                          onScroll: ($event) => console.log("scroll")
                        }, {
                          default: withCtx(() => [
                            category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                              key: 0,
                              value: category.slug,
                              class: "z-50 py-6 cursor-pointer group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                              onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                  createVNode("p", {
                                    innerHTML: category.icon
                                  }, null, 8, ["innerHTML"])
                                ]),
                                createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["value", "onClick"])) : createCommentVNode("", true),
                            category.subcategory.length > 0 ? (openBlock(), createBlock(unref(DropdownMenuSubTrigger), {
                              key: 1,
                              class: "z-50 py-6 cursor-pointer group w-full text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1",
                              value: "more toolsz",
                              onClick: ($event) => unref(router).get(unref(route$1)("category_page", { slug: category.slug }))
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "mr-2 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                  createVNode("p", {
                                    innerHTML: category.icon
                                  }, null, 8, ["innerHTML"])
                                ]),
                                createVNode("p", { class: "text-lg" }, toDisplayString(category.name), 1),
                                createVNode("div", { class: "ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8" }, [
                                  createVNode(unref(Icon), { icon: "radix-icons:chevron-right" })
                                ])
                              ]),
                              _: 2
                            }, 1032, ["onClick"])) : createCommentVNode("", true),
                            createVNode("div", null, [
                              createVNode(unref(DropdownMenuPortal), { class: "" }, {
                                default: withCtx(() => [
                                  createVNode(unref(DropdownMenuSubContent), {
                                    "align-offset": -5,
                                    "side-offset": 2,
                                    class: "z-50 cursor-pointer w-auto outline-none bg-white rounded-md p-4 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "columns-3" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(category.subcategory, (subcategory) => {
                                          return openBlock(), createBlock("div", { class: "break-inside-avoid mb-4" }, [
                                            category.subcategory.length <= 0 ? (openBlock(), createBlock(unref(DropdownMenuItem), {
                                              key: 0,
                                              class: "py-4 group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative px-3 select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1",
                                              onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("p", { class: "text-lg" }, toDisplayString(subcategory.name), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick"])) : createCommentVNode("", true),
                                            createVNode(unref(DropdownMenuSub), null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "flex items-center group/submenu" }, [
                                                  createVNode("span", { class: "invisible group-hover/submenu:visible" }, [
                                                    createVNode(unref(Icon), {
                                                      height: "16",
                                                      icon: "mingcute:right-line",
                                                      width: "16"
                                                    })
                                                  ]),
                                                  createVNode("p", {
                                                    class: "font-bold",
                                                    onClick: ($event) => unref(router).get(unref(route$1)("subcategory_page", { slug: subcategory.slug }))
                                                  }, toDisplayString(subcategory.name), 9, ["onClick"])
                                                ]),
                                                (openBlock(true), createBlock(Fragment, null, renderList(subcategory.sub_subcategory, (sub_subcategory) => {
                                                  return openBlock(), createBlock(unref(DropdownMenuItem), {
                                                    class: "group text-[13px] py-4 leading-none text-grass11 rounded-[3px] flex items-center h-[25px] relative",
                                                    onClick: ($event) => unref(router).get(unref(route$1)("products_page", { subSubcategory: sub_subcategory.slug }))
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("div", { class: "flex items-center group/subsubmenu" }, [
                                                        createVNode("span", { class: "invisible group-hover/subsubmenu:visible" }, [
                                                          createVNode(unref(Icon), {
                                                            height: "16",
                                                            icon: "mingcute:right-line",
                                                            width: "16"
                                                          })
                                                        ]),
                                                        createVNode("p", { class: "w-[300px] text-base group-hover/subsubmenu:font-medium" }, toDisplayString(sub_subcategory.name), 1)
                                                      ])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick"]);
                                                }), 256))
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]);
                                        }), 256))
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["onScroll"]);
                      }), 256)),
                      createVNode(unref(DropdownMenuArrow), { class: "fill-white" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BigMenu.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = {
  __name: "FrontHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const app = getCurrentInstance();
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const openSearch = ref(false);
    const searchElement = ref(null);
    const searchedProducts = reactive({});
    const loadSearch = ref(false);
    const menu = ref(false);
    ref(null);
    ref(false);
    const openCart = ref(false);
    const openWishlist = ref(false);
    const searchString = ref("");
    watchDebounced(
      searchString,
      () => {
        loadSearch.value = true;
        axios.get(route$1("api.search_product", { query: searchString.value })).then((response) => {
          searchedProducts.value = response.data;
        }).finally(() => {
          loadSearch.value = false;
        }).catch((error) => {
          searchedProducts.value = [];
        });
      },
      { debounce: 500, maxWait: 1e3 }
    );
    onClickOutside(searchElement, () => {
      openSearch.value = false;
      loadSearch.value = false;
    });
    onMounted(async () => {
      await cartStore.fetchCount();
      await wishlistStore.fetchCount();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toast = resolveComponent("Toast");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Toast, null, null, _parent));
      _push(`<div id="header" class="px-2 md:px-0"><div class="flex items-center justify-between px-2 py-2 space-x-1 md:px-0 xl:px-60"><div class="flex justify-center md:w-3/12">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route$1)("home")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$g, { class: "flex w-56" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$g, { class: "flex w-56" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex-col flex-1 hidden text-center 3xs:flex"><a href="tel:+37378107017"><p class="text-sm text-1 3xs:text-lg dark:text-white"> 078 107 017 </p></a><p class="text-xs underline cursor-pointer text-b-link pointer md:text-sm">${ssrInterpolate(_ctx.__("return_with_call"))}? </p></div><div class="justify-center flex-1 hidden space-x-2 md:flex"><div class="flex flex-col text-3 text-[#868686]"><p>${ssrInterpolate(_ctx.__("monday_friday"))}</p><p>${ssrInterpolate(_ctx.__("saturday"))}</p><p>${ssrInterpolate(_ctx.__("sunday"))}</p></div><div class="grid items-center grid-cols-1 text-xs font-normal font-mulish dark:text-white"><p class="">08.00 - 19.00</p><p>08.00 - 17.00</p><p>10.00 - 15.00</p></div></div><div class="flex-col flex-1 hidden text-center lg:flex dark:text-white"><p class="text-sm text-1 2xl:text-xl"> Alături la fiecare etapă în viață </p><p class="text-sm text-2"> Confortul tău - prioritatea noastră! </p></div><div class="flex justify-center px-2 space-x-6 dark:text-white"><div class="flex 3xs:hidden"><a href="tel:+37378107017">`);
      _push(ssrRenderComponent(unref(DevicePhoneMobileIcon), { class: "w-7" }, null, _parent));
      _push(`</a></div><div class="relative select-none"><div>`);
      if (unref(wishlistStore).wishlistCount !== 0) {
        _push(`<span class="absolute inline-flex items-center justify-center w-3 h-3 p-2.5 -right-2 -top-2 text-sm font-medium text-white bg-[#DB4444] rounded-full dark:bg-blue-900 dark:text-blue-200">${ssrInterpolate(unref(wishlistStore).wishlistCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(HeartIcon), { class: "w-7" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$c, {
        "is-open": openWishlist.value,
        onFetchCart: ($event) => unref(cartStore).fetchCount(),
        onClose: ($event) => openWishlist.value = !openWishlist.value
      }, null, _parent));
      _push(`</div><div class="relative select-none"><div>`);
      if (unref(cartStore).countCart !== 0) {
        _push(`<span class="absolute cursor-pointer inline-flex items-center justify-center w-3 h-3 p-2.5 -right-1 -top-2 text-sm font-medium text-white bg-[#DB4444] rounded-full dark:bg-blue-900 dark:text-blue-200">${ssrInterpolate(unref(cartStore).countCart)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(ShoppingCartIcon), { class: "cursor-pointer w-7" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$d, {
        "is-open": openCart.value,
        onClose: ($event) => openCart.value = !openCart.value
      }, null, _parent));
      _push(`</div><div class="flex md:hidden">`);
      _push(ssrRenderComponent(unref(Bars4Icon), {
        onClick: ($event) => menu.value = true,
        class: "w-7"
      }, null, _parent));
      _push(`</div></div></div><div class="items-center p-2 sm:flex md:hidden"><div class="relative w-full h-10"><div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "w-6 dark:text-white" }, null, _parent));
      _push(`</div><input${ssrRenderAttr("value", searchString.value)} class="h-full w-full rounded-md dark:border-slate-500 dark:bg-dark dark:text-white px-3 py-2.5 !pr-9 font-mulish text-sm font-normal focus:border-none focus:outline-none"${ssrRenderAttr("placeholder", _ctx.__("search_product") + "...")}></div></div><div class="relative hidden md:flex flex-row h-10 md:h-16 md:border-t bg-1 dark:bg-[#011212] dark:md:border-slate-500 xl:px-60">`);
      _push(ssrRenderComponent(_sfc_main$b, null, {
        children: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class=""${_scopeId}><div class="flex items-center justify-center py-5 space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Bars3Icon), { class: "w-[25px] h-[25px] text-black md:text-white dark:text-white" }, null, _parent2, _scopeId));
            _push2(`<p class="flex items-center text-base text-black uppercase text-2 md:text-white dark:text-white"${_scopeId}>${ssrInterpolate(_ctx.__("catalog"))}</p>`);
            if (menu.value) {
              _push2(ssrRenderComponent(unref(ChevronDownIcon), { class: "w-5 text-blue-800 animate-rotateUp" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!menu.value) {
              _push2(ssrRenderComponent(unref(ChevronUpIcon), { class: "w-5 text-blue-800 animate-rotateUp" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "" }, [
                createVNode("div", { class: "flex items-center justify-center py-5 space-x-3" }, [
                  createVNode(unref(Bars3Icon), { class: "w-[25px] h-[25px] text-black md:text-white dark:text-white" }),
                  createVNode("p", { class: "flex items-center text-base text-black uppercase text-2 md:text-white dark:text-white" }, toDisplayString(_ctx.__("catalog")), 1),
                  menu.value ? (openBlock(), createBlock(unref(ChevronDownIcon), {
                    key: 0,
                    class: "w-5 text-blue-800 animate-rotateUp"
                  })) : createCommentVNode("", true),
                  !menu.value ? (openBlock(), createBlock(unref(ChevronUpIcon), {
                    key: 1,
                    class: "w-5 text-blue-800 animate-rotateUp"
                  })) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="items-center justify-end flex-1 hidden pl-4 md:flex md:pr-2 xl:pr-0"><div class="relative w-full h-10"><div class="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">`);
      if (!loadSearch.value) {
        _push(ssrRenderComponent(unref(MagnifyingGlassIcon), {
          onClick: ($event) => unref(router).get(
            unref(route$1)("search_page", {
              search: searchString.value
            })
          ),
          class: "w-6 dark:text-white"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (loadSearch.value) {
        _push(ssrRenderComponent(unref(ArrowPathIcon), { class: "w-6 dark:text-white" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><input${ssrRenderAttr("value", searchString.value)} class="h-full w-full rounded-md dark:border-slate-500 dark:bg-dark dark:text-white px-3 py-2.5 !pr-9 font-mulish text-sm font-normal focus:border-none focus:outline-none"${ssrRenderAttr("placeholder", _ctx.__("search_product") + "...")}><div style="${ssrRenderStyle(openSearch.value ? null : { display: "none" })}" class="absolute w-full max-h-[500px] overflow-y-scroll z-50 shadow bg-white border rounded-b-lg"><div class="flex flex-col p-4 space-y-2"><!--[-->`);
      ssrRenderList(searchedProducts.value, (product) => {
        _push(`<div class="flex items-center space-x-2"><div class="flex w-full p-4 text-left text-gray-600 border border-gray-100 shadow-lg rounded-xl sm:p-8">`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route$1)("product_page", {
            slug: product.slug
          })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img class="block w-8 h-8 max-w-full mr-5 text-left align-middle sm:h-16 sm:w-16"${ssrRenderAttr("src", product.image)} alt="Profile Picture"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  class: "block w-8 h-8 max-w-full mr-5 text-left align-middle sm:h-16 sm:w-16",
                  src: product.image,
                  alt: "Profile Picture"
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="w-full text-left"><div class="flex flex-col justify-between mb-2 text-gray-600 sm:flex-row">`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route$1)("product_page", {
            slug: product.slug
          })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="font-medium"${_scopeId}>${ssrInterpolate(product.name)}</h3>`);
            } else {
              return [
                createVNode("h3", { class: "font-medium" }, toDisplayString(product.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<time class="text-xs" datetime="2022-11-13T20:00Z">${ssrInterpolate(product.brand.name)}</time></div><p class="text-sm">${ssrInterpolate(product.description)}</p><div class="flex items-center justify-between mt-5 text-gray-600">`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(route$1)("product_page", {
            slug: product.slug
          }),
          class: "px-8 py-2 text-xs leading-tight text-center transition-colors duration-150 ease-in-out border rounded-lg cursor-pointer hover:border-gray-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.__("buy"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.__("buy")), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<a title="Likes" href="#" class="flex items-center justify-around cursor-pointer group">${ssrInterpolate(product.price)} ${ssrInterpolate(_ctx.__("lei"))}</a></div></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (_ctx.searchProducts && _ctx.searchProducts.length === 0) {
        _push(`<div class="flex items-center space-x-2"><div class="max-w-screen-xl px-4 mx-auto md:px-8"><div class="text-center"><div class="flex flex-col p-4"><p>${ssrInterpolate(_ctx.__(
          "no_product_meets_search_criteria"
        ))}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!searchString.value) {
        _push(`<div class="flex items-center space-x-2"><div class="max-w-screen-xl px-4 mx-auto md:px-8"><div class="text-center"><div class="flex flex-col p-4"><p>${ssrInterpolate(_ctx.__("search_in_all_products"))}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$f, {
        title: _ctx.__("menu"),
        open: menu.value,
        onClose: ($event) => menu.value = false
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col h-screen"${_scopeId}><ul class="py-2 space-y-1 border-y"${_scopeId}><!--[-->`);
            ssrRenderList(unref(app).appContext.config.globalProperties.$page.props.menu, (category) => {
              _push2(`<li${_scopeId}>`);
              if (category.subcategory <= 0) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: unref(route$1)("category_page", { slug: category.slug }),
                  class: "flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span${_scopeId2}>${category.icon}</span><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(category.name)}</span>`);
                    } else {
                      return [
                        createVNode("span", {
                          innerHTML: category.icon
                        }, null, 8, ["innerHTML"]),
                        createVNode("span", { class: "text-sm font-medium" }, toDisplayString(category.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (category.subcategory.length > 0) {
                _push2(`<details class="group [&amp;_summary::-webkit-details-marker]:hidden"${_scopeId}><summary class="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg group hover:bg-gray-100 hover:text-gray-700"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: unref(route$1)("category_page", {
                    slug: category.slug
                  })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center gap-2"${_scopeId2}><span${_scopeId2}>${category.icon}</span><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(category.name)}</span></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("span", {
                            innerHTML: category.icon
                          }, null, 8, ["innerHTML"]),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(category.name), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<span class="transition duration-300 shrink-0 group-open:-rotate-180"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></span></summary><ul class="px-4 mt-2 space-y-1"${_scopeId}><!--[-->`);
                ssrRenderList(category.subcategory, (subcategory) => {
                  _push2(`<li${_scopeId}>`);
                  if (subcategory.sub_subcategory.length <= 0) {
                    _push2(ssrRenderComponent(unref(Link), {
                      href: unref(route$1)("subcategory_page", {
                        slug: subcategory.slug
                      }),
                      class: "flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(subcategory.name)}</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(subcategory.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  if (subcategory.sub_subcategory.length > 0) {
                    _push2(`<details class="group/two"${_scopeId}><summary class="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(Link), {
                      href: unref(route$1)("subcategory_page", {
                        slug: subcategory.slug
                      })
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div class="flex items-center gap-2"${_scopeId2}><span class="text-sm font-medium"${_scopeId2}>${ssrInterpolate(subcategory.name)}</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", { class: "text-sm font-medium" }, toDisplayString(subcategory.name), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                    _push2(`<span class="transition duration-300 shrink-0 group-open/two:-rotate-180"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></span></summary><ul class="px-4 mt-2 space-y-1"${_scopeId}><!--[-->`);
                    ssrRenderList(subcategory.sub_subcategory, (subSubcategory) => {
                      _push2(`<li${_scopeId}>`);
                      _push2(ssrRenderComponent(unref(Link), {
                        href: unref(route$1)("products_page", {
                          subSubcategory: subSubcategory.slug
                        }),
                        class: "block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                      }, {
                        default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                          if (_push3) {
                            _push3(`${ssrInterpolate(subSubcategory.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(subSubcategory.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent2, _scopeId));
                      _push2(`</li>`);
                    });
                    _push2(`<!--]--></ul></details>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</li>`);
                });
                _push2(`<!--]--></ul></details>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul><div class="px-4 border"${_scopeId}><span class="text-base font-normal text-gray-500"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$h, { align: _ctx.left }, {
              trigger: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="inline-flex rounded-md"${_scopeId2}><button type="button" class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"${_scopeId2}><img${ssrRenderAttr(
                    "src",
                    "/flags/" + _ctx.$page.props.current_locale + "_64.png"
                  )} class="inline w-5 mr-2"${_scopeId2}><svg class="-mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId2}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId2}></path></svg></button></span>`);
                } else {
                  return [
                    createVNode("span", { class: "inline-flex rounded-md" }, [
                      createVNode("button", {
                        type: "button",
                        class: "inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                      }, [
                        createVNode("img", {
                          src: "/flags/" + _ctx.$page.props.current_locale + "_64.png",
                          class: "inline w-5 mr-2"
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
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul class="flex flex-col px-2"${_scopeId2}><li class="hover:bg-gray-100"${_scopeId2}><a${ssrRenderAttr(
                    "href",
                    unref(route$1)("language", {
                      locale: "ru"
                    })
                  )}${_scopeId2}>Русский</a></li><li class="hover:bg-gray-100"${_scopeId2}><a${ssrRenderAttr(
                    "href",
                    unref(route$1)("language", {
                      locale: "ro"
                    })
                  )}${_scopeId2}>Română</a></li></ul>`);
                } else {
                  return [
                    createVNode("ul", { class: "flex flex-col px-2" }, [
                      createVNode("li", { class: "hover:bg-gray-100" }, [
                        createVNode("a", {
                          href: unref(route$1)("language", {
                            locale: "ru"
                          })
                        }, "Русский", 8, ["href"])
                      ]),
                      createVNode("li", { class: "hover:bg-gray-100" }, [
                        createVNode("a", {
                          href: unref(route$1)("language", {
                            locale: "ro"
                          })
                        }, "Română", 8, ["href"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col h-screen" }, [
                createVNode("ul", { class: "py-2 space-y-1 border-y" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.menu, (category) => {
                    return openBlock(), createBlock("li", null, [
                      category.subcategory <= 0 ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: unref(route$1)("category_page", { slug: category.slug }),
                        class: "flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", {
                            innerHTML: category.icon
                          }, null, 8, ["innerHTML"]),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(category.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["href"])) : createCommentVNode("", true),
                      category.subcategory.length > 0 ? (openBlock(), createBlock("details", {
                        key: 1,
                        class: "group [&_summary::-webkit-details-marker]:hidden"
                      }, [
                        createVNode("summary", { class: "flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg group hover:bg-gray-100 hover:text-gray-700" }, [
                          createVNode(unref(Link), {
                            href: unref(route$1)("category_page", {
                              slug: category.slug
                            })
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("span", {
                                  innerHTML: category.icon
                                }, null, 8, ["innerHTML"]),
                                createVNode("span", { class: "text-sm font-medium" }, toDisplayString(category.name), 1)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"]),
                          createVNode("span", { class: "transition duration-300 shrink-0 group-open:-rotate-180" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              class: "w-5 h-5",
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
                        ]),
                        createVNode("ul", { class: "px-4 mt-2 space-y-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(category.subcategory, (subcategory) => {
                            return openBlock(), createBlock("li", null, [
                              subcategory.sub_subcategory.length <= 0 ? (openBlock(), createBlock(unref(Link), {
                                key: 0,
                                href: unref(route$1)("subcategory_page", {
                                  slug: subcategory.slug
                                }),
                                class: "flex items-center gap-2 px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-sm font-medium" }, toDisplayString(subcategory.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["href"])) : createCommentVNode("", true),
                              subcategory.sub_subcategory.length > 0 ? (openBlock(), createBlock("details", {
                                key: 1,
                                class: "group/two"
                              }, [
                                createVNode("summary", { class: "flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700" }, [
                                  createVNode(unref(Link), {
                                    href: unref(route$1)("subcategory_page", {
                                      slug: subcategory.slug
                                    })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("span", { class: "text-sm font-medium" }, toDisplayString(subcategory.name), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode("span", { class: "transition duration-300 shrink-0 group-open/two:-rotate-180" }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "w-5 h-5",
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
                                ]),
                                createVNode("ul", { class: "px-4 mt-2 space-y-1" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(subcategory.sub_subcategory, (subSubcategory) => {
                                    return openBlock(), createBlock("li", null, [
                                      createVNode(unref(Link), {
                                        href: unref(route$1)("products_page", {
                                          subSubcategory: subSubcategory.slug
                                        }),
                                        class: "block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(subSubcategory.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["href"])
                                    ]);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]);
                          }), 256))
                        ])
                      ])) : createCommentVNode("", true)
                    ]);
                  }), 256))
                ]),
                createVNode("div", { class: "px-4 border" }, [
                  createVNode("span", { class: "text-base font-normal text-gray-500" }, [
                    createVNode(_sfc_main$h, { align: _ctx.left }, {
                      trigger: withCtx(() => [
                        createVNode("span", { class: "inline-flex rounded-md" }, [
                          createVNode("button", {
                            type: "button",
                            class: "inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                          }, [
                            createVNode("img", {
                              src: "/flags/" + _ctx.$page.props.current_locale + "_64.png",
                              class: "inline w-5 mr-2"
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
                      ]),
                      content: withCtx(() => [
                        createVNode("ul", { class: "flex flex-col px-2" }, [
                          createVNode("li", { class: "hover:bg-gray-100" }, [
                            createVNode("a", {
                              href: unref(route$1)("language", {
                                locale: "ru"
                              })
                            }, "Русский", 8, ["href"])
                          ]),
                          createVNode("li", { class: "hover:bg-gray-100" }, [
                            createVNode("a", {
                              href: unref(route$1)("language", {
                                locale: "ro"
                              })
                            }, "Română", 8, ["href"])
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["align"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FrontHeader.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {
  __name: "FrontNavBar",
  __ssrInlineRender: true,
  props: {
    currentLocale: String
  },
  setup(__props) {
    const colorMode = useColorMode();
    const currentInstance = getCurrentInstance();
    const isDark = ref();
    useAttrs();
    const locale = ref();
    const checkLang = ref();
    const loading = ref(true);
    onMounted(() => {
      loading.value = !loading.value;
      locale.value = currentInstance.appContext.config.globalProperties.$page.props.current_locale;
      locale.value === "ro" ? checkLang.value = false : checkLang.value = true;
      colorMode.value === "light" ? isDark.value = false : isDark.value = true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_x_loading = resolveComponent("x-loading");
      if (!loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center sm:px-4 md:justify-end md:px-2 items-center h-10 xl:px-60 2xl:px-60" }, _attrs))}><div class="hidden md:flex w-full pb-1 border-b justify-end"><label class="mx-4 relative cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(checkLang.value) ? " checked" : ""}${ssrRenderAttr("value", locale.value)} class="sr-only peer"><div class="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-500 after:content-[&#39;&#39;] after:absolute after:top-[2px] after:start-[2px] border after:bg-white after:border after:border-gray-500 after:rounded-full after:w-5 after:h-5 after:transition-all bg-none border border-gray-500"><div class="flex flex-row items-center justify-between px-1"><span class="text-3 font-xs text-black dark:text-white"> ro </span><span class="text-3 font-xs text-black dark:text-white"> ru </span></div></div></label><label class="relative cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(isDark.value) ? " checked" : ""} class="sr-only peer"><div class="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-500 border-gray-500 after:rounded-full after:w-5 after:h-5 after:transition-all bg-none border"><div class="flex flex-row items-center justify-between px-1 py-1"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" color="yellow" fill="currentColor" class="w-4 h-4"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"></path></svg></span><span><svg xmlns="http://www.w3.org/2000/svg" width="15" aria-hidden="true" height="15" viewBox="0 0 18 18"><path d="M8.48335 0.682617C7.8693 1.2548 7.37678 1.9448 7.03518 2.71147C6.69358 3.47813 6.5099 4.30574 6.49509 5.14493C6.48028 5.98412 6.63466 6.8177 6.949 7.59593C7.26334 8.37416 7.73121 9.08111 8.3247 9.6746C8.91819 10.2681 9.62514 10.736 10.4034 11.0503C11.1816 11.3646 12.0152 11.519 12.8544 11.5042C13.6936 11.4894 14.5212 11.3057 15.2878 10.9641C16.0545 10.6225 16.7445 10.13 17.3167 9.51595C17.1862 11.6327 16.2532 13.6201 14.708 15.0727C13.1628 16.5253 11.1217 17.3339 9.00085 17.3334C4.39752 17.3334 0.666687 13.6026 0.666687 9.00012C0.666687 4.57095 4.12169 0.949284 8.48335 0.682617Z" fill="black"></path></svg></span></div></div></label></div><div><div class="flex flex-row space-x-3 justify-center items-center"><div class="flex flex-row space-x-1 text-[#868686] text-[10px] py-1 sm:text-sm md:hidden"><p>Lu - Vi: <p class="font-semibold"> 08.00 - 19.00 /</p></p><p>Sâ: <p class="font-semibold"> 08.00 - 17.00 /</p></p><p>Du: <p class="font-semibold"> 10.00 - 15.00</p></p></div></div></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity",
          style: { "z-index": "6000" }
        }, _attrs))}><div class="flex-col">`);
        _push(ssrRenderComponent(_component_x_loading, { class: "w-24 h-24" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg viewBox="0 0 860.1 876.5"${_scopeId}><path class="animate-spin from-blue-300" style="${ssrRenderStyle({ "stroke": "black", "stroke-width": "1", "transform-origin": "33.47285199% 32.89218482%", "animation-duration": "3s", "fill": "var(--tw-gradient-from)" })}" d="M 289.209 146.527 C 251.329 146.527 215.76 161.251 189.083 187.986 C 162.406 214.721 147.624 250.232 147.624 288.112 C 147.624 325.99 162.348 361.387 189.083 388.237 C 215.76 414.914 251.445 429.696 289.209 429.696 C 327.088 429.696 362.657 414.972 389.335 388.237 C 416.011 361.503 430.794 325.99 430.794 288.112 C 430.794 250.232 416.069 214.836 389.335 187.986 C 362.657 161.308 327.088 146.527 289.209 146.527 Z M 289.209 406.022 C 223.902 406.022 171.241 353.129 171.241 288.053 C 171.241 222.977 223.902 170.085 289.209 170.085 C 354.516 170.085 407.177 223.036 407.177 288.053 C 407.177 353.072 354.516 406.022 289.209 406.022 Z M 536.462 229.099 L 514.058 229.099 C 495.753 229.099 480.452 213.739 480.452 194.915 C 480.452 185.503 484.437 177.073 491.538 170.72 L 505.974 156.574 C 520.294 142.427 520.294 119.446 505.974 105.125 L 473.119 72.559 C 466.651 66.091 457.066 62.222 447.308 62.222 C 437.549 62.222 428.137 66.034 421.497 72.559 L 407.639 86.416 C 400.998 93.808 391.874 97.792 382.29 97.792 C 363.408 97.792 347.356 82.432 347.356 64.301 L 347.356 42.013 C 347.356 22.091 331.88 5 311.959 5 L 267.093 5 C 246.768 5 230.542 21.975 230.542 42.013 L 230.542 64.417 C 230.542 82.548 214.894 97.907 196.07 97.907 C 186.658 97.907 178.054 93.923 171.587 86.994 L 157.267 72.847 C 150.799 66.206 141.215 62.511 131.455 62.511 C 121.697 62.511 112.285 66.322 105.645 72.847 L 72.789 105.298 C 58.642 119.446 58.642 142.6 72.789 156.632 L 86.647 170.49 C 94.038 177.13 98.139 185.503 98.139 195.088 C 98.139 213.97 82.779 229.271 64.532 229.271 L 42.128 229.271 C 21.918 229.099 5 245.613 5 265.707 L 5 288.112 L 5 310.516 C 5 330.437 21.976 347.067 42.128 347.067 L 64.532 347.067 C 82.836 347.067 98.139 362.426 98.139 381.25 C 98.139 390.663 94.038 399.381 86.647 406.022 L 72.789 419.591 C 58.642 433.739 58.642 456.72 72.789 470.925 L 105.645 503.664 C 112.112 510.305 121.697 514.001 131.455 514.001 C 141.215 514.001 150.627 510.189 157.267 503.664 L 171.587 489.518 C 177.766 482.589 186.484 478.604 195.896 478.604 C 214.778 478.604 230.369 493.964 230.369 512.095 L 230.369 534.499 C 230.369 554.42 246.595 571.512 266.804 571.512 L 311.612 571.512 C 331.65 571.512 348.337 554.536 348.337 534.499 L 348.337 512.095 C 348.337 493.964 363.812 478.604 382.693 478.604 C 392.106 478.604 400.825 482.704 407.639 489.98 L 421.497 503.838 C 428.137 510.305 437.549 514.173 447.308 514.173 C 457.066 514.173 466.478 510.363 473.119 503.838 L 505.974 471.097 C 520.121 456.951 520.121 433.796 505.974 419.649 L 491.538 405.502 C 484.437 399.15 480.452 390.143 480.452 380.904 C 480.452 362.022 495.811 346.085 514.058 346.085 L 536.462 346.085 C 556.499 346.085 570.819 330.898 570.819 310.862 L 570.819 288.169 L 570.819 265.765 C 570.819 245.613 556.499 229.099 536.462 229.099 Z M 547.549 288.053 L 547.549 310.342 C 547.549 316.521 544.142 322.006 536.809 322.006 L 514.405 322.006 C 499.218 322.006 484.783 328.474 473.87 339.675 C 463.129 350.762 457.182 365.313 457.182 380.673 C 457.182 396.61 463.649 411.334 475.602 422.247 L 489.633 436.106 C 494.484 441.129 494.484 449.386 489.633 454.237 L 456.778 486.977 C 454.41 489.171 451.004 490.499 447.481 490.499 C 443.959 490.499 440.378 489.171 438.185 486.977 L 424.731 473.581 C 413.355 461.628 398.457 454.988 382.693 454.988 C 367.334 454.988 353.187 460.878 342.158 471.502 C 330.956 482.415 325.066 496.735 325.066 512.037 L 325.066 534.441 C 325.066 541.66 318.715 547.837 311.959 547.837 L 267.093 547.837 C 260.337 547.837 254.275 541.66 254.275 534.441 L 254.275 512.037 C 254.275 496.851 248.211 482.415 237.009 471.502 C 225.922 460.878 211.487 454.988 196.3 454.988 C 180.653 454.988 165.639 461.628 154.841 473.292 L 141.156 486.977 C 138.789 489.171 135.382 490.499 131.86 490.499 C 128.337 490.499 124.758 489.344 122.852 487.266 L 122.679 487.092 L 122.506 486.919 L 89.65 454.179 C 84.8 449.329 84.8 441.187 89.65 436.163 L 103.047 422.883 C 115.114 411.68 121.755 396.783 121.755 380.846 C 121.755 365.487 115.865 351.513 105.067 340.426 C 94.154 329.225 79.718 323.45 64.532 323.45 L 41.955 323.45 C 34.564 323.45 28.385 317.098 28.385 310.458 L 28.385 287.881 L 28.385 265.476 C 28.385 258.836 34.564 252.484 41.955 252.484 L 64.359 252.484 C 79.546 252.484 93.981 246.71 104.894 235.508 C 115.634 224.422 121.582 210.159 121.582 194.972 C 121.582 179.036 114.942 164.138 102.873 153.11 L 89.304 139.713 C 86.07 136.48 85.608 132.784 85.608 130.705 C 85.608 128.8 86.07 124.931 89.304 121.698 L 122.043 89.131 C 124.411 86.936 127.818 85.608 131.34 85.608 C 134.862 85.608 138.443 86.763 140.349 88.842 L 140.521 89.015 L 140.695 89.188 L 154.553 103.046 C 165.467 114.826 180.19 121.351 196.012 121.351 C 211.371 121.351 225.634 115.461 236.72 104.837 C 247.922 93.923 254.101 79.603 254.101 64.301 L 254.101 41.897 C 254.101 34.679 259.991 28.501 266.631 28.501 L 311.612 28.501 C 318.253 28.501 323.392 34.679 323.392 41.897 L 323.392 64.301 C 323.392 79.488 329.859 93.923 341.061 104.837 C 352.148 115.461 366.699 121.351 382.059 121.351 C 397.996 121.351 413.008 114.71 424.211 102.757 L 437.607 89.361 C 439.974 87.167 443.381 85.839 446.903 85.839 C 450.426 85.839 454.006 87.167 456.2 89.246 L 489.056 121.813 C 491.423 124.18 492.866 127.414 492.866 130.821 C 492.866 134.228 491.538 137.461 489.171 139.828 L 475.14 153.687 C 463.36 164.6 456.72 179.325 456.72 195.261 C 456.72 210.621 462.609 224.595 473.407 235.681 C 484.321 246.883 498.757 252.657 513.943 252.657 L 536.346 252.657 C 544.315 252.657 547.26 260.048 547.433 265.938 L 547.549 288.053 Z"${_scopeId}></path><path class="animate-spin from-pink-300" style="${ssrRenderStyle({ "stroke": "black", "stroke-width": "1", "transform-origin": "74.01464945% 74.46662863%", "animation-duration": "4s", "animation-direction": "reverse", "fill": "var(--tw-gradient-from)" })}" d="M 637.588 543.225 C 608.329 543.225 580.855 554.599 560.249 575.25 C 539.643 595.9 528.225 623.33 528.225 652.589 C 528.225 681.846 539.599 709.188 560.249 729.927 C 580.855 750.533 608.419 761.95 637.588 761.95 C 666.847 761.95 694.321 750.578 714.928 729.927 C 735.533 709.277 746.951 681.846 746.951 652.589 C 746.951 623.33 735.578 595.989 714.928 575.25 C 694.321 554.643 666.847 543.225 637.588 543.225 Z M 637.588 743.665 C 587.144 743.665 546.468 702.809 546.468 652.543 C 546.468 602.277 587.144 561.423 637.588 561.423 C 688.032 561.423 728.71 602.323 728.71 652.543 C 728.71 702.765 688.032 743.665 637.588 743.665 Z M 828.571 607.006 L 811.265 607.006 C 797.126 607.006 785.308 595.142 785.308 580.602 C 785.308 573.332 788.386 566.82 793.871 561.913 L 805.021 550.987 C 816.082 540.058 816.082 522.307 805.021 511.245 L 779.643 486.091 C 774.647 481.095 767.244 478.106 759.707 478.106 C 752.169 478.106 744.899 481.051 739.771 486.091 L 729.067 496.794 C 723.937 502.504 716.889 505.581 709.487 505.581 C 694.901 505.581 682.502 493.717 682.502 479.712 L 682.502 462.497 C 682.502 447.109 670.548 433.907 655.161 433.907 L 620.505 433.907 C 604.806 433.907 592.273 447.019 592.273 462.497 L 592.273 479.802 C 592.273 493.807 580.186 505.67 565.646 505.67 C 558.376 505.67 551.73 502.593 546.735 497.241 L 535.674 486.313 C 530.678 481.184 523.275 478.33 515.736 478.33 C 508.199 478.33 500.929 481.273 495.8 486.313 L 470.422 511.379 C 459.494 522.307 459.494 540.192 470.422 551.031 L 481.126 561.736 C 486.835 566.864 490.002 573.332 490.002 580.735 C 490.002 595.32 478.138 607.139 464.044 607.139 L 446.739 607.139 C 431.128 607.006 418.06 619.762 418.06 635.283 L 418.06 652.589 L 418.06 669.894 C 418.06 685.281 431.173 698.127 446.739 698.127 L 464.044 698.127 C 478.182 698.127 490.002 709.99 490.002 724.53 C 490.002 731.801 486.835 738.535 481.126 743.665 L 470.422 754.145 C 459.494 765.073 459.494 782.824 470.422 793.796 L 495.8 819.084 C 500.795 824.214 508.199 827.068 515.736 827.068 C 523.275 827.068 530.545 824.124 535.674 819.084 L 546.735 808.157 C 551.508 802.805 558.242 799.727 565.512 799.727 C 580.096 799.727 592.139 811.591 592.139 825.596 L 592.139 842.902 C 592.139 858.29 604.672 871.492 620.282 871.492 L 654.893 871.492 C 670.37 871.492 683.26 858.379 683.26 842.902 L 683.26 825.596 C 683.26 811.591 695.213 799.727 709.798 799.727 C 717.069 799.727 723.803 802.894 729.067 808.514 L 739.771 819.218 C 744.899 824.214 752.169 827.201 759.707 827.201 C 767.244 827.201 774.514 824.258 779.643 819.218 L 805.021 793.929 C 815.949 783.002 815.949 765.117 805.021 754.19 L 793.871 743.263 C 788.386 738.356 785.308 731.399 785.308 724.263 C 785.308 709.678 797.171 697.368 811.265 697.368 L 828.571 697.368 C 844.048 697.368 855.109 685.637 855.109 670.161 L 855.109 652.633 L 855.109 635.328 C 855.109 619.762 844.048 607.006 828.571 607.006 Z M 837.134 652.543 L 837.134 669.76 C 837.134 674.532 834.503 678.769 828.839 678.769 L 811.533 678.769 C 799.803 678.769 788.653 683.765 780.224 692.417 C 771.927 700.981 767.333 712.22 767.333 724.085 C 767.333 736.395 772.329 747.768 781.561 756.197 L 792.399 766.901 C 796.146 770.781 796.146 777.159 792.399 780.906 L 767.021 806.195 C 765.192 807.889 762.561 808.915 759.84 808.915 C 757.12 808.915 754.354 807.889 752.66 806.195 L 742.268 795.847 C 733.482 786.615 721.974 781.486 709.798 781.486 C 697.933 781.486 687.006 786.035 678.487 794.241 C 669.834 802.671 665.285 813.732 665.285 825.551 L 665.285 842.858 C 665.285 848.434 660.379 853.205 655.161 853.205 L 620.505 853.205 C 615.287 853.205 610.605 848.434 610.605 842.858 L 610.605 825.551 C 610.605 813.821 605.921 802.671 597.268 794.241 C 588.704 786.035 577.554 781.486 565.824 781.486 C 553.738 781.486 542.141 786.615 533.8 795.624 L 523.229 806.195 C 521.401 807.889 518.77 808.915 516.049 808.915 C 513.328 808.915 510.563 808.023 509.091 806.418 L 508.958 806.283 L 508.824 806.15 L 483.445 780.861 C 479.699 777.115 479.699 770.826 483.445 766.945 L 493.793 756.688 C 503.114 748.035 508.244 736.528 508.244 724.218 C 508.244 712.355 503.694 701.561 495.354 692.997 C 486.924 684.345 475.774 679.884 464.044 679.884 L 446.605 679.884 C 440.896 679.884 436.123 674.978 436.123 669.849 L 436.123 652.41 L 436.123 635.104 C 436.123 629.976 440.896 625.069 446.605 625.069 L 463.91 625.069 C 475.641 625.069 486.791 620.609 495.22 611.957 C 503.516 603.394 508.11 592.377 508.11 580.646 C 508.11 568.337 502.981 556.829 493.659 548.31 L 483.178 537.962 C 480.68 535.465 480.323 532.61 480.323 531.004 C 480.323 529.532 480.68 526.544 483.178 524.047 L 508.466 498.891 C 510.295 497.196 512.927 496.17 515.647 496.17 C 518.368 496.17 521.134 497.062 522.606 498.668 L 522.739 498.802 L 522.873 498.935 L 533.578 509.64 C 542.008 518.739 553.38 523.779 565.601 523.779 C 577.465 523.779 588.482 519.229 597.045 511.023 C 605.697 502.593 610.47 491.532 610.47 479.712 L 610.47 462.407 C 610.47 456.832 615.02 452.06 620.149 452.06 L 654.893 452.06 C 660.022 452.06 663.992 456.832 663.992 462.407 L 663.992 479.712 C 663.992 491.443 668.987 502.593 677.64 511.023 C 686.203 519.229 697.443 523.779 709.308 523.779 C 721.618 523.779 733.214 518.649 741.866 509.416 L 752.213 499.069 C 754.042 497.374 756.673 496.349 759.394 496.349 C 762.115 496.349 764.88 497.374 766.575 498.98 L 791.953 524.136 C 793.782 525.964 794.896 528.462 794.896 531.094 C 794.896 533.725 793.871 536.222 792.042 538.051 L 781.204 548.756 C 772.105 557.186 766.977 568.56 766.977 580.869 C 766.977 592.733 771.525 603.527 779.866 612.09 C 788.296 620.743 799.447 625.203 811.177 625.203 L 828.481 625.203 C 834.636 625.203 836.911 630.912 837.045 635.461 L 837.134 652.543 Z"${_scopeId}></path><path class="animate-spin from-yellow-300" style="${ssrRenderStyle({ "stroke": "black", "stroke-width": "1", "transform-origin": "78.02581095% 16.12093553%", "animation-duration": "3.5s", "animation-direction": "reverse", "fill": "var(--tw-gradient-from)" })}" d="M 671.717 76.053 C 654.289 76.053 637.926 82.828 625.652 95.128 C 613.378 107.428 606.577 123.766 606.577 141.194 C 606.577 158.62 613.352 174.906 625.652 187.258 C 637.926 199.532 654.343 206.333 671.717 206.333 C 689.145 206.333 705.51 199.559 717.783 187.258 C 730.056 174.959 736.857 158.62 736.857 141.194 C 736.857 123.766 730.083 107.481 717.783 95.128 C 705.51 82.854 689.145 76.053 671.717 76.053 Z M 671.717 195.441 C 641.671 195.441 617.444 171.106 617.444 141.166 C 617.444 111.226 641.671 86.892 671.717 86.892 C 701.763 86.892 725.992 111.253 725.992 141.166 C 725.992 171.08 701.763 195.441 671.717 195.441 Z M 785.473 114.043 L 775.164 114.043 C 766.743 114.043 759.704 106.976 759.704 98.316 C 759.704 93.986 761.537 90.107 764.804 87.184 L 771.446 80.676 C 778.034 74.167 778.034 63.594 771.446 57.005 L 756.33 42.022 C 753.354 39.047 748.945 37.267 744.455 37.267 C 739.965 37.267 735.635 39.021 732.581 42.022 L 726.205 48.397 C 723.15 51.798 718.952 53.631 714.542 53.631 C 705.855 53.631 698.469 46.565 698.469 38.223 L 698.469 27.969 C 698.469 18.803 691.35 10.94 682.185 10.94 L 661.542 10.94 C 652.192 10.94 644.727 18.749 644.727 27.969 L 644.727 38.277 C 644.727 46.618 637.527 53.684 628.867 53.684 C 624.536 53.684 620.578 51.851 617.602 48.663 L 611.014 42.154 C 608.039 39.1 603.629 37.4 599.138 37.4 C 594.65 37.4 590.319 39.153 587.264 42.154 L 572.149 57.084 C 565.639 63.594 565.639 74.247 572.149 80.703 L 578.523 87.079 C 581.924 90.133 583.811 93.986 583.811 98.395 C 583.811 107.082 576.744 114.122 568.349 114.122 L 558.042 114.122 C 548.744 114.043 540.96 121.641 540.96 130.886 L 540.96 141.194 L 540.96 151.501 C 540.96 160.666 548.771 168.318 558.042 168.318 L 568.349 168.318 C 576.77 168.318 583.811 175.383 583.811 184.044 C 583.811 188.375 581.924 192.386 578.523 195.441 L 572.149 201.684 C 565.639 208.193 565.639 218.766 572.149 225.301 L 587.264 240.364 C 590.239 243.419 594.65 245.119 599.138 245.119 C 603.629 245.119 607.96 243.365 611.014 240.364 L 617.602 233.855 C 620.446 230.668 624.456 228.834 628.787 228.834 C 637.473 228.834 644.647 235.901 644.647 244.242 L 644.647 254.55 C 644.647 263.715 652.112 271.579 661.41 271.579 L 682.025 271.579 C 691.244 271.579 698.921 263.768 698.921 254.55 L 698.921 244.242 C 698.921 235.901 706.04 228.834 714.728 228.834 C 719.059 228.834 723.07 230.721 726.205 234.068 L 732.581 240.443 C 735.635 243.419 739.965 245.198 744.455 245.198 C 748.945 245.198 753.275 243.445 756.33 240.443 L 771.446 225.38 C 777.955 218.872 777.955 208.22 771.446 201.71 L 764.804 195.202 C 761.537 192.279 759.704 188.135 759.704 183.884 C 759.704 175.198 766.77 167.865 775.164 167.865 L 785.473 167.865 C 794.692 167.865 801.28 160.878 801.28 151.66 L 801.28 141.22 L 801.28 130.913 C 801.28 121.641 794.692 114.043 785.473 114.043 Z M 790.573 141.166 L 790.573 151.421 C 790.573 154.264 789.006 156.787 785.632 156.787 L 775.324 156.787 C 768.337 156.787 761.696 159.763 756.676 164.917 C 751.734 170.018 748.997 176.712 748.997 183.779 C 748.997 191.111 751.973 197.885 757.472 202.905 L 763.928 209.282 C 766.159 211.593 766.159 215.392 763.928 217.624 L 748.812 232.687 C 747.722 233.695 746.155 234.307 744.535 234.307 C 742.914 234.307 741.267 233.695 740.257 232.687 L 734.068 226.523 C 728.835 221.024 721.98 217.969 714.728 217.969 C 707.66 217.969 701.152 220.679 696.078 225.566 C 690.924 230.587 688.215 237.176 688.215 244.215 L 688.215 254.523 C 688.215 257.845 685.292 260.687 682.185 260.687 L 661.542 260.687 C 658.434 260.687 655.646 257.845 655.646 254.523 L 655.646 244.215 C 655.646 237.229 652.855 230.587 647.701 225.566 C 642.6 220.679 635.959 217.969 628.973 217.969 C 621.774 217.969 614.866 221.024 609.898 226.39 L 603.602 232.687 C 602.513 233.695 600.946 234.307 599.325 234.307 C 597.704 234.307 596.057 233.775 595.18 232.819 L 595.101 232.739 L 595.021 232.66 L 579.905 217.597 C 577.674 215.366 577.674 211.62 579.905 209.308 L 586.068 203.199 C 591.62 198.044 594.676 191.19 594.676 183.858 C 594.676 176.792 591.966 170.363 586.998 165.262 C 581.977 160.109 575.336 157.452 568.349 157.452 L 557.962 157.452 C 554.562 157.452 551.718 154.529 551.718 151.474 L 551.718 141.087 L 551.718 130.779 C 551.718 127.725 554.562 124.802 557.962 124.802 L 568.269 124.802 C 575.256 124.802 581.898 122.145 586.918 116.992 C 591.86 111.892 594.597 105.329 594.597 98.342 C 594.597 91.011 591.541 84.156 585.989 79.082 L 579.746 72.918 C 578.258 71.431 578.046 69.73 578.046 68.774 C 578.046 67.897 578.258 66.117 579.746 64.63 L 594.808 49.646 C 595.898 48.637 597.465 48.026 599.085 48.026 C 600.706 48.026 602.354 48.557 603.231 49.513 L 603.31 49.593 L 603.389 49.673 L 609.766 56.049 C 614.787 61.469 621.56 64.47 628.84 64.47 C 635.906 64.47 642.468 61.76 647.568 56.873 C 652.722 51.851 655.565 45.263 655.565 38.223 L 655.565 27.915 C 655.565 24.594 658.275 21.753 661.33 21.753 L 682.025 21.753 C 685.079 21.753 687.444 24.594 687.444 27.915 L 687.444 38.223 C 687.444 45.21 690.42 51.851 695.574 56.873 C 700.674 61.76 707.369 64.47 714.436 64.47 C 721.768 64.47 728.675 61.415 733.829 55.915 L 739.991 49.753 C 741.08 48.742 742.648 48.133 744.268 48.133 C 745.889 48.133 747.536 48.742 748.546 49.699 L 763.662 64.683 C 764.751 65.772 765.415 67.26 765.415 68.827 C 765.415 70.394 764.804 71.882 763.715 72.971 L 757.26 79.348 C 751.839 84.369 748.786 91.143 748.786 98.475 C 748.786 105.541 751.494 111.971 756.463 117.071 C 761.484 122.225 768.126 124.882 775.112 124.882 L 785.419 124.882 C 789.085 124.882 790.441 128.282 790.52 130.992 L 790.573 141.166 Z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", { viewBox: "0 0 860.1 876.5" }, [
                  createVNode("path", {
                    class: "animate-spin from-blue-300",
                    style: { "stroke": "black", "stroke-width": "1", "transform-origin": "33.47285199% 32.89218482%", "animation-duration": "3s", "fill": "var(--tw-gradient-from)" },
                    d: "M 289.209 146.527 C 251.329 146.527 215.76 161.251 189.083 187.986 C 162.406 214.721 147.624 250.232 147.624 288.112 C 147.624 325.99 162.348 361.387 189.083 388.237 C 215.76 414.914 251.445 429.696 289.209 429.696 C 327.088 429.696 362.657 414.972 389.335 388.237 C 416.011 361.503 430.794 325.99 430.794 288.112 C 430.794 250.232 416.069 214.836 389.335 187.986 C 362.657 161.308 327.088 146.527 289.209 146.527 Z M 289.209 406.022 C 223.902 406.022 171.241 353.129 171.241 288.053 C 171.241 222.977 223.902 170.085 289.209 170.085 C 354.516 170.085 407.177 223.036 407.177 288.053 C 407.177 353.072 354.516 406.022 289.209 406.022 Z M 536.462 229.099 L 514.058 229.099 C 495.753 229.099 480.452 213.739 480.452 194.915 C 480.452 185.503 484.437 177.073 491.538 170.72 L 505.974 156.574 C 520.294 142.427 520.294 119.446 505.974 105.125 L 473.119 72.559 C 466.651 66.091 457.066 62.222 447.308 62.222 C 437.549 62.222 428.137 66.034 421.497 72.559 L 407.639 86.416 C 400.998 93.808 391.874 97.792 382.29 97.792 C 363.408 97.792 347.356 82.432 347.356 64.301 L 347.356 42.013 C 347.356 22.091 331.88 5 311.959 5 L 267.093 5 C 246.768 5 230.542 21.975 230.542 42.013 L 230.542 64.417 C 230.542 82.548 214.894 97.907 196.07 97.907 C 186.658 97.907 178.054 93.923 171.587 86.994 L 157.267 72.847 C 150.799 66.206 141.215 62.511 131.455 62.511 C 121.697 62.511 112.285 66.322 105.645 72.847 L 72.789 105.298 C 58.642 119.446 58.642 142.6 72.789 156.632 L 86.647 170.49 C 94.038 177.13 98.139 185.503 98.139 195.088 C 98.139 213.97 82.779 229.271 64.532 229.271 L 42.128 229.271 C 21.918 229.099 5 245.613 5 265.707 L 5 288.112 L 5 310.516 C 5 330.437 21.976 347.067 42.128 347.067 L 64.532 347.067 C 82.836 347.067 98.139 362.426 98.139 381.25 C 98.139 390.663 94.038 399.381 86.647 406.022 L 72.789 419.591 C 58.642 433.739 58.642 456.72 72.789 470.925 L 105.645 503.664 C 112.112 510.305 121.697 514.001 131.455 514.001 C 141.215 514.001 150.627 510.189 157.267 503.664 L 171.587 489.518 C 177.766 482.589 186.484 478.604 195.896 478.604 C 214.778 478.604 230.369 493.964 230.369 512.095 L 230.369 534.499 C 230.369 554.42 246.595 571.512 266.804 571.512 L 311.612 571.512 C 331.65 571.512 348.337 554.536 348.337 534.499 L 348.337 512.095 C 348.337 493.964 363.812 478.604 382.693 478.604 C 392.106 478.604 400.825 482.704 407.639 489.98 L 421.497 503.838 C 428.137 510.305 437.549 514.173 447.308 514.173 C 457.066 514.173 466.478 510.363 473.119 503.838 L 505.974 471.097 C 520.121 456.951 520.121 433.796 505.974 419.649 L 491.538 405.502 C 484.437 399.15 480.452 390.143 480.452 380.904 C 480.452 362.022 495.811 346.085 514.058 346.085 L 536.462 346.085 C 556.499 346.085 570.819 330.898 570.819 310.862 L 570.819 288.169 L 570.819 265.765 C 570.819 245.613 556.499 229.099 536.462 229.099 Z M 547.549 288.053 L 547.549 310.342 C 547.549 316.521 544.142 322.006 536.809 322.006 L 514.405 322.006 C 499.218 322.006 484.783 328.474 473.87 339.675 C 463.129 350.762 457.182 365.313 457.182 380.673 C 457.182 396.61 463.649 411.334 475.602 422.247 L 489.633 436.106 C 494.484 441.129 494.484 449.386 489.633 454.237 L 456.778 486.977 C 454.41 489.171 451.004 490.499 447.481 490.499 C 443.959 490.499 440.378 489.171 438.185 486.977 L 424.731 473.581 C 413.355 461.628 398.457 454.988 382.693 454.988 C 367.334 454.988 353.187 460.878 342.158 471.502 C 330.956 482.415 325.066 496.735 325.066 512.037 L 325.066 534.441 C 325.066 541.66 318.715 547.837 311.959 547.837 L 267.093 547.837 C 260.337 547.837 254.275 541.66 254.275 534.441 L 254.275 512.037 C 254.275 496.851 248.211 482.415 237.009 471.502 C 225.922 460.878 211.487 454.988 196.3 454.988 C 180.653 454.988 165.639 461.628 154.841 473.292 L 141.156 486.977 C 138.789 489.171 135.382 490.499 131.86 490.499 C 128.337 490.499 124.758 489.344 122.852 487.266 L 122.679 487.092 L 122.506 486.919 L 89.65 454.179 C 84.8 449.329 84.8 441.187 89.65 436.163 L 103.047 422.883 C 115.114 411.68 121.755 396.783 121.755 380.846 C 121.755 365.487 115.865 351.513 105.067 340.426 C 94.154 329.225 79.718 323.45 64.532 323.45 L 41.955 323.45 C 34.564 323.45 28.385 317.098 28.385 310.458 L 28.385 287.881 L 28.385 265.476 C 28.385 258.836 34.564 252.484 41.955 252.484 L 64.359 252.484 C 79.546 252.484 93.981 246.71 104.894 235.508 C 115.634 224.422 121.582 210.159 121.582 194.972 C 121.582 179.036 114.942 164.138 102.873 153.11 L 89.304 139.713 C 86.07 136.48 85.608 132.784 85.608 130.705 C 85.608 128.8 86.07 124.931 89.304 121.698 L 122.043 89.131 C 124.411 86.936 127.818 85.608 131.34 85.608 C 134.862 85.608 138.443 86.763 140.349 88.842 L 140.521 89.015 L 140.695 89.188 L 154.553 103.046 C 165.467 114.826 180.19 121.351 196.012 121.351 C 211.371 121.351 225.634 115.461 236.72 104.837 C 247.922 93.923 254.101 79.603 254.101 64.301 L 254.101 41.897 C 254.101 34.679 259.991 28.501 266.631 28.501 L 311.612 28.501 C 318.253 28.501 323.392 34.679 323.392 41.897 L 323.392 64.301 C 323.392 79.488 329.859 93.923 341.061 104.837 C 352.148 115.461 366.699 121.351 382.059 121.351 C 397.996 121.351 413.008 114.71 424.211 102.757 L 437.607 89.361 C 439.974 87.167 443.381 85.839 446.903 85.839 C 450.426 85.839 454.006 87.167 456.2 89.246 L 489.056 121.813 C 491.423 124.18 492.866 127.414 492.866 130.821 C 492.866 134.228 491.538 137.461 489.171 139.828 L 475.14 153.687 C 463.36 164.6 456.72 179.325 456.72 195.261 C 456.72 210.621 462.609 224.595 473.407 235.681 C 484.321 246.883 498.757 252.657 513.943 252.657 L 536.346 252.657 C 544.315 252.657 547.26 260.048 547.433 265.938 L 547.549 288.053 Z"
                  }),
                  createVNode("path", {
                    class: "animate-spin from-pink-300",
                    style: { "stroke": "black", "stroke-width": "1", "transform-origin": "74.01464945% 74.46662863%", "animation-duration": "4s", "animation-direction": "reverse", "fill": "var(--tw-gradient-from)" },
                    d: "M 637.588 543.225 C 608.329 543.225 580.855 554.599 560.249 575.25 C 539.643 595.9 528.225 623.33 528.225 652.589 C 528.225 681.846 539.599 709.188 560.249 729.927 C 580.855 750.533 608.419 761.95 637.588 761.95 C 666.847 761.95 694.321 750.578 714.928 729.927 C 735.533 709.277 746.951 681.846 746.951 652.589 C 746.951 623.33 735.578 595.989 714.928 575.25 C 694.321 554.643 666.847 543.225 637.588 543.225 Z M 637.588 743.665 C 587.144 743.665 546.468 702.809 546.468 652.543 C 546.468 602.277 587.144 561.423 637.588 561.423 C 688.032 561.423 728.71 602.323 728.71 652.543 C 728.71 702.765 688.032 743.665 637.588 743.665 Z M 828.571 607.006 L 811.265 607.006 C 797.126 607.006 785.308 595.142 785.308 580.602 C 785.308 573.332 788.386 566.82 793.871 561.913 L 805.021 550.987 C 816.082 540.058 816.082 522.307 805.021 511.245 L 779.643 486.091 C 774.647 481.095 767.244 478.106 759.707 478.106 C 752.169 478.106 744.899 481.051 739.771 486.091 L 729.067 496.794 C 723.937 502.504 716.889 505.581 709.487 505.581 C 694.901 505.581 682.502 493.717 682.502 479.712 L 682.502 462.497 C 682.502 447.109 670.548 433.907 655.161 433.907 L 620.505 433.907 C 604.806 433.907 592.273 447.019 592.273 462.497 L 592.273 479.802 C 592.273 493.807 580.186 505.67 565.646 505.67 C 558.376 505.67 551.73 502.593 546.735 497.241 L 535.674 486.313 C 530.678 481.184 523.275 478.33 515.736 478.33 C 508.199 478.33 500.929 481.273 495.8 486.313 L 470.422 511.379 C 459.494 522.307 459.494 540.192 470.422 551.031 L 481.126 561.736 C 486.835 566.864 490.002 573.332 490.002 580.735 C 490.002 595.32 478.138 607.139 464.044 607.139 L 446.739 607.139 C 431.128 607.006 418.06 619.762 418.06 635.283 L 418.06 652.589 L 418.06 669.894 C 418.06 685.281 431.173 698.127 446.739 698.127 L 464.044 698.127 C 478.182 698.127 490.002 709.99 490.002 724.53 C 490.002 731.801 486.835 738.535 481.126 743.665 L 470.422 754.145 C 459.494 765.073 459.494 782.824 470.422 793.796 L 495.8 819.084 C 500.795 824.214 508.199 827.068 515.736 827.068 C 523.275 827.068 530.545 824.124 535.674 819.084 L 546.735 808.157 C 551.508 802.805 558.242 799.727 565.512 799.727 C 580.096 799.727 592.139 811.591 592.139 825.596 L 592.139 842.902 C 592.139 858.29 604.672 871.492 620.282 871.492 L 654.893 871.492 C 670.37 871.492 683.26 858.379 683.26 842.902 L 683.26 825.596 C 683.26 811.591 695.213 799.727 709.798 799.727 C 717.069 799.727 723.803 802.894 729.067 808.514 L 739.771 819.218 C 744.899 824.214 752.169 827.201 759.707 827.201 C 767.244 827.201 774.514 824.258 779.643 819.218 L 805.021 793.929 C 815.949 783.002 815.949 765.117 805.021 754.19 L 793.871 743.263 C 788.386 738.356 785.308 731.399 785.308 724.263 C 785.308 709.678 797.171 697.368 811.265 697.368 L 828.571 697.368 C 844.048 697.368 855.109 685.637 855.109 670.161 L 855.109 652.633 L 855.109 635.328 C 855.109 619.762 844.048 607.006 828.571 607.006 Z M 837.134 652.543 L 837.134 669.76 C 837.134 674.532 834.503 678.769 828.839 678.769 L 811.533 678.769 C 799.803 678.769 788.653 683.765 780.224 692.417 C 771.927 700.981 767.333 712.22 767.333 724.085 C 767.333 736.395 772.329 747.768 781.561 756.197 L 792.399 766.901 C 796.146 770.781 796.146 777.159 792.399 780.906 L 767.021 806.195 C 765.192 807.889 762.561 808.915 759.84 808.915 C 757.12 808.915 754.354 807.889 752.66 806.195 L 742.268 795.847 C 733.482 786.615 721.974 781.486 709.798 781.486 C 697.933 781.486 687.006 786.035 678.487 794.241 C 669.834 802.671 665.285 813.732 665.285 825.551 L 665.285 842.858 C 665.285 848.434 660.379 853.205 655.161 853.205 L 620.505 853.205 C 615.287 853.205 610.605 848.434 610.605 842.858 L 610.605 825.551 C 610.605 813.821 605.921 802.671 597.268 794.241 C 588.704 786.035 577.554 781.486 565.824 781.486 C 553.738 781.486 542.141 786.615 533.8 795.624 L 523.229 806.195 C 521.401 807.889 518.77 808.915 516.049 808.915 C 513.328 808.915 510.563 808.023 509.091 806.418 L 508.958 806.283 L 508.824 806.15 L 483.445 780.861 C 479.699 777.115 479.699 770.826 483.445 766.945 L 493.793 756.688 C 503.114 748.035 508.244 736.528 508.244 724.218 C 508.244 712.355 503.694 701.561 495.354 692.997 C 486.924 684.345 475.774 679.884 464.044 679.884 L 446.605 679.884 C 440.896 679.884 436.123 674.978 436.123 669.849 L 436.123 652.41 L 436.123 635.104 C 436.123 629.976 440.896 625.069 446.605 625.069 L 463.91 625.069 C 475.641 625.069 486.791 620.609 495.22 611.957 C 503.516 603.394 508.11 592.377 508.11 580.646 C 508.11 568.337 502.981 556.829 493.659 548.31 L 483.178 537.962 C 480.68 535.465 480.323 532.61 480.323 531.004 C 480.323 529.532 480.68 526.544 483.178 524.047 L 508.466 498.891 C 510.295 497.196 512.927 496.17 515.647 496.17 C 518.368 496.17 521.134 497.062 522.606 498.668 L 522.739 498.802 L 522.873 498.935 L 533.578 509.64 C 542.008 518.739 553.38 523.779 565.601 523.779 C 577.465 523.779 588.482 519.229 597.045 511.023 C 605.697 502.593 610.47 491.532 610.47 479.712 L 610.47 462.407 C 610.47 456.832 615.02 452.06 620.149 452.06 L 654.893 452.06 C 660.022 452.06 663.992 456.832 663.992 462.407 L 663.992 479.712 C 663.992 491.443 668.987 502.593 677.64 511.023 C 686.203 519.229 697.443 523.779 709.308 523.779 C 721.618 523.779 733.214 518.649 741.866 509.416 L 752.213 499.069 C 754.042 497.374 756.673 496.349 759.394 496.349 C 762.115 496.349 764.88 497.374 766.575 498.98 L 791.953 524.136 C 793.782 525.964 794.896 528.462 794.896 531.094 C 794.896 533.725 793.871 536.222 792.042 538.051 L 781.204 548.756 C 772.105 557.186 766.977 568.56 766.977 580.869 C 766.977 592.733 771.525 603.527 779.866 612.09 C 788.296 620.743 799.447 625.203 811.177 625.203 L 828.481 625.203 C 834.636 625.203 836.911 630.912 837.045 635.461 L 837.134 652.543 Z"
                  }),
                  createVNode("path", {
                    class: "animate-spin from-yellow-300",
                    style: { "stroke": "black", "stroke-width": "1", "transform-origin": "78.02581095% 16.12093553%", "animation-duration": "3.5s", "animation-direction": "reverse", "fill": "var(--tw-gradient-from)" },
                    d: "M 671.717 76.053 C 654.289 76.053 637.926 82.828 625.652 95.128 C 613.378 107.428 606.577 123.766 606.577 141.194 C 606.577 158.62 613.352 174.906 625.652 187.258 C 637.926 199.532 654.343 206.333 671.717 206.333 C 689.145 206.333 705.51 199.559 717.783 187.258 C 730.056 174.959 736.857 158.62 736.857 141.194 C 736.857 123.766 730.083 107.481 717.783 95.128 C 705.51 82.854 689.145 76.053 671.717 76.053 Z M 671.717 195.441 C 641.671 195.441 617.444 171.106 617.444 141.166 C 617.444 111.226 641.671 86.892 671.717 86.892 C 701.763 86.892 725.992 111.253 725.992 141.166 C 725.992 171.08 701.763 195.441 671.717 195.441 Z M 785.473 114.043 L 775.164 114.043 C 766.743 114.043 759.704 106.976 759.704 98.316 C 759.704 93.986 761.537 90.107 764.804 87.184 L 771.446 80.676 C 778.034 74.167 778.034 63.594 771.446 57.005 L 756.33 42.022 C 753.354 39.047 748.945 37.267 744.455 37.267 C 739.965 37.267 735.635 39.021 732.581 42.022 L 726.205 48.397 C 723.15 51.798 718.952 53.631 714.542 53.631 C 705.855 53.631 698.469 46.565 698.469 38.223 L 698.469 27.969 C 698.469 18.803 691.35 10.94 682.185 10.94 L 661.542 10.94 C 652.192 10.94 644.727 18.749 644.727 27.969 L 644.727 38.277 C 644.727 46.618 637.527 53.684 628.867 53.684 C 624.536 53.684 620.578 51.851 617.602 48.663 L 611.014 42.154 C 608.039 39.1 603.629 37.4 599.138 37.4 C 594.65 37.4 590.319 39.153 587.264 42.154 L 572.149 57.084 C 565.639 63.594 565.639 74.247 572.149 80.703 L 578.523 87.079 C 581.924 90.133 583.811 93.986 583.811 98.395 C 583.811 107.082 576.744 114.122 568.349 114.122 L 558.042 114.122 C 548.744 114.043 540.96 121.641 540.96 130.886 L 540.96 141.194 L 540.96 151.501 C 540.96 160.666 548.771 168.318 558.042 168.318 L 568.349 168.318 C 576.77 168.318 583.811 175.383 583.811 184.044 C 583.811 188.375 581.924 192.386 578.523 195.441 L 572.149 201.684 C 565.639 208.193 565.639 218.766 572.149 225.301 L 587.264 240.364 C 590.239 243.419 594.65 245.119 599.138 245.119 C 603.629 245.119 607.96 243.365 611.014 240.364 L 617.602 233.855 C 620.446 230.668 624.456 228.834 628.787 228.834 C 637.473 228.834 644.647 235.901 644.647 244.242 L 644.647 254.55 C 644.647 263.715 652.112 271.579 661.41 271.579 L 682.025 271.579 C 691.244 271.579 698.921 263.768 698.921 254.55 L 698.921 244.242 C 698.921 235.901 706.04 228.834 714.728 228.834 C 719.059 228.834 723.07 230.721 726.205 234.068 L 732.581 240.443 C 735.635 243.419 739.965 245.198 744.455 245.198 C 748.945 245.198 753.275 243.445 756.33 240.443 L 771.446 225.38 C 777.955 218.872 777.955 208.22 771.446 201.71 L 764.804 195.202 C 761.537 192.279 759.704 188.135 759.704 183.884 C 759.704 175.198 766.77 167.865 775.164 167.865 L 785.473 167.865 C 794.692 167.865 801.28 160.878 801.28 151.66 L 801.28 141.22 L 801.28 130.913 C 801.28 121.641 794.692 114.043 785.473 114.043 Z M 790.573 141.166 L 790.573 151.421 C 790.573 154.264 789.006 156.787 785.632 156.787 L 775.324 156.787 C 768.337 156.787 761.696 159.763 756.676 164.917 C 751.734 170.018 748.997 176.712 748.997 183.779 C 748.997 191.111 751.973 197.885 757.472 202.905 L 763.928 209.282 C 766.159 211.593 766.159 215.392 763.928 217.624 L 748.812 232.687 C 747.722 233.695 746.155 234.307 744.535 234.307 C 742.914 234.307 741.267 233.695 740.257 232.687 L 734.068 226.523 C 728.835 221.024 721.98 217.969 714.728 217.969 C 707.66 217.969 701.152 220.679 696.078 225.566 C 690.924 230.587 688.215 237.176 688.215 244.215 L 688.215 254.523 C 688.215 257.845 685.292 260.687 682.185 260.687 L 661.542 260.687 C 658.434 260.687 655.646 257.845 655.646 254.523 L 655.646 244.215 C 655.646 237.229 652.855 230.587 647.701 225.566 C 642.6 220.679 635.959 217.969 628.973 217.969 C 621.774 217.969 614.866 221.024 609.898 226.39 L 603.602 232.687 C 602.513 233.695 600.946 234.307 599.325 234.307 C 597.704 234.307 596.057 233.775 595.18 232.819 L 595.101 232.739 L 595.021 232.66 L 579.905 217.597 C 577.674 215.366 577.674 211.62 579.905 209.308 L 586.068 203.199 C 591.62 198.044 594.676 191.19 594.676 183.858 C 594.676 176.792 591.966 170.363 586.998 165.262 C 581.977 160.109 575.336 157.452 568.349 157.452 L 557.962 157.452 C 554.562 157.452 551.718 154.529 551.718 151.474 L 551.718 141.087 L 551.718 130.779 C 551.718 127.725 554.562 124.802 557.962 124.802 L 568.269 124.802 C 575.256 124.802 581.898 122.145 586.918 116.992 C 591.86 111.892 594.597 105.329 594.597 98.342 C 594.597 91.011 591.541 84.156 585.989 79.082 L 579.746 72.918 C 578.258 71.431 578.046 69.73 578.046 68.774 C 578.046 67.897 578.258 66.117 579.746 64.63 L 594.808 49.646 C 595.898 48.637 597.465 48.026 599.085 48.026 C 600.706 48.026 602.354 48.557 603.231 49.513 L 603.31 49.593 L 603.389 49.673 L 609.766 56.049 C 614.787 61.469 621.56 64.47 628.84 64.47 C 635.906 64.47 642.468 61.76 647.568 56.873 C 652.722 51.851 655.565 45.263 655.565 38.223 L 655.565 27.915 C 655.565 24.594 658.275 21.753 661.33 21.753 L 682.025 21.753 C 685.079 21.753 687.444 24.594 687.444 27.915 L 687.444 38.223 C 687.444 45.21 690.42 51.851 695.574 56.873 C 700.674 61.76 707.369 64.47 714.436 64.47 C 721.768 64.47 728.675 61.415 733.829 55.915 L 739.991 49.753 C 741.08 48.742 742.648 48.133 744.268 48.133 C 745.889 48.133 747.536 48.742 748.546 49.699 L 763.662 64.683 C 764.751 65.772 765.415 67.26 765.415 68.827 C 765.415 70.394 764.804 71.882 763.715 72.971 L 757.26 79.348 C 751.839 84.369 748.786 91.143 748.786 98.475 C 748.786 105.541 751.494 111.971 756.463 117.071 C 761.484 122.225 768.126 124.882 775.112 124.882 L 785.419 124.882 C 789.085 124.882 790.441 128.282 790.52 130.992 L 790.573 141.166 Z"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="mt-3 text-gray-200 font-mono text-sm sm:text-xs">Loading...</div></div></div>`);
      }
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FrontNavBar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "CreditContent",
  __ssrInlineRender: true,
  props: {
    details: {
      required: true,
      type: Object
    },
    product: {
      required: true,
      type: Object
    }
  },
  emits: ["selectedOffer"],
  setup(__props, { emit: __emit }) {
    const selectedOffer = ref(null);
    function calculateInstallmentWithInterest(productPrice, numOfInstallments, interestRate) {
      let interest_rate = productPrice * (interestRate / 100);
      let finalPrice = productPrice + interest_rate;
      let installment = finalPrice / numOfInstallments;
      return installment.toFixed();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<fieldset${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 gap-4 sm:grid-cols-2" }, _attrs))}>`);
      if (__props.details.length != 0) {
        _push(`<!--[-->`);
        ssrRenderList(__props.details, (detail) => {
          _push(`<div><label${ssrRenderAttr("for", detail.id)} class="${ssrRenderClass([{
            "has-[:checked]:border-blue-500": _ctx.selectedType !== null && _ctx.selectedType === detail.id
          }, "block cursor-pointer bg-slate-300/20 rounded-lg border border-slate-300/20 group/offer p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-[#1FC8F3]"])}"><div class="relative flex flex-row gap-6"><span class="absolute px-2 text-xs font-extrabold text-white bg-red-500 rounded-lg -right-3 -top-3">${ssrInterpolate(parseInt(detail.interest_rate))}%</span><span class="${ssrRenderClass([
            selectedOffer.value === detail.id ? "text-white" : "text-[#022425] dark:text-slate-300",
            "flex items-center font-extrabold"
          ])}"><p class="text-5xl">${ssrInterpolate(detail.num_of_installments)}</p></span><span class="${ssrRenderClass([
            selectedOffer.value === detail.id ? "text-white" : "text-[#022425] dark:text-slate-300",
            "flex flex-col mt-1 text-2xl"
          ])}"><p class="">${ssrInterpolate(_ctx.__("installments"))}</p><p class="">${ssrInterpolate(calculateInstallmentWithInterest(
            __props.product.price,
            detail.num_of_installments,
            detail.interest_rate
          ))} ${ssrInterpolate(_ctx.__("lei"))}</p></span></div><input type="radio"${ssrRenderAttr("name", detail.name)}${ssrRenderAttr("value", detail.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(selectedOffer.value, detail.id)) ? " checked" : ""}${ssrRenderAttr("id", detail.id)} class="sr-only"></label></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</fieldset>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CreditContent.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "ReusableOrderForm",
  __ssrInlineRender: true,
  props: {
    product: {
      required: true,
      type: Object
    },
    selectedOffer: {
      required: true
    },
    selectedType: {
      required: true
    }
  },
  emits: ["submitSuccess"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = useForm({
      full_name: "",
      phone: "",
      terms: false,
      products: props.product,
      credit_id: props.selectedOffer,
      total_price: props.product.price,
      type: props.selectedType
    });
    watch(() => props.selectedOffer, (value) => {
      form.credit_id = value;
    });
    watch(() => props.selectedType, (value) => {
      form.type = value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="grid grid-cols-1 sm:grid-cols-2 gap-2"><label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(_ctx.__("full_name"))} <input type="text" name="full_name" id="full_name"${ssrRenderAttr("value", unref(form).full_name)}${ssrRenderAttr("placeholder", _ctx.__("example") + ": Ion Popescu")} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">`);
      if (unref(form).errors.full_name) {
        _push(`<span class="text-red-500">${ssrInterpolate(_ctx.__(unref(form).errors.full_name))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label><label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(_ctx.__("phone"))} <input type="tel" name="phone"${ssrRenderAttr("value", unref(form).phone)} id="phone" placeholder="012345678" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">`);
      if (unref(form).errors.phone) {
        _push(`<span class="text-red-500">${ssrInterpolate(_ctx.__(unref(form).errors.phone))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label><span class="flex gap-1 sm:col-span-2"><input type="checkbox" name="terms" id="terms" required${ssrIncludeBooleanAttr(Array.isArray(unref(form).terms) ? ssrLooseContain(unref(form).terms, null) : unref(form).terms) ? " checked" : ""} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"> ${ssrInterpolate(_ctx.__("accord_terms"))} `);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route$1)("privacy_page"),
        class: "text-blue-800 underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("privacy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("privacy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div>`);
      _push(ssrRenderComponent(PrimaryButton, {
        class: [{ "opacity-25": unref(form).processing }, "w-full h-10 flex justify-center hover:bg-slate-400"],
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("submit"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("submit")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ReusableOrderForm.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "FastOrderForm",
  __ssrInlineRender: true,
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  emits: ["submitSuccess"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = useForm({
      phone: "",
      products: props.product,
      total_price: props.product.has_discount ? props.product.promotion_price : props.product.price,
      type: "fast_order"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="grid grid-cols-1 sm:grid-cols-2 gap-2"><label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white col-span-2">${ssrInterpolate(_ctx.__("phone"))} <input type="tel" name="phone"${ssrRenderAttr("value", unref(form).phone)} id="phone" placeholder="012345678" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">`);
      if (unref(form).errors.phone) {
        _push(`<span class="text-red-500">${ssrInterpolate(_ctx.__(unref(form).errors.phone))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label></div>`);
      _push(ssrRenderComponent(PrimaryButton, {
        class: [{ "opacity-25": unref(form).processing }, "w-full h-10 flex justify-center hover:bg-slate-400"],
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("submit"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("submit")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FastOrderForm.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "FrontModal",
  __ssrInlineRender: true,
  props: {
    title: {
      required: false,
      type: String,
      default: null
    },
    visible: {
      required: true,
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true,
      default: "call"
    },
    product: {
      type: Object,
      required: false,
      default: null
    },
    maxWidth: {
      type: String,
      default: "2xl"
    }
  },
  emits: ["close", "select"],
  setup(__props, { emit: __emit }) {
    const body = ref(document.body);
    const isLocked = useScrollLock(body);
    const emit = __emit;
    const props = __props;
    const maxWidthClass = computed(() => {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        "6xl": "sm:max-w-6xl"
      }[props.maxWidth];
    });
    function close() {
      isLocked.value = false;
      emit("close");
      success.value = false;
    }
    const selectedTab = ref("credit");
    const selectedOffer = ref(null);
    const success = ref(false);
    function showSuccessMessage() {
      success.value = true;
    }
    const showTabContent = () => {
      if (selectedTab.value === "credit") {
        return props.product.credits.filter(
          (credit) => credit.type === "credit"
        );
      } else {
        return props.product.credits.filter(
          (credit) => credit.type === "installments"
        );
      }
    };
    const checkIfInstallments = () => {
      return props.product.credits.some(
        (credit) => credit.type === "installments"
      );
    };
    watch(
      () => props.visible,
      (value) => {
        if (value) {
          isLocked.value = true;
        } else
          isLocked.value = false;
      }
    );
    onMounted(() => {
      document.addEventListener("handleClick", close);
    });
    onUnmounted(() => {
      document.body.style.overflow = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          id: "authentication-modal",
          class: "fixed inset-0 z-50 flex items-center justify-center overflow-x-scroll bg-gray-900 bg-opacity-50"
        }, _attrs))}><div class="${ssrRenderClass([maxWidthClass.value, "relative w-full max-h-full"])}"><div class="relative bg-white rounded-lg shadow dark:bg-gray-700"><div class="${ssrRenderClass([{ "border-b": __props.title }, "flex items-center justify-between p-4 rounded-t md:p-5 dark:border-gray-600"])}">`);
        if (__props.title) {
          _push(`<h3 class="text-xl font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.title)}</h3>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal"><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg></button></div><div class="p-4 md:px-5">`);
        if (__props.type === "call") {
          _push(`<form class="space-y-4" action="#"><div><label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(_ctx.__("your_name"))}</label><input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder=""></div><div><label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(_ctx.__("phone"))}</label><input type="tel" name="phone" id="phone" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"></div>`);
          _push(ssrRenderComponent(PrimaryButton, {
            type: "submit",
            class: "flex justify-center w-full h-10 hover:bg-slate-400"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.__("wait_call"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.__("wait_call")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</form>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.type === "cheaper") {
          _push(`<form class="space-y-4" action="#"><div><label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(_ctx.__("your_name"))}</label><input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder=""></div><div><label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(_ctx.__("phone"))}</label><input type="tel" name="phone" id="phone" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"></div><div><label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(_ctx.__("link_to_cheaper_product"))}</label><input type="url" name="link" id="link" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"></div>`);
          _push(ssrRenderComponent(PrimaryButton, {
            type: "submit",
            class: "flex justify-center w-full h-10 hover:bg-slate-400"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.__("wait_call"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.__("wait_call")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</form>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.type === "buy_1_click") {
          _push(`<!--[--><span class="flex mb-4 font-medium text-center font-mulish">${ssrInterpolate(_ctx.__("for_fast_order_complete_phone_number"))}</span>`);
          _push(ssrRenderComponent(_sfc_main$6, {
            product: __props.product,
            onSubmitSuccess: ($event) => showSuccessMessage()
          }, null, _parent));
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (__props.type === "buy_in_credit") {
          _push(`<!--[-->`);
          if (!success.value) {
            _push(`<div class="flex flex-col gap-2"><div class="relative grid items-start grid-cols-2 gap-4 p-4 mb-4 border rounded-md sm:grid-cols-6 container-custom-rounded border-1 border-slate-300 dark:border-slate-100/20 bg-slate-300/20 dark:bg-slate-100/20 dark:text-white"><div class="col-span-2 mx-auto sm:col-span-1"><img class="w-24"${ssrRenderAttr("src", __props.product.images[0].image1)} alt=""></div><div class="col-span-2 mx-auto my-auto sm:col-span-3 sm:mx-0"><p>${ssrInterpolate(__props.product.name)}</p></div><div class="col-span-2 mx-auto my-auto text-right sm:col-span-1"><p class="font-bold">${ssrInterpolate(__props.product.total_price ?? __props.product.price)} ${ssrInterpolate(_ctx.__("lei"))}</p></div></div><div class="relative flex items-center justify-between mx-auto mb-5 text-lg cursor-pointer min-w-44 sm:w-72 bg-slate-100 dark:bg-slate-300 rounded-xl"><div class="${ssrRenderClass([{
              "translate-x-full": selectedTab.value === "installments"
            }, "absolute z-10 w-1/2 h-full transition duration-500 shadow bg-primary-blue rounded-xl"])}"></div><p class="${ssrRenderClass([{
              "text-white": selectedTab.value === "credit"
            }, "z-20 flex justify-center w-full p-1 duration-500 rounded-xl"])}">${ssrInterpolate(_ctx.__("credit"))}</p>`);
            if (checkIfInstallments) {
              _push(`<p class="${ssrRenderClass([{
                "text-white": selectedTab.value === "installments"
              }, "z-20 flex justify-center w-full p-1 duration-500 rounded-xl"])}">${ssrInterpolate(_ctx.__("installments"))}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            _push(ssrRenderComponent(_sfc_main$8, {
              details: showTabContent(),
              product: __props.product,
              onSelectedOffer: (offerId) => selectedOffer.value = offerId
            }, null, _parent));
            _push(`<span class="text-sm dark:text-slate-300">*${ssrInterpolate(_ctx.__("is_preventive_offer"))}.</span><hr class="my-3">`);
            _push(ssrRenderComponent(_sfc_main$7, {
              style: selectedTab.value ? null : { display: "none" },
              "selected-offer": selectedOffer.value,
              onSubmitSuccess: ($event) => showSuccessMessage(),
              product: __props.product,
              "selected-type": selectedTab.value
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (success.value) {
            _push(`<div><div class="p-6 bg-white md:mx-auto"><svg viewBox="0 0 24 24" class="w-16 h-16 mx-auto my-6 text-green-600"><path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path></svg><div class="text-center"><h3 class="text-base font-semibold text-center text-gray-900 md:text-2xl">${ssrInterpolate(_ctx.__("order_placed"))}! </h3><p class="my-2 text-gray-600">${ssrInterpolate(_ctx.__("thanks_order"))}</p><p>${ssrInterpolate(_ctx.__("order_success_message"))}</p><div class="py-10 text-center"><p class="px-12 py-3 font-semibold text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-500">${ssrInterpolate(_ctx.__("back_to_shop"))}</p></div></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FrontModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "FrontFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const app = getCurrentInstance();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "relative mt-20 bg-gray-900 px-4 pt-20" }, _attrs))}><div class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2">`);
      _push(ssrRenderComponent(_sfc_main$i, null, null, _parent));
      _push(`</div><nav aria-label="Footer Navigation" class="mx-auto mb-10 flex max-w-2xl flex-col gap-10 text-center sm:flex-row sm:text-left">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("about_page"),
        class: "font-medium text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("about_us"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("about_us")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("contacts.index"),
        class: "font-medium text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("privacy_page"),
        class: "font-medium text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("privacy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("privacy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("terms_page"),
        class: "font-medium text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("terms"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("terms")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><p class="py-10 text-center text-gray-300">© 2023 - ${ssrInterpolate(unref(app).appContext.config.globalProperties.$page.props.currentYear)} Neoman | ${ssrInterpolate(_ctx.__("all_rights_reserved"))}</p></footer>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FrontFooter.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "Toaster",
  __ssrInlineRender: true,
  props: {
    action: String,
    style: String,
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    success: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const cartStore = useCartStore();
    useWishlistStore();
    ref(cartStore.notification);
    const open = ref(false);
    const eventDateRef = ref(/* @__PURE__ */ new Date());
    const timerRef = ref(0);
    function oneWeekAway() {
      const now = /* @__PURE__ */ new Date();
      const inOneWeek = now.setDate(now.getDate() + 7);
      return new Date(inOneWeek);
    }
    function handleClick() {
      open.value = false;
      window.clearTimeout(timerRef.value);
      timerRef.value = window.setTimeout(() => {
        eventDateRef.value = oneWeekAway();
        open.value = true;
      }, 2);
    }
    watchEffect(() => {
      if (cartStore.notification) {
        handleClick();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ToastProvider), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ToastRoot), {
              duration: 2e3,
              open: open.value,
              "onUpdate:open": ($event) => open.value = $event,
              class: ["rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut", !__props.success ? "bg-yellow-400" : "bg-green-700"]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ToastDescription), {
                    "as-child": "",
                    class: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center space-x-2"${_scopeId3}>`);
                        if (__props.success) {
                          _push4(`<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"${_scopeId3}><path fill="white" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8z"${_scopeId3}></path></svg>`);
                        } else {
                          _push4(`<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="-2 -2 24 24"${_scopeId3}><path fill="white" d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1m0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2"${_scopeId3}></path></svg>`);
                        }
                        _push4(`<p class="text-white font-medium text-lg"${_scopeId3}>${ssrInterpolate(__props.message)}</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            __props.success ? (openBlock(), createBlock("svg", {
                              key: 0,
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "2em",
                              height: "2em",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                fill: "white",
                                d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8z"
                              })
                            ])) : (openBlock(), createBlock("svg", {
                              key: 1,
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "2em",
                              height: "2em",
                              viewBox: "-2 -2 24 24"
                            }, [
                              createVNode("path", {
                                fill: "white",
                                d: "M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1m0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                              })
                            ])),
                            createVNode("p", { class: "text-white font-medium text-lg" }, toDisplayString(__props.message), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ToastDescription), {
                      "as-child": "",
                      class: ""
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center space-x-2" }, [
                          __props.success ? (openBlock(), createBlock("svg", {
                            key: 0,
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "2em",
                            height: "2em",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              fill: "white",
                              d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8z"
                            })
                          ])) : (openBlock(), createBlock("svg", {
                            key: 1,
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "2em",
                            height: "2em",
                            viewBox: "-2 -2 24 24"
                          }, [
                            createVNode("path", {
                              fill: "white",
                              d: "M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1m0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                            })
                          ])),
                          createVNode("p", { class: "text-white font-medium text-lg" }, toDisplayString(__props.message), 1)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ToastViewport), { class: "[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ToastRoot), {
                duration: 2e3,
                open: open.value,
                "onUpdate:open": ($event) => open.value = $event,
                class: ["rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut", !__props.success ? "bg-yellow-400" : "bg-green-700"]
              }, {
                default: withCtx(() => [
                  createVNode(unref(ToastDescription), {
                    "as-child": "",
                    class: ""
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        __props.success ? (openBlock(), createBlock("svg", {
                          key: 0,
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "2em",
                          height: "2em",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            fill: "white",
                            d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8z"
                          })
                        ])) : (openBlock(), createBlock("svg", {
                          key: 1,
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "2em",
                          height: "2em",
                          viewBox: "-2 -2 24 24"
                        }, [
                          createVNode("path", {
                            fill: "white",
                            d: "M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1m0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                          })
                        ])),
                        createVNode("p", { class: "text-white font-medium text-lg" }, toDisplayString(__props.message), 1)
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open", "class"]),
              createVNode(unref(ToastViewport), { class: "[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Toaster.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BrandsList_vue_vue_type_style_index_0_scoped_05977d2f_lang = "";
const _sfc_main$2 = {
  __name: "BrandsList",
  __ssrInlineRender: true,
  props: {
    brands: {
      required: true,
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const duplicatedBrands = ref([...props.brands, ...props.brands]);
    onMounted(() => {
      const trackElement = document.querySelector(".carousel-track");
      trackElement.addEventListener("scroll", () => {
        const { scrollLeft, scrollWidth, clientWidth } = trackElement;
        if (scrollLeft + clientWidth >= scrollWidth) {
          duplicatedBrands.value = [...duplicatedBrands.value, ...props.brands];
        }
      });
    });
    onMounted(() => {
      setInterval(() => {
        x.value += 1;
      }, 30);
    });
    const el = ref(null);
    const { x, y } = useScroll(el);
    ref(false);
    ref(0);
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "el",
        ref: el,
        class: "carousel-track gap-3 pt-3 w-full hide-scrollbar"
      }, _attrs))} data-v-05977d2f><!--[-->`);
      ssrRenderList(duplicatedBrands.value, (brand, index) => {
        _push(`<img${ssrRenderAttr("src", brand.image)}${ssrRenderAttr("alt", brand.name)} class="bg-3 p-3 object-contain flex-none border rounded-xl w-24 h-16 md:w-32 md:h-24 pointer-events-none" data-v-05977d2f>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BrandsList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BrandsList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-05977d2f"]]);
const _sfc_main$1 = {
  __name: "AcceptCookie",
  __ssrInlineRender: true,
  setup(__props) {
    const showCookie = ref(false);
    function checkCookie() {
      axios.get(route$1("api.getCookies")).then((response) => {
        showCookie.value = !response.data;
      }).catch((error) => {
        console.log(error);
      });
    }
    onMounted(() => checkCookie());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: showCookie.value ? null : { display: "none" },
        class: "fixed z-10 inset-x-0 bottom-0 p-4"
      }, _attrs))}><div class="relative flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg"><div class="flex flex-col sm:flex-row items-center space-x-2"><p class="text-md font-medium text-center">${ssrInterpolate(_ctx.__("use_cookies"))}</p>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route$1)("privacy_page"),
        class: "inline-block underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__("privacy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__("privacy")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button aria-label="accept" class="shrink-0 rounded-lg bg-green-600 py-1 px-4 transition hover:bg-black/20 font-medium font-mulish shadow">${ssrInterpolate(_ctx.__("accept"))}</button></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AcceptCookie.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "FrontLayout",
  __ssrInlineRender: true,
  props: {
    currentRoute: String,
    title: String,
    currentLanguage: String
  },
  setup(__props) {
    useAttrs();
    const app = getCurrentInstance();
    const cartStore = useCartStore();
    useWishlistStore();
    useColorMode();
    const isDark = ref();
    const setDark = useDark({ initialValue: "light" });
    const changeTheme = useDark({
      onChanged(dark) {
        useToggle(setDark);
        isDark.value = dark;
      }
    });
    getCurrentInstance();
    const toggleDark = useToggle(changeTheme);
    const isModalVisible = ref(false);
    const openModal = () => {
      isModalVisible.value = true;
    };
    const closeModal = () => {
      isModalVisible.value = false;
    };
    const isLoading = ref(true);
    onBeforeMount(() => {
      isLoading.value = true;
    });
    onMounted(() => {
      isLoading.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_x_loading = resolveComponent("x-loading");
      if (!isLoading.value) {
        _push(`<body${ssrRenderAttrs(mergeProps({ class: "dark:bg-dark overflow-x-hidden" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Head), { title: __props.title }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<meta charset="UTF-8"${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"${_scopeId}><meta name="csrf-token" content="{{ csrf_token() }}"${_scopeId}><meta name="author" content="Neoman"${_scopeId}><meta name="description" content="Alături la fiecare etapă în viață!"${_scopeId}>`);
            } else {
              return [
                createVNode("meta", { charset: "UTF-8" }),
                createVNode("meta", {
                  name: "viewport",
                  content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                }),
                createVNode("meta", {
                  name: "csrf-token",
                  content: "{{ csrf_token() }}"
                }),
                createVNode("meta", {
                  name: "author",
                  content: "Neoman"
                }),
                createVNode("meta", {
                  name: "description",
                  content: "Alături la fiecare etapă în viață!"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_sfc_main$9, {
          onDarkMode: unref(toggleDark),
          "current-locale": null
        }, null, _parent));
        _push(`<div class="w-full min-h-screen flex flex-col"><div class="">`);
        _push(ssrRenderComponent(_sfc_main$a, { onCall: openModal }, null, _parent));
        _push(`</div><div id="main-content" class="flex-1 justify-between"><main class="">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          title: "Success",
          message: unref(cartStore).message,
          show: true,
          success: unref(cartStore).success
        }, null, _parent));
        _push(`<div class="">`);
        ssrRenderSlot(_ctx.$slots, "carousel", {}, null, _push, _parent);
        _push(`</div>`);
        if (_ctx.$page.props.ziggy.location === unref(route$1)("home")) {
          _push(ssrRenderComponent(BrandsList, {
            brands: unref(app).appContext.config.globalProperties.$page.props.brands
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="dark:bg-dark px-4 sm:px-[80px] md:px-[100px] lg:px-6 xl:px-60">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div><div class="hidden z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"><div class="grid h-full max-w-lg grid-cols-5 mx-auto"><button data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"><svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"></path></svg><span class="sr-only">Home</span></button><div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Home <div class="tooltip-arrow" data-popper-arrow></div></div><button data-tooltip-target="tooltip-wallet" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"><svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"></path><path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z"></path></svg><span class="sr-only">Wallet</span></button><div id="tooltip-wallet" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Wallet <div class="tooltip-arrow" data-popper-arrow></div></div><div class="flex items-center justify-center"><button data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"><svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"></path></svg><span class="sr-only">New item</span></button></div><div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Create new item <div class="tooltip-arrow" data-popper-arrow></div></div><button data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"><svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"></path></svg><span class="sr-only">Settings</span></button><div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Settings <div class="tooltip-arrow" data-popper-arrow></div></div><button data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"><svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path></svg><span class="sr-only">Profile</span></button><div id="tooltip-profile" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Profile <div class="tooltip-arrow" data-popper-arrow></div></div></div></div><div data-dial-init class="hidden md:block fixed end-6 bottom-6 group"><div id="speed-dial-menu-default" class="flex flex-col items-center hidden mb-4 space-y-2"><button type="button" data-tooltip-target="tooltip-share" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"><svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z"></path></svg><span class="sr-only">Share</span></button><div id="tooltip-share" role="tooltip" class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Share <div class="tooltip-arrow" data-popper-arrow></div></div><button type="button" data-tooltip-target="tooltip-print" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"><svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M5 20h10a1 1 0 0 0 1-1v-5H4v5a1 1 0 0 0 1 1Z"></path><path d="M18 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-1-2V2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h14Z"></path></svg><span class="sr-only">Print</span></button><div id="tooltip-print" role="tooltip" class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Print <div class="tooltip-arrow" data-popper-arrow></div></div><button type="button" data-tooltip-target="tooltip-download" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"><svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"></path><path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg><span class="sr-only">Download</span></button><div id="tooltip-download" role="tooltip" class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Download <div class="tooltip-arrow" data-popper-arrow></div></div><button type="button" data-tooltip-target="tooltip-copy" data-tooltip-placement="left" class="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"><svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20"><path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z"></path><path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z"></path></svg><span class="sr-only">Copy</span></button><div id="tooltip-copy" role="tooltip" class="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"> Copy <div class="tooltip-arrow" data-popper-arrow></div></div></div><a href="https://www.facebook.com/neoman.online/" type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 ring-4 ring-blue-300 focus:outline-none dark:focus:ring-blue-800">`);
        _push(ssrRenderComponent(unref(ChatBubbleLeftRightIcon), { class: "w-6 animate-pulse" }, null, _parent));
        _push(`<span class="sr-only">Open actions menu</span></a></div>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          title: _ctx.__("return_with_call"),
          visible: isModalVisible.value,
          onClose: closeModal,
          type: _ctx.call
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
        _push(`</main></div><section>`);
        _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
        _push(`</section></div></body>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity",
          style: { "z-index": "6000" }
        }, _attrs))}><div class="flex-col">`);
        _push(ssrRenderComponent(_component_x_loading, { class: "w-24 h-24" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg viewBox="0 0 860.1 876.5"${_scopeId}><path class="animate-spin from-blue-300" style="${ssrRenderStyle({ "stroke": "black", "stroke-width": "1", "transform-origin": "33.47285199% 32.89218482%", "animation-duration": "3s", "fill": "var(--tw-gradient-from)" })}" d="M 289.209 146.527 C 251.329 146.527 215.76 161.251 189.083 187.986 C 162.406 214.721 147.624 250.232 147.624 288.112 C 147.624 325.99 162.348 361.387 189.083 388.237 C 215.76 414.914 251.445 429.696 289.209 429.696 C 327.088 429.696 362.657 414.972 389.335 388.237 C 416.011 361.503 430.794 325.99 430.794 288.112 C 430.794 250.232 416.069 214.836 389.335 187.986 C 362.657 161.308 327.088 146.527 289.209 146.527 Z M 289.209 406.022 C 223.902 406.022 171.241 353.129 171.241 288.053 C 171.241 222.977 223.902 170.085 289.209 170.085 C 354.516 170.085 407.177 223.036 407.177 288.053 C 407.177 353.072 354.516 406.022 289.209 406.022 Z M 536.462 229.099 L 514.058 229.099 C 495.753 229.099 480.452 213.739 480.452 194.915 C 480.452 185.503 484.437 177.073 491.538 170.72 L 505.974 156.574 C 520.294 142.427 520.294 119.446 505.974 105.125 L 473.119 72.559 C 466.651 66.091 457.066 62.222 447.308 62.222 C 437.549 62.222 428.137 66.034 421.497 72.559 L 407.639 86.416 C 400.998 93.808 391.874 97.792 382.29 97.792 C 363.408 97.792 347.356 82.432 347.356 64.301 L 347.356 42.013 C 347.356 22.091 331.88 5 311.959 5 L 267.093 5 C 246.768 5 230.542 21.975 230.542 42.013 L 230.542 64.417 C 230.542 82.548 214.894 97.907 196.07 97.907 C 186.658 97.907 178.054 93.923 171.587 86.994 L 157.267 72.847 C 150.799 66.206 141.215 62.511 131.455 62.511 C 121.697 62.511 112.285 66.322 105.645 72.847 L 72.789 105.298 C 58.642 119.446 58.642 142.6 72.789 156.632 L 86.647 170.49 C 94.038 177.13 98.139 185.503 98.139 195.088 C 98.139 213.97 82.779 229.271 64.532 229.271 L 42.128 229.271 C 21.918 229.099 5 245.613 5 265.707 L 5 288.112 L 5 310.516 C 5 330.437 21.976 347.067 42.128 347.067 L 64.532 347.067 C 82.836 347.067 98.139 362.426 98.139 381.25 C 98.139 390.663 94.038 399.381 86.647 406.022 L 72.789 419.591 C 58.642 433.739 58.642 456.72 72.789 470.925 L 105.645 503.664 C 112.112 510.305 121.697 514.001 131.455 514.001 C 141.215 514.001 150.627 510.189 157.267 503.664 L 171.587 489.518 C 177.766 482.589 186.484 478.604 195.896 478.604 C 214.778 478.604 230.369 493.964 230.369 512.095 L 230.369 534.499 C 230.369 554.42 246.595 571.512 266.804 571.512 L 311.612 571.512 C 331.65 571.512 348.337 554.536 348.337 534.499 L 348.337 512.095 C 348.337 493.964 363.812 478.604 382.693 478.604 C 392.106 478.604 400.825 482.704 407.639 489.98 L 421.497 503.838 C 428.137 510.305 437.549 514.173 447.308 514.173 C 457.066 514.173 466.478 510.363 473.119 503.838 L 505.974 471.097 C 520.121 456.951 520.121 433.796 505.974 419.649 L 491.538 405.502 C 484.437 399.15 480.452 390.143 480.452 380.904 C 480.452 362.022 495.811 346.085 514.058 346.085 L 536.462 346.085 C 556.499 346.085 570.819 330.898 570.819 310.862 L 570.819 288.169 L 570.819 265.765 C 570.819 245.613 556.499 229.099 536.462 229.099 Z M 547.549 288.053 L 547.549 310.342 C 547.549 316.521 544.142 322.006 536.809 322.006 L 514.405 322.006 C 499.218 322.006 484.783 328.474 473.87 339.675 C 463.129 350.762 457.182 365.313 457.182 380.673 C 457.182 396.61 463.649 411.334 475.602 422.247 L 489.633 436.106 C 494.484 441.129 494.484 449.386 489.633 454.237 L 456.778 486.977 C 454.41 489.171 451.004 490.499 447.481 490.499 C 443.959 490.499 440.378 489.171 438.185 486.977 L 424.731 473.581 C 413.355 461.628 398.457 454.988 382.693 454.988 C 367.334 454.988 353.187 460.878 342.158 471.502 C 330.956 482.415 325.066 496.735 325.066 512.037 L 325.066 534.441 C 325.066 541.66 318.715 547.837 311.959 547.837 L 267.093 547.837 C 260.337 547.837 254.275 541.66 254.275 534.441 L 254.275 512.037 C 254.275 496.851 248.211 482.415 237.009 471.502 C 225.922 460.878 211.487 454.988 196.3 454.988 C 180.653 454.988 165.639 461.628 154.841 473.292 L 141.156 486.977 C 138.789 489.171 135.382 490.499 131.86 490.499 C 128.337 490.499 124.758 489.344 122.852 487.266 L 122.679 487.092 L 122.506 486.919 L 89.65 454.179 C 84.8 449.329 84.8 441.187 89.65 436.163 L 103.047 422.883 C 115.114 411.68 121.755 396.783 121.755 380.846 C 121.755 365.487 115.865 351.513 105.067 340.426 C 94.154 329.225 79.718 323.45 64.532 323.45 L 41.955 323.45 C 34.564 323.45 28.385 317.098 28.385 310.458 L 28.385 287.881 L 28.385 265.476 C 28.385 258.836 34.564 252.484 41.955 252.484 L 64.359 252.484 C 79.546 252.484 93.981 246.71 104.894 235.508 C 115.634 224.422 121.582 210.159 121.582 194.972 C 121.582 179.036 114.942 164.138 102.873 153.11 L 89.304 139.713 C 86.07 136.48 85.608 132.784 85.608 130.705 C 85.608 128.8 86.07 124.931 89.304 121.698 L 122.043 89.131 C 124.411 86.936 127.818 85.608 131.34 85.608 C 134.862 85.608 138.443 86.763 140.349 88.842 L 140.521 89.015 L 140.695 89.188 L 154.553 103.046 C 165.467 114.826 180.19 121.351 196.012 121.351 C 211.371 121.351 225.634 115.461 236.72 104.837 C 247.922 93.923 254.101 79.603 254.101 64.301 L 254.101 41.897 C 254.101 34.679 259.991 28.501 266.631 28.501 L 311.612 28.501 C 318.253 28.501 323.392 34.679 323.392 41.897 L 323.392 64.301 C 323.392 79.488 329.859 93.923 341.061 104.837 C 352.148 115.461 366.699 121.351 382.059 121.351 C 397.996 121.351 413.008 114.71 424.211 102.757 L 437.607 89.361 C 439.974 87.167 443.381 85.839 446.903 85.839 C 450.426 85.839 454.006 87.167 456.2 89.246 L 489.056 121.813 C 491.423 124.18 492.866 127.414 492.866 130.821 C 492.866 134.228 491.538 137.461 489.171 139.828 L 475.14 153.687 C 463.36 164.6 456.72 179.325 456.72 195.261 C 456.72 210.621 462.609 224.595 473.407 235.681 C 484.321 246.883 498.757 252.657 513.943 252.657 L 536.346 252.657 C 544.315 252.657 547.26 260.048 547.433 265.938 L 547.549 288.053 Z"${_scopeId}></path><path class="animate-spin from-pink-300" style="${ssrRenderStyle({ "stroke": "black", "stroke-width": "1", "transform-origin": "74.01464945% 74.46662863%", "animation-duration": "4s", "animation-direction": "reverse", "fill": "var(--tw-gradient-from)" })}" d="M 637.588 543.225 C 608.329 543.225 580.855 554.599 560.249 575.25 C 539.643 595.9 528.225 623.33 528.225 652.589 C 528.225 681.846 539.599 709.188 560.249 729.927 C 580.855 750.533 608.419 761.95 637.588 761.95 C 666.847 761.95 694.321 750.578 714.928 729.927 C 735.533 709.277 746.951 681.846 746.951 652.589 C 746.951 623.33 735.578 595.989 714.928 575.25 C 694.321 554.643 666.847 543.225 637.588 543.225 Z M 637.588 743.665 C 587.144 743.665 546.468 702.809 546.468 652.543 C 546.468 602.277 587.144 561.423 637.588 561.423 C 688.032 561.423 728.71 602.323 728.71 652.543 C 728.71 702.765 688.032 743.665 637.588 743.665 Z M 828.571 607.006 L 811.265 607.006 C 797.126 607.006 785.308 595.142 785.308 580.602 C 785.308 573.332 788.386 566.82 793.871 561.913 L 805.021 550.987 C 816.082 540.058 816.082 522.307 805.021 511.245 L 779.643 486.091 C 774.647 481.095 767.244 478.106 759.707 478.106 C 752.169 478.106 744.899 481.051 739.771 486.091 L 729.067 496.794 C 723.937 502.504 716.889 505.581 709.487 505.581 C 694.901 505.581 682.502 493.717 682.502 479.712 L 682.502 462.497 C 682.502 447.109 670.548 433.907 655.161 433.907 L 620.505 433.907 C 604.806 433.907 592.273 447.019 592.273 462.497 L 592.273 479.802 C 592.273 493.807 580.186 505.67 565.646 505.67 C 558.376 505.67 551.73 502.593 546.735 497.241 L 535.674 486.313 C 530.678 481.184 523.275 478.33 515.736 478.33 C 508.199 478.33 500.929 481.273 495.8 486.313 L 470.422 511.379 C 459.494 522.307 459.494 540.192 470.422 551.031 L 481.126 561.736 C 486.835 566.864 490.002 573.332 490.002 580.735 C 490.002 595.32 478.138 607.139 464.044 607.139 L 446.739 607.139 C 431.128 607.006 418.06 619.762 418.06 635.283 L 418.06 652.589 L 418.06 669.894 C 418.06 685.281 431.173 698.127 446.739 698.127 L 464.044 698.127 C 478.182 698.127 490.002 709.99 490.002 724.53 C 490.002 731.801 486.835 738.535 481.126 743.665 L 470.422 754.145 C 459.494 765.073 459.494 782.824 470.422 793.796 L 495.8 819.084 C 500.795 824.214 508.199 827.068 515.736 827.068 C 523.275 827.068 530.545 824.124 535.674 819.084 L 546.735 808.157 C 551.508 802.805 558.242 799.727 565.512 799.727 C 580.096 799.727 592.139 811.591 592.139 825.596 L 592.139 842.902 C 592.139 858.29 604.672 871.492 620.282 871.492 L 654.893 871.492 C 670.37 871.492 683.26 858.379 683.26 842.902 L 683.26 825.596 C 683.26 811.591 695.213 799.727 709.798 799.727 C 717.069 799.727 723.803 802.894 729.067 808.514 L 739.771 819.218 C 744.899 824.214 752.169 827.201 759.707 827.201 C 767.244 827.201 774.514 824.258 779.643 819.218 L 805.021 793.929 C 815.949 783.002 815.949 765.117 805.021 754.19 L 793.871 743.263 C 788.386 738.356 785.308 731.399 785.308 724.263 C 785.308 709.678 797.171 697.368 811.265 697.368 L 828.571 697.368 C 844.048 697.368 855.109 685.637 855.109 670.161 L 855.109 652.633 L 855.109 635.328 C 855.109 619.762 844.048 607.006 828.571 607.006 Z M 837.134 652.543 L 837.134 669.76 C 837.134 674.532 834.503 678.769 828.839 678.769 L 811.533 678.769 C 799.803 678.769 788.653 683.765 780.224 692.417 C 771.927 700.981 767.333 712.22 767.333 724.085 C 767.333 736.395 772.329 747.768 781.561 756.197 L 792.399 766.901 C 796.146 770.781 796.146 777.159 792.399 780.906 L 767.021 806.195 C 765.192 807.889 762.561 808.915 759.84 808.915 C 757.12 808.915 754.354 807.889 752.66 806.195 L 742.268 795.847 C 733.482 786.615 721.974 781.486 709.798 781.486 C 697.933 781.486 687.006 786.035 678.487 794.241 C 669.834 802.671 665.285 813.732 665.285 825.551 L 665.285 842.858 C 665.285 848.434 660.379 853.205 655.161 853.205 L 620.505 853.205 C 615.287 853.205 610.605 848.434 610.605 842.858 L 610.605 825.551 C 610.605 813.821 605.921 802.671 597.268 794.241 C 588.704 786.035 577.554 781.486 565.824 781.486 C 553.738 781.486 542.141 786.615 533.8 795.624 L 523.229 806.195 C 521.401 807.889 518.77 808.915 516.049 808.915 C 513.328 808.915 510.563 808.023 509.091 806.418 L 508.958 806.283 L 508.824 806.15 L 483.445 780.861 C 479.699 777.115 479.699 770.826 483.445 766.945 L 493.793 756.688 C 503.114 748.035 508.244 736.528 508.244 724.218 C 508.244 712.355 503.694 701.561 495.354 692.997 C 486.924 684.345 475.774 679.884 464.044 679.884 L 446.605 679.884 C 440.896 679.884 436.123 674.978 436.123 669.849 L 436.123 652.41 L 436.123 635.104 C 436.123 629.976 440.896 625.069 446.605 625.069 L 463.91 625.069 C 475.641 625.069 486.791 620.609 495.22 611.957 C 503.516 603.394 508.11 592.377 508.11 580.646 C 508.11 568.337 502.981 556.829 493.659 548.31 L 483.178 537.962 C 480.68 535.465 480.323 532.61 480.323 531.004 C 480.323 529.532 480.68 526.544 483.178 524.047 L 508.466 498.891 C 510.295 497.196 512.927 496.17 515.647 496.17 C 518.368 496.17 521.134 497.062 522.606 498.668 L 522.739 498.802 L 522.873 498.935 L 533.578 509.64 C 542.008 518.739 553.38 523.779 565.601 523.779 C 577.465 523.779 588.482 519.229 597.045 511.023 C 605.697 502.593 610.47 491.532 610.47 479.712 L 610.47 462.407 C 610.47 456.832 615.02 452.06 620.149 452.06 L 654.893 452.06 C 660.022 452.06 663.992 456.832 663.992 462.407 L 663.992 479.712 C 663.992 491.443 668.987 502.593 677.64 511.023 C 686.203 519.229 697.443 523.779 709.308 523.779 C 721.618 523.779 733.214 518.649 741.866 509.416 L 752.213 499.069 C 754.042 497.374 756.673 496.349 759.394 496.349 C 762.115 496.349 764.88 497.374 766.575 498.98 L 791.953 524.136 C 793.782 525.964 794.896 528.462 794.896 531.094 C 794.896 533.725 793.871 536.222 792.042 538.051 L 781.204 548.756 C 772.105 557.186 766.977 568.56 766.977 580.869 C 766.977 592.733 771.525 603.527 779.866 612.09 C 788.296 620.743 799.447 625.203 811.177 625.203 L 828.481 625.203 C 834.636 625.203 836.911 630.912 837.045 635.461 L 837.134 652.543 Z"${_scopeId}></path><path class="animate-spin from-yellow-300" style="${ssrRenderStyle({ "stroke": "black", "stroke-width": "1", "transform-origin": "78.02581095% 16.12093553%", "animation-duration": "3.5s", "animation-direction": "reverse", "fill": "var(--tw-gradient-from)" })}" d="M 671.717 76.053 C 654.289 76.053 637.926 82.828 625.652 95.128 C 613.378 107.428 606.577 123.766 606.577 141.194 C 606.577 158.62 613.352 174.906 625.652 187.258 C 637.926 199.532 654.343 206.333 671.717 206.333 C 689.145 206.333 705.51 199.559 717.783 187.258 C 730.056 174.959 736.857 158.62 736.857 141.194 C 736.857 123.766 730.083 107.481 717.783 95.128 C 705.51 82.854 689.145 76.053 671.717 76.053 Z M 671.717 195.441 C 641.671 195.441 617.444 171.106 617.444 141.166 C 617.444 111.226 641.671 86.892 671.717 86.892 C 701.763 86.892 725.992 111.253 725.992 141.166 C 725.992 171.08 701.763 195.441 671.717 195.441 Z M 785.473 114.043 L 775.164 114.043 C 766.743 114.043 759.704 106.976 759.704 98.316 C 759.704 93.986 761.537 90.107 764.804 87.184 L 771.446 80.676 C 778.034 74.167 778.034 63.594 771.446 57.005 L 756.33 42.022 C 753.354 39.047 748.945 37.267 744.455 37.267 C 739.965 37.267 735.635 39.021 732.581 42.022 L 726.205 48.397 C 723.15 51.798 718.952 53.631 714.542 53.631 C 705.855 53.631 698.469 46.565 698.469 38.223 L 698.469 27.969 C 698.469 18.803 691.35 10.94 682.185 10.94 L 661.542 10.94 C 652.192 10.94 644.727 18.749 644.727 27.969 L 644.727 38.277 C 644.727 46.618 637.527 53.684 628.867 53.684 C 624.536 53.684 620.578 51.851 617.602 48.663 L 611.014 42.154 C 608.039 39.1 603.629 37.4 599.138 37.4 C 594.65 37.4 590.319 39.153 587.264 42.154 L 572.149 57.084 C 565.639 63.594 565.639 74.247 572.149 80.703 L 578.523 87.079 C 581.924 90.133 583.811 93.986 583.811 98.395 C 583.811 107.082 576.744 114.122 568.349 114.122 L 558.042 114.122 C 548.744 114.043 540.96 121.641 540.96 130.886 L 540.96 141.194 L 540.96 151.501 C 540.96 160.666 548.771 168.318 558.042 168.318 L 568.349 168.318 C 576.77 168.318 583.811 175.383 583.811 184.044 C 583.811 188.375 581.924 192.386 578.523 195.441 L 572.149 201.684 C 565.639 208.193 565.639 218.766 572.149 225.301 L 587.264 240.364 C 590.239 243.419 594.65 245.119 599.138 245.119 C 603.629 245.119 607.96 243.365 611.014 240.364 L 617.602 233.855 C 620.446 230.668 624.456 228.834 628.787 228.834 C 637.473 228.834 644.647 235.901 644.647 244.242 L 644.647 254.55 C 644.647 263.715 652.112 271.579 661.41 271.579 L 682.025 271.579 C 691.244 271.579 698.921 263.768 698.921 254.55 L 698.921 244.242 C 698.921 235.901 706.04 228.834 714.728 228.834 C 719.059 228.834 723.07 230.721 726.205 234.068 L 732.581 240.443 C 735.635 243.419 739.965 245.198 744.455 245.198 C 748.945 245.198 753.275 243.445 756.33 240.443 L 771.446 225.38 C 777.955 218.872 777.955 208.22 771.446 201.71 L 764.804 195.202 C 761.537 192.279 759.704 188.135 759.704 183.884 C 759.704 175.198 766.77 167.865 775.164 167.865 L 785.473 167.865 C 794.692 167.865 801.28 160.878 801.28 151.66 L 801.28 141.22 L 801.28 130.913 C 801.28 121.641 794.692 114.043 785.473 114.043 Z M 790.573 141.166 L 790.573 151.421 C 790.573 154.264 789.006 156.787 785.632 156.787 L 775.324 156.787 C 768.337 156.787 761.696 159.763 756.676 164.917 C 751.734 170.018 748.997 176.712 748.997 183.779 C 748.997 191.111 751.973 197.885 757.472 202.905 L 763.928 209.282 C 766.159 211.593 766.159 215.392 763.928 217.624 L 748.812 232.687 C 747.722 233.695 746.155 234.307 744.535 234.307 C 742.914 234.307 741.267 233.695 740.257 232.687 L 734.068 226.523 C 728.835 221.024 721.98 217.969 714.728 217.969 C 707.66 217.969 701.152 220.679 696.078 225.566 C 690.924 230.587 688.215 237.176 688.215 244.215 L 688.215 254.523 C 688.215 257.845 685.292 260.687 682.185 260.687 L 661.542 260.687 C 658.434 260.687 655.646 257.845 655.646 254.523 L 655.646 244.215 C 655.646 237.229 652.855 230.587 647.701 225.566 C 642.6 220.679 635.959 217.969 628.973 217.969 C 621.774 217.969 614.866 221.024 609.898 226.39 L 603.602 232.687 C 602.513 233.695 600.946 234.307 599.325 234.307 C 597.704 234.307 596.057 233.775 595.18 232.819 L 595.101 232.739 L 595.021 232.66 L 579.905 217.597 C 577.674 215.366 577.674 211.62 579.905 209.308 L 586.068 203.199 C 591.62 198.044 594.676 191.19 594.676 183.858 C 594.676 176.792 591.966 170.363 586.998 165.262 C 581.977 160.109 575.336 157.452 568.349 157.452 L 557.962 157.452 C 554.562 157.452 551.718 154.529 551.718 151.474 L 551.718 141.087 L 551.718 130.779 C 551.718 127.725 554.562 124.802 557.962 124.802 L 568.269 124.802 C 575.256 124.802 581.898 122.145 586.918 116.992 C 591.86 111.892 594.597 105.329 594.597 98.342 C 594.597 91.011 591.541 84.156 585.989 79.082 L 579.746 72.918 C 578.258 71.431 578.046 69.73 578.046 68.774 C 578.046 67.897 578.258 66.117 579.746 64.63 L 594.808 49.646 C 595.898 48.637 597.465 48.026 599.085 48.026 C 600.706 48.026 602.354 48.557 603.231 49.513 L 603.31 49.593 L 603.389 49.673 L 609.766 56.049 C 614.787 61.469 621.56 64.47 628.84 64.47 C 635.906 64.47 642.468 61.76 647.568 56.873 C 652.722 51.851 655.565 45.263 655.565 38.223 L 655.565 27.915 C 655.565 24.594 658.275 21.753 661.33 21.753 L 682.025 21.753 C 685.079 21.753 687.444 24.594 687.444 27.915 L 687.444 38.223 C 687.444 45.21 690.42 51.851 695.574 56.873 C 700.674 61.76 707.369 64.47 714.436 64.47 C 721.768 64.47 728.675 61.415 733.829 55.915 L 739.991 49.753 C 741.08 48.742 742.648 48.133 744.268 48.133 C 745.889 48.133 747.536 48.742 748.546 49.699 L 763.662 64.683 C 764.751 65.772 765.415 67.26 765.415 68.827 C 765.415 70.394 764.804 71.882 763.715 72.971 L 757.26 79.348 C 751.839 84.369 748.786 91.143 748.786 98.475 C 748.786 105.541 751.494 111.971 756.463 117.071 C 761.484 122.225 768.126 124.882 775.112 124.882 L 785.419 124.882 C 789.085 124.882 790.441 128.282 790.52 130.992 L 790.573 141.166 Z"${_scopeId}></path></svg>`);
            } else {
              return [
                (openBlock(), createBlock("svg", { viewBox: "0 0 860.1 876.5" }, [
                  createVNode("path", {
                    class: "animate-spin from-blue-300",
                    style: { "stroke": "black", "stroke-width": "1", "transform-origin": "33.47285199% 32.89218482%", "animation-duration": "3s", "fill": "var(--tw-gradient-from)" },
                    d: "M 289.209 146.527 C 251.329 146.527 215.76 161.251 189.083 187.986 C 162.406 214.721 147.624 250.232 147.624 288.112 C 147.624 325.99 162.348 361.387 189.083 388.237 C 215.76 414.914 251.445 429.696 289.209 429.696 C 327.088 429.696 362.657 414.972 389.335 388.237 C 416.011 361.503 430.794 325.99 430.794 288.112 C 430.794 250.232 416.069 214.836 389.335 187.986 C 362.657 161.308 327.088 146.527 289.209 146.527 Z M 289.209 406.022 C 223.902 406.022 171.241 353.129 171.241 288.053 C 171.241 222.977 223.902 170.085 289.209 170.085 C 354.516 170.085 407.177 223.036 407.177 288.053 C 407.177 353.072 354.516 406.022 289.209 406.022 Z M 536.462 229.099 L 514.058 229.099 C 495.753 229.099 480.452 213.739 480.452 194.915 C 480.452 185.503 484.437 177.073 491.538 170.72 L 505.974 156.574 C 520.294 142.427 520.294 119.446 505.974 105.125 L 473.119 72.559 C 466.651 66.091 457.066 62.222 447.308 62.222 C 437.549 62.222 428.137 66.034 421.497 72.559 L 407.639 86.416 C 400.998 93.808 391.874 97.792 382.29 97.792 C 363.408 97.792 347.356 82.432 347.356 64.301 L 347.356 42.013 C 347.356 22.091 331.88 5 311.959 5 L 267.093 5 C 246.768 5 230.542 21.975 230.542 42.013 L 230.542 64.417 C 230.542 82.548 214.894 97.907 196.07 97.907 C 186.658 97.907 178.054 93.923 171.587 86.994 L 157.267 72.847 C 150.799 66.206 141.215 62.511 131.455 62.511 C 121.697 62.511 112.285 66.322 105.645 72.847 L 72.789 105.298 C 58.642 119.446 58.642 142.6 72.789 156.632 L 86.647 170.49 C 94.038 177.13 98.139 185.503 98.139 195.088 C 98.139 213.97 82.779 229.271 64.532 229.271 L 42.128 229.271 C 21.918 229.099 5 245.613 5 265.707 L 5 288.112 L 5 310.516 C 5 330.437 21.976 347.067 42.128 347.067 L 64.532 347.067 C 82.836 347.067 98.139 362.426 98.139 381.25 C 98.139 390.663 94.038 399.381 86.647 406.022 L 72.789 419.591 C 58.642 433.739 58.642 456.72 72.789 470.925 L 105.645 503.664 C 112.112 510.305 121.697 514.001 131.455 514.001 C 141.215 514.001 150.627 510.189 157.267 503.664 L 171.587 489.518 C 177.766 482.589 186.484 478.604 195.896 478.604 C 214.778 478.604 230.369 493.964 230.369 512.095 L 230.369 534.499 C 230.369 554.42 246.595 571.512 266.804 571.512 L 311.612 571.512 C 331.65 571.512 348.337 554.536 348.337 534.499 L 348.337 512.095 C 348.337 493.964 363.812 478.604 382.693 478.604 C 392.106 478.604 400.825 482.704 407.639 489.98 L 421.497 503.838 C 428.137 510.305 437.549 514.173 447.308 514.173 C 457.066 514.173 466.478 510.363 473.119 503.838 L 505.974 471.097 C 520.121 456.951 520.121 433.796 505.974 419.649 L 491.538 405.502 C 484.437 399.15 480.452 390.143 480.452 380.904 C 480.452 362.022 495.811 346.085 514.058 346.085 L 536.462 346.085 C 556.499 346.085 570.819 330.898 570.819 310.862 L 570.819 288.169 L 570.819 265.765 C 570.819 245.613 556.499 229.099 536.462 229.099 Z M 547.549 288.053 L 547.549 310.342 C 547.549 316.521 544.142 322.006 536.809 322.006 L 514.405 322.006 C 499.218 322.006 484.783 328.474 473.87 339.675 C 463.129 350.762 457.182 365.313 457.182 380.673 C 457.182 396.61 463.649 411.334 475.602 422.247 L 489.633 436.106 C 494.484 441.129 494.484 449.386 489.633 454.237 L 456.778 486.977 C 454.41 489.171 451.004 490.499 447.481 490.499 C 443.959 490.499 440.378 489.171 438.185 486.977 L 424.731 473.581 C 413.355 461.628 398.457 454.988 382.693 454.988 C 367.334 454.988 353.187 460.878 342.158 471.502 C 330.956 482.415 325.066 496.735 325.066 512.037 L 325.066 534.441 C 325.066 541.66 318.715 547.837 311.959 547.837 L 267.093 547.837 C 260.337 547.837 254.275 541.66 254.275 534.441 L 254.275 512.037 C 254.275 496.851 248.211 482.415 237.009 471.502 C 225.922 460.878 211.487 454.988 196.3 454.988 C 180.653 454.988 165.639 461.628 154.841 473.292 L 141.156 486.977 C 138.789 489.171 135.382 490.499 131.86 490.499 C 128.337 490.499 124.758 489.344 122.852 487.266 L 122.679 487.092 L 122.506 486.919 L 89.65 454.179 C 84.8 449.329 84.8 441.187 89.65 436.163 L 103.047 422.883 C 115.114 411.68 121.755 396.783 121.755 380.846 C 121.755 365.487 115.865 351.513 105.067 340.426 C 94.154 329.225 79.718 323.45 64.532 323.45 L 41.955 323.45 C 34.564 323.45 28.385 317.098 28.385 310.458 L 28.385 287.881 L 28.385 265.476 C 28.385 258.836 34.564 252.484 41.955 252.484 L 64.359 252.484 C 79.546 252.484 93.981 246.71 104.894 235.508 C 115.634 224.422 121.582 210.159 121.582 194.972 C 121.582 179.036 114.942 164.138 102.873 153.11 L 89.304 139.713 C 86.07 136.48 85.608 132.784 85.608 130.705 C 85.608 128.8 86.07 124.931 89.304 121.698 L 122.043 89.131 C 124.411 86.936 127.818 85.608 131.34 85.608 C 134.862 85.608 138.443 86.763 140.349 88.842 L 140.521 89.015 L 140.695 89.188 L 154.553 103.046 C 165.467 114.826 180.19 121.351 196.012 121.351 C 211.371 121.351 225.634 115.461 236.72 104.837 C 247.922 93.923 254.101 79.603 254.101 64.301 L 254.101 41.897 C 254.101 34.679 259.991 28.501 266.631 28.501 L 311.612 28.501 C 318.253 28.501 323.392 34.679 323.392 41.897 L 323.392 64.301 C 323.392 79.488 329.859 93.923 341.061 104.837 C 352.148 115.461 366.699 121.351 382.059 121.351 C 397.996 121.351 413.008 114.71 424.211 102.757 L 437.607 89.361 C 439.974 87.167 443.381 85.839 446.903 85.839 C 450.426 85.839 454.006 87.167 456.2 89.246 L 489.056 121.813 C 491.423 124.18 492.866 127.414 492.866 130.821 C 492.866 134.228 491.538 137.461 489.171 139.828 L 475.14 153.687 C 463.36 164.6 456.72 179.325 456.72 195.261 C 456.72 210.621 462.609 224.595 473.407 235.681 C 484.321 246.883 498.757 252.657 513.943 252.657 L 536.346 252.657 C 544.315 252.657 547.26 260.048 547.433 265.938 L 547.549 288.053 Z"
                  }),
                  createVNode("path", {
                    class: "animate-spin from-pink-300",
                    style: { "stroke": "black", "stroke-width": "1", "transform-origin": "74.01464945% 74.46662863%", "animation-duration": "4s", "animation-direction": "reverse", "fill": "var(--tw-gradient-from)" },
                    d: "M 637.588 543.225 C 608.329 543.225 580.855 554.599 560.249 575.25 C 539.643 595.9 528.225 623.33 528.225 652.589 C 528.225 681.846 539.599 709.188 560.249 729.927 C 580.855 750.533 608.419 761.95 637.588 761.95 C 666.847 761.95 694.321 750.578 714.928 729.927 C 735.533 709.277 746.951 681.846 746.951 652.589 C 746.951 623.33 735.578 595.989 714.928 575.25 C 694.321 554.643 666.847 543.225 637.588 543.225 Z M 637.588 743.665 C 587.144 743.665 546.468 702.809 546.468 652.543 C 546.468 602.277 587.144 561.423 637.588 561.423 C 688.032 561.423 728.71 602.323 728.71 652.543 C 728.71 702.765 688.032 743.665 637.588 743.665 Z M 828.571 607.006 L 811.265 607.006 C 797.126 607.006 785.308 595.142 785.308 580.602 C 785.308 573.332 788.386 566.82 793.871 561.913 L 805.021 550.987 C 816.082 540.058 816.082 522.307 805.021 511.245 L 779.643 486.091 C 774.647 481.095 767.244 478.106 759.707 478.106 C 752.169 478.106 744.899 481.051 739.771 486.091 L 729.067 496.794 C 723.937 502.504 716.889 505.581 709.487 505.581 C 694.901 505.581 682.502 493.717 682.502 479.712 L 682.502 462.497 C 682.502 447.109 670.548 433.907 655.161 433.907 L 620.505 433.907 C 604.806 433.907 592.273 447.019 592.273 462.497 L 592.273 479.802 C 592.273 493.807 580.186 505.67 565.646 505.67 C 558.376 505.67 551.73 502.593 546.735 497.241 L 535.674 486.313 C 530.678 481.184 523.275 478.33 515.736 478.33 C 508.199 478.33 500.929 481.273 495.8 486.313 L 470.422 511.379 C 459.494 522.307 459.494 540.192 470.422 551.031 L 481.126 561.736 C 486.835 566.864 490.002 573.332 490.002 580.735 C 490.002 595.32 478.138 607.139 464.044 607.139 L 446.739 607.139 C 431.128 607.006 418.06 619.762 418.06 635.283 L 418.06 652.589 L 418.06 669.894 C 418.06 685.281 431.173 698.127 446.739 698.127 L 464.044 698.127 C 478.182 698.127 490.002 709.99 490.002 724.53 C 490.002 731.801 486.835 738.535 481.126 743.665 L 470.422 754.145 C 459.494 765.073 459.494 782.824 470.422 793.796 L 495.8 819.084 C 500.795 824.214 508.199 827.068 515.736 827.068 C 523.275 827.068 530.545 824.124 535.674 819.084 L 546.735 808.157 C 551.508 802.805 558.242 799.727 565.512 799.727 C 580.096 799.727 592.139 811.591 592.139 825.596 L 592.139 842.902 C 592.139 858.29 604.672 871.492 620.282 871.492 L 654.893 871.492 C 670.37 871.492 683.26 858.379 683.26 842.902 L 683.26 825.596 C 683.26 811.591 695.213 799.727 709.798 799.727 C 717.069 799.727 723.803 802.894 729.067 808.514 L 739.771 819.218 C 744.899 824.214 752.169 827.201 759.707 827.201 C 767.244 827.201 774.514 824.258 779.643 819.218 L 805.021 793.929 C 815.949 783.002 815.949 765.117 805.021 754.19 L 793.871 743.263 C 788.386 738.356 785.308 731.399 785.308 724.263 C 785.308 709.678 797.171 697.368 811.265 697.368 L 828.571 697.368 C 844.048 697.368 855.109 685.637 855.109 670.161 L 855.109 652.633 L 855.109 635.328 C 855.109 619.762 844.048 607.006 828.571 607.006 Z M 837.134 652.543 L 837.134 669.76 C 837.134 674.532 834.503 678.769 828.839 678.769 L 811.533 678.769 C 799.803 678.769 788.653 683.765 780.224 692.417 C 771.927 700.981 767.333 712.22 767.333 724.085 C 767.333 736.395 772.329 747.768 781.561 756.197 L 792.399 766.901 C 796.146 770.781 796.146 777.159 792.399 780.906 L 767.021 806.195 C 765.192 807.889 762.561 808.915 759.84 808.915 C 757.12 808.915 754.354 807.889 752.66 806.195 L 742.268 795.847 C 733.482 786.615 721.974 781.486 709.798 781.486 C 697.933 781.486 687.006 786.035 678.487 794.241 C 669.834 802.671 665.285 813.732 665.285 825.551 L 665.285 842.858 C 665.285 848.434 660.379 853.205 655.161 853.205 L 620.505 853.205 C 615.287 853.205 610.605 848.434 610.605 842.858 L 610.605 825.551 C 610.605 813.821 605.921 802.671 597.268 794.241 C 588.704 786.035 577.554 781.486 565.824 781.486 C 553.738 781.486 542.141 786.615 533.8 795.624 L 523.229 806.195 C 521.401 807.889 518.77 808.915 516.049 808.915 C 513.328 808.915 510.563 808.023 509.091 806.418 L 508.958 806.283 L 508.824 806.15 L 483.445 780.861 C 479.699 777.115 479.699 770.826 483.445 766.945 L 493.793 756.688 C 503.114 748.035 508.244 736.528 508.244 724.218 C 508.244 712.355 503.694 701.561 495.354 692.997 C 486.924 684.345 475.774 679.884 464.044 679.884 L 446.605 679.884 C 440.896 679.884 436.123 674.978 436.123 669.849 L 436.123 652.41 L 436.123 635.104 C 436.123 629.976 440.896 625.069 446.605 625.069 L 463.91 625.069 C 475.641 625.069 486.791 620.609 495.22 611.957 C 503.516 603.394 508.11 592.377 508.11 580.646 C 508.11 568.337 502.981 556.829 493.659 548.31 L 483.178 537.962 C 480.68 535.465 480.323 532.61 480.323 531.004 C 480.323 529.532 480.68 526.544 483.178 524.047 L 508.466 498.891 C 510.295 497.196 512.927 496.17 515.647 496.17 C 518.368 496.17 521.134 497.062 522.606 498.668 L 522.739 498.802 L 522.873 498.935 L 533.578 509.64 C 542.008 518.739 553.38 523.779 565.601 523.779 C 577.465 523.779 588.482 519.229 597.045 511.023 C 605.697 502.593 610.47 491.532 610.47 479.712 L 610.47 462.407 C 610.47 456.832 615.02 452.06 620.149 452.06 L 654.893 452.06 C 660.022 452.06 663.992 456.832 663.992 462.407 L 663.992 479.712 C 663.992 491.443 668.987 502.593 677.64 511.023 C 686.203 519.229 697.443 523.779 709.308 523.779 C 721.618 523.779 733.214 518.649 741.866 509.416 L 752.213 499.069 C 754.042 497.374 756.673 496.349 759.394 496.349 C 762.115 496.349 764.88 497.374 766.575 498.98 L 791.953 524.136 C 793.782 525.964 794.896 528.462 794.896 531.094 C 794.896 533.725 793.871 536.222 792.042 538.051 L 781.204 548.756 C 772.105 557.186 766.977 568.56 766.977 580.869 C 766.977 592.733 771.525 603.527 779.866 612.09 C 788.296 620.743 799.447 625.203 811.177 625.203 L 828.481 625.203 C 834.636 625.203 836.911 630.912 837.045 635.461 L 837.134 652.543 Z"
                  }),
                  createVNode("path", {
                    class: "animate-spin from-yellow-300",
                    style: { "stroke": "black", "stroke-width": "1", "transform-origin": "78.02581095% 16.12093553%", "animation-duration": "3.5s", "animation-direction": "reverse", "fill": "var(--tw-gradient-from)" },
                    d: "M 671.717 76.053 C 654.289 76.053 637.926 82.828 625.652 95.128 C 613.378 107.428 606.577 123.766 606.577 141.194 C 606.577 158.62 613.352 174.906 625.652 187.258 C 637.926 199.532 654.343 206.333 671.717 206.333 C 689.145 206.333 705.51 199.559 717.783 187.258 C 730.056 174.959 736.857 158.62 736.857 141.194 C 736.857 123.766 730.083 107.481 717.783 95.128 C 705.51 82.854 689.145 76.053 671.717 76.053 Z M 671.717 195.441 C 641.671 195.441 617.444 171.106 617.444 141.166 C 617.444 111.226 641.671 86.892 671.717 86.892 C 701.763 86.892 725.992 111.253 725.992 141.166 C 725.992 171.08 701.763 195.441 671.717 195.441 Z M 785.473 114.043 L 775.164 114.043 C 766.743 114.043 759.704 106.976 759.704 98.316 C 759.704 93.986 761.537 90.107 764.804 87.184 L 771.446 80.676 C 778.034 74.167 778.034 63.594 771.446 57.005 L 756.33 42.022 C 753.354 39.047 748.945 37.267 744.455 37.267 C 739.965 37.267 735.635 39.021 732.581 42.022 L 726.205 48.397 C 723.15 51.798 718.952 53.631 714.542 53.631 C 705.855 53.631 698.469 46.565 698.469 38.223 L 698.469 27.969 C 698.469 18.803 691.35 10.94 682.185 10.94 L 661.542 10.94 C 652.192 10.94 644.727 18.749 644.727 27.969 L 644.727 38.277 C 644.727 46.618 637.527 53.684 628.867 53.684 C 624.536 53.684 620.578 51.851 617.602 48.663 L 611.014 42.154 C 608.039 39.1 603.629 37.4 599.138 37.4 C 594.65 37.4 590.319 39.153 587.264 42.154 L 572.149 57.084 C 565.639 63.594 565.639 74.247 572.149 80.703 L 578.523 87.079 C 581.924 90.133 583.811 93.986 583.811 98.395 C 583.811 107.082 576.744 114.122 568.349 114.122 L 558.042 114.122 C 548.744 114.043 540.96 121.641 540.96 130.886 L 540.96 141.194 L 540.96 151.501 C 540.96 160.666 548.771 168.318 558.042 168.318 L 568.349 168.318 C 576.77 168.318 583.811 175.383 583.811 184.044 C 583.811 188.375 581.924 192.386 578.523 195.441 L 572.149 201.684 C 565.639 208.193 565.639 218.766 572.149 225.301 L 587.264 240.364 C 590.239 243.419 594.65 245.119 599.138 245.119 C 603.629 245.119 607.96 243.365 611.014 240.364 L 617.602 233.855 C 620.446 230.668 624.456 228.834 628.787 228.834 C 637.473 228.834 644.647 235.901 644.647 244.242 L 644.647 254.55 C 644.647 263.715 652.112 271.579 661.41 271.579 L 682.025 271.579 C 691.244 271.579 698.921 263.768 698.921 254.55 L 698.921 244.242 C 698.921 235.901 706.04 228.834 714.728 228.834 C 719.059 228.834 723.07 230.721 726.205 234.068 L 732.581 240.443 C 735.635 243.419 739.965 245.198 744.455 245.198 C 748.945 245.198 753.275 243.445 756.33 240.443 L 771.446 225.38 C 777.955 218.872 777.955 208.22 771.446 201.71 L 764.804 195.202 C 761.537 192.279 759.704 188.135 759.704 183.884 C 759.704 175.198 766.77 167.865 775.164 167.865 L 785.473 167.865 C 794.692 167.865 801.28 160.878 801.28 151.66 L 801.28 141.22 L 801.28 130.913 C 801.28 121.641 794.692 114.043 785.473 114.043 Z M 790.573 141.166 L 790.573 151.421 C 790.573 154.264 789.006 156.787 785.632 156.787 L 775.324 156.787 C 768.337 156.787 761.696 159.763 756.676 164.917 C 751.734 170.018 748.997 176.712 748.997 183.779 C 748.997 191.111 751.973 197.885 757.472 202.905 L 763.928 209.282 C 766.159 211.593 766.159 215.392 763.928 217.624 L 748.812 232.687 C 747.722 233.695 746.155 234.307 744.535 234.307 C 742.914 234.307 741.267 233.695 740.257 232.687 L 734.068 226.523 C 728.835 221.024 721.98 217.969 714.728 217.969 C 707.66 217.969 701.152 220.679 696.078 225.566 C 690.924 230.587 688.215 237.176 688.215 244.215 L 688.215 254.523 C 688.215 257.845 685.292 260.687 682.185 260.687 L 661.542 260.687 C 658.434 260.687 655.646 257.845 655.646 254.523 L 655.646 244.215 C 655.646 237.229 652.855 230.587 647.701 225.566 C 642.6 220.679 635.959 217.969 628.973 217.969 C 621.774 217.969 614.866 221.024 609.898 226.39 L 603.602 232.687 C 602.513 233.695 600.946 234.307 599.325 234.307 C 597.704 234.307 596.057 233.775 595.18 232.819 L 595.101 232.739 L 595.021 232.66 L 579.905 217.597 C 577.674 215.366 577.674 211.62 579.905 209.308 L 586.068 203.199 C 591.62 198.044 594.676 191.19 594.676 183.858 C 594.676 176.792 591.966 170.363 586.998 165.262 C 581.977 160.109 575.336 157.452 568.349 157.452 L 557.962 157.452 C 554.562 157.452 551.718 154.529 551.718 151.474 L 551.718 141.087 L 551.718 130.779 C 551.718 127.725 554.562 124.802 557.962 124.802 L 568.269 124.802 C 575.256 124.802 581.898 122.145 586.918 116.992 C 591.86 111.892 594.597 105.329 594.597 98.342 C 594.597 91.011 591.541 84.156 585.989 79.082 L 579.746 72.918 C 578.258 71.431 578.046 69.73 578.046 68.774 C 578.046 67.897 578.258 66.117 579.746 64.63 L 594.808 49.646 C 595.898 48.637 597.465 48.026 599.085 48.026 C 600.706 48.026 602.354 48.557 603.231 49.513 L 603.31 49.593 L 603.389 49.673 L 609.766 56.049 C 614.787 61.469 621.56 64.47 628.84 64.47 C 635.906 64.47 642.468 61.76 647.568 56.873 C 652.722 51.851 655.565 45.263 655.565 38.223 L 655.565 27.915 C 655.565 24.594 658.275 21.753 661.33 21.753 L 682.025 21.753 C 685.079 21.753 687.444 24.594 687.444 27.915 L 687.444 38.223 C 687.444 45.21 690.42 51.851 695.574 56.873 C 700.674 61.76 707.369 64.47 714.436 64.47 C 721.768 64.47 728.675 61.415 733.829 55.915 L 739.991 49.753 C 741.08 48.742 742.648 48.133 744.268 48.133 C 745.889 48.133 747.536 48.742 748.546 49.699 L 763.662 64.683 C 764.751 65.772 765.415 67.26 765.415 68.827 C 765.415 70.394 764.804 71.882 763.715 72.971 L 757.26 79.348 C 751.839 84.369 748.786 91.143 748.786 98.475 C 748.786 105.541 751.494 111.971 756.463 117.071 C 761.484 122.225 768.126 124.882 775.112 124.882 L 785.419 124.882 C 789.085 124.882 790.441 128.282 790.52 130.992 L 790.573 141.166 Z"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="mt-3 text-gray-200 font-mono text-sm sm:text-xs">Loading...</div></div></div>`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/FrontLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  useWishlistStore as a,
  _sfc_main$5 as b,
  _sfc_main$f as c,
  formatPrice as f,
  useCartStore as u
};

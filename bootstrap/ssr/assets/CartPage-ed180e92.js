import { ref, onMounted, watch, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { u as useCartStore, a as useWishlistStore, _ as _sfc_main$1 } from "./FrontLayout-43d5da65.js";
import { _ as _sfc_main$2 } from "./InputLabel-4f127d89.js";
import { useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$3 } from "./Modal-4741da5a.js";
import "./ApplicationLogo-caba15c6.js";
import "@heroicons/vue/24/outline/index.js";
import "pinia";
import "axios";
import "@vueuse/core";
import "@headlessui/vue";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "radix-vue";
import "@iconify/vue";
import "ziggy-js";
import "./Dropdown-7075589d.js";
import "@heroicons/vue/24/solid/index.js";
import "./PrimaryButton-84eba42e.js";
import "./ShortLogo-3a83a5f7.js";
import "@heroicons/vue/20/solid/index.js";
const _sfc_main = {
  __name: "CartPage",
  __ssrInlineRender: true,
  props: {
    products: Object
  },
  setup(__props) {
    const cartStore = useCartStore();
    useWishlistStore();
    ref();
    ref("modal");
    const form = useForm({
      full_name: "",
      phone: "",
      email: "",
      city: "",
      address: "",
      products: {},
      message: "",
      total_price: cartStore.totalPrice,
      type: "simple"
    });
    const showModal = ref(false);
    const loading = ref(false);
    const checkout = () => {
      form.post(route("set_order"), {
        preserveScroll: true,
        onStart: () => {
          loading.value = true;
          showModal.value = true;
        },
        onSuccess: async () => {
          await cartStore.fetchCount();
          form.errors = {};
          loading.value = false;
        },
        onError: () => {
          loading.value = false;
          showModal.value = false;
        }
      });
    };
    const closeModalAndRedirect = () => {
      showModal.value = false;
      router.get(route("home"));
    };
    onMounted(() => {
      cartStore.fetchCount();
      form.products = cartStore.products;
      form.total_price = cartStore.totalPrice;
    });
    watch(cartStore, () => {
      form.products = cartStore.products;
      form.total_price = cartStore.totalPrice;
    }, { deep: true, immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><h1 class="text-2xl font-bold font-mulish dark:text-white"${_scopeId}>${ssrInterpolate(_ctx.__("cart"))}</h1><section class="pt-4"${_scopeId}>`);
            if (unref(cartStore).products.length > 0) {
              _push2(`<p class="font-bold text-sm dark:text-slate-300"${_scopeId}>${ssrInterpolate(unref(cartStore).countCart > 2 ? unref(cartStore).countCart + " " + _ctx.__("products") : unref(cartStore).countCart + " " + _ctx.__("product"))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(cartStore).countCart > 0) {
              _push2(`<div class="relative grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4"${_scopeId}><div class="lg:col-span-2 space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(cartStore).products, (product) => {
                _push2(`<div class="relative grid grid-cols-2 sm:grid-cols-6 gap-4 container-simple border bg-white dark:bg-1 rounded-md items-start p-4"${_scopeId}><div class="absolute right-2 top-2 group/remove"${_scopeId}><svg class="group-hover/remove:opacity-100 opacity-50 text-black group-hover:text-red-600 transition group-hover:ease-in-out duration-200 hover:scale-110" height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"${_scopeId}><g fill="none"${_scopeId}><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"${_scopeId}></path><path d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2l-.003.071l-.867 12.143A3 3 0 0 1 16.138 22H7.862a3 3 0 0 1-2.992-2.786L4.003 7.07A1.01 1.01 0 0 1 4 7a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zm3.717 5H6.003l.862 12.071a1 1 0 0 0 .997.929h8.276a1 1 0 0 0 .997-.929zM10 10a1 1 0 0 1 .993.883L11 11v5a1 1 0 0 1-1.993.117L9 16v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m.28-6H9.72l-.333 1h5.226z" fill="currentColor"${_scopeId}></path></g></svg></div><div class="col-span-2 sm:col-span-1 mx-auto"${_scopeId}><img${ssrRenderAttr("src", product.image)} alt="" class="w-24 h-24 object-contain mx-auto"${_scopeId}></div><div class="col-span-2 sm:col-span-3 mx-auto sm:mx-0 my-auto"${_scopeId}><p${_scopeId}>${ssrInterpolate(product.name)}</p></div><div class="sm:col-span-1 my-auto"${_scopeId}><div class="w-fit border flex items-center px-2 rounded"${_scopeId}><span class="text-sm sm:text-xl cursor-pointer"${_scopeId}>-</span><input id=""${ssrRenderAttr("value", product.qty)} class="w-12 sm:w-18 md:w-20 xl:w-16 2xl:w-24 h-8 border-none" disabled min="1" name="" style="${ssrRenderStyle({ "text-align": "center" })}" type="number"${_scopeId}><span class="text-sm sm:text-xl cursor-pointer"${_scopeId}>+</span></div></div><div class="sm:col-span-1 text-right my-auto"${_scopeId}><p class="font-bold"${_scopeId}>${ssrInterpolate(product.total_price ?? product.price)} ${ssrInterpolate(_ctx.__("lei"))}</p></div></div>`);
              });
              _push2(`<!--]--></div><div class="container-simple border dark:bg-white rounded-md text-red p-4 lg:col-span-1"${_scopeId}><form${_scopeId}><div class="grid grid-cols-1 gap-4"${_scopeId}><p class="font-bold"${_scopeId}>${ssrInterpolate(_ctx.__("order_details"))}</p><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.__("full_name")
              }, null, _parent2, _scopeId));
              _push2(`<input id="first_name"${ssrRenderAttr("value", unref(form).full_name)} class="rounded-md w-full" name="first_name" type="text"${_scopeId}>`);
              if (unref(form).errors.full_name) {
                _push2(`<span class="font-light text-xs text-red-500"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.full_name))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.__("phone")
              }, null, _parent2, _scopeId));
              _push2(`<input id="phone"${ssrRenderAttr("value", unref(form).phone)} class="rounded-md w-full" name="phone" type="tel"${_scopeId}>`);
              if (unref(form).errors.phone) {
                _push2(`<span class="font-light text-xs text-red-500"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.phone))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.__("email")
              }, null, _parent2, _scopeId));
              _push2(`<input id="email"${ssrRenderAttr("value", unref(form).email)} class="rounded-md w-full" name="email" type="email"${_scopeId}>`);
              if (unref(form).errors.email) {
                _push2(`<span class="font-light text-xs text-red-500"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.email))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.__("city")
              }, null, _parent2, _scopeId));
              _push2(`<input id="city"${ssrRenderAttr("value", unref(form).city)} class="rounded-md w-full" name="city" type="text"${_scopeId}>`);
              if (unref(form).errors.city) {
                _push2(`<span class="font-light text-xs text-red-500"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.city))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.__("address")
              }, null, _parent2, _scopeId));
              _push2(`<input id="address"${ssrRenderAttr("value", unref(form).address)} class="rounded-md w-full" name="address" type="search"${_scopeId}>`);
              if (unref(form).errors.city) {
                _push2(`<span class="font-light text-xs text-red-500"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.address))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                value: _ctx.__("message")
              }, null, _parent2, _scopeId));
              _push2(`<textarea id="message" class="rounded-md w-full" name="message"${_scopeId}>${ssrInterpolate(unref(form).message)}</textarea>`);
              if (unref(form).errors.message) {
                _push2(`<span class="font-light text-xs text-red-500"${_scopeId}>${ssrInterpolate(_ctx.__(unref(form).errors.message))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><hr class="mt-2"${_scopeId}><div class="grid grid-cols-2 font-bold"${_scopeId}><p class="justify-self-start"${_scopeId}>${ssrInterpolate(_ctx.__("subtotal"))}:</p><p class="justify-self-end"${_scopeId}>${ssrInterpolate(unref(cartStore).totalPrice.toFixed(2))} ${ssrInterpolate(_ctx.__("lei"))}</p></div><div class="grid grid-cols-2 font-bold"${_scopeId}><p class="justify-self-start"${_scopeId}>${ssrInterpolate(_ctx.__("shipping"))}:</p><p class="justify-self-end italic"${_scopeId}>${ssrInterpolate(_ctx.__("will_be_calculated_by_manager"))}</p></div><button class="container-custom-rounded space-x-4 p-2 bg-[#1FC8F3] shadow cursor-pointer text-white font-mulish font-semibold" type="submit"${_scopeId}>${ssrInterpolate(_ctx.__("checkout"))}</button></div></form></div></div>`);
            } else {
              _push2(`<div class="p-2 mx-auto flex flex-col justify-center items-center space-y-6 py-12"${_scopeId}><div class="w-fit rounded-full p-8 bg-[#F1F5F9] border border-[#CBD5E1]"${_scopeId}><svg class="bi bi-cart3" fill="currentColor" height="2em" viewBox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"${_scopeId}></path></svg></div><p class="text-xl md:text-3xl font-bold font-mulish text-slate-500"${_scopeId}>${ssrInterpolate(_ctx.__("empty_cart"))}</p><p class="text-xs md:text-xl font-medium font-mulish text-slate-500"${_scopeId}>${ssrInterpolate(_ctx.__("youre_not_added_product"))}</p></div>`);
            }
            _push2(`</section>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              actions: false,
              show: showModal.value,
              "show-close": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="bg-gray-100 h-auto"${_scopeId2}>`);
                  if (!loading.value) {
                    _push3(`<div class="bg-white p-6 md:mx-auto"${_scopeId2}><svg class="text-green-600 w-16 h-16 mx-auto my-6" viewBox="0 0 24 24"${_scopeId2}><path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z" fill="currentColor"${_scopeId2}></path></svg><div class="text-center"${_scopeId2}><h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center"${_scopeId2}>${ssrInterpolate(_ctx.__("order_placed"))}!</h3><p class="text-gray-600 my-2"${_scopeId2}>${ssrInterpolate(_ctx.__("thanks_order"))}</p><p${_scopeId2}>${ssrInterpolate(_ctx.__("order_success_message"))}</p><div class="py-10 text-center"${_scopeId2}><p class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 cursor-pointer rounded-md"${_scopeId2}>${ssrInterpolate(_ctx.__("back_to_shop"))}</p></div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (loading.value) {
                    _push3(`<div class="bg-white p-6 md:mx-auto"${_scopeId2}><svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto mt-6 mb-6" fill="none" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg"${_scopeId2}><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"${_scopeId2}></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"${_scopeId2}></path></svg><div class="text-center"${_scopeId2}><h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center"${_scopeId2}>${ssrInterpolate(_ctx.__("pending"))}...</h3></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "bg-gray-100 h-auto" }, [
                      !loading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-white p-6 md:mx-auto"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "text-green-600 w-16 h-16 mx-auto my-6",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z",
                            fill: "currentColor"
                          })
                        ])),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h3", { class: "md:text-2xl text-base text-gray-900 font-semibold text-center" }, toDisplayString(_ctx.__("order_placed")) + "!", 1),
                          createVNode("p", { class: "text-gray-600 my-2" }, toDisplayString(_ctx.__("thanks_order")), 1),
                          createVNode("p", null, toDisplayString(_ctx.__("order_success_message")), 1),
                          createVNode("div", { class: "py-10 text-center" }, [
                            createVNode("p", {
                              class: "px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 cursor-pointer rounded-md",
                              onClick: closeModalAndRedirect
                            }, toDisplayString(_ctx.__("back_to_shop")), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      loading.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "bg-white p-6 md:mx-auto"
                      }, [
                        (openBlock(), createBlock("svg", {
                          "aria-hidden": "true",
                          class: "w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto mt-6 mb-6",
                          fill: "none",
                          viewBox: "0 0 100 101",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                            fill: "currentColor"
                          }),
                          createVNode("path", {
                            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                            fill: "currentFill"
                          })
                        ])),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h3", { class: "md:text-2xl text-base text-gray-900 font-semibold text-center" }, toDisplayString(_ctx.__("pending")) + "...", 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "py-4" }, [
                createVNode("h1", { class: "text-2xl font-bold font-mulish dark:text-white" }, toDisplayString(_ctx.__("cart")), 1),
                createVNode("section", { class: "pt-4" }, [
                  unref(cartStore).products.length > 0 ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "font-bold text-sm dark:text-slate-300"
                  }, toDisplayString(unref(cartStore).countCart > 2 ? unref(cartStore).countCart + " " + _ctx.__("products") : unref(cartStore).countCart + " " + _ctx.__("product")), 1)) : createCommentVNode("", true),
                  unref(cartStore).countCart > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "relative grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4"
                  }, [
                    createVNode("div", { class: "lg:col-span-2 space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(cartStore).products, (product) => {
                        return openBlock(), createBlock("div", {
                          key: product.id,
                          class: "relative grid grid-cols-2 sm:grid-cols-6 gap-4 container-simple border bg-white dark:bg-1 rounded-md items-start p-4"
                        }, [
                          createVNode("div", {
                            class: "absolute right-2 top-2 group/remove",
                            onClick: ($event) => unref(cartStore).removeProductInCart(product.id)
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "group-hover/remove:opacity-100 opacity-50 text-black group-hover:text-red-600 transition group-hover:ease-in-out duration-200 hover:scale-110",
                              height: "1em",
                              viewBox: "0 0 24 24",
                              width: "1em",
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
                          ], 8, ["onClick"]),
                          createVNode("div", { class: "col-span-2 sm:col-span-1 mx-auto" }, [
                            createVNode("img", {
                              src: product.image,
                              alt: "",
                              class: "w-24 h-24 object-contain mx-auto"
                            }, null, 8, ["src"])
                          ]),
                          createVNode("div", { class: "col-span-2 sm:col-span-3 mx-auto sm:mx-0 my-auto" }, [
                            createVNode("p", null, toDisplayString(product.name), 1)
                          ]),
                          createVNode("div", { class: "sm:col-span-1 my-auto" }, [
                            createVNode("div", { class: "w-fit border flex items-center px-2 rounded" }, [
                              createVNode("span", {
                                class: "text-sm sm:text-xl cursor-pointer",
                                onClick: ($event) => unref(cartStore).updateQtyOfProduct(product.id, --product.qty)
                              }, "-", 8, ["onClick"]),
                              createVNode("input", {
                                id: "",
                                value: product.qty,
                                class: "w-12 sm:w-18 md:w-20 xl:w-16 2xl:w-24 h-8 border-none",
                                disabled: "",
                                min: "1",
                                name: "",
                                style: { "text-align": "center" },
                                type: "number",
                                onInput: withModifiers(() => {
                                }, ["self"])
                              }, null, 40, ["value", "onInput"]),
                              createVNode("span", {
                                class: "text-sm sm:text-xl cursor-pointer",
                                onClick: ($event) => unref(cartStore).updateQtyOfProduct(product.id, ++product.qty)
                              }, "+", 8, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "sm:col-span-1 text-right my-auto" }, [
                            (openBlock(), createBlock("p", {
                              key: product.total_price,
                              class: "font-bold"
                            }, toDisplayString(product.total_price ?? product.price) + " " + toDisplayString(_ctx.__("lei")), 1))
                          ])
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "container-simple border dark:bg-white rounded-md text-red p-4 lg:col-span-1" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(($event) => checkout(), ["prevent"])
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-4" }, [
                          createVNode("p", { class: "font-bold" }, toDisplayString(_ctx.__("order_details")), 1),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              value: _ctx.__("full_name")
                            }, null, 8, ["value"]),
                            withDirectives(createVNode("input", {
                              id: "first_name",
                              "onUpdate:modelValue": ($event) => unref(form).full_name = $event,
                              class: "rounded-md w-full",
                              name: "first_name",
                              type: "text"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).full_name]
                            ]),
                            unref(form).errors.full_name ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "font-light text-xs text-red-500"
                            }, toDisplayString(_ctx.__(unref(form).errors.full_name)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              value: _ctx.__("phone")
                            }, null, 8, ["value"]),
                            withDirectives(createVNode("input", {
                              id: "phone",
                              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                              class: "rounded-md w-full",
                              name: "phone",
                              type: "tel"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).phone]
                            ]),
                            unref(form).errors.phone ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "font-light text-xs text-red-500"
                            }, toDisplayString(_ctx.__(unref(form).errors.phone)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              value: _ctx.__("email")
                            }, null, 8, ["value"]),
                            withDirectives(createVNode("input", {
                              id: "email",
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              class: "rounded-md w-full",
                              name: "email",
                              type: "email"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).email]
                            ]),
                            unref(form).errors.email ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "font-light text-xs text-red-500"
                            }, toDisplayString(_ctx.__(unref(form).errors.email)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              value: _ctx.__("city")
                            }, null, 8, ["value"]),
                            withDirectives(createVNode("input", {
                              id: "city",
                              "onUpdate:modelValue": ($event) => unref(form).city = $event,
                              class: "rounded-md w-full",
                              name: "city",
                              type: "text"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).city]
                            ]),
                            unref(form).errors.city ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "font-light text-xs text-red-500"
                            }, toDisplayString(_ctx.__(unref(form).errors.city)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              value: _ctx.__("address")
                            }, null, 8, ["value"]),
                            withDirectives(createVNode("input", {
                              id: "address",
                              "onUpdate:modelValue": ($event) => unref(form).address = $event,
                              class: "rounded-md w-full",
                              name: "address",
                              type: "search"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).address]
                            ]),
                            unref(form).errors.city ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "font-light text-xs text-red-500"
                            }, toDisplayString(_ctx.__(unref(form).errors.address)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode(_sfc_main$2, {
                              value: _ctx.__("message")
                            }, null, 8, ["value"]),
                            withDirectives(createVNode("textarea", {
                              id: "message",
                              "onUpdate:modelValue": ($event) => unref(form).message = $event,
                              class: "rounded-md w-full",
                              name: "message"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).message]
                            ]),
                            unref(form).errors.message ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "font-light text-xs text-red-500"
                            }, toDisplayString(_ctx.__(unref(form).errors.message)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("hr", { class: "mt-2" }),
                          createVNode("div", { class: "grid grid-cols-2 font-bold" }, [
                            createVNode("p", { class: "justify-self-start" }, toDisplayString(_ctx.__("subtotal")) + ":", 1),
                            createVNode("p", { class: "justify-self-end" }, toDisplayString(unref(cartStore).totalPrice.toFixed(2)) + " " + toDisplayString(_ctx.__("lei")), 1)
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 font-bold" }, [
                            createVNode("p", { class: "justify-self-start" }, toDisplayString(_ctx.__("shipping")) + ":", 1),
                            createVNode("p", { class: "justify-self-end italic" }, toDisplayString(_ctx.__("will_be_calculated_by_manager")), 1)
                          ]),
                          createVNode("button", {
                            class: "container-custom-rounded space-x-4 p-2 bg-[#1FC8F3] shadow cursor-pointer text-white font-mulish font-semibold",
                            type: "submit"
                          }, toDisplayString(_ctx.__("checkout")), 1)
                        ])
                      ], 40, ["onSubmit"])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "p-2 mx-auto flex flex-col justify-center items-center space-y-6 py-12"
                  }, [
                    createVNode("div", { class: "w-fit rounded-full p-8 bg-[#F1F5F9] border border-[#CBD5E1]" }, [
                      (openBlock(), createBlock("svg", {
                        class: "bi bi-cart3",
                        fill: "currentColor",
                        height: "2em",
                        viewBox: "0 0 16 16",
                        width: "2em",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", { d: "M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" })
                      ]))
                    ]),
                    createVNode("p", { class: "text-xl md:text-3xl font-bold font-mulish text-slate-500" }, toDisplayString(_ctx.__("empty_cart")), 1),
                    createVNode("p", { class: "text-xs md:text-xl font-medium font-mulish text-slate-500" }, toDisplayString(_ctx.__("youre_not_added_product")), 1)
                  ]))
                ]),
                createVNode(_sfc_main$3, {
                  actions: false,
                  show: showModal.value,
                  "show-close": false
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "bg-gray-100 h-auto" }, [
                      !loading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-white p-6 md:mx-auto"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "text-green-600 w-16 h-16 mx-auto my-6",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z",
                            fill: "currentColor"
                          })
                        ])),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h3", { class: "md:text-2xl text-base text-gray-900 font-semibold text-center" }, toDisplayString(_ctx.__("order_placed")) + "!", 1),
                          createVNode("p", { class: "text-gray-600 my-2" }, toDisplayString(_ctx.__("thanks_order")), 1),
                          createVNode("p", null, toDisplayString(_ctx.__("order_success_message")), 1),
                          createVNode("div", { class: "py-10 text-center" }, [
                            createVNode("p", {
                              class: "px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 cursor-pointer rounded-md",
                              onClick: closeModalAndRedirect
                            }, toDisplayString(_ctx.__("back_to_shop")), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      loading.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "bg-white p-6 md:mx-auto"
                      }, [
                        (openBlock(), createBlock("svg", {
                          "aria-hidden": "true",
                          class: "w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto mt-6 mb-6",
                          fill: "none",
                          viewBox: "0 0 100 101",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                            fill: "currentColor"
                          }),
                          createVNode("path", {
                            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                            fill: "currentFill"
                          })
                        ])),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("h3", { class: "md:text-2xl text-base text-gray-900 font-semibold text-center" }, toDisplayString(_ctx.__("pending")) + "...", 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                }, 8, ["show"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/CartPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

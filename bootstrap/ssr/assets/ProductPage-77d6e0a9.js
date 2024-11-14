import { mergeProps, unref, withCtx, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, useSSRContext, renderSlot, useAttrs, ref, getCurrentInstance, resolveComponent, Fragment, renderList, withDirectives, vShow, vModelSelect, createCommentVNode, withModifiers } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { u as useCartStore, a as useWishlistStore, _ as _sfc_main$3, f as formatPrice, b as _sfc_main$4 } from "./FrontLayout-d4ebaafd.js";
import { Link, router } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import { _ as _sfc_main$5 } from "./ProductSection-ef70c81e.js";
import { HeartIcon } from "@heroicons/vue/24/outline/index.js";
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogClose } from "radix-vue";
import { Icon } from "@iconify/vue";
/* empty css                   */import { Carousel, Navigation, Slide } from "vue3-carousel";
import "./ApplicationLogo-caba15c6.js";
import "pinia";
import "axios";
import "@vueuse/core";
import "@headlessui/vue";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "./Dropdown-7075589d.js";
import "@heroicons/vue/24/solid/index.js";
import "./PrimaryButton-84eba42e.js";
import "./ShortLogo-3a83a5f7.js";
import "swiper/vue";
import "swiper/modules";
const _sfc_main$2 = {
  __name: "Breadcrumb",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex w-full" }, _attrs))}><nav class="flex my-2 md:my-4" aria-label="Breadcrumb"><ol class="flex flex-wrap space-x-1 md:space-x-0.5 rtl:space-x-reverse"><li class="flex items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("home"),
        class: "inline-flex items-center text-xs font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"${_scopeId}></path></svg> ${ssrInterpolate(_ctx.__("home"))}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-3 h-3 me-2.5",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "currentColor",
                viewBox: "0 0 20 20"
              }, [
                createVNode("path", { d: "m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" })
              ])),
              createTextVNode(" " + toDisplayString(_ctx.__("home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><div class="flex items-center"><svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path></svg>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("category_page", { slug: __props.product.sub_sub_category.subcategory.category.slug }),
        class: "ms-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__(__props.product.sub_sub_category.subcategory.category.name))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__(__props.product.sub_sub_category.subcategory.category.name)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li><div class="flex items-center"><svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path></svg>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("subcategory_page", { slug: __props.product.sub_sub_category.subcategory.slug }),
        class: "ms-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__(__props.product.sub_sub_category.subcategory.name))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__(__props.product.sub_sub_category.subcategory.name)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li><div class="flex items-center"><svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path></svg>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("products_page", { subSubcategory: __props.product.sub_sub_category.slug }),
        class: "ms-1 text-xs font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.__(__props.product.sub_sub_category.name))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.__(__props.product.sub_sub_category.name)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li aria-current="page"><div class="flex items-center"><svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path></svg><span class="ms-1 font-medium text-xs text-blue-500 md:ms-2 dark:text-gray-400">${ssrInterpolate(__props.product.name)}</span></div></li></ol></nav></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Breadcrumb.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CustomModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close-modal"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps({ open: __props.isOpen }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DialogPortal), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DialogOverlay), { class: "bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(DialogContent), {
                    onCloseAutoFocus: ($event) => _ctx.$emit("close-modal"),
                    onInteractOutside: ($event) => _ctx.$emit("close-modal"),
                    class: "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-screen h-10/12 sm:h-[40vw] sm:w-[60vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content", {}, null, _push4, _parent4, _scopeId3);
                        _push4(ssrRenderComponent(unref(DialogClose), {
                          onClick: ($event) => _ctx.$emit("close-modal"),
                          class: "text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none",
                          "aria-label": "Close"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Icon), { icon: "lucide:x" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Icon), { icon: "lucide:x" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content"),
                          createVNode(unref(DialogClose), {
                            onClick: ($event) => _ctx.$emit("close-modal"),
                            class: "text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none",
                            "aria-label": "Close"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Icon), { icon: "lucide:x" })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DialogOverlay), { class: "bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" }),
                    createVNode(unref(DialogContent), {
                      onCloseAutoFocus: ($event) => _ctx.$emit("close-modal"),
                      onInteractOutside: ($event) => _ctx.$emit("close-modal"),
                      class: "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-screen h-10/12 sm:h-[40vw] sm:w-[60vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content"),
                        createVNode(unref(DialogClose), {
                          onClick: ($event) => _ctx.$emit("close-modal"),
                          class: "text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none",
                          "aria-label": "Close"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Icon), { icon: "lucide:x" })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 3
                    }, 8, ["onCloseAutoFocus", "onInteractOutside"])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DialogPortal), null, {
                default: withCtx(() => [
                  createVNode(unref(DialogOverlay), { class: "bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" }),
                  createVNode(unref(DialogContent), {
                    onCloseAutoFocus: ($event) => _ctx.$emit("close-modal"),
                    onInteractOutside: ($event) => _ctx.$emit("close-modal"),
                    class: "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] w-screen h-10/12 sm:h-[40vw] sm:w-[60vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content"),
                      createVNode(unref(DialogClose), {
                        onClick: ($event) => _ctx.$emit("close-modal"),
                        class: "text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none",
                        "aria-label": "Close"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Icon), { icon: "lucide:x" })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 3
                  }, 8, ["onCloseAutoFocus", "onInteractOutside"])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CustomModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ProductPage",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object
    },
    latest_products: {
      type: Object
    }
  },
  emits: ["productCart"],
  setup(__props, { emit: __emit }) {
    var _a;
    const attrs = useAttrs();
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const props = __props;
    const selectedQty = ref("default");
    const error = ref({});
    const description = ref(false);
    const specifications = ref(true);
    const selectedImage = ref((_a = props.product.images[0]) == null ? void 0 : _a.image1);
    const isOpen = ref(false);
    const modalTitle = ref();
    const typeModal = ref();
    const app = getCurrentInstance();
    ref(0);
    const openModalSlider = ref(false);
    const images = ref({});
    const filteredImages = ref([]);
    function openImage() {
      images.value = props.product.images[0];
      openModalSlider.value = !openModalSlider.value;
      filteredImages.value = Object.values(images.value).filter(
        (image) => typeof image === "string" && image.startsWith("/storage/products/") || typeof image === "string" && image.startsWith("https")
      );
    }
    function openModal(type) {
      if (type === "cheaper") {
        isOpen.value = !isOpen.value;
        typeModal.value = type;
        modalTitle.value = app.appContext.config.globalProperties.__("found_cheaper");
      }
      if (type === "buy_1_click") {
        isOpen.value = !isOpen.value;
        typeModal.value = type;
        modalTitle.value = app.appContext.config.globalProperties.__("buy_1_click");
      }
      if (type === "buy_in_credit") {
        isOpen.value = !isOpen.value;
        typeModal.value = type;
        modalTitle.value = app.appContext.config.globalProperties.__("select_offer");
      }
    }
    function selectImage(imageSource) {
      selectedImage.value = imageSource;
    }
    function setActiveTab(tabName) {
      if (tabName === "description") {
        description.value = true;
        specifications.value = !specifications;
      }
      if (tabName === "specifications") {
        specifications.value = true;
        description.value = !description;
      }
    }
    function clear(object) {
      Object.keys(object).forEach((key) => {
        delete object[key];
      });
    }
    function buyProduct(productId) {
      cartStore.addProductInCart(productId, selectedQty.value).then(() => {
        clear(error);
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Pagination = resolveComponent("Pagination");
      _push(ssrRenderComponent(_sfc_main$3, mergeProps({ title: "Pagina principală" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { product: __props.product }, null, _parent2, _scopeId));
            _push2(`<hr${_scopeId}>`);
            if (Object.keys(__props.product)) {
              _push2(`<section class="py-12 mt-1 sm:py-16"${_scopeId}><div class=""${_scopeId}><div class="grid grid-cols-1 gap-12 lg:col-gap-12 xl:col-gap-16 lg:-mt-12 lg:grid-cols-5 lg:gap-16"${_scopeId}><div class="lg:col-span-3 lg:row-end-1"${_scopeId}><div class="lg:flex"${_scopeId}><div class="flex-1 lg:order-2 lg:ml-5"${_scopeId}><div class="overflow-hidden w-full h-[300px] md:h-[500px] rounded-lg"${_scopeId}><img${ssrRenderAttr("src", selectedImage.value)} alt="" class="object-contain w-full h-[300px] md:h-[500px] cursor-pointer"${_scopeId}></div></div><div class="w-full mt-2 lg:order-1 lg:w-32 lg:flex-shrink-0"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.images, (image, index) => {
                _push2(`<div class="flex flex-row items-start lg:flex-col"${_scopeId}><button style="${ssrRenderStyle((image == null ? void 0 : image.image1) != null ? null : { display: "none" })}" class="${ssrRenderClass([{
                  "border-gray-900": (image == null ? void 0 : image.image1) === selectedImage.value
                }, "h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"])}" type="button"${_scopeId}><img${ssrRenderAttr("src", image == null ? void 0 : image.image1)} alt="" class="object-cover w-full h-full"${_scopeId}></button><button style="${ssrRenderStyle((image == null ? void 0 : image.image2) != null ? null : { display: "none" })}" class="${ssrRenderClass([{
                  "border-gray-900": (image == null ? void 0 : image.image2) === selectedImage.value
                }, "h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"])}" type="button"${_scopeId}><img${ssrRenderAttr("src", image == null ? void 0 : image.image2)} alt="" class="object-cover w-full h-full"${_scopeId}></button><button style="${ssrRenderStyle((image == null ? void 0 : image.image3) != null ? null : { display: "none" })}" class="${ssrRenderClass([{
                  "border-gray-900": (image == null ? void 0 : image.image3) === selectedImage.value
                }, "h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"])}" type="button"${_scopeId}><img${ssrRenderAttr("src", image.image3)} alt="" class="object-cover w-full h-full"${_scopeId}></button><button style="${ssrRenderStyle((image == null ? void 0 : image.image4) != null ? null : { display: "none" })}" class="${ssrRenderClass([{
                  "border-gray-900": (image == null ? void 0 : image.image4) === selectedImage.value
                }, "h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"])}" type="button"${_scopeId}><img${ssrRenderAttr("src", image == null ? void 0 : image.image4)} alt="" class="object-cover w-full h-full"${_scopeId}></button></div>`);
              });
              _push2(`<!--]--></div></div></div><div class="lg:col-span-2 lg:row-span-2 lg:row-end-2"${_scopeId}><div class="flex items-start"${_scopeId}><h1 class="text-2xl font-bold text-gray-900 dark:text-slate-300 sm:text-3xl"${_scopeId}>${ssrInterpolate(__props.product.name)}</h1><button class="px-2 py-2 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border rounded-md border-slate-500 bg-none focus:shadow" type="button"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(HeartIcon), {
                class: [
                  unref(wishlistStore).checkIfProductExistInWishlist(
                    __props.product.id
                  ) ? "text-red-500 fill-red-500" : "text-slate-700 dark:text-slate-300",
                  "w-6"
                ]
              }, null, _parent2, _scopeId));
              _push2(`</button></div><div class="flex items-center justify-between mt-2"${_scopeId}><img${ssrRenderAttr("src", (_a2 = __props.product.brand) == null ? void 0 : _a2.image)} alt="" class="w-16"${_scopeId}><div class="flex items-center dark:text-slate-300"${_scopeId}><div class="flex items-center"${_scopeId}>${ssrInterpolate(_ctx.__("product_code"))}: </div><p class="ml-2 text-sm font-medium text-gray-500"${_scopeId}>${ssrInterpolate(__props.product.product_code)}</p></div></div><!--[-->`);
              ssrRenderList(__props.product.attributes, (attribute, key) => {
                _push2(`<div class="border-t"${_scopeId}>`);
                if (["cantitate", "Cantitate'"].includes(
                  key
                ) && attribute.values.length > 1) {
                  _push2(`<div class="flex flex-col 2xs:items-center 2xs:flex-row 2xs:space-x-6"${_scopeId}><h2 class="my-2 text-base text-gray-900 dark:text-slate-300 sm:my-6"${_scopeId}>${ssrInterpolate(attribute.name)}: </h2><div class="flex flex-wrap items-center gap-1 select-none 2xs:my-3"${_scopeId}><select id="color" class="border rounded-md dark:bg-transparent dark:text-slate-300 border-slate-300 focus:border-none focus:outline-none"${_scopeId}><option class="dark:bg-slate-600" disabled value="default"${ssrIncludeBooleanAttr(Array.isArray(selectedQty.value) ? ssrLooseContain(selectedQty.value, "default") : ssrLooseEqual(selectedQty.value, "default")) ? " selected" : ""}${_scopeId}>${ssrInterpolate(_ctx.__("select_qty"))}</option><!--[-->`);
                  ssrRenderList(attribute.values, (value, index) => {
                    _push2(`<option${ssrRenderAttr("value", value.link)} class="dark:bg-slate-600" selected${_scopeId}>${ssrInterpolate(value.value)} ${ssrInterpolate(value.mu)}</option>`);
                  });
                  _push2(`<!--]--></select></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--><div class="flex items-end py-6 my-1 space-x-2"${_scopeId}>`);
              if (!__props.product.has_discount) {
                _push2(`<h1 class="text-3xl font-bold dark:text-slate-300"${_scopeId}>${ssrInterpolate(unref(formatPrice)(__props.product.price))}</h1>`);
              } else {
                _push2(`<span class="flex flex-col space-x-2"${_scopeId}><span class="flex space-x-2"${_scopeId}><h1 class="text-xl font-bold line-through dark:text-slate-300 text-slate-400"${_scopeId}>${ssrInterpolate(unref(formatPrice)(__props.product.price))}</h1><span class="px-1 my-auto text-sm font-semibold text-white bg-red-400 rounded"${_scopeId}>-${ssrInterpolate(__props.product.sale)}%</span></span><h1 class="text-3xl font-bold dark:text-slate-300"${_scopeId}>${ssrInterpolate(unref(formatPrice)((_b = __props.product) == null ? void 0 : _b.promotion_price))}</h1></span>`);
              }
              _push2(`<h1 class="text-2xl font-medium dark:text-white"${_scopeId}>${ssrInterpolate(_ctx.__("lei"))}</h1>`);
              if (__props.product.mu) {
                _push2(`<h1 class="text-xl font-light text-slate-500"${_scopeId}> / ${ssrInterpolate(__props.product.mu)}</h1>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><div class="container-custom-rounded dark:bg-slate-800 mb-4 flex items-center space-x-4 p-2 border border-[#1FC8F3] cursor-pointer"${_scopeId}><svg class="dark:text-slate-300 bi bi-question-circle" fill="currentColor" height="20" viewBox="0 0 16 16" width="20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"${_scopeId}></path><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"${_scopeId}></path></svg><p class="flex text-lg font-light dark:text-slate-300"${_scopeId}>${ssrInterpolate(_ctx.__("found_cheaper"))}</p></div></div><div class="flex flex-col py-4 space-y-2 border-t border-b dark:border-y-slate-600 sm:flex-row sm:space-x-2 sm:space-y-0"${_scopeId}><button class="inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md sm:w-1/4 bg-primary-blue bg-none focus:shadow hover:bg-primary-blue-200" type="button"${_scopeId}>${ssrInterpolate(_ctx.__("buy"))}</button><button class="inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md bg-1 bg-none focus:shadow hover:bg-gray-800" type="button"${_scopeId}>${ssrInterpolate(_ctx.__("buy_1_click"))}</button></div><div${_scopeId}>`);
              if (__props.product.credits.length > 0) {
                _push2(`<button w class="inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md bg-slate-500 bg-none focus:shadow hover:bg-slate-600" type="button"${_scopeId}>${ssrInterpolate(_ctx.__("buy_in_credit"))}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex items-center w-full p-3 mt-4 space-x-4 border container-custom-rounded dark:bg-slate-800 border-slate-400"${_scopeId}><svg class="dark:text-slate-300" height="2em" viewBox="0 0 32 32" width="2em" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M4 16h12v2H4zm-2-5h10v2H2z" fill="currentColor"${_scopeId}></path><path d="m29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394M9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m14-15h2.34l2.144 5H23Zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z" fill="currentColor"${_scopeId}></path></svg><div class="flex flex-col items-center text-center dark:text-slate-300"${_scopeId}><p class="flex text-lg font-medium"${_scopeId}>${ssrInterpolate(_ctx.__("delivery_info"))}</p><p class="flex text-sm font-light underline"${_scopeId}>${ssrInterpolate(_ctx.__("delivery_aditional_info"))}</p></div></div></div><div class="lg:col-span-3"${_scopeId}><div class="border-b border-gray-300 dark:border-slate-500"${_scopeId}><nav class="flex gap-4"${_scopeId}><a class="${ssrRenderClass([{
                "transition delay-150 border-b-2 border-gray-500": specifications.value,
                "border-transparent": !specifications.value
              }, "py-4 text-sm font-medium text-gray-900 dark:text-slate-300 hover:border-gray-400 hover:text-gray-800"])}" href="#" title="specifications"${_scopeId}>${ssrInterpolate(_ctx.__("specifications"))}</a><a class="${ssrRenderClass([{
                "transition delay-150 border-b-2 border-gray-500": description.value,
                "border-transparent": !description.value
              }, "py-4 text-sm font-medium text-gray-900 dark:text-slate-300 hover:border-gray-400 hover:text-gray-800"])}" href="#" title="description"${_scopeId}>${ssrInterpolate(_ctx.__("description"))}</a></nav></div><div style="${ssrRenderStyle(description.value ? null : { display: "none" })}" id="description" class="flow-root mt-8 sm:mt-12"${_scopeId}><h1 class="text-3xl font-bold dark:text-slate-300"${_scopeId}>${ssrInterpolate(__props.product.name)}</h1><p class="mt-4 dark:text-slate-300"${_scopeId}>${ssrInterpolate(__props.product.description)}</p></div><div style="${ssrRenderStyle(specifications.value ? null : { display: "none" })}" class="flow-root mt-8 sm:mt-2"${_scopeId}><div class="relative my-4 overflow-x-auto"${_scopeId}><table class="w-full text-sm text-left text-gray-500 bg-red-200 border dark:border-slate-600 rtl:text-right dark:text-gray-400"${_scopeId}><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.attributes, (attribute, key) => {
                _push2(`<tr class="bg-white border dark:bg-gray-800 da odd:bg-white even:bg-slate-100 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:border-slate-600"${_scopeId}>`);
                if (attribute.name) {
                  _push2(`<td class="px-6 py-4 font-medium whitespace-nowrap capitalize-first"${_scopeId}>${ssrInterpolate(attribute.name)}: </td>`);
                } else {
                  _push2(`<!---->`);
                }
                if (attribute.name) {
                  _push2(`<td class="px-6 py-4 whitespace-nowrap capitalize-first"${_scopeId}><div class="flex space-x-2"${_scopeId}><!--[-->`);
                  ssrRenderList(attribute.values, (value) => {
                    _push2(`<p class="capitalize-first"${_scopeId}>${ssrInterpolate(value.value === "1" ? _ctx.__("yes") : value.value === "0" ? _ctx.__("no") : value.value)}</p>`);
                  });
                  _push2(`<!--]--></div></td>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
              _push2(ssrRenderComponent(_sfc_main$4, {
                product: __props.product,
                title: modalTitle.value,
                type: typeModal.value,
                visible: isOpen.value,
                onClose: ($event) => isOpen.value = false,
                onSelect: ($event) => console.log($event)
              }, null, _parent2, _scopeId));
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<hr${_scopeId}>`);
            if (unref(attrs).last_visited.length !== 0) {
              _push2(ssrRenderComponent(_sfc_main$5, {
                new_products: true,
                products: unref(attrs).last_visited,
                title: _ctx.__("visited_products")
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              "is-open": openModalSlider.value,
              onCloseModal: openImage
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Carousel), {
                    "items-to-show": 1,
                    transition: 500,
                    "wrap-around": true,
                    class: "w-full"
                  }, {
                    addons: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Navigation), null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Pagination, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Navigation)),
                          createVNode(_component_Pagination)
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(filteredImages.value, (slide, index) => {
                          _push4(ssrRenderComponent(unref(Slide), { key: index }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<img${ssrRenderAttr("alt", index)}${ssrRenderAttr("src", slide)} class="object-contain w-full h-[120vw] sm:h-[40vw]"${_scopeId4}>`);
                              } else {
                                return [
                                  createVNode("img", {
                                    alt: index,
                                    src: slide,
                                    class: "object-contain w-full h-[120vw] sm:h-[40vw]"
                                  }, null, 8, ["alt", "src"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredImages.value, (slide, index) => {
                            return openBlock(), createBlock(unref(Slide), { key: index }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  alt: index,
                                  src: slide,
                                  class: "object-contain w-full h-[120vw] sm:h-[40vw]"
                                }, null, 8, ["alt", "src"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-full" }, [
                      createVNode(unref(Carousel), {
                        "items-to-show": 1,
                        transition: 500,
                        "wrap-around": true,
                        class: "w-full"
                      }, {
                        addons: withCtx(() => [
                          createVNode(unref(Navigation)),
                          createVNode(_component_Pagination)
                        ]),
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredImages.value, (slide, index) => {
                            return openBlock(), createBlock(unref(Slide), { key: index }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  alt: index,
                                  src: slide,
                                  class: "object-contain w-full h-[120vw] sm:h-[40vw]"
                                }, null, 8, ["alt", "src"])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { product: __props.product }, null, 8, ["product"]),
              createVNode("hr"),
              Object.keys(__props.product) ? (openBlock(), createBlock("section", {
                key: 0,
                class: "py-12 mt-1 sm:py-16"
              }, [
                createVNode("div", { class: "" }, [
                  createVNode("div", { class: "grid grid-cols-1 gap-12 lg:col-gap-12 xl:col-gap-16 lg:-mt-12 lg:grid-cols-5 lg:gap-16" }, [
                    createVNode("div", { class: "lg:col-span-3 lg:row-end-1" }, [
                      createVNode("div", { class: "lg:flex" }, [
                        createVNode("div", { class: "flex-1 lg:order-2 lg:ml-5" }, [
                          createVNode("div", { class: "overflow-hidden w-full h-[300px] md:h-[500px] rounded-lg" }, [
                            createVNode("img", {
                              src: selectedImage.value,
                              alt: "",
                              class: "object-contain w-full h-[300px] md:h-[500px] cursor-pointer",
                              onClick: openImage
                            }, null, 8, ["src"])
                          ])
                        ]),
                        createVNode("div", { class: "w-full mt-2 lg:order-1 lg:w-32 lg:flex-shrink-0" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.product.images, (image, index) => {
                            return openBlock(), createBlock("div", { class: "flex flex-row items-start lg:flex-col" }, [
                              withDirectives(createVNode("button", {
                                class: [{
                                  "border-gray-900": (image == null ? void 0 : image.image1) === selectedImage.value
                                }, "h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"],
                                type: "button",
                                onClick: ($event) => selectImage(image == null ? void 0 : image.image1)
                              }, [
                                createVNode("img", {
                                  src: image == null ? void 0 : image.image1,
                                  alt: "",
                                  class: "object-cover w-full h-full"
                                }, null, 8, ["src"])
                              ], 10, ["onClick"]), [
                                [vShow, (image == null ? void 0 : image.image1) != null]
                              ]),
                              withDirectives(createVNode("button", {
                                class: [{
                                  "border-gray-900": (image == null ? void 0 : image.image2) === selectedImage.value
                                }, "h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"],
                                type: "button",
                                onClick: ($event) => selectImage(image == null ? void 0 : image.image2)
                              }, [
                                createVNode("img", {
                                  src: image == null ? void 0 : image.image2,
                                  alt: "",
                                  class: "object-cover w-full h-full"
                                }, null, 8, ["src"])
                              ], 10, ["onClick"]), [
                                [vShow, (image == null ? void 0 : image.image2) != null]
                              ]),
                              withDirectives(createVNode("button", {
                                class: [{
                                  "border-gray-900": (image == null ? void 0 : image.image3) === selectedImage.value
                                }, "h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"],
                                type: "button",
                                onClick: ($event) => selectImage(image == null ? void 0 : image.image3)
                              }, [
                                createVNode("img", {
                                  src: image.image3,
                                  alt: "",
                                  class: "object-cover w-full h-full"
                                }, null, 8, ["src"])
                              ], 10, ["onClick"]), [
                                [vShow, (image == null ? void 0 : image.image3) != null]
                              ]),
                              withDirectives(createVNode("button", {
                                class: [{
                                  "border-gray-900": (image == null ? void 0 : image.image4) === selectedImage.value
                                }, "h-20 mb-3 overflow-hidden text-center border-2 rounded-lg flex-0 aspect-square"],
                                type: "button",
                                onClick: ($event) => selectImage(image == null ? void 0 : image.image4)
                              }, [
                                createVNode("img", {
                                  src: image == null ? void 0 : image.image4,
                                  alt: "",
                                  class: "object-cover w-full h-full"
                                }, null, 8, ["src"])
                              ], 10, ["onClick"]), [
                                [vShow, (image == null ? void 0 : image.image4) != null]
                              ])
                            ]);
                          }), 256))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "lg:col-span-2 lg:row-span-2 lg:row-end-2" }, [
                      createVNode("div", { class: "flex items-start" }, [
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900 dark:text-slate-300 sm:text-3xl" }, toDisplayString(__props.product.name), 1),
                        createVNode("button", {
                          class: "px-2 py-2 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border rounded-md border-slate-500 bg-none focus:shadow",
                          type: "button",
                          onClick: ($event) => unref(wishlistStore).addProductInWishlist(
                            __props.product.id
                          )
                        }, [
                          createVNode(unref(HeartIcon), {
                            class: [
                              unref(wishlistStore).checkIfProductExistInWishlist(
                                __props.product.id
                              ) ? "text-red-500 fill-red-500" : "text-slate-700 dark:text-slate-300",
                              "w-6"
                            ]
                          }, null, 8, ["class"])
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "flex items-center justify-between mt-2" }, [
                        createVNode("img", {
                          src: (_c = __props.product.brand) == null ? void 0 : _c.image,
                          alt: "",
                          class: "w-16"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "flex items-center dark:text-slate-300" }, [
                          createVNode("div", { class: "flex items-center" }, toDisplayString(_ctx.__("product_code")) + ": ", 1),
                          createVNode("p", { class: "ml-2 text-sm font-medium text-gray-500" }, toDisplayString(__props.product.product_code), 1)
                        ])
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.product.attributes, (attribute, key) => {
                        return openBlock(), createBlock("div", { class: "border-t" }, [
                          ["cantitate", "Cantitate'"].includes(
                            key
                          ) && attribute.values.length > 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-col 2xs:items-center 2xs:flex-row 2xs:space-x-6"
                          }, [
                            createVNode("h2", { class: "my-2 text-base text-gray-900 dark:text-slate-300 sm:my-6" }, toDisplayString(attribute.name) + ": ", 1),
                            createVNode("div", { class: "flex flex-wrap items-center gap-1 select-none 2xs:my-3" }, [
                              withDirectives(createVNode("select", {
                                id: "color",
                                "onUpdate:modelValue": ($event) => selectedQty.value = $event,
                                class: "border rounded-md dark:bg-transparent dark:text-slate-300 border-slate-300 focus:border-none focus:outline-none",
                                onChange: ($event) => unref(router).visit(
                                  _ctx.route("product_page", {
                                    slug: selectedQty.value
                                  }),
                                  {
                                    only: ["product"],
                                    preserveScroll: true,
                                    preserveState: true
                                  }
                                )
                              }, [
                                createVNode("option", {
                                  class: "dark:bg-slate-600",
                                  disabled: "",
                                  value: "default"
                                }, toDisplayString(_ctx.__("select_qty")), 1),
                                (openBlock(true), createBlock(Fragment, null, renderList(attribute.values, (value, index) => {
                                  return openBlock(), createBlock("option", {
                                    key: index,
                                    value: value.link,
                                    class: "dark:bg-slate-600",
                                    selected: ""
                                  }, toDisplayString(value.value) + " " + toDisplayString(value.mu), 9, ["value"]);
                                }), 128))
                              ], 40, ["onUpdate:modelValue", "onChange"]), [
                                [vModelSelect, selectedQty.value]
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ]);
                      }), 256)),
                      createVNode("div", { class: "flex items-end py-6 my-1 space-x-2" }, [
                        !__props.product.has_discount ? (openBlock(), createBlock("h1", {
                          key: 0,
                          class: "text-3xl font-bold dark:text-slate-300"
                        }, toDisplayString(unref(formatPrice)(__props.product.price)), 1)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "flex flex-col space-x-2"
                        }, [
                          createVNode("span", { class: "flex space-x-2" }, [
                            createVNode("h1", { class: "text-xl font-bold line-through dark:text-slate-300 text-slate-400" }, toDisplayString(unref(formatPrice)(__props.product.price)), 1),
                            createVNode("span", { class: "px-1 my-auto text-sm font-semibold text-white bg-red-400 rounded" }, "-" + toDisplayString(__props.product.sale) + "%", 1)
                          ]),
                          createVNode("h1", { class: "text-3xl font-bold dark:text-slate-300" }, toDisplayString(unref(formatPrice)((_d = __props.product) == null ? void 0 : _d.promotion_price)), 1)
                        ])),
                        createVNode("h1", { class: "text-2xl font-medium dark:text-white" }, toDisplayString(_ctx.__("lei")), 1),
                        __props.product.mu ? (openBlock(), createBlock("h1", {
                          key: 2,
                          class: "text-xl font-light text-slate-500"
                        }, " / " + toDisplayString(__props.product.mu), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("div", {
                          class: "container-custom-rounded dark:bg-slate-800 mb-4 flex items-center space-x-4 p-2 border border-[#1FC8F3] cursor-pointer",
                          onClick: ($event) => openModal("cheaper")
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "dark:text-slate-300 bi bi-question-circle",
                            fill: "currentColor",
                            height: "20",
                            viewBox: "0 0 16 16",
                            width: "20",
                            xmlns: "http://www.w3.org/2000/svg"
                          }, [
                            createVNode("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" }),
                            createVNode("path", { d: "M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" })
                          ])),
                          createVNode("p", { class: "flex text-lg font-light dark:text-slate-300" }, toDisplayString(_ctx.__("found_cheaper")), 1)
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "flex flex-col py-4 space-y-2 border-t border-b dark:border-y-slate-600 sm:flex-row sm:space-x-2 sm:space-y-0" }, [
                        createVNode("button", {
                          class: "inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md sm:w-1/4 bg-primary-blue bg-none focus:shadow hover:bg-primary-blue-200",
                          type: "button",
                          onClick: ($event) => buyProduct(__props.product.id)
                        }, toDisplayString(_ctx.__("buy")), 9, ["onClick"]),
                        createVNode("button", {
                          class: "inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md bg-1 bg-none focus:shadow hover:bg-gray-800",
                          type: "button",
                          onClick: ($event) => openModal("buy_1_click")
                        }, toDisplayString(_ctx.__("buy_1_click")), 9, ["onClick"])
                      ]),
                      createVNode("div", null, [
                        __props.product.credits.length > 0 ? (openBlock(), createBlock("button", {
                          key: 0,
                          w: "",
                          class: "inline-flex items-center justify-center w-full px-12 py-3 text-base font-bold text-center text-white transition-all duration-200 ease-in-out border-2 border-transparent rounded-md bg-slate-500 bg-none focus:shadow hover:bg-slate-600",
                          type: "button",
                          onClick: ($event) => openModal("buy_in_credit")
                        }, toDisplayString(_ctx.__("buy_in_credit")), 9, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex items-center w-full p-3 mt-4 space-x-4 border container-custom-rounded dark:bg-slate-800 border-slate-400" }, [
                        (openBlock(), createBlock("svg", {
                          class: "dark:text-slate-300",
                          height: "2em",
                          viewBox: "0 0 32 32",
                          width: "2em",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M4 16h12v2H4zm-2-5h10v2H2z",
                            fill: "currentColor"
                          }),
                          createVNode("path", {
                            d: "m29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394M9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m14-15h2.34l2.144 5H23Zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2m5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z",
                            fill: "currentColor"
                          })
                        ])),
                        createVNode("div", { class: "flex flex-col items-center text-center dark:text-slate-300" }, [
                          createVNode("p", { class: "flex text-lg font-medium" }, toDisplayString(_ctx.__("delivery_info")), 1),
                          createVNode("p", { class: "flex text-sm font-light underline" }, toDisplayString(_ctx.__("delivery_aditional_info")), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "lg:col-span-3" }, [
                      createVNode("div", { class: "border-b border-gray-300 dark:border-slate-500" }, [
                        createVNode("nav", { class: "flex gap-4" }, [
                          createVNode("a", {
                            class: [{
                              "transition delay-150 border-b-2 border-gray-500": specifications.value,
                              "border-transparent": !specifications.value
                            }, "py-4 text-sm font-medium text-gray-900 dark:text-slate-300 hover:border-gray-400 hover:text-gray-800"],
                            href: "#",
                            title: "specifications",
                            onClick: withModifiers(($event) => setActiveTab("specifications"), ["prevent"])
                          }, toDisplayString(_ctx.__("specifications")), 11, ["onClick"]),
                          createVNode("a", {
                            class: [{
                              "transition delay-150 border-b-2 border-gray-500": description.value,
                              "border-transparent": !description.value
                            }, "py-4 text-sm font-medium text-gray-900 dark:text-slate-300 hover:border-gray-400 hover:text-gray-800"],
                            href: "#",
                            title: "description",
                            onClick: withModifiers(($event) => setActiveTab("description"), ["prevent"])
                          }, toDisplayString(_ctx.__("description")), 11, ["onClick"])
                        ])
                      ]),
                      withDirectives(createVNode("div", {
                        id: "description",
                        class: "flow-root mt-8 sm:mt-12"
                      }, [
                        createVNode("h1", { class: "text-3xl font-bold dark:text-slate-300" }, toDisplayString(__props.product.name), 1),
                        createVNode("p", { class: "mt-4 dark:text-slate-300" }, toDisplayString(__props.product.description), 1)
                      ], 512), [
                        [vShow, description.value]
                      ]),
                      withDirectives(createVNode("div", { class: "flow-root mt-8 sm:mt-2" }, [
                        createVNode("div", { class: "relative my-4 overflow-x-auto" }, [
                          createVNode("table", { class: "w-full text-sm text-left text-gray-500 bg-red-200 border dark:border-slate-600 rtl:text-right dark:text-gray-400" }, [
                            createVNode("tbody", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.product.attributes, (attribute, key) => {
                                return openBlock(), createBlock("tr", {
                                  key,
                                  class: "bg-white border dark:bg-gray-800 da odd:bg-white even:bg-slate-100 dark:odd:bg-slate-700 dark:even:bg-slate-800 dark:border-slate-600"
                                }, [
                                  attribute.name ? (openBlock(), createBlock("td", {
                                    key: 0,
                                    class: "px-6 py-4 font-medium whitespace-nowrap capitalize-first"
                                  }, toDisplayString(attribute.name) + ": ", 1)) : createCommentVNode("", true),
                                  attribute.name ? (openBlock(), createBlock("td", {
                                    key: 1,
                                    class: "px-6 py-4 whitespace-nowrap capitalize-first"
                                  }, [
                                    createVNode("div", { class: "flex space-x-2" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(attribute.values, (value) => {
                                        return openBlock(), createBlock("p", { class: "capitalize-first" }, toDisplayString(value.value === "1" ? _ctx.__("yes") : value.value === "0" ? _ctx.__("no") : value.value), 1);
                                      }), 256))
                                    ])
                                  ])) : createCommentVNode("", true)
                                ]);
                              }), 128))
                            ])
                          ])
                        ])
                      ], 512), [
                        [vShow, specifications.value]
                      ])
                    ])
                  ])
                ]),
                createVNode(_sfc_main$4, {
                  product: __props.product,
                  title: modalTitle.value,
                  type: typeModal.value,
                  visible: isOpen.value,
                  onClose: ($event) => isOpen.value = false,
                  onSelect: ($event) => console.log($event)
                }, null, 8, ["product", "title", "type", "visible", "onClose", "onSelect"])
              ])) : createCommentVNode("", true),
              createVNode("hr"),
              unref(attrs).last_visited.length !== 0 ? (openBlock(), createBlock(_sfc_main$5, {
                key: 1,
                new_products: true,
                products: unref(attrs).last_visited,
                title: _ctx.__("visited_products")
              }, null, 8, ["products", "title"])) : createCommentVNode("", true),
              createVNode(_sfc_main$1, {
                "is-open": openModalSlider.value,
                onCloseModal: openImage
              }, {
                content: withCtx(() => [
                  createVNode("div", { class: "w-full" }, [
                    createVNode(unref(Carousel), {
                      "items-to-show": 1,
                      transition: 500,
                      "wrap-around": true,
                      class: "w-full"
                    }, {
                      addons: withCtx(() => [
                        createVNode(unref(Navigation)),
                        createVNode(_component_Pagination)
                      ]),
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredImages.value, (slide, index) => {
                          return openBlock(), createBlock(unref(Slide), { key: index }, {
                            default: withCtx(() => [
                              createVNode("img", {
                                alt: index,
                                src: slide,
                                class: "object-contain w-full h-[120vw] sm:h-[40vw]"
                              }, null, 8, ["alt", "src"])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["is-open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/ProductPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

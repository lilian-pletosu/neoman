import { getCurrentInstance, resolveComponent, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext, useAttrs, createTextVNode, toDisplayString } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./FrontLayout-77cff396.js";
/* empty css                   */import { Carousel, Navigation, Slide } from "vue3-carousel";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.js";
import { _ as _sfc_main$3 } from "./ProductSection-6f127f9e.js";
import "./ApplicationLogo-caba15c6.js";
import "@heroicons/vue/24/outline/index.js";
import "pinia";
import "axios";
import "@vueuse/core";
import "@headlessui/vue";
import "radix-vue";
import "@iconify/vue";
import "ziggy-js";
import "./Dropdown-7075589d.js";
import "@heroicons/vue/24/solid/index.js";
import "./PrimaryButton-84eba42e.js";
import "./ShortLogo-3a83a5f7.js";
import "swiper/vue";
import "swiper/modules";
const CarouselFront_vue_vue_type_style_index_0_scoped_c68a7a2c_lang = "";
const _sfc_main$1 = {
  __name: "CarouselFront",
  __ssrInlineRender: true,
  setup(__props) {
    const app = getCurrentInstance();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Pagination = resolveComponent("Pagination");
      _push(ssrRenderComponent(unref(Carousel), mergeProps({
        autoplay: 5e3,
        "wrap-around": true,
        "items-to-show": 1,
        class: "w-screen z-0",
        transition: 500
      }, _attrs), {
        addons: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Navigation), null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Pagination, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Navigation)),
              createVNode(_component_Pagination)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(app).appContext.config.globalProperties.$page.props.home_banners, (slide, index) => {
              _push2(ssrRenderComponent(unref(Slide), { key: index }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: slide.link
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img class="object-cover w-screen flex"${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", slide.title)} data-v-c68a7a2c${_scopeId3}>`);
                        } else {
                          return [
                            createVNode("img", {
                              class: "object-cover w-screen flex",
                              src: slide.image,
                              alt: slide.title
                            }, null, 8, ["src", "alt"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Link), {
                        href: slide.link
                      }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            class: "object-cover w-screen flex",
                            src: slide.image,
                            alt: slide.title
                          }, null, 8, ["src", "alt"])
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(app).appContext.config.globalProperties.$page.props.home_banners, (slide, index) => {
                return openBlock(), createBlock(unref(Slide), { key: index }, {
                  default: withCtx(() => [
                    createVNode(unref(Link), {
                      href: slide.link
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          class: "object-cover w-screen flex",
                          src: slide.image,
                          alt: slide.title
                        }, null, 8, ["src", "alt"])
                      ]),
                      _: 2
                    }, 1032, ["href"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CarouselFront.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CarouselFront = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c68a7a2c"]]);
const _sfc_main = {
  __name: "HomePage",
  __ssrInlineRender: true,
  props: {
    sales_products: {
      type: Object
    },
    all_products: {
      type: Object
    },
    latest_products: {
      type: Object
    }
  },
  setup(__props) {
    const attrs = useAttrs();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        "current-language": unref(attrs).current_locale,
        title: "Pagina principală"
      }, _attrs), {
        carousel: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CarouselFront, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(CarouselFront)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              products: __props.sales_products,
              sale: true,
              title: _ctx.__("sales_products"),
              onAddProductInCart: (args) => _ctx.addProductIncart(args)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              products: __props.sales_products,
              seasons_products: true,
              title: _ctx.__("season_products")
            }, null, _parent2, _scopeId));
            _push2(`<section class="relative bg-gray-900 text-white h-[600px] flex rounded text-center bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1770&amp;q=80)] bg-cover bg-center bg-no-repeat"${_scopeId}><div class="absolute inset-0 bg-black bg-opacity-50 rounded"${_scopeId}></div><div class="relative flex flex-col mx-4 md:mx-auto my-auto"${_scopeId}><h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"${_scopeId}> Neoman <span class="sm:block"${_scopeId}> Alături la fiecare etapă în viață </span></h1><div class="mt-8 flex flex-wrap justify-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              class: "block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto",
              href: "#"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.__("get_started"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.__("get_started")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              class: "block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto",
              href: _ctx.route("about_page")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.__("learn_more"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.__("learn_more")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              products: __props.sales_products,
              title: _ctx.__("top_products"),
              top_products: true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              new_products: true,
              products: __props.latest_products,
              title: _ctx.__("latest_products")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, {
                products: __props.sales_products,
                sale: true,
                title: _ctx.__("sales_products"),
                onAddProductInCart: (args) => _ctx.addProductIncart(args)
              }, null, 8, ["products", "title", "onAddProductInCart"]),
              createVNode(_sfc_main$3, {
                products: __props.sales_products,
                seasons_products: true,
                title: _ctx.__("season_products")
              }, null, 8, ["products", "title"]),
              createVNode("section", { class: "relative bg-gray-900 text-white h-[600px] flex rounded text-center bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat" }, [
                createVNode("div", { class: "absolute inset-0 bg-black bg-opacity-50 rounded" }),
                createVNode("div", { class: "relative flex flex-col mx-4 md:mx-auto my-auto" }, [
                  createVNode("h1", { class: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl" }, [
                    createTextVNode(" Neoman "),
                    createVNode("span", { class: "sm:block" }, " Alături la fiecare etapă în viață ")
                  ]),
                  createVNode("div", { class: "mt-8 flex flex-wrap justify-center gap-4" }, [
                    createVNode(unref(Link), {
                      class: "block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto",
                      href: "#"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.__("get_started")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      class: "block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto",
                      href: _ctx.route("about_page")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.__("learn_more")), 1)
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ]),
              createVNode(_sfc_main$3, {
                products: __props.sales_products,
                title: _ctx.__("top_products"),
                top_products: true
              }, null, 8, ["products", "title"]),
              createVNode(_sfc_main$3, {
                new_products: true,
                products: __props.latest_products,
                title: _ctx.__("latest_products")
              }, null, 8, ["products", "title"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/HomePage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

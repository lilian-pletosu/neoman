import { useAttrs, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./FrontLayout-43d5da65.js";
import { _ as _sfc_main$2 } from "./ProductSection-1fdf9caf.js";
import { Link } from "@inertiajs/vue3";
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
import "swiper/vue";
import "swiper/modules";
const _sfc_main = {
  __name: "SubcategoryPage",
  __ssrInlineRender: true,
  props: {
    subcategory: {
      type: Object
    }
  },
  setup(__props) {
    const attrs = useAttrs();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Pagina principală" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<hr${_scopeId}><section class="py-6 bg-white"${_scopeId}><div class="container mx-auto max-w-[1300px]"${_scopeId}><h1 class="pb-10 text-lg font-bold border-b font-mulish md:text-xl lg:text-2xl"${_scopeId}>${ssrInterpolate(__props.subcategory.name)}</h1><div class="grid grid-cols-1 pt-12 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16"${_scopeId}><!--[-->`);
            ssrRenderList(__props.subcategory.sub_subcategory, (subSubcategory) => {
              _push2(`<div class="relative flex flex-col h-48 text-gray-700 bg-white shadow-md group rounded-xl bg-clip-border"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("products_page", {
                  subSubcategory: subSubcategory.slug
                }),
                class: "block"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="h-28"${_scopeId2}><div class="absolute bg-cover -top-20 lg:top-[-10%] left-[5%] group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 rounded-xl justify-items-center align-middle"${_scopeId2}><img${ssrRenderAttr("src", subSubcategory.image)} class="m-auto mt-6 w-80 h-44 mix-blend-multiply" alt="Automotive" title="Automotive" loading="lazy" width="200" height="200"${_scopeId2}></div></div><div class="w-full p-6"${_scopeId2}><p class="w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg md:hidden md:group-hover:inline-block"${_scopeId2}>${ssrInterpolate(subSubcategory.name)}</p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "h-28" }, [
                        createVNode("div", { class: "absolute bg-cover -top-20 lg:top-[-10%] left-[5%] group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 rounded-xl justify-items-center align-middle" }, [
                          createVNode("img", {
                            src: subSubcategory.image,
                            class: "m-auto mt-6 w-80 h-44 mix-blend-multiply",
                            alt: "Automotive",
                            title: "Automotive",
                            loading: "lazy",
                            width: "200",
                            height: "200"
                          }, null, 8, ["src"])
                        ])
                      ]),
                      createVNode("div", { class: "w-full p-6" }, [
                        createVNode("p", { class: "w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg md:hidden md:group-hover:inline-block" }, toDisplayString(subSubcategory.name), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></section><hr${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: _ctx.__("latest_products"),
              new_products: true,
              products: unref(attrs).latest_products
            }, null, _parent2, _scopeId));
            if (unref(attrs).last_visited.length !== 0) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                title: _ctx.__("visited_products"),
                new_products: true,
                products: unref(attrs).last_visited
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("hr"),
              createVNode("section", { class: "py-6 bg-white" }, [
                createVNode("div", { class: "container mx-auto max-w-[1300px]" }, [
                  createVNode("h1", { class: "pb-10 text-lg font-bold border-b font-mulish md:text-xl lg:text-2xl" }, toDisplayString(__props.subcategory.name), 1),
                  createVNode("div", { class: "grid grid-cols-1 pt-12 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.subcategory.sub_subcategory, (subSubcategory) => {
                      return openBlock(), createBlock("div", { class: "relative flex flex-col h-48 text-gray-700 bg-white shadow-md group rounded-xl bg-clip-border" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("products_page", {
                            subSubcategory: subSubcategory.slug
                          }),
                          class: "block"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "h-28" }, [
                              createVNode("div", { class: "absolute bg-cover -top-20 lg:top-[-10%] left-[5%] group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 rounded-xl justify-items-center align-middle" }, [
                                createVNode("img", {
                                  src: subSubcategory.image,
                                  class: "m-auto mt-6 w-80 h-44 mix-blend-multiply",
                                  alt: "Automotive",
                                  title: "Automotive",
                                  loading: "lazy",
                                  width: "200",
                                  height: "200"
                                }, null, 8, ["src"])
                              ])
                            ]),
                            createVNode("div", { class: "w-full p-6" }, [
                              createVNode("p", { class: "w-full mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-center text-tg md:hidden md:group-hover:inline-block" }, toDisplayString(subSubcategory.name), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["href"])
                      ]);
                    }), 256))
                  ])
                ])
              ]),
              createVNode("hr"),
              createVNode(_sfc_main$2, {
                title: _ctx.__("latest_products"),
                new_products: true,
                products: unref(attrs).latest_products
              }, null, 8, ["title", "products"]),
              unref(attrs).last_visited.length !== 0 ? (openBlock(), createBlock(_sfc_main$2, {
                key: 0,
                title: _ctx.__("visited_products"),
                new_products: true,
                products: unref(attrs).last_visited
              }, null, 8, ["title", "products"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/User/SubcategoryPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

import { ref, onMounted, watch, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, withModifiers, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AdminLayout-fd678994.js";
import { _ as _sfc_main$2 } from "./SecondaryButton-0974b11b.js";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { _ as _sfc_main$3 } from "./Modal-4741da5a.js";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./BlackSelector-1fd5a2aa.js";
import { TrashIcon } from "@heroicons/vue/20/solid";
import { useForm, router } from "@inertiajs/vue3";
import "@heroicons/vue/20/solid/index.js";
import "./Dropdown-7075589d.js";
import "./ShortLogo-3a83a5f7.js";
import "ziggy-js";
import "./_plugin-vue_export-helper-cc2b3d55.js";
import "@heroicons/vue/24/outline/index.js";
const _sfc_main = {
  __name: "Product",
  __ssrInlineRender: true,
  props: {
    initialRoute: {
      type: String
    },
    resourceType: {
      type: String
    },
    product: {
      type: Object
    },
    creditsSettings: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const closeModal = () => {
      isOpen.value = false;
      form.reset();
    };
    const isOpen = ref(false);
    const form = useForm({
      num_of_installments: "",
      interest_rate: "",
      type: ""
    });
    useForm({
      image: null
    });
    const credits = ref([]);
    const installments = ref([]);
    const filtredCredits = () => {
      credits.value = props.product.credits.filter((credit) => {
        return credit.type === "credit";
      });
    };
    const filtredInstallments = () => {
      installments.value = props.product.credits.filter((credit) => {
        return credit.type === "installments";
      });
    };
    const submitCredits = () => {
      router.post(
        route("admin.update-credits-options", {
          product: props.product
        }),
        {
          form
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            closeModal();
            filtredCredits();
            filtredInstallments();
          }
        }
      );
    };
    const images = ref([]);
    const isOrderChanged = ref(false);
    const startDrag = (event, index) => {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("index", index);
    };
    const onOver = (event) => event.target.classList.add("on-over");
    const onLeave = (event) => event.target.classList.remove("on-over");
    const onDrop = (event, index) => {
      isOrderChanged.value = true;
      onLeave(event);
      const draggedIndex = parseInt(event.dataTransfer.getData("index"));
      const draggedItem = images.value[draggedIndex];
      images.value.splice(draggedIndex, 1);
      images.value.splice(index, 0, draggedItem);
    };
    function imageUrls() {
      const imagesObject = props.product.images[0];
      return Object.entries(imagesObject).filter(([key, value]) => key.startsWith("image") && value !== null).map(([, value]) => value);
    }
    onMounted(() => {
      filtredCredits();
      filtredInstallments();
      images.value = imageUrls();
    });
    const submitSortedImages = () => {
      router.put(
        route("admin.update-images-order", {
          product: props.product
        }),
        {
          images: images.value
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            isOrderChanged.value = false;
          }
        }
      );
    };
    const uploadedImage = ref(null);
    const deleteCredit = (creditId) => {
      router.delete(
        route("admin.delete-credit-from-product", {
          product: props.product.id,
          credit: creditId
        }),
        {
          preserveScroll: true,
          onSuccess: () => {
            filtredCredits();
            filtredInstallments();
          },
          only: ["product"]
        }
      );
    };
    const submitImage = () => {
      router.post(
        route("admin.update-product-image", {
          product: props.product
        }),
        {
          image: uploadedImage.value
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            images.value = imageUrls();
          }
        }
      );
    };
    watch(isOrderChanged, () => {
      submitSortedImages();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        "current-route": __props.initialRoute,
        title: "Products"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid w-full grid-cols-1 gap-4"${_scopeId}><div class="container-rounded"${_scopeId}><div class="max-w-full px-4 mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="flex flex-col -mx-4 md:flex-row"${_scopeId}><div class="px-4 md:flex-1"${_scopeId}><div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4"${_scopeId}><img class="object-cover w-full h-full"${ssrRenderAttr("src", __props.product.images_image1)} alt="Product Image"${_scopeId}></div><div class="flex mb-4 -mx-2"${_scopeId}><!--[-->`);
            ssrRenderList(images.value, (image, index) => {
              _push2(`<div class="flex gap-2 cursor-move" draggable="true"${_scopeId}><img${ssrRenderAttr("src", image)} class="w-20 h-20"${ssrRenderAttr("alt", `Image ${index + 1}`)}${_scopeId}></div>`);
            });
            _push2(`<!--]--></div>`);
            if (images.value.length != 4) {
              _push2(`<div class="flex items-center gap-4 border"${_scopeId}><input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" type="file"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, { onClick: submitImage }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Încarcă`);
                  } else {
                    return [
                      createTextVNode("Încarcă")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="px-4 md:flex-1"${_scopeId}><h2 class="mb-2 text-2xl font-bold text-gray-800 dark:text-white"${_scopeId}>${ssrInterpolate(__props.product.name)}</h2><p class="mb-4 text-sm text-gray-600 dark:text-gray-300"${_scopeId}>${ssrInterpolate(__props.product.description)}</p><div class="flex mb-4"${_scopeId}><div class="mr-4"${_scopeId}><span class="font-bold text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(_ctx.__("price"))}: </span><span class="text-gray-600 dark:text-gray-300"${_scopeId}>${ssrInterpolate(__props.product.price)} MDL</span></div></div><div class="mb-4"${_scopeId}><span class="font-bold text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(_ctx.__("credit"))}:</span><div class="flex flex-wrap items-center gap-2 mt-2"${_scopeId}><!--[-->`);
            ssrRenderList(credits.value, (credit) => {
              _push2(`<span class="relative px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 group/credit"${_scopeId}>${ssrInterpolate(credit.num_of_installments)} ${ssrInterpolate(_ctx.__("months"))} - ${ssrInterpolate(credit.interest_rate)} % `);
              _push2(ssrRenderComponent(unref(TrashIcon), {
                onClick: ($event) => deleteCredit(credit.id),
                class: "absolute top-0 right-0 hidden w-3.5 h-3.5 cursor-pointer group-hover/credit:flex group-hover/credit:text-red-400"
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            });
            _push2(`<!--]--></div></div><div class="mb-4"${_scopeId}><span class="font-bold text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(_ctx.__("installments"))}:</span><div class="flex items-center mt-2"${_scopeId}><!--[-->`);
            ssrRenderList(installments.value, (installment) => {
              _push2(`<span class="relative px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 group/installment"${_scopeId}>${ssrInterpolate(installment.num_of_installments)} ${ssrInterpolate(_ctx.__("months"))} - ${ssrInterpolate(installment.interest_rate)} % `);
              _push2(ssrRenderComponent(unref(TrashIcon), {
                onClick: ($event) => deleteCredit(installment.id),
                class: "absolute top-0 right-0 hidden w-3.5 h-3.5 cursor-pointer group-hover/installment:flex group-hover/installment:text-red-400"
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            });
            _push2(`<!--]--></div><div class="flex mt-6 mb-4 -mx-2"${_scopeId}><div class="w-full px-2"${_scopeId}><button class="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded-full dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700"${_scopeId}> Adaugă posibilitățile de creditare </button></div></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              show: isOpen.value,
              closeable: true,
              onClose: closeModal,
              actions: false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col w-full gap-2 p-4 mt-8"${_scopeId2}><div class="flex justify-between gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    type: "text",
                    class: "w-full",
                    modelValue: unref(form).num_of_installments,
                    "onUpdate:modelValue": ($event) => unref(form).num_of_installments = $event,
                    label: "Număr de luni"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    type: "text",
                    class: "w-full",
                    modelValue: unref(form).interest_rate,
                    "onUpdate:modelValue": ($event) => unref(form).interest_rate = $event,
                    label: "Rata dobânzii"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    modelValue: unref(form).type,
                    "onUpdate:modelValue": ($event) => unref(form).type = $event,
                    "onUpdate:status": ($event) => unref(form).type = $event,
                    options: [
                      {
                        id: "credit",
                        value: "credit",
                        label: "Credit"
                      },
                      {
                        id: "installments",
                        value: "installments",
                        label: "Installments"
                      }
                    ],
                    value: unref(form).type,
                    "error-message": _ctx.__(unref(form).errors.type),
                    label: _ctx.__("type")
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex justify-end mt-6 mb-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    class: "mx-2",
                    onClick: closeModal
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.__("cancel"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(PrimaryButton, {
                    onClick: submitCredits,
                    class: "mx-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.__("submit"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col w-full gap-2 p-4 mt-8" }, [
                      createVNode("div", { class: "flex justify-between gap-2" }, [
                        createVNode(_sfc_main$4, {
                          type: "text",
                          class: "w-full",
                          modelValue: unref(form).num_of_installments,
                          "onUpdate:modelValue": ($event) => unref(form).num_of_installments = $event,
                          label: "Număr de luni"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$4, {
                          type: "text",
                          class: "w-full",
                          modelValue: unref(form).interest_rate,
                          "onUpdate:modelValue": ($event) => unref(form).interest_rate = $event,
                          label: "Rata dobânzii"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode(_sfc_main$5, {
                        modelValue: unref(form).type,
                        "onUpdate:modelValue": ($event) => unref(form).type = $event,
                        "onUpdate:status": ($event) => unref(form).type = $event,
                        options: [
                          {
                            id: "credit",
                            value: "credit",
                            label: "Credit"
                          },
                          {
                            id: "installments",
                            value: "installments",
                            label: "Installments"
                          }
                        ],
                        value: unref(form).type,
                        "error-message": _ctx.__(unref(form).errors.type),
                        label: _ctx.__("type")
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onUpdate:status", "value", "error-message", "label"])
                    ]),
                    createVNode("div", { class: "flex justify-end mt-6 mb-4" }, [
                      createVNode(_sfc_main$2, {
                        class: "mx-2",
                        onClick: closeModal
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(PrimaryButton, {
                        onClick: submitCredits,
                        class: "mx-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid w-full grid-cols-1 gap-4" }, [
                createVNode("div", { class: "container-rounded" }, [
                  createVNode("div", { class: "max-w-full px-4 mx-auto sm:px-6 lg:px-8" }, [
                    createVNode("div", { class: "flex flex-col -mx-4 md:flex-row" }, [
                      createVNode("div", { class: "px-4 md:flex-1" }, [
                        createVNode("div", { class: "h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4" }, [
                          createVNode("img", {
                            class: "object-cover w-full h-full",
                            src: __props.product.images_image1,
                            alt: "Product Image"
                          }, null, 8, ["src"])
                        ]),
                        createVNode("div", { class: "flex mb-4 -mx-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(images.value, (image, index) => {
                            return openBlock(), createBlock("div", {
                              class: "flex gap-2 cursor-move",
                              key: index,
                              draggable: "true",
                              onDragenter: withModifiers(() => {
                              }, ["prevent"]),
                              onDragstart: ($event) => startDrag($event, index),
                              onDrop: ($event) => onDrop($event, index),
                              onDragover: withModifiers(($event) => onOver($event), ["prevent"]),
                              onDragleave: withModifiers(($event) => onLeave($event), ["prevent"])
                            }, [
                              createVNode("img", {
                                src: image,
                                class: "w-20 h-20",
                                alt: `Image ${index + 1}`
                              }, null, 8, ["src", "alt"])
                            ], 40, ["onDragenter", "onDragstart", "onDrop", "onDragover", "onDragleave"]);
                          }), 128))
                        ]),
                        images.value.length != 4 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center gap-4 border"
                        }, [
                          createVNode("input", {
                            onChange: ($event) => uploadedImage.value = $event.target.files[0],
                            class: "block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
                            id: "image",
                            type: "file"
                          }, null, 40, ["onChange"]),
                          createVNode(_sfc_main$2, { onClick: submitImage }, {
                            default: withCtx(() => [
                              createTextVNode("Încarcă")
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "px-4 md:flex-1" }, [
                        createVNode("h2", { class: "mb-2 text-2xl font-bold text-gray-800 dark:text-white" }, toDisplayString(__props.product.name), 1),
                        createVNode("p", { class: "mb-4 text-sm text-gray-600 dark:text-gray-300" }, toDisplayString(__props.product.description), 1),
                        createVNode("div", { class: "flex mb-4" }, [
                          createVNode("div", { class: "mr-4" }, [
                            createVNode("span", { class: "font-bold text-gray-700 dark:text-gray-300" }, toDisplayString(_ctx.__("price")) + ": ", 1),
                            createVNode("span", { class: "text-gray-600 dark:text-gray-300" }, toDisplayString(__props.product.price) + " MDL", 1)
                          ])
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("span", { class: "font-bold text-gray-700 dark:text-gray-300" }, toDisplayString(_ctx.__("credit")) + ":", 1),
                          createVNode("div", { class: "flex flex-wrap items-center gap-2 mt-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(credits.value, (credit) => {
                              return openBlock(), createBlock("span", {
                                key: credit.id,
                                class: "relative px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 group/credit"
                              }, [
                                createTextVNode(toDisplayString(credit.num_of_installments) + " " + toDisplayString(_ctx.__("months")) + " - " + toDisplayString(credit.interest_rate) + " % ", 1),
                                createVNode(unref(TrashIcon), {
                                  onClick: ($event) => deleteCredit(credit.id),
                                  class: "absolute top-0 right-0 hidden w-3.5 h-3.5 cursor-pointer group-hover/credit:flex group-hover/credit:text-red-400"
                                }, null, 8, ["onClick"])
                              ]);
                            }), 128))
                          ])
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("span", { class: "font-bold text-gray-700 dark:text-gray-300" }, toDisplayString(_ctx.__("installments")) + ":", 1),
                          createVNode("div", { class: "flex items-center mt-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(installments.value, (installment) => {
                              return openBlock(), createBlock("span", {
                                key: installment.id,
                                class: "relative px-4 py-2 mr-2 font-bold text-gray-700 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 group/installment"
                              }, [
                                createTextVNode(toDisplayString(installment.num_of_installments) + " " + toDisplayString(_ctx.__("months")) + " - " + toDisplayString(installment.interest_rate) + " % ", 1),
                                createVNode(unref(TrashIcon), {
                                  onClick: ($event) => deleteCredit(installment.id),
                                  class: "absolute top-0 right-0 hidden w-3.5 h-3.5 cursor-pointer group-hover/installment:flex group-hover/installment:text-red-400"
                                }, null, 8, ["onClick"])
                              ]);
                            }), 128))
                          ]),
                          createVNode("div", { class: "flex mt-6 mb-4 -mx-2" }, [
                            createVNode("div", { class: "w-full px-2" }, [
                              createVNode("button", {
                                onClick: ($event) => isOpen.value = true,
                                class: "w-full px-4 py-2 font-bold text-white bg-gray-900 rounded-full dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700"
                              }, " Adaugă posibilitățile de creditare ", 8, ["onClick"])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode(_sfc_main$3, {
                      show: isOpen.value,
                      closeable: true,
                      onClose: closeModal,
                      actions: false
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col w-full gap-2 p-4 mt-8" }, [
                          createVNode("div", { class: "flex justify-between gap-2" }, [
                            createVNode(_sfc_main$4, {
                              type: "text",
                              class: "w-full",
                              modelValue: unref(form).num_of_installments,
                              "onUpdate:modelValue": ($event) => unref(form).num_of_installments = $event,
                              label: "Număr de luni"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$4, {
                              type: "text",
                              class: "w-full",
                              modelValue: unref(form).interest_rate,
                              "onUpdate:modelValue": ($event) => unref(form).interest_rate = $event,
                              label: "Rata dobânzii"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(_sfc_main$5, {
                            modelValue: unref(form).type,
                            "onUpdate:modelValue": ($event) => unref(form).type = $event,
                            "onUpdate:status": ($event) => unref(form).type = $event,
                            options: [
                              {
                                id: "credit",
                                value: "credit",
                                label: "Credit"
                              },
                              {
                                id: "installments",
                                value: "installments",
                                label: "Installments"
                              }
                            ],
                            value: unref(form).type,
                            "error-message": _ctx.__(unref(form).errors.type),
                            label: _ctx.__("type")
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onUpdate:status", "value", "error-message", "label"])
                        ]),
                        createVNode("div", { class: "flex justify-end mt-6 mb-4" }, [
                          createVNode(_sfc_main$2, {
                            class: "mx-2",
                            onClick: closeModal
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(PrimaryButton, {
                            onClick: submitCredits,
                            class: "mx-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }, 8, ["show"])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Product.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};

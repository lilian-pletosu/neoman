import { ref, useSSRContext, onMounted, mergeProps, unref, withCtx, createVNode, getCurrentInstance, useAttrs, onUpdated, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, renderList, withModifiers, isRef } from "vue";
import { ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./Modal-4741da5a.js";
import { useForm, router } from "@inertiajs/vue3";
import { _ as _sfc_main$5, a as _sfc_main$6 } from "./BlackSelector-1fd5a2aa.js";
import { _ as _sfc_main$7 } from "./SecondaryButton-0974b11b.js";
import { P as PrimaryButton } from "./PrimaryButton-84eba42e.js";
import { ProgressRoot, ProgressIndicator } from "radix-vue";
const _sfc_main$3 = {
  __name: "Description",
  __ssrInlineRender: true,
  props: {
    resource: {
      type: Object
    },
    resourceModal: {
      type: Object
    },
    columns: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const readActivated = ref(false);
    const applyFormat = (columnName, columnValue) => {
      if (columnName === "is_enabled") {
        if (columnValue === 1) {
          return "active";
        }
        return "inactive";
      }
      return columnValue;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(__props.columns, (column) => {
        _push(`<div class="mb-2">`);
        if (!["image", "id"].includes(column)) {
          _push(`<!--[--><span class="mr-2 uppercase secondary-text">${ssrInterpolate(_ctx.__(column))}</span><div class="${ssrRenderClass({ "rounded w-14 flex justify-center": column === "is_enabled" })}" class="${ssrRenderClass({ "bg-green-400 font-semibold ": __props.resourceModal[column] === 1, "bg-red-400 font-semibold": __props.resourceModal[column] === 0 })}">`);
          if (["description"].includes(column)) {
            _push(`<div>`);
            if (!readActivated.value) {
              _push(`<p class="">${ssrInterpolate(__props.resourceModal[column] ? __props.resourceModal[column].slice(0, 50) : "-")} `);
              if (!readActivated.value) {
                _push(`<span class="read font-extrabold">..read more</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</p>`);
            } else {
              _push(`<!---->`);
            }
            if (readActivated.value) {
              _push(`<p class="font-bold">${ssrInterpolate(applyFormat(column, __props.resourceModal[column]))}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else if (["price", "mu"].includes(column)) {
            _push(`<div><table><tr><td class="font-bold">${ssrInterpolate(__props.resourceModal["price"] + " MDL  / " + __props.resourceModal["mu"])}</td></tr></table></div>`);
          } else if (["attributes"].includes(column)) {
            _push(`<div><!--[-->`);
            ssrRenderList(__props.resourceModal[column], (attribute) => {
              _push(`<table class="w-full"><tr class="flex border-b"><td class="font-bold">${ssrInterpolate(attribute.name + " - ")}</td><td>${ssrInterpolate(__props.resourceModal.attribute_name[attribute.name] ?? _ctx.__("not_set"))}</td></tr></table>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<div class="flex"><p class="text-sm font-bold">${ssrInterpolate(_ctx.__(applyFormat(column, __props.resourceModal[column] ?? __props.resource[column])))}</p></div>`);
          }
          _push(`</div><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Description.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "ImageSlider",
  __ssrInlineRender: true,
  props: {
    images: {
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    resourceType: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const currentSlideIndex = ref(0);
    const maxSlideIndex = ref(0);
    const indexes = () => {
      for (let column of props.columns) {
        console.log(column.label);
        if (["image", "images"].includes(column.label)) {
          for (let columnElement of column.fields) {
            if (props.images && props.images[0] && columnElement && props.images[0][columnElement] != null) {
              maxSlideIndex.value++;
            }
          }
        }
      }
    };
    onMounted(() => {
      indexes();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "default-carousel",
        class: "relative w-full",
        "data-carousel": "slide"
      }, _attrs))}><div class="relative h-56 overflow-hidden rounded-lg md:h-96"><div class="duration-700 ease-in-out" data-carousel-item><!--[-->`);
      ssrRenderList(__props.columns, (column) => {
        _push(`<!--[-->`);
        if (["image", "images"].includes(column.label)) {
          _push(`<!--[-->`);
          if (__props.images && __props.images[0] && column.fields && column.fields[currentSlideIndex.value] && __props.images[0][column.fields[currentSlideIndex.value]]) {
            _push(`<img${ssrRenderAttr("src", _ctx.asset(`${__props.images[0][column.fields[currentSlideIndex.value]]}`))} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">`);
          } else {
            _push(`<!---->`);
          }
          if (__props.images && __props.images[0] && column.fields && column.fields[currentSlideIndex.value] && __props.images[0][column.fields[currentSlideIndex.value]] === null) {
            _push(`<img${ssrRenderAttr("src", "/img/no_image.svg")} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="">`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div><button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev><span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"><svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"></path></svg><span class="sr-only">Previous</span></span></button><button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next><span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"><svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path></svg><span class="sr-only">Next</span></span></button></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ImageSlider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ProgressCustom",
  __ssrInlineRender: true,
  setup(__props) {
    const progressValue = ref(0);
    onMounted(() => {
      const timer = setTimeout(() => progressValue.value = 100, 500);
      return () => clearTimeout(timer);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ProgressRoot), mergeProps({
        modelValue: progressValue.value,
        "onUpdate:modelValue": ($event) => progressValue.value = $event,
        class: "relative overflow-hidden bg-blackA9 rounded-full w-full 1 h-4 sm:h-5",
        style: { "transform": "translateZ(0)" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ProgressIndicator), {
              class: "bg-green-300 rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]",
              style: `transform: translateX(-${100 - progressValue.value}%)`
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ProgressIndicator), {
                class: "bg-green-300 rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]",
                style: `transform: translateX(-${100 - progressValue.value}%)`
              }, null, 8, ["style"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ProgressCustom.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SchemaFormBuilder",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: true,
      default: "modal"
    },
    resourceRoute: {
      type: String,
      required: true
    },
    fields: {
      type: [],
      required: true
    },
    method: {
      type: String,
      required: true
    },
    endpoint: {
      type: String,
      required: true
    },
    modalIsOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    resource: {
      type: Object,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    resourceType: {
      type: String
    }
  },
  emits: ["close-modal", "showNotify"],
  setup(__props, { emit: __emit }) {
    let formEdit = useForm({});
    let formCreate = useForm({});
    let formImport = useForm({
      file: null
    });
    const app = getCurrentInstance();
    const emit = __emit;
    const errors = ref({});
    ref({});
    let image = ref({});
    const cloneFields = ref();
    const schemaForm = ref({});
    const resourceModal = ref({});
    useAttrs();
    const props = __props;
    onMounted(() => {
      cloneFields.value = props.fields;
      fetchFieldsCreate();
    });
    async function fetchEditFormData() {
      if (["edit"].includes(props.type) && props.resource) {
        await fetch(route(`${props.resourceRoute}.edit`, props.resource.id)).then((response) => response.json()).then((data) => {
          schemaForm.value = data;
          formEdit = useForm(app.appContext.config.globalProperties.fetchedSchemaFormBuild(data));
          console.log(formEdit);
        });
      }
    }
    async function fetchResourceData() {
      if (["modal"].includes(props.type) && props.resource) {
        await fetch(route(`${props.resourceRoute}.show`, props.resource.id)).then((response) => response.json()).then((data) => {
          resourceModal.value = data;
        });
      }
    }
    async function fetchFieldsCreate() {
      await fetch(route(`${props.resourceRoute}.create`)).then((response) => response.json()).then((data) => {
        schemaForm.value = data;
        formCreate = useForm(app.appContext.config.globalProperties.fetchedSchemaFormBuild(data));
      });
    }
    onUpdated(() => {
      fetchEditFormData();
      fetchResourceData();
    });
    const closeModalWithNotify = (typeNotify) => {
      emit("close-modal");
      emit("showNotify", typeNotify);
    };
    const closeCreateForm = () => {
      emit("close-modal");
      formCreate.reset();
    };
    function submit() {
      if (props.type == "edit") {
        router.post(route(`${props.resourceRoute}.update`, props.resource.id), {
          _method: "put",
          image,
          form: formEdit
        }, {
          only: ["errors", "resources"],
          onSuccess: (params) => {
            closeCreateForm();
            image = {};
          }
        });
      }
      if (props.type == "create") {
        formCreate.post(route(`${props.resourceRoute}.store`), {
          onSuccess: (params) => {
            console.log(params);
            closeCreateForm();
            emit("showNotify", props.type);
          }
        });
      }
      if (["import"].includes(props.type)) {
        formImport.post(route(`importResource`, props.resourceType), {
          onSuccess: () => {
            closeCreateForm();
            emit("showNotify", props.type);
          },
          onProgress: (progress) => {
            formImport.process = progress;
          }
        });
      }
    }
    const deleteResource = (resId) => {
      router.delete(route(`${props.resourceRoute}.destroy`, props.resource.id), {
        onBefore: () => confirm(`Are you sure you want to delete this ${props.resourceType}?`),
        onSuccess: () => closeModalWithNotify("delete"),
        onError: (err) => console.log(err)
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$4, mergeProps({
        "modal-type": __props.type,
        show: __props.modalIsOpen,
        "max-width": "2xl",
        onEdit: ($event) => __props.type = "edit",
        onDelete: ($event) => deleteResource(__props.resource.id)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-rounded"${_scopeId}><div class=""${_scopeId}><div class="flex flex-col"${_scopeId}>`);
            if (__props.type === "modal") {
              _push2(`<!--[--><h1 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__(`view_${__props.resourceType}`))}</h1><div class="columns-2md"${_scopeId}>`);
              if (__props.resource.image != null && __props.resource.image != "image") {
                _push2(`<div class="w-full mt-4 flex justify-center border border-solid"${_scopeId}><img class="w-1/2"${ssrRenderAttr("src", __props.resource.image)} alt=""${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.resource.image === "image") {
                _push2(`<div class="w-full mt-4 flex justify-center border border-solid"${_scopeId}><img class=""${ssrRenderAttr("src", "/img/no_image.svg")} alt="image else"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.resource.images) {
                _push2(`<!--[-->`);
                ssrRenderList(_ctx.$page.props.relationColumns, (filed) => {
                  _push2(`<div${_scopeId}>`);
                  if (["image", "images"].includes(filed.label)) {
                    _push2(`<div class="w-full mt-4 flex justify-center border border-solid"${_scopeId}>`);
                    _push2(ssrRenderComponent(_sfc_main$2, {
                      columns: _ctx.$page.props.relationColumns,
                      "resource-type": __props.resourceType,
                      images: __props.resource.images
                    }, null, _parent2, _scopeId));
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="columns-2 p-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                resource: __props.resource,
                "resource-modal": resourceModal.value,
                columns: __props.columns
              }, null, _parent2, _scopeId));
              _push2(`</div></div><!--]-->`);
            } else if (__props.type === "edit") {
              _push2(`<!--[--><h1 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__(`edit_${__props.resourceType}`))}</h1><form${_scopeId}><!--[-->`);
              ssrRenderList(schemaForm.value.fields, (field) => {
                _push2(`<!--[-->`);
                if (["text", "textarea", "number"].includes(field.type)) {
                  _push2(ssrRenderComponent(_sfc_main$5, {
                    type: field.type,
                    "onUpdate:modelValue": (args) => unref(formEdit)[field.name] = args,
                    "model-value": unref(formEdit)[field.name],
                    "error-message": _ctx.__(_ctx.$page.props.errors[`form.${field.name}`]),
                    label: _ctx.__(field.placeholder)
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (["select"].includes(field.type)) {
                  _push2(ssrRenderComponent(_sfc_main$6, {
                    "onUpdate:status": (args) => unref(formEdit)[field.name] = args,
                    value: unref(formEdit)[field.name],
                    label: _ctx.__(field.label),
                    "error-message": _ctx.__(_ctx.$page.props.errors[`form.${field.name}`] ?? _ctx.$page.props.errors[`${field.name}`]),
                    options: field.options
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (["file"].includes(field.type)) {
                  _push2(`<div class="my-5"${_scopeId}><label for="image" class="block mb-2 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("image"))}</label><input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"${ssrRenderAttr("id", field.name)} type="file"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--><div class="mt-6 flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                onClick: ($event) => emit("close-modal"),
                class: "mx-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("cancel"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(PrimaryButton, {
                type: "submit",
                class: "mx-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("submit"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form><!--]-->`);
            } else if (__props.type === "create") {
              _push2(`<!--[--><div class="flex flex-col"${_scopeId}><h1 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__(`create_${__props.resourceType}`))}</h1><p class="secondary-text"${_scopeId}>${ssrInterpolate(_ctx.__("complete_all_fields"))}</p></div><div${_scopeId}><form${_scopeId}><div class="my-4 text-sm text-gray-600"${_scopeId}><!--[-->`);
              ssrRenderList(schemaForm.value.fields, (field, key) => {
                _push2(`<!--[-->`);
                if (["text", "textarea", "number"].includes(field.type)) {
                  _push2(ssrRenderComponent(_sfc_main$5, {
                    modelValue: unref(formCreate)[field.name],
                    "onUpdate:modelValue": ($event) => unref(formCreate)[field.name] = $event,
                    type: field.type,
                    label: _ctx.__(field.name),
                    "error-message": _ctx.__(unref(formCreate).errors[field.name])
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (["select"].includes(field.type)) {
                  _push2(ssrRenderComponent(_sfc_main$6, {
                    "onUpdate:status": (args) => unref(formCreate)[field.name] = args,
                    value: unref(formCreate)[field.name],
                    label: _ctx.__(field.label),
                    "error-message": _ctx.__(unref(formCreate).errors[field.name]),
                    options: field.options,
                    "model-value": unref(formCreate)[field.name]
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                if (["file"].includes(field.type)) {
                  _push2(`<div class="my-5"${_scopeId}><label for="image" class="block mb-2 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__(field.label))}</label><input class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"${ssrRenderAttr("id", field.name)} type="file"${_scopeId}>`);
                  if (unref(formCreate).progress) {
                    _push2(`<progress${ssrRenderAttr("value", unref(formCreate).progress.percentage)} max="100"${_scopeId}>${ssrInterpolate(unref(formCreate).progress.percentage)}% </progress>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div><div class="mt-6 flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                class: "mx-2",
                onClick: closeCreateForm
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("cancel"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(PrimaryButton, {
                type: "submit",
                class: "mx-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("submit"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></form></div><!--]-->`);
            } else if (__props.type === "import") {
              _push2(`<!--[--><div class="flex flex-col"${_scopeId}><h1 class="primary-text"${_scopeId}>${ssrInterpolate(_ctx.__(`import_${__props.resourceType}`))}</h1><p class="secondary-text"${_scopeId}>${ssrInterpolate(_ctx.__("upload_excel_file"))}</p></div><div${_scopeId}><div class="my-4 text-sm text-gray-600"${_scopeId}><div class="my-5"${_scopeId}><label for="image" class="block mb-2 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(_ctx.__("excel_file"))}</label><input class="block text-sm w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file"${_scopeId}></div>`);
              if (unref(formImport).progress) {
                _push2(`<div class="w-full py-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: unref(formImport).progress.percentage,
                  "onUpdate:modelValue": ($event) => unref(formImport).progress.percentage = $event
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (errors.value.import) {
                _push2(`<span class=""${_scopeId}>${ssrInterpolate(errors.value.import)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mt-6 flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$7, {
                class: "mx-2",
                onClick: closeCreateForm
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("cancel"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(PrimaryButton, {
                onClick: ($event) => submit(),
                class: "mx-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.__("submit"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-rounded" }, [
                createVNode("div", { class: "" }, [
                  createVNode("div", { class: "flex flex-col" }, [
                    __props.type === "modal" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode("h1", { class: "primary-text" }, toDisplayString(_ctx.__(`view_${__props.resourceType}`)), 1),
                      createVNode("div", { class: "columns-2md" }, [
                        __props.resource.image != null && __props.resource.image != "image" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-full mt-4 flex justify-center border border-solid"
                        }, [
                          createVNode("img", {
                            class: "w-1/2",
                            src: __props.resource.image,
                            alt: ""
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true),
                        __props.resource.image === "image" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "w-full mt-4 flex justify-center border border-solid"
                        }, [
                          createVNode("img", {
                            class: "",
                            src: "/img/no_image.svg",
                            alt: "image else"
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true),
                        __props.resource.images ? (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(_ctx.$page.props.relationColumns, (filed) => {
                          return openBlock(), createBlock("div", null, [
                            ["image", "images"].includes(filed.label) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "w-full mt-4 flex justify-center border border-solid"
                            }, [
                              createVNode(_sfc_main$2, {
                                columns: _ctx.$page.props.relationColumns,
                                "resource-type": __props.resourceType,
                                images: __props.resource.images
                              }, null, 8, ["columns", "resource-type", "images"])
                            ])) : createCommentVNode("", true)
                          ]);
                        }), 256)) : createCommentVNode("", true),
                        createVNode("div", { class: "columns-2 p-2" }, [
                          createVNode(_sfc_main$3, {
                            resource: __props.resource,
                            "resource-modal": resourceModal.value,
                            columns: __props.columns
                          }, null, 8, ["resource", "resource-modal", "columns"])
                        ])
                      ])
                    ], 64)) : __props.type === "edit" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode("h1", { class: "primary-text" }, toDisplayString(_ctx.__(`edit_${__props.resourceType}`)), 1),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(schemaForm.value.fields, (field) => {
                          return openBlock(), createBlock(Fragment, null, [
                            ["text", "textarea", "number"].includes(field.type) ? (openBlock(), createBlock(_sfc_main$5, {
                              key: 0,
                              type: field.type,
                              "onUpdate:modelValue": (args) => unref(formEdit)[field.name] = args,
                              "model-value": unref(formEdit)[field.name],
                              "error-message": _ctx.__(_ctx.$page.props.errors[`form.${field.name}`]),
                              label: _ctx.__(field.placeholder)
                            }, null, 8, ["type", "onUpdate:modelValue", "model-value", "error-message", "label"])) : createCommentVNode("", true),
                            ["select"].includes(field.type) ? (openBlock(), createBlock(_sfc_main$6, {
                              key: 1,
                              "onUpdate:status": (args) => unref(formEdit)[field.name] = args,
                              value: unref(formEdit)[field.name],
                              label: _ctx.__(field.label),
                              "error-message": _ctx.__(_ctx.$page.props.errors[`form.${field.name}`] ?? _ctx.$page.props.errors[`${field.name}`]),
                              options: field.options
                            }, null, 8, ["onUpdate:status", "value", "label", "error-message", "options"])) : createCommentVNode("", true),
                            ["file"].includes(field.type) ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "my-5"
                            }, [
                              createVNode("label", {
                                for: "image",
                                class: "block mb-2 text-sm font-medium text-gray-900"
                              }, toDisplayString(_ctx.__("image")), 1),
                              createVNode("input", {
                                onInput: ($event) => isRef(image) ? image.value = $event.target.files[0] : image = $event.target.files[0],
                                class: "block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
                                id: field.name,
                                type: "file"
                              }, null, 40, ["onInput", "id"])
                            ])) : createCommentVNode("", true)
                          ], 64);
                        }), 256)),
                        createVNode("div", { class: "mt-6 flex justify-end" }, [
                          createVNode(_sfc_main$7, {
                            onClick: ($event) => emit("close-modal"),
                            class: "mx-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(PrimaryButton, {
                            type: "submit",
                            class: "mx-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                            ]),
                            _: 1
                          })
                        ])
                      ], 32)
                    ], 64)) : __props.type === "create" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("h1", { class: "primary-text" }, toDisplayString(_ctx.__(`create_${__props.resourceType}`)), 1),
                        createVNode("p", { class: "secondary-text" }, toDisplayString(_ctx.__("complete_all_fields")), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("form", {
                          onSubmit: withModifiers(submit, ["prevent"])
                        }, [
                          createVNode("div", { class: "my-4 text-sm text-gray-600" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(schemaForm.value.fields, (field, key) => {
                              return openBlock(), createBlock(Fragment, null, [
                                ["text", "textarea", "number"].includes(field.type) ? (openBlock(), createBlock(_sfc_main$5, {
                                  key: 0,
                                  modelValue: unref(formCreate)[field.name],
                                  "onUpdate:modelValue": ($event) => unref(formCreate)[field.name] = $event,
                                  type: field.type,
                                  label: _ctx.__(field.name),
                                  "error-message": _ctx.__(unref(formCreate).errors[field.name])
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "label", "error-message"])) : createCommentVNode("", true),
                                ["select"].includes(field.type) ? (openBlock(), createBlock(_sfc_main$6, {
                                  key: 1,
                                  "onUpdate:status": (args) => unref(formCreate)[field.name] = args,
                                  value: unref(formCreate)[field.name],
                                  label: _ctx.__(field.label),
                                  "error-message": _ctx.__(unref(formCreate).errors[field.name]),
                                  options: field.options,
                                  "model-value": unref(formCreate)[field.name]
                                }, null, 8, ["onUpdate:status", "value", "label", "error-message", "options", "model-value"])) : createCommentVNode("", true),
                                ["file"].includes(field.type) ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "my-5"
                                }, [
                                  createVNode("label", {
                                    for: "image",
                                    class: "block mb-2 text-sm font-medium text-gray-900"
                                  }, toDisplayString(_ctx.__(field.label)), 1),
                                  createVNode("input", {
                                    onInput: ($event) => unref(formCreate).image = $event.target.files[0],
                                    class: "block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
                                    id: field.name,
                                    type: "file"
                                  }, null, 40, ["onInput", "id"]),
                                  unref(formCreate).progress ? (openBlock(), createBlock("progress", {
                                    key: 0,
                                    value: unref(formCreate).progress.percentage,
                                    max: "100"
                                  }, toDisplayString(unref(formCreate).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true)
                                ])) : createCommentVNode("", true)
                              ], 64);
                            }), 256))
                          ]),
                          createVNode("div", { class: "mt-6 flex justify-end" }, [
                            createVNode(_sfc_main$7, {
                              class: "mx-2",
                              onClick: closeCreateForm
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(PrimaryButton, {
                              type: "submit",
                              class: "mx-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                              ]),
                              _: 1
                            })
                          ])
                        ], 32)
                      ])
                    ], 64)) : __props.type === "import" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("h1", { class: "primary-text" }, toDisplayString(_ctx.__(`import_${__props.resourceType}`)), 1),
                        createVNode("p", { class: "secondary-text" }, toDisplayString(_ctx.__("upload_excel_file")), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "my-4 text-sm text-gray-600" }, [
                          createVNode("div", { class: "my-5" }, [
                            createVNode("label", {
                              for: "image",
                              class: "block mb-2 text-sm font-medium text-gray-900"
                            }, toDisplayString(_ctx.__("excel_file")), 1),
                            createVNode("input", {
                              onInput: ($event) => unref(formImport).file = $event.target.files[0],
                              class: "block text-sm w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
                              type: "file"
                            }, null, 40, ["onInput"])
                          ]),
                          unref(formImport).progress ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "w-full py-1"
                          }, [
                            createVNode(_sfc_main$1, {
                              modelValue: unref(formImport).progress.percentage,
                              "onUpdate:modelValue": ($event) => unref(formImport).progress.percentage = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : createCommentVNode("", true),
                          errors.value.import ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: ""
                          }, toDisplayString(errors.value.import), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "mt-6 flex justify-end" }, [
                          createVNode(_sfc_main$7, {
                            class: "mx-2",
                            onClick: closeCreateForm
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("cancel")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(PrimaryButton, {
                            onClick: ($event) => submit(),
                            class: "mx-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.__("submit")), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ])
                    ], 64)) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SchemaFormBuilder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};

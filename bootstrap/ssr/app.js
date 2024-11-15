import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { createPinia } from "pinia";
import { ZiggyVue } from "ziggy-js";
import PrimeVue from "primevue/config/config.esm.js";
import Aura from "@primevue/themes/aura";
const app = "";
async function resolvePageComponent(path, pages) {
  const page = pages[path];
  if (typeof page === "undefined") {
    throw new Error(`Page not found: ${path}`);
  }
  return typeof page === "function" ? page() : page;
}
const theme = "";
const appName = "Neoman";
const appDescription = "Alături la fiecare etapă în viață";
const pinia = createPinia();
createInertiaApp({
  title: (title) => `${appName}.md - ${appDescription}`,
  description: (description) => description,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/About.vue": () => import("./assets/About-be12570c.js"), "./Pages/Admin/Associations.vue": () => import("./assets/Associations-7ec8abb3.js"), "./Pages/Admin/Attributes.vue": () => import("./assets/Attributes-b0f524e8.js"), "./Pages/Admin/Banners.vue": () => import("./assets/Banners-d376a99e.js"), "./Pages/Admin/Brands.vue": () => import("./assets/Brands-8ddba357.js"), "./Pages/Admin/Categories.vue": () => import("./assets/Categories-5aa798cb.js"), "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-4c0eaf9a.js"), "./Pages/Admin/ImportedProducts.vue": () => import("./assets/ImportedProducts-33cb4946.js"), "./Pages/Admin/Orders.vue": () => import("./assets/Orders-ad82b088.js"), "./Pages/Admin/Privacy.vue": () => import("./assets/Privacy-39634fda.js"), "./Pages/Admin/Product.vue": () => import("./assets/Product-e4143eb6.js"), "./Pages/Admin/Products.vue": () => import("./assets/Products-757291fd.js"), "./Pages/Admin/Promotions.vue": () => import("./assets/Promotions-b5215a07.js"), "./Pages/Admin/Settings.vue": () => import("./assets/Settings-d5836917.js"), "./Pages/Admin/SubSubcategories.vue": () => import("./assets/SubSubcategories-0d0780b6.js"), "./Pages/Admin/Subcategories.vue": () => import("./assets/Subcategories-173c06b1.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-1324929f.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-b549e19f.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-4f09bc61.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-78aaa992.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-95a1fde5.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-94df0fc7.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-a3b0c9d0.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-6d167d48.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-496e75a0.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-69a4f8a0.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-bf6e892e.js"), "./Pages/User/AboutPage.vue": () => import("./assets/AboutPage-fc291d81.js"), "./Pages/User/AllProductsPage.vue": () => import("./assets/AllProductsPage-59302515.js"), "./Pages/User/CartPage.vue": () => import("./assets/CartPage-ed180e92.js"), "./Pages/User/CategoryPage.vue": () => import("./assets/CategoryPage-d7f83abf.js"), "./Pages/User/ContactPage.vue": () => import("./assets/ContactPage-e723f7f5.js"), "./Pages/User/HomePage.vue": () => import("./assets/HomePage-446dd930.js"), "./Pages/User/PrivacyPage.vue": () => import("./assets/PrivacyPage-df2148a1.js"), "./Pages/User/ProductPage.vue": () => import("./assets/ProductPage-2bbeb389.js"), "./Pages/User/ProductsPage.vue": () => import("./assets/ProductsPage-f61e275d.js"), "./Pages/User/SubcategoryPage.vue": () => import("./assets/SubcategoryPage-f72d2b23.js"), "./Pages/User/TermsPage.vue": () => import("./assets/TermsPage-24977d39.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-9b6118ff.js") })),
  setup({ el, App, props, plugin }) {
    const app2 = createApp({ render: () => h(App, props) });
    app2.config.globalProperties.__ = (str, replace) => {
      str = props.initialPage.props.localization[str] ?? str;
      if (replace) {
        if (typeof replace === "object") {
          for (const property in replace) {
            str = str.replace(`${property}`, replace[property]);
          }
        }
        if (typeof replace === "string") {
          str = str.replace("%s%", replace);
        }
      }
      return str;
    };
    app2.config.globalProperties.truncate = (str, length) => {
      if (str.length > length) {
        return str.substring(0, length) + "...";
      } else {
        return str;
      }
    };
    app2.config.globalProperties.asset = (path) => {
      var base_path = window._asset || "";
      return base_path + path;
    };
    app2.config.globalProperties.fetchedSchemaFormBuild = (schema) => {
      let form = {};
      schema.fields.forEach((f) => form[f.name] = f.value);
      form.relations = schema.relations;
      form.image = null;
      return form;
    };
    app2.use(pinia);
    return app2.use(plugin).use(PrimeVue, {
      // Default theme configuration
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: "system",
          cssLayer: false
        }
      }
    }).use(ZiggyVue, Ziggy, "route").mount(el);
  },
  progress: {
    // color: '#d3405b',
    color: "#5b98dc"
  }
});

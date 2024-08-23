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
  resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/About.vue": () => import("./assets/About-3c7201a0.js"), "./Pages/Admin/Associations.vue": () => import("./assets/Associations-54930a42.js"), "./Pages/Admin/Attributes.vue": () => import("./assets/Attributes-cf052231.js"), "./Pages/Admin/Banners.vue": () => import("./assets/Banners-15f51f94.js"), "./Pages/Admin/Brands.vue": () => import("./assets/Brands-c317d239.js"), "./Pages/Admin/Categories.vue": () => import("./assets/Categories-c1271710.js"), "./Pages/Admin/Dashboard.vue": () => import("./assets/Dashboard-e40df261.js"), "./Pages/Admin/ImportedProducts.vue": () => import("./assets/ImportedProducts-8ed96bfc.js"), "./Pages/Admin/Orders.vue": () => import("./assets/Orders-53a76f25.js"), "./Pages/Admin/Privacy.vue": () => import("./assets/Privacy-ec5404b9.js"), "./Pages/Admin/Products.vue": () => import("./assets/Products-f8d4f470.js"), "./Pages/Admin/Promotions.vue": () => import("./assets/Promotions-d90024e6.js"), "./Pages/Admin/Settings.vue": () => import("./assets/Settings-123e8bff.js"), "./Pages/Admin/SubSubcategories.vue": () => import("./assets/SubSubcategories-3c4feeef.js"), "./Pages/Admin/Subcategories.vue": () => import("./assets/Subcategories-57879862.js"), "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-1324929f.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-b549e19f.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-4f09bc61.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-78aaa992.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-95a1fde5.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-94df0fc7.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-a3b0c9d0.js"), "./Pages/Profile/Edit.vue": () => import("./assets/Edit-6d167d48.js"), "./Pages/Profile/Partials/DeleteUserForm.vue": () => import("./assets/DeleteUserForm-496e75a0.js"), "./Pages/Profile/Partials/UpdatePasswordForm.vue": () => import("./assets/UpdatePasswordForm-69a4f8a0.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": () => import("./assets/UpdateProfileInformationForm-bf6e892e.js"), "./Pages/User/AboutPage.vue": () => import("./assets/AboutPage-ad860561.js"), "./Pages/User/AllProductsPage.vue": () => import("./assets/AllProductsPage-d115bac0.js"), "./Pages/User/CartPage.vue": () => import("./assets/CartPage-f0d80331.js"), "./Pages/User/CategoryPage.vue": () => import("./assets/CategoryPage-3f0e77e8.js"), "./Pages/User/ContactPage.vue": () => import("./assets/ContactPage-f9d8994f.js"), "./Pages/User/HomePage.vue": () => import("./assets/HomePage-5ffbfa2a.js"), "./Pages/User/PrivacyPage.vue": () => import("./assets/PrivacyPage-41988ac4.js"), "./Pages/User/ProductPage.vue": () => import("./assets/ProductPage-684ff6f9.js"), "./Pages/User/ProductsPage.vue": () => import("./assets/ProductsPage-025f2738.js"), "./Pages/User/SubcategoryPage.vue": () => import("./assets/SubcategoryPage-7f242fad.js"), "./Pages/User/TermsPage.vue": () => import("./assets/TermsPage-0c8f7050.js"), "./Pages/Welcome.vue": () => import("./assets/Welcome-9b6118ff.js") })),
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

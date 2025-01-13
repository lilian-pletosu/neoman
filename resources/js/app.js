import "../css/app.css";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createPinia } from "pinia";
import { ZiggyVue } from "ziggy-js";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Tooltip from "primevue/tooltip";

import "primevue/resources/themes/aura-light-green/theme.css";

const appName = import.meta.env.VITE_APP_NAME || "Neoman";
const appDescription = "Alături la fiecare etapă în viață";
const pinia = createPinia();

createInertiaApp({
    title: (title) => `${appName}.md - ${appDescription}`,
    description: (description) => description,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        app.config.globalProperties.__ = (str, replace) => {
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

        app.config.globalProperties.truncate = (str, length) => {
            if (str.length > length) {
                return str.substring(0, length) + "...";
            } else {
                return str;
            }
        };
        app.config.globalProperties.asset = (path) => {
            var base_path = window._asset || "";
            return base_path + path;
        };

        app.config.globalProperties.fetchedSchemaFormBuild = (schema) => {
            let form = {};
            schema.fields.forEach((f) => (form[f.name] = f.value));
            //append the relations set in schema form builder
            form.relations = schema.relations;
            form.image = null;
            return form;
        };

        app.use(pinia);
        app.directive("tooltip", Tooltip);

        return app
            .use(plugin)
            .use(PrimeVue, {
                // Default theme configuration
                theme: {
                    preset: Aura,
                    options: {
                        prefix: "p",
                        darkModeSelector: "system",
                        cssLayer: false,
                    },
                },
            })
            .use(ZiggyVue, Ziggy, "route")
            .mount(el);
    },
    progress: {
        // color: '#d3405b',
        color: "#5b98dc",
    },
});

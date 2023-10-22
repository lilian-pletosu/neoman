import './bootstrap';
import '../css/app.css';
import "vue-select/dist/vue-select.css";
import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/vue3';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy/dist/vue.m';
import vSelect from "vue-select";

const appName = import.meta.env.VITE_APP_NAME || 'Neoman';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({el, App, props, plugin}) {
        const app = createApp({render: () => h(App, props)});

        app.config.globalProperties.__ = (str, replace) => {
            str = props.initialPage.props.localization[str] ?? str;
            if (replace) {
                if (typeof replace === 'object') {
                    for (const property in replace) {
                        str = str.replace(`${property}`, replace[property]);
                    }
                }
                if (typeof replace === 'string') {
                    str = str.replace('%s%', replace);
                }
            }
            return str;
        };

        app.config.globalProperties.truncate = (str, length) => {
            if (str.length > length) {
                return str.substring(0, length) + '...';
            } else {
                return str;
            }
        };
        app.config.globalProperties.clearObject = (obj, val = '') => {
            Object.keys(obj).forEach(k => {
                if (Array.isArray(obj[k])) {
                    obj[k] = [];
                } else if (typeof obj[k] === 'object' && obj[k] !== null) {
                    this.clearObject(obj[k]);
                } else {
                    obj[k] = val
                }
            });
        }

        app.config.globalProperties.fetchedSchemaFormBuild = (schema) => {
            let form = {};
            schema.fields.forEach((f) => form[f.name] = f.value)

            //append the relations set in schema form builder
            form.relations = schema.relations
            return form;
        };

        return app
            .use(plugin)
            .component("v-select", vSelect)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#d3405b',
    },
});

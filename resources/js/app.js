import './bootstrap';
import '../css/app.css';
import {Animate, initTE,} from "tw-elements";
import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/vue3';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy/dist/vue.m';

initTE({Animate});

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
                console.log('yes')
                return str.substring(0, length) + '...';
            } else {
                console.log('no')
                return str;
            }

        };

        return app
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#d3405b',
    },
});

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

const {blackA, green, mauve, slate} = require('@radix-ui/colors')


const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './resources/js/**/*/*/*/.vue',
    ],
    mode: 'jit',
    components: [],
    theme: {
        screens: {
            'xs': '200px',
            '1xs': '300px',
            '2xs': '400px',
            '3xs': '545px',
            '3xl': '1600px',
            '4xl': '1900px',
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                mulish: ['Mulish'],
            },
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
            colors: {
                dark: '#011212',
                ...blackA,
                ...green,
                ...mauve,
                ...slate,
            },
            keyframes: {
                rotateDown: {
                    '0%': {transform: 'rotate(0deg)'},
                    '100%': {transform: 'rotate(180deg)'},
                },
                rotateUp: {
                    '0%': {transform: 'rotate(180deg)'},
                    '100%': {transform: 'rotate(0deg)'},
                },
                hide: {
                    from: {opacity: 1},
                    to: {opacity: 0},
                },
                slideIn: {
                    from: {transform: 'translateX(calc(100% + var(--viewport-padding)))'},
                    to: {transform: 'translateX(0)'},
                },
                swipeOut: {
                    from: {transform: 'translateX(var(--radix-toast-swipe-end-x))'},
                    to: {transform: 'translateX(calc(100% + var(--viewport-padding)))'},
                },
            },
            animation: {
                rotateDown: 'rotateDown 0.3s ease',
                rotateUp: 'rotateUp 0.3s ease',
                hide: 'hide 100ms ease-in',
                slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                swipeOut: 'swipeOut 100ms ease-out',
            },
        },
    },

    plugins: [
        forms,
        plugin(function ({matchUtilities, theme}) {
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                {values: theme('textShadow')}
            )
        }),
    ],
};

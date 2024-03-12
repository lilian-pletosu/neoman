import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

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

    theme: {
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
                dark: '#011212'
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
            },
            animation: {
                rotateDown: 'rotateDown 0.3s ease',
                rotateUp: 'rotateUp 0.3s ease',
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
    ]
};

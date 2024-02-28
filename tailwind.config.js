import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

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

    plugins: [forms],
};

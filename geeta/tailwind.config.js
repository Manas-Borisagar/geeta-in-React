/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // This matches your original setup
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                sanskrit: ['Tiro Devanagari Sanskrit', 'serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'), // For the 'prose' classes on the About page
    ],
}
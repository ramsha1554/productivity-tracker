/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'teal-blue': '#3F9AAE',
                'soft-teal': '#79C9C5',
                'beige': '#FFE2AF',
                'soft-red': '#F96E5B',
                'soft-yellow': '#FDE68A',
                'warm-orange': '#FB923C',
                'light-cream': '#FFF7ED',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

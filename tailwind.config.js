/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{vue,html,js}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#31343D",
                    200: "#9e9e9e",
                    300: "#212329",
                    700: "#101114"
                },
                secondary: {
                    100: "#e2e2d5",
                    200: "#888883"
                },
            },
        },
    },
    plugins: [],
}


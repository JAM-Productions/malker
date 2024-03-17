/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
    theme: {
        extend: {
            colors: {
                malker: {
                    50: "#f0faff",
                    100: "#dcf1fd",
                    150: "#edf8fd",
                    175: "#d6effa",
                    200: "#bce7fb",
                    300: "#80d6f9",
                    400: "#3dc2f3",
                    500: "#13abe4",
                    600: "#0789c2",
                    700: "#076d9d",
                    800: "#0a5c82",
                    900: "#0e4c6c",
                    950: "#0a3147",
                },
            },
        },
    },
    plugins: [],
};

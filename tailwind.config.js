/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-afacad)', 'Arial', 'sans-serif'],
                zain: ['var(--font-zain)', 'Arial', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'primary-gradient': 'linear-gradient(133deg, #A251FF 7.24%, #A251FF 8.44%, #5081FE 125.9%)',
            },
            borderRadius: {
                'custom': '0.625rem',
            },
            minHeight: {
                '12': '3rem',
            },
        },
    },
    plugins: [],
}

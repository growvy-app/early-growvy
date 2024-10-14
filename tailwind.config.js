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
                'primary-gradient': 'linear-gradient(135deg, #A251FF 7.24%, #A251FF 8.44%, #5081FE 125.9%)',
            },
            borderRadius: {
                'custom': '0.625rem',
            },
            minHeight: {
                '12': '3rem',
            },
            fontWeight: {
                normal: 400,
                bold: 700,
                extrabold: 800,
                black: 900,
            },
            colors: {
                neutral: {
                    DEFAULT: 'var(--neutral-100)',
                    100: 'var(--neutral-100)',
                }
            }
        },
    },
    plugins: [],
}

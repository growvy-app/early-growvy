import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-afacad)', 'sans-serif'],
        zain: ['var(--font-zain)', 'sans-serif'],
      },
      colors: {
        neutral: {
          50: "#FAFAFA",
          300: "#E4E4E4",
          500: "#B1AFBE",
          700: "#565B68",
          900: "#0F172A",
        },
        primary: "#786AFE",
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #A251FF 7.24%, #A251FF 8.44%, #5081FE 125.9%)',
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.gradient-border': {
          'background-image': 'linear-gradient(135deg, #A251FF 7.24%, #A251FF 8.44%, #5081FE 125.9%)',
          'background-origin': 'border-box',
          'background-clip': 'padding-box, border-box',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
};

export default config;

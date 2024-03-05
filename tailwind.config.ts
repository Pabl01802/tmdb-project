import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'primary': '#18191C',
      'secondary': '#1D1E22',
      'red': '#FE0101',
      'black': 'rgba(24, 25, 28, .9)',
      'black2': 'rgba(24, 25, 28, .1)',
      'arrow-background': 'rgba(0, 0, 0, 0)',
    },
    screens: {
      'xs': {
        'max': '768px'
      },
      'sm': {
        'min': '769px',
        'max': '992px'
      },
      'md': {
        'min': '993px',
        'max': '1024px'
      },
      'lg': {
        'min': '1025px',
        'max': '1200px'
      },
      'small': {
        'min': '769px',
        'max': '1200px'
      }
    }
  },
  plugins: [],
};
export default config;

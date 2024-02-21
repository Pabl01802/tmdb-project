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
      // 'arrow-background': 'rgba(0, 0, 0, .5)',
      'arrow-background': 'rgba(0, 0, 0, 0)',
    }
  },
  plugins: [],
};
export default config;
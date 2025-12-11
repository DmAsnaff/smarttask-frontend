import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#02120b",
          800: "#032017",
          700: "#063222",
          600: "#0b4a32",
          500: "#0f6842",
        },
      },
      boxShadow: {
        glass: "0 18px 45px rgba(0,0,0,0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;

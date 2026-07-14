import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11100e",
        charcoal: "#25221f",
        bone: "#f8f4ed",
        mist: "#e8e1d5",
        gold: "#b28a4a"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(17, 16, 14, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;

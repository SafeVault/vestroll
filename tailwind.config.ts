import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      8: "8px",
    },
    fontFamily: {
      Manrope: ["Manrope", "sans-serif"], // Ensure fallback font
    },

    // changed the line height
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.75rem",
      "4xl": "2rem",
      "5xl": "2.5rem",
      "6xl": "3rem",
      "7xl": "3.5rem",
      "8xl": "4rem",
    },

    // amend these values to suit the chosen font
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "800",
    },

    screens: {
      "2xs": "320px",
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
      "4xl": "1920px",
    },
    extend: {
      colors: {
        transparent: "transparent", // leave this…
        current: "currentColor", // and this…
        white: colors.white, // tenant's white colour
        black: {
          DEFAULT: "#000000",
          100: "#0B0C0B",
          200: "#1A1A1A",
          300: "#2C2C2C",
        }, // tenant's darkest grey

        // warning: "#C64242", // tenant's warning colour
        gray: {
          100: "#414141",
          200: "#E5E7EB",
          400: "#99A1AF",
          600: "#4A5565",
          700: "7F8C9F",
          800: "#0A0A0A",
          900: "#414F62",
          950: "#F5F6F7"
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          150: "#F2F2F2",
          200: "#F3F3F3",
        },
        primary: {
          50: "#F5F0FF",
          100: "#EBE0FF",
          200: "#D6BFFF",
          300: "#B38FFF",
          400: "#915FFF",
          500: "#702FFF",
          600: "#5E2A8C",
          700: "#4A1F73",
          800: "#361659",
          900: "#220D3F",
        },

        secondary: {
          base: "#A42600",
          100: "#F59E0B",
          200: "#FDECCE33",
          300: "#FFEDD5",
        },

        success: {
          600: "#009966",
          500: "#26902B",
          400: "#173719",
          300: "#EDFEEC",
          200: "#5DD689",
          100: "#DCFCE7",
        },

        error: {
          500: "#C64242",
          400: "#FEECEC",
          300: "#371717",
        },

        warning: {
          500: "#E79A23",
          400: "#372A17",
          300: "#FEF7EB",
        },

        info: {
          500: "#EBF2FF",
          400: "#172337",
          300: "#387DF4",
        },
      },
    },
  },
  plugins: [],
};
export default config;

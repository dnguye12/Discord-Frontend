import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#5865F2",
        "primary-hover": "#4752C4",
        "green": "#248045",
        "blue": "#059BE2",
        "yellow": "#FEE75C",
        "pink": "#EB459E",
        "red": "#ED4245",
        "white": "#FFFFFF",
        "black": "#000000",
        bg0: "rgba(var(--bg0), <alpha-value>)",
        bg1: "rgba(var(--bg1), <alpha-value>)",
        bg2: "rgba(var(--bg2), <alpha-value>)",
        bg2reversed: "rgba(var(--bg2reversed), <alpha-value>)",
        bg3: "rgba(var(--bg3), <alpha-value>)",
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--bg0": "225, 226, 228",
          "--bg1": "255, 255, 255",
          "--bg2": "242, 243, 245",
          "--bg2reversed": "43, 45, 49",
          "--bg3": "227, 229, 232"

        }
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "--bg0": "67, 68, 75",
          "--bg1": "49, 51, 56",
          "--bg2": "43, 45, 49",
          "--bg2reversed": "242, 243, 245",
          "--bg3": "30, 31, 34"

        }
      }
    ]
  }
}


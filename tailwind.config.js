/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      intertight: ["Inter Tight", "sans-serif"],
    },

    extend: {
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "slide-right": "slideRight 1s ease-in-out",
        "slide-left": "slideLeft 1s ease-in-out",
        opacity: "opacity 1s ease-in-out",
      },
    },
  },
  plugins: [],
};

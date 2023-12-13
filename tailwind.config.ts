/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1720px",
    },
    extend: {
      textColor: {
        primary: "#FF00FF",
        secondary: "#BF00FF",

        "dark-main": "#0A0C11",
        "dark-secondary": "rgb(19, 24, 35)",
        "light-main": "#D2D6EE",
        "dark-tertiary": "#205d7d",
      },
      backgroundColor: {
        pink: "#FF00FF",
        secondary: "#BF00FF",

        "dark-main": "#000",
        "dark-secondary": "rgb(19, 24, 35)",
        "dark-tertiary": "#205d7d",
      },
      backgroundImage: () => ({
        app: "linear-gradient(180deg,#0000,#000),url(/bg-app.png)",

        "pink-light": "linear-gradient(to right, #FFC0CB, #FF69B4)",
        "pink-pale": "linear-gradient(to right, #FFD1DC, #FF00FF)",
        "pink-vibrant": "linear-gradient(to right, #FFB6C1, #FF1493)",
        "pink-rose": "linear-gradient(to right, #FF007F, #FF00FF)",
        "pink-cotton-candy": "linear-gradient(to right, #FFB7C5, #FF69B4)",

        "dark-primary": "linear-gradient(to right, #0A0C11, rgb(19, 24, 35))",
        "dark-fade":
          "linear-gradient(to right, #0A0C11, #131823, rgb(19, 24, 35))",
      }),
      boxShadow: {
        sunny: "0px 0px 5px 5px #FFC0CB",
        rose: "0px 0px 5px 5px #FF007F",
      },
      width: {
        "10%": "10%",
        "12.5%": "12.5%",
        "30%": "30%",
        "45%": "45%",
        "55%": "55%",
        "60%": "60%",
      },
      height: {
        "10%": "10%",
        "30%": "30%",
        "45%": "45%",
        "60%": "60%",
      },
      borderColor: {
        primary: "#FF00FF",
        secondary: "#BF00FF",
        "dark-main": "#8F8686",
        "light-main": "#D2D6EE",
      },
      keyframes: {
        lightning: {
          "0%": {
            opacity: 0,
          },
          "50%": {
            opacity: 0.25,
          },
          "80%": {
            opacity: 0.5,
          },
          "90%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        pulse: {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shadowColorChange: {
          "0%": {
            boxShadow: "0px 0px 10px 5px #ee3a00",
          },
          "33%": {
            boxShadow: "0px 0px 10px 5px #17e8fe",
          },
          "66%": {
            boxShadow: "0px 0px 10px 5px #e23bfd",
          },
          "100%": {
            boxShadow: "0px 0px 10px 5px #eb7744",
          },
          // "100%": {
          //   boxShadow: "0px 0px 10px 5px #895335",
          // },
        },
        lightSpeedInLeft: {
          "0%": {
            transform: "translateX(-100%) skewX(-30deg)",
            opacity: 0,
          },
          "60%": {
            transform: "translateX(20%) skewX(20deg)",
            opacity: 1,
          },
          "80%": {
            transform: "translateX(-5%) skewX(-5deg)",
            opacity: 1,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInFromTop: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        slideInFromLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInFromRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
        slideInFromBottom: {
          "0%": {
            transform: "translateY(100%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        typing: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        pulse: "pulse 1s infinite",
        pulseBasic: "pulse 1s ease",
        bounceSlow: "bounce 1.5s infinite",
        slideInTopBasic: "slideInFromTop 1s ease-out",
        slideInRightBasic: "slideInFromRight 1s ease",
        slideInLeftBasic: "slideInFromLeft 1s ease",
        slideInBottomBasic: "slideInFromBottom 1s ease",
        slideInTopFast: "slideInFromTop 0.5s ease-out",
        slideInRightFast: "slideInFromRight 0.5s ease",
        slideInLeftFast: "slideInFromLeft 0.5s ease",
        slideInBottomInstant: "slideInFromBottom 0.25s ease",
        lightSpeedInLeftFast: "lightSpeedInLeft 0.5s ease-out",
        lightSpeedInLeftBase: "lightSpeedInLeft 1s ease-out",
        fadeInInstant: "fadeIn 0.25s ease",
        fadeInBasic: "fadeIn 0.5s ease",
        fadeInBase: "fadeIn 1s ease",
        fadeInLame: "fadeIn 2s ease",
        lightningBase: "lightning 2s infinite",
        shadowColorChangeMythical: "shadowColorChange 5s infinite",
        typingBasic: "typing 2s steps(50, end)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

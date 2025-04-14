/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        wave: "wave 12s cubic-bezier(0.36, 0, 0.66, -0.56) infinite",
        "wave-slow": "wave 18s cubic-bezier(0.36, 0, 0.66, -0.56) infinite",
        "wave-fast": "wave 8s cubic-bezier(0.36, 0, 0.66, -0.56) infinite",
        gradient: "gradient 15s ease infinite",
        glow: "glow 3s ease-in-out infinite",
        "glow-delayed": "glow 3s ease-in-out 1.5s infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-25%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        glow: {
          "0%, 100%": {
            opacity: 0.4,
            transform: "translateY(0)",
          },
          "50%": {
            opacity: 1,
            transform: "translateY(-10px)",
          },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": {
            opacity: 0,
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      },
    },
  },
};

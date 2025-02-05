import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3F49E1", // Azul principal
        primaryHover: "#2D38C5", // Azul más oscuro para hover
        primaryLight: "#5964F2", // Azul más claro para efectos sutiles
        background: "#FFFFFF", // Fondo principal blanco
        secondary: "#F8F8F8", // Gris claro para secciones
        text: "#222222", // Negro para texto principal
        textMuted: "#555555", // Gris para textos secundarios
        accent: "#E5C99F", // Beige para fondo exterior
        borderColor: "#D1D5DB", // Color de borde sutil
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra suave para tarjetas
        button: "0 2px 4px rgba(0, 0, 0, 0.2)", // Sombra para botones
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
} satisfies Config;

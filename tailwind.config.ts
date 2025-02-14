import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        // Colores primarios basados en el logo
        primary: "#1f2937", // Negro principal
        primaryHover: "#333333", // Negro más oscuro para hover
        primaryLight: "#666666", // Negro más claro para efectos sutiles
        secondary: "#eb9314", // Rojo para elementos secundarios
        secondaryHover: "#CC3315", // Rojo más oscuro para hover

        // Otros colores
        background: "#FFFFFF", // Fondo principal blanco
        layout: "#faefec", // Color de fondo para layout
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
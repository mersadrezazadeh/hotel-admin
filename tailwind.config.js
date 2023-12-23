/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      height: {
        screen: "100dvh",
      },
      boxShadow: {
        "3xl": "0px 6px 24px rgba(0, 0, 0, 0.2)",
      },
    },
    fontFamily: {
      sans: "Vazirmatn, sans-serif",
    },
    container: {
      center: true,
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      brand: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
      },
      gray: {
        0: "#ffffff",
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        850: "#18212f",
        900: "#111827",
      },
      red: {
        100: "#fee2e2",
        700: "#b91c1c",
        800: "#991b1b",
      },
      blue: {
        100: "#e0f2fe",
        700: "#0369a1",
        800: "#075985",
      },
      green: {
        100: "#dcfce7",
        700: "#15803d",
        800: "#166534",
      },
      yellow: {
        100: "#fef9c3",
        700: "#a16207",
        800: "#854d0e",
      },
      silver: {
        0: "#f3f4f6",
        100: "#e5e7eb",
        700: "#374151",
      },
      indigo: {
        100: "#e0e7ff",
        700: "#4338ca",
        800: "#3730a3",
      },
    },
  },
  plugins: [],
};

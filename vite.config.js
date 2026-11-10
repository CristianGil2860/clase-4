import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Rutas relativas: así el build de dist/ funciona también dentro de
  // una subcarpeta de htdocs (ej. http://localhost/clase4/dist/).
  base: "./",
  server: {
    port: 5173,
    open: true,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://kanboad-app-4.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "build",
  },
  plugins: [react()],
});

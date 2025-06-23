import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000
  },
  resolve: {
    alias: {
      "src": resolve(__dirname, "src"),
      "components": resolve(__dirname, "src/components"),
      "service": resolve(__dirname, "src/service"),
      "layout": resolve(__dirname, "src/layout"),
      "utils": resolve(__dirname, "src/utils"),
      "assets": resolve(__dirname, "src/assets"),
      "routes": resolve(__dirname, "src/routes"),
      "theme": resolve(__dirname, "src/theme"),
      "pages": resolve(__dirname, "src/pages"),
      "global": resolve(__dirname, "src/components/global"),
    }
  },
  "build": {
    outDir: "build"
  }
})

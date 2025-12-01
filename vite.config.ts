import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: { 
    sourcemap: false, 
    target: "es2020",
    minify: "esbuild",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'web3': ['ethers'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['lit', 'ethers'],
  },
});

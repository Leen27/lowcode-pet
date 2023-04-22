import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // federation({
    //   name: 'host-app',
    //   remotes: {
    //       './remote-component': {
    //         external:`new Promise(resolve=>resolve('http://localhost:4174/assets/remoteEntry.js'))`,
    //         externalType:"promise"
    //     },
    //   },
    //   shared: ['vue']
    // }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
        output: {
            minifyInternalExports: false
        }
    }
  }
})

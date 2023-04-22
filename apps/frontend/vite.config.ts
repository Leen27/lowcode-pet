import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";

// const myPlugin = () => ({
//   name: 'configure-server',
//   async resolveId(id) {
//     if (/\.\/remote-component\//.test(id)) {
//       console.log(id, 'aaaa')
//     }
//   },
//   load(id) {
//     console.log(id, 'bbbb')
//   },
//   buildStart(options) {
//     console.log(options)
//   }
// })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // myPlugin(),
    federation({
      name: 'host-app',
      remotes: {
          './remote-component': {
            external:`new Promise(resolve=>resolve('http://localhost:4174/assets/remoteEntry.js'))`,
            externalType:"promise"
        },
      },
      shared: ['vue']
    }),
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

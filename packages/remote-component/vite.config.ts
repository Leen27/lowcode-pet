import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";
import { resolve } from 'path'
import topLevelAwait from "vite-plugin-top-level-await";

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    }),

    // 联邦模块
    federation({
      name: './remote-component',
      filename: 'remoteEntry.js',
      // Modules to expose
      exposes: {
          './remote-box.js': './src/components/box/material.vue',
          './remote.js': './src/components/index.ts',
          './remote-preload.js': './src/components/preload.ts'
      },
      shared: ['vue']
    })
  ],
  resolve: {
    dedupe: ['vue'],
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('types')
      },
      {
        find: '@',
        replacement: pathResolve('src')
      },
    ]
  },
  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
      }
    }
  }
})

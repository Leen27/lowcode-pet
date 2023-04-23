import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";
export interface Options {
  depMap: DepMap;
}

export type DepMap = Record<string, string>;

/**
 * 代替路径为远程路径
 * @param options 
 * @returns 
 */
export function remoteImport(options: Options | DepMap): Plugin {
  let normalizeOptions: Options;
  if (!options.depMap) {
      normalizeOptions = {
          depMap: options as DepMap,
      };
  } else {
      normalizeOptions = options as Options;
  }
  const depMap = normalizeOptions.depMap || {};
  return {
      name: 'remoteImport',
      config() {
          return {
              build: {
                  rollupOptions: {
                      external: Object.values(depMap),
                  },
              },
              optimizeDeps: {
                  exclude: Object.keys(depMap),
              },
          };
      },
      resolveId(id) {
          return depMap[id];
      },
      enforce: 'pre',
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // remoteImport({
    //   'remote-component': 'http://localhost:4174/assets/remoteEntry.js'
    // }),
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

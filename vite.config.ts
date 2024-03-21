// vite.config.ts
import { defineConfig } from 'vite';
//svg引入
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig(({ command })=>{
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
          // Specify the icon folder to be cached
          iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
          // Specify symbolId format
          symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath:'mock',
        enable:command === 'serve',
        //localEnabled: command === 'serve',
      }),
  ],
  resolve: {
      alias: {
          '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
  },
  css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variables.scss";',
        },
      },
    },
  }
})

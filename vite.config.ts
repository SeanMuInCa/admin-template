// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
//svg引入
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { UserConfigExport, ConfigEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的env
  const env = loadEnv(mode, process.cwd());
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
        mockPath: 'mock',
        enable: command === 'serve',
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
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          //路径重写，这里的意思是，把/api替换为空，因为接口文档里是并没有/api的
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});

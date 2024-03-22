import { createApp } from 'vue';
//引入element插件和样式

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from '@/App.vue';
//svg插件所需
import 'virtual:svg-icons-register';
//引入仓库
import pinia from '@/store';
import globaleComponent from '@/components/index.ts';
import { router } from '@/router/index';
import '@/styles/index.scss';
//import '@/permission';
const app = createApp(App);
app.use(ElementPlus);
app.use(globaleComponent);

app.use(router);
app.use(pinia);
app.mount('#app');

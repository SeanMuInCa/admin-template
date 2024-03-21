import { createApp } from 'vue';
//引入element插件和样式

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from '@/App.vue';
//svg插件所需
import 'virtual:svg-icons-register';
//引入仓库
//import pinia from '@/store';
import globaleComponent from '@/components/SvgIcon/index.vue';
//import { router } from '@/router/index';
//import '@/style/index.less';
//import '@/permission';
const app = createApp(App);

app.use(globaleComponent);
app.use(ElementPlus);
//app.use(router);
//app.use(pinia);
app.mount('#app');

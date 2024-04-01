//注册全局组件
import SvgIcon from '@/components/SvgIcon/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Category from './Category.vue';
const allGlobalComponents = {
  SvgIcon,
  Category,
};
export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      //@ts-expect-error we don't know how to define it
      app.component(key, allGlobalComponents[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};

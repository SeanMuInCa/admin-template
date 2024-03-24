//注册全局组件
import SvgIcon from '@/components/SvgIcon/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponents = {
  SvgIcon,
};
export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      //@ts-expect-error we don't know how to define it
      app.component(key, allGlobalComponents[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
};

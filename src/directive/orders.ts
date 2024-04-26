import pinia from '@/store';
import useUserStore from '@/store/modules/user';
const userStore = useUserStore(pinia);
export const hasButtons = (app: any) => {
  //全局自定义指令,在DOM或者组件上就可以用v-has: v-has="'btn.Role.add'"
  app.directive('has', {
    //在挂载时候运行
    mounted(el: any, options: any) {
      console.log(el);
      console.log(options);
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el);
      }
    },
  });
};

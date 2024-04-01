//进行axios得二次封装，使用请求与响应拦截器

import axios from 'axios';
import { ElMessage } from 'element-plus';
//引入用户配置数据仓库
import useUserStore from '@/store/modules/user';
//第一步，axios.create，去创建axios实例，目的是可以配置一些如路径，超时时间等

const axiosRequest = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径见配置env
  timeout: 5000,
});
//第二部，给实例添加请求拦截器

axiosRequest.interceptors.request.use((req) => {
  //config配置对象，headers属性请求头，给服务器端携带公共参数用,主要是token
  //请求拦截器这里，获取一下仓库里的token，带给服务器,这样就成功的获取了用户信息
  const userStore = useUserStore();
  //后台系统的token基本都是这样操作的
  if (userStore.token) {
    req.headers.token = userStore.token;
  }

  return req;
});

//第三步，配置响应拦截器
axiosRequest.interceptors.response.use(
  (response) => {
    //这里是成功回调
    return response.data; //简化数据了，接口返回的对象里有个data是实际数据
  },
  (error) => {
    //这里是失败回调，处理网络错误
    let message = '';
    // ElMessage.error(error.message)
    const status = error.response ? error.response.status : error.request.status;
    switch (status) {
      case 0:
        message = 'timeout';
        break;
      case 401:
        message = 'token过期';
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '地址不存在';
        break;
      case 500:
        message = '服务器异常';
        break;
      default:
        message = '网络异常';
        break;
    }
    //提示错误信息，在element得一个控件里
    ElMessage({
      type: 'error',
      message,
    });
    return Promise.reject(error);
  }
);

export default axiosRequest;

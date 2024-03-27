//封装本地存储数据与读取数据的方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token);
};

export const GET_TOKEN = () => {
  return localStorage.getItem('token');
};

export const DEL_TOKEN = () => {
  return localStorage.removeItem('token');
};

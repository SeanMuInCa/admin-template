import axiosRequest from '@/utils/request';

enum API {
  GET_ALL_MENU = '/admin/acl/permission',
}

export const getAllMenu = () => axiosRequest.get<any, any>(API.GET_ALL_MENU);

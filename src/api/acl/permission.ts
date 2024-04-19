import axiosRequest from '@/utils/request';
import { permissionReturnType } from './type';
enum API {
  GET_ALL_MENU = '/admin/acl/permission',
}

export const getAllMenu = () => axiosRequest.get<any, permissionReturnType>(API.GET_ALL_MENU);

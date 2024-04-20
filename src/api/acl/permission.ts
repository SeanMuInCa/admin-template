import axiosRequest from '@/utils/request';
import { permissionReturnType, permit } from './type';
enum API {
  GET_ALL_MENU = '/admin/acl/permission',
  SAVE_MENU = '/admin/acl/permission/save',
  UPDATE_MENU = '/admin/acl/permission/update',
  DELETE_MENU = '/admin/acl/permission/remove/'
}

export const getAllMenu = () => axiosRequest.get<any, permissionReturnType>(API.GET_ALL_MENU);
export const modifyMenu = (data: permit) => (data.id ? axiosRequest.put<any, any>(API.UPDATE_MENU, data) : axiosRequest.post<any, any>(API.SAVE_MENU, data));
export const deleteMenu = (id:number) => axiosRequest.delete<any,any>(API.DELETE_MENU + id);
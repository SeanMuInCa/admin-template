import axiosRequest from '@/utils/request';
import { getRoleReturnType, permissionReturnType } from './type';
enum API {
  GET_ALL_ROLES = '/admin/acl/role/',
  DELETE_ROLE = '/admin/acl/role/remove/',
  SAVE_ROLE = '/admin/acl/role/save',
  UPDATE_ROLE = '/admin/acl/role/update',
  GET_ROLE_MENU = '/admin/acl/permission/toAssign/',
  //给相应的职位分配权限
  SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
}

export const getAllRoles = (page: number, limit: number, roleName: string = '') => axiosRequest.get<any, getRoleReturnType>(API.GET_ALL_ROLES + `${page}/${limit}/?roleName=${roleName}`);
export const delRole = (id: number) => axiosRequest.delete<any, any>(API.DELETE_ROLE + id);
export const saveRole = (data: any) => (data.id ? axiosRequest.put<any, any>(API.UPDATE_ROLE, data) : axiosRequest.post<any, any>(API.SAVE_ROLE, data));
export const getRoleMenu = (id: number) => axiosRequest.get<any, permissionReturnType>(API.GET_ROLE_MENU + id);
//给相应的职位下发权限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) => axiosRequest.post(API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`);

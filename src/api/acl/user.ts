import axiosRequest from '@/utils/request';
import type { UserListReturnType, userRecordsType } from './type';
enum API {
  GET_ALL_USERS = '/admin/acl/user/',
  ADD_USER = '/admin/acl/user/save',
  UPDATE_USER = '/admin/acl/user/update',
  MASS_DEL = '/admin/acl/user/batchRemove',
}

export const getAllUsers = (page: number, limit: number) => axiosRequest.get<any, UserListReturnType>(API.GET_ALL_USERS + `${page}/${limit}`);
export const modifyUser = (data: userRecordsType) => (data.id ? axiosRequest.put<any, any>(API.UPDATE_USER, data) : axiosRequest.post<any, any>(API.ADD_USER, data));
export const massDel = (data: any) => axiosRequest.delete<any, any>(API.MASS_DEL, data);

import axiosRequest from '@/utils/request';
import type { categoryReturnType, attrListReturnType, attr } from '@/api/production/type';
enum API {
  GET_CATEGORY1_URL = `/admin/product/getCategory1`,
  GET_CATEGORY2_URL = '/admin/product/getCategory2/',
  GET_CATEGORY3_URL = '/admin/product/getCategory3/',
  GET_ATTRLIST_URL = '/admin/product/attrInfoList/',
  //add attr and modify attr
  MODIFY_ATTR_URL = '/admin/product/saveAttrInfo',
}

export const getCategory1 = () => axiosRequest.get<any, categoryReturnType>(API.GET_CATEGORY1_URL);
export const getCategory2 = (c1_id: number) => axiosRequest.get<any, categoryReturnType>(API.GET_CATEGORY2_URL + c1_id);
export const getCategory3 = (c2_id: number) => axiosRequest.get<any, categoryReturnType>(API.GET_CATEGORY3_URL + c2_id);
export const getAttrList = (c1_id: number, c2_id: number, c3_id: number) => axiosRequest.get<any, attrListReturnType>(API.GET_ATTRLIST_URL + `${c1_id}/${c2_id}/${c3_id}`);
export const modifyAttr = (data: attr) => axiosRequest.post<any, any>(API.MODIFY_ATTR_URL, data);

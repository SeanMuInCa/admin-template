import axiosRequest from '@/utils/request';
import type { SKUType, SKUListReturnType } from './type';
enum API {
  GET_SKU_LIST = '/admin/product/list/',
}

export const getAllSKU = (page: number, limit: number) => axiosRequest.get<any, SKUListReturnType>(API.GET_SKU_LIST + `${page}/${limit}`);

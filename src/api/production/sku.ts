import axiosRequest from '@/utils/request';
import type { SKUType, SKUListReturnType } from './type';
enum API {
  GET_SKU_LIST = '/admin/product/list/',
  ON_SALE = '/admin/product/onSale/',
  OFF_SALE = '/admin/product/cancelSale/',
  GET_SKU_INFO = '/admin/product/getSkuInfo/',
  DELETE_SKU = '/admin/product/deleteSku/',
}

export const getAllSKU = (page: number, limit: number) => axiosRequest.get<any, SKUListReturnType>(API.GET_SKU_LIST + `${page}/${limit}`);
export const onSale = (id: number | string) => axiosRequest.get(API.ON_SALE + id);
export const offSale = (id: number | string) => axiosRequest.get(API.OFF_SALE + id);
export const getSKUInfo = (id: number | string) => axiosRequest.get(API.GET_SKU_INFO + id);
export const deleteSku = (id: number | string) => axiosRequest.delete(API.DELETE_SKU + id);

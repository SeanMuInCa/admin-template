import axiosRequest from '@/utils/request';
import type { spuData, spuReturnType, brandListType, getImageListReturnType, saleAttrListReturnType, baseSaleAttrReturnType } from '@/api/production/type';
enum API {
  GET_SPU_LIST = '/admin/product/',
  GET_TRADEMARK_LIST = '/admin/product/baseTrademark/getTrademarkList',
  GET_IMAGE_LIST = '/admin/product/spuImageList/',
  GET_SPU_SALE_ATTR_LIST = '/admin/product/spuSaleAttrList/',
  GET_SPU_ATTR_LIST = '/admin/product/baseSaleAttrList',
  UPDATE_SPU = '/admin/product/updateSpuInfo',
  ADD_SPU = '/admin/product/saveSpuInfo',
  DELETE_SPU = '/admin/product/deleteSpu/',
  ADD_SKU = '/admin/product/saveSkuInfo',
  UPDATE_SKU = '/admin/product/updateSkuInfo',
}

export const getSPUList = (page: number, limit: number, category3Id: string | number) => axiosRequest.get<any, spuReturnType>(`${API.GET_SPU_LIST}/${page}/${limit}?category3Id=${category3Id}`);
export const getTrademarkList = () => axiosRequest.get<any, brandListType>(API.GET_TRADEMARK_LIST);
export const getSPUImageList = (id: number | string) => axiosRequest.get<any, getImageListReturnType>(API.GET_IMAGE_LIST + `${id}`);
export const getSPUSaleAttrList = (id: number | string) => axiosRequest.get<any, saleAttrListReturnType>(API.GET_SPU_SALE_ATTR_LIST + `${id}`);
export const getBaseSaleAttrList = () => axiosRequest.get<any, baseSaleAttrReturnType>(API.GET_SPU_ATTR_LIST);
export const modifySPU = (data: spuData) => (data.id ? axiosRequest.post<any, any>(API.UPDATE_SPU, data) : axiosRequest.post<any, any>(API.ADD_SPU, data));
export const deleteSpu = (id: number | string) => axiosRequest.delete(API.DELETE_SPU + id);
export const modifySKU = (data: any) => (data.id ? axiosRequest.post<any, any>(API.UPDATE_SKU, data) : axiosRequest.post<any, any>(API.ADD_SKU, data));

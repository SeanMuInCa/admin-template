import axiosRequest from '@/utils/request';
import type { spuReturnType, brandListType, getImageListReturnType, saleAttrListReturnType } from '@/api/production/type';
enum API {
  GET_SPU_LIST = '/admin/product/',
  GET_TRADEMARK_LIST = '/admin/product/baseTrademark/getTrademarkList',
  GET_IMAGE_LIST = '/admin/product/spuImageList/',
  GET_SPU_SALE_ATTR_LIST = '/admin/product/spuSaleAttrList/',
}

export const getSPUList = (page: number, limit: number, category3Id: string | number) => axiosRequest.get<any, spuReturnType>(`${API.GET_SPU_LIST}/${page}/${limit}?category3Id=${category3Id}`);
export const getTrademarkList = () => axiosRequest.get<any, brandListType>(API.GET_TRADEMARK_LIST);
export const getSPUImageList = (id: number | string) => axiosRequest.get<any, getImageListReturnType>(API.GET_IMAGE_LIST + `${id}`);
export const getSPUSaleAttrList = (id: number | string) => axiosRequest.get<any, saleAttrListReturnType>(API.GET_SPU_SALE_ATTR_LIST + `${id}`);

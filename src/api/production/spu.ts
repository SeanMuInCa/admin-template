import axiosRequest from '@/utils/request';
import type { spuReturnType } from '@/api/production/type';
enum API {
  GET_SPU_LIST = '/admin/product/',
  GET_TRADEMARK_LIST = '/admin/product/baseTrademark/getTrademarkList',
}

export const getSPUList = (page: number, limit: number, category3Id: string | number) => axiosRequest.get<any, spuReturnType>(`${API.GET_SPU_LIST}/${page}/${limit}?category3Id=${category3Id}`);
export const getTrademarkList = () => axiosRequest.get<any, any>(API.GET_TRADEMARK_LIST);

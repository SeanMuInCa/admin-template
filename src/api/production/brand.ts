import axiosRequest from '@/utils/request';
import type { getBrandReturnType } from './type';
enum API {
  GET_PRODUCTION_URL = `/admin/product/baseTrademark/`,
}

export const getProductionRequest = (page: number, limit: number) => axiosRequest.get<any, getBrandReturnType>(`${API.GET_PRODUCTION_URL}/${page}/${limit}`);

import axiosRequest from '@/utils/request';
import type { getBrandReturnType, brandType } from './type';
enum API {
  GET_PRODUCTION_URL = `/admin/product/baseTrademark/`,
  ADD_PRODUCTION_URL = '/admin/product/baseTrademark/save',
  UPDATE_PRODUCTION_URL = '/admin/product/baseTrademark/update',
  DELETE_PRODUCTION_URL = '/admin/product/baseTrademark/remove/',
}

export const getProductionRequest = (page: number, limit: number) => axiosRequest.get<any, getBrandReturnType>(`${API.GET_PRODUCTION_URL}/${page}/${limit}`);
export const addProductionRequest = (newBrandData: brandType) => axiosRequest.post<any, any>(API.ADD_PRODUCTION_URL, newBrandData);
export const updateProductionRequest = (newBrandData: brandType) => axiosRequest.put<any, any>(API.UPDATE_PRODUCTION_URL, newBrandData);
export const deleteProductionRequest = (id:number) => axiosRequest.delete<any, any>(API.DELETE_PRODUCTION_URL + `${id}`);

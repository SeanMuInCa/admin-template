import axiosRequest from '@/utils/request';

enum API {
    GET_PRODUCTION_URL = `/admin/product/baseTrademark/`,
  }

export const getProductionRequest = (page:number, limit:number) => 
  axiosRequest.get<any,any>(`${API.GET_PRODUCTION_URL}/${page}/${limit}`);
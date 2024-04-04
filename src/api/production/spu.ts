import axiosRequest from '@/utils/request';
import type { spuReturnType } from '@/api/production/type';
enum API {
  GET_SPU_LIST = '/admin/product/',
}

export const getSPUList = (page: number, limit: number, category3Id: string | number) => axiosRequest.get<any, spuReturnType>(`${API.GET_SPU_LIST}/${page}/${limit}?category3Id=${category3Id}`);

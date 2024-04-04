import axiosRequest from '@/utils/request';
enum API {
  GET_SPU_LIST = '/admin/product/',
}

export const getSPUList = (page: number, limit: number, category3Id: string | number) => axiosRequest.get<any, any>(`${API.GET_SPU_LIST}/${page}/${limit}?category3Id=${category3Id}`);

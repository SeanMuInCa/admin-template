import { defineStore } from 'pinia';
import { getProductionRequest } from '@/api/production/brand';
import {getBrandReturnType} from '@/api/production/type'
const useProductStore = defineStore('productStore', {
  state: () => {
    return {

    };
  },
  actions: {
    async getProdcution(page: number, limit: number) {
      const data:getBrandReturnType = await getProductionRequest(page, limit);
      if (data.code == 200) return Promise.resolve(data.data);
      return Promise.reject('failed to get production info');
    },
  },
  getters: {},
});

export default useProductStore;

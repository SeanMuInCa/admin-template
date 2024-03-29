import { defineStore } from 'pinia';
import { getProductionRequest } from '@/api/production/brand';
const useProductStore = defineStore('productStore', {
  state: () => {
    return {
      page: 1,
      limit: 3,
    };
  },
  actions: {
    async getProdcution(page: number, limit: number) {
      const data = await getProductionRequest(page, limit);
      if (data.code == 200) return Promise.resolve(data.data);
      return Promise.reject('failed to get production info');
    },
  },
  getters: {},
});

export default useProductStore;

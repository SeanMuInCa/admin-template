import { defineStore } from 'pinia';
import { getProductionRequest, addProductionRequest, updateProductionRequest } from '@/api/production/brand';
import { getBrandReturnType } from '@/api/production/type';
const useProductStore = defineStore('productStore', {
  state: () => {
    return {};
  },
  actions: {
    async getProdcution(page: number, limit: number) {
      const data: getBrandReturnType = await getProductionRequest(page, limit);
      if (data.code == 200) return Promise.resolve(data.data);
      return Promise.reject('failed to get production info');
    },
    async addNewBrand(newBrandData: any) {
      const data: any = await addProductionRequest(newBrandData);
      console.log('add',data);
    },
    async updateBrand(newBrandData: any) {
      const data: any = await updateProductionRequest(newBrandData);
      console.log('update',data);
    },
  },
  getters: {},
});

export default useProductStore;

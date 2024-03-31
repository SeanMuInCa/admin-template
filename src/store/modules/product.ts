import { defineStore } from 'pinia';
import { getProductionRequest, addProductionRequest, updateProductionRequest, deleteProductionRequest } from '@/api/production/brand';
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
      console.log('add', data);
      if (data.code == 200) return Promise.resolve(data);
      return Promise.reject('failed to add production');
    },
    async updateBrand(newBrandData: any) {
      const data: any = await updateProductionRequest(newBrandData);
      console.log('update', data);
      if (data.code == 200) return Promise.resolve(data);
      return Promise.reject('failed to update production');
    },
    async deleteBrand(id: number) {
      const data: any = await deleteProductionRequest(id);
      console.log('delete', data);
      if (data.code == 200) return Promise.resolve(data);
      return Promise.reject('failed to delete production');
    },
  },
  getters: {},
});

export default useProductStore;

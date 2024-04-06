import { defineStore } from 'pinia';

const useSPUStore = defineStore('SpuStore', {
  state: () => {
    return {
      spuName: '',
      tmId: '',
      id: '',
      category3Id: '',
      description: '',
      spuImageList: [],
      spuPosterList: [],
      spuSaleAttrList: [],
    };
  },
  actions: {},
  getters: {},
});

export default useSPUStore;
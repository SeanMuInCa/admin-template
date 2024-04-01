import { defineStore } from 'pinia';
import { getCategory1, getCategory2, getCategory3, getAttrList } from '@/api/production/attribute';
import type { categoryType, categoryReturnType } from '@/api/production/type';
import { nextTick } from 'vue';

const useCategoryStore = defineStore('Category', {
  state: () => {
    return {
      c1Arr: [] as categoryType[],
      c2Arr: [] as categoryType[],
      c3Arr: [] as categoryType[],
      c1_id: '',
      c2_id: '',
      c3_id: '',
      list: [] as categoryType[],
      loading: false,
    };
  },
  actions: {
    async getC1() {
      const data = await getCategory1();
      if (data.code == 200) {
        this.c1Arr = data.data;
      }
    },
    async getC2() {
      const data = await getCategory2(Number.parseInt(this.c1_id));
      if (data.code == 200) {
        this.c2Arr = data.data;
      }
    },
    async getC3() {
      const data = await getCategory3(Number.parseInt(this.c2_id));
      if (data.code == 200) {
        this.c3Arr = data.data;
      }
    },
    async getList() {
      this.loading = true;
      const data = await getAttrList(Number.parseInt(this.c1_id), Number.parseInt(this.c2_id), Number.parseInt(this.c3_id));
      if (data.code == 200) {
        this.list = data.data;
        nextTick(() => {
          this.loading = false;
        })
      }else{
        console.log(1);
        
      }
    },
  },
  getters: {},
});

export default useCategoryStore;

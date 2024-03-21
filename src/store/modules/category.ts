//关于category的小仓库，为了保存三级分类的ID
import { defineStore } from 'pinia';
import { reqCategoryOne, reqCategoryTwo, reqCategoryThree, reqCategoryList } from '@/api/product/attributes';
import type { categoryState, dataType, categoryStore, attrDataType } from '@/store/modules/type';

const useCategoryStore = defineStore('categoryStore', {
  state: (): categoryStore => {
    return {
      categoryOneData: [],
      categoryTwoData: [],
      categoryThreeData: [],
      categoryId1: '',
      categoryId2: '',
      categoryId3: '',
      categoryListData: [],
    };
  },
  actions: {
    async getCategoryOne() {
      const res: categoryState = await reqCategoryOne();
      if (res.code === 200) {
        this.categoryOneData = res.data;
        return Promise.resolve();
      } else {
        return Promise.reject(new Error());
      }
    },
    async getCategoryTwo() {
      if (this.categoryId1) {
        const data: categoryState = await reqCategoryTwo(this.categoryId1);
        if (data.code === 200) {
          this.categoryTwoData = data.data;
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('获取失败'));
        }
      }
    },
    async getCategoryThree() {
      if (this.categoryId2) {
        const data: categoryState = await reqCategoryThree(this.categoryId2);
        if (data.code === 200) {
          this.categoryThreeData = data.data;
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('获取失败'));
        }
      }
    },
    async getCategoryList() {
      if (this.categoryId1 && this.categoryId2 && this.categoryId3) {
        const res: attrDataType = await reqCategoryList(this.categoryId1, this.categoryId2, this.categoryId3);
        if (res.code === 200) {
          this.categoryListData = res.data;
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('获取失败'));
        }
      }
    },
  },
  getters: {},
});

export default useCategoryStore;

import { defineStore } from 'pinia';

const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      isFold: false,
      refresh: false,
    };
  },

  actions: {},
  getters: {},
});

export default useSettingStore;

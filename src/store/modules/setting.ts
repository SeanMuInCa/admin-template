import { defineStore } from 'pinia';
import { ref } from 'vue';

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

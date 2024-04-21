import { defineStore } from 'pinia';

const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      isFold: false,
      refresh: false,
      darkMode: JSON.parse(localStorage.getItem('dark') as string) || false,
    };
  },

  actions: {},
  getters: {},
});

export default useSettingStore;

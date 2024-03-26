import { defineStore } from 'pinia'
import { ref } from 'vue';

const useSettingStore = defineStore('Setting', {
    state: () => {
        return {
            isFold: false
        };
    },

    actions: {

    },
    getters: {},
})

export default useSettingStore;
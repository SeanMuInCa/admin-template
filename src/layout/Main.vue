<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="!settingStore.refresh"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { nextTick, onMounted } from 'vue';
import useSettingStore from '@/store/modules/setting';
import { watch } from 'vue';
const settingStore = useSettingStore();

watch(()=>settingStore.refresh, () => {
  if(settingStore.refresh === true)
  {
    nextTick(() => {
      settingStore.refresh = false;
    })
  }
  
})
onMounted(() => {
  console.log('work');
  
})
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>

<template>
  <div>
    <h1>
      Welcome back
      <span>{{ userStore.userInfo.username }}</span>
      [
      <span v-for="(item, index) in userStore.userInfo.roles" :key="index">{{ item }}</span>
      ]
    </h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.requestInfo();
});
</script>

<style scoped>
span {
  margin: 0, 5px;
}
</style>

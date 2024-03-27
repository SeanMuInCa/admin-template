<template>
  <div>home.vue</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.requestInfo();
})
</script>

<style scoped>

</style>

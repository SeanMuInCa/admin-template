<template>
  <div>
    <el-card>
      <div style="height: 200px; display: flex; align-items: center">
        <img :src="userStore.userInfo.avatar" alt="" style="width: 200px; height: 200px; border-radius: 50%" />
        <h1 style="margin-left: 10px; font-weight: 900">
          {{ getWelcome() }}!
          <p style="margin: 10px 0">
            Welcome back
            <span style="color: blue;">{{ userStore.userInfo.username }}</span>
            [
            <span v-for="(item, index) in userStore.userInfo.roles" :key="index" style="font-weight: 500">{{ item + ' ' }}</span>
            ]
          </p>
        </h1>
      </div>
    </el-card>
    <div class="welcome">
      <img src="../../assets/icons/welcome.svg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { getWelcome } from '@/utils/time';

const userStore = useUserStore();
</script>

<style scoped lang="scss">
span {
  margin: 0, 5px;
}
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 290px - 60px);
  width: 100%;
  img {
    display: block;
    width: 500px;
  }
}
</style>

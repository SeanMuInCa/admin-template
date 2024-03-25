<template>
  <div class="topBar">
    <div class="left">
      <el-icon size="24">
        <Fold></Fold>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 10px">
        <el-breadcrumb-item v-for="(item, index) in url.substring(1).split('/')" :key="index">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-button :icon="FullScreen" circle />
      <el-button :icon="FullScreen" circle />
      <el-button :icon="FullScreen" circle />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, FullScreen } from '@element-plus/icons-vue';

defineProps(['url']);
</script>

<style scoped lang="scss">
.topBar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>

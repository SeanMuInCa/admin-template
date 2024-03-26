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
      <el-button :icon="Refresh" circle />
      <el-button :icon="FullScreen" circle />
      <el-button :icon="Setting" circle />
      <div class="user">
        <img src="../assets/images/LOGO.png" alt="" style="width: 24px; height: 24px" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span>username</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, FullScreen, Refresh, Setting } from '@element-plus/icons-vue';

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

  .right {
    display: flex;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .user {
      margin-left: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        margin: 0 10px;
      }
      .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

<template>
  <div class="topBar">
    <div class="left">
      <el-icon size="24" @click="collapse">
        <!-- <Fold v-if="!isFold" ></Fold>
        <Expand v-else ></Expand> -->
        <component :is="settingStore.isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 10px">
        <el-breadcrumb-item :to="item.path" v-for="(item, index) in router.currentRoute.value.matched" :key="index" class="bread" v-show="item.meta.title">
          <el-icon size="18">
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-button :icon="Refresh" circle @click="goRefresh" />
      <el-button :icon="FullScreen" circle @click="goFullScreen" />
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
import { ref, toRef } from 'vue';
import useSettingStore from '@/store/modules/setting';
import { router } from '@/router';
const settingStore = useSettingStore();

defineProps(['url']);

const goRefresh = () => {
  settingStore.refresh = !settingStore.refresh;
};

const goFullScreen = () => {
  console.log(document.fullscreenElement); //fullscreen mode is on or off
  let isFull = document.fullscreenElement;
  if (!isFull) {
    document.documentElement.requestFullscreen();
  } else document.exitFullscreen();
};

const collapse = () => {
  settingStore.isFold = !settingStore.isFold;
};

const handleCommand = () => {
  console.log(1);
};
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

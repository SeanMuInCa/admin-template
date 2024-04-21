<template>
  <div class="topBar" style="border-bottom: 1px solid" :class="{dark: settingStore.darkMode}">
    <div class="left">
      <el-icon size="24" @click="collapse">
        <!-- <Fold v-if="!isFold" ></Fold>
        <Expand v-else ></Expand> -->
        <component :is="settingStore.isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 10px">
        <el-breadcrumb-item :to="item.path" v-for="(item, index) in router.currentRoute.value.matched" :key="index"
          class="bread" v-show="item.meta.title">
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
      <el-button :icon="Setting" circle @click="goSetting"/>
      <div class="user">
        <img :src="userStore.userInfo.avatar" alt="" style="width: 32px; height: 32px; border-radius: 50%" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span>{{ userStore.userInfo.username }}</span>
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
import useSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { router } from '@/router';
import {ref} from 'vue';
const drawer = ref(false);
const settingStore = useSettingStore();
const userStore = useUserStore();

const props = defineProps(['url','callDrawer']);

const goSetting = () => {
  props.callDrawer(true);
}

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

const handleCommand = async () => {
  const data = await userStore.userLogout();
  if (data == 200) {
    router.push('/login');
  }
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
  background-color: white;
  &.dark{
      color: $white;
      background-color: $black;
    }
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

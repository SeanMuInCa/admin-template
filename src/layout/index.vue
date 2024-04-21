<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_left" :class="{ dark: settingStore.darkMode }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#87b679" text-color="white" :default-active="url" :collapse="settingStore.isFold ? true : false">
          <Menu :menuList="menuRoutes.menuRoutes" :url="url"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部菜单 -->
    <div class="layout_top" :class="{ topFold: settingStore.isFold ? true : false, dark: settingStore.darkMode }">
      <TopBar :url="url" :callDrawer="callDrawer"></TopBar>
    </div>
    <!-- 右侧内容 -->
    <div class="layout_main" :class="{ mainFold: settingStore.isFold ? true : false, dark: settingStore.darkMode }">
      <Main></Main>
    </div>
    <el-drawer v-model="drawer" title="Settings" direction="rtl">
      <div style="display: flex; justify-content: space-between; padding: 20px">
        <span>DarkMode:</span>
        <el-switch v-model="settingStore.darkMode" active-icon="Moon" inactive-icon="Sunny" inline-prompt @change="switchDark" />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo.vue';
import Menu from '@/layout/Menu.vue';
import Main from '@/layout/Main.vue';
import TopBar from '@/layout/TopBar.vue';
import { router } from '@/router/index';
import { ref, onMounted } from 'vue';
import useRoutesStore from '@/store/modules/menuRoutes';
import useSettingStore from '@/store/modules/setting';

const settingStore = useSettingStore();
const drawer = ref(false);
const callDrawer = (value: boolean) => {
  drawer.value = value;
};

const switchDark = (value: boolean) => {
  const html = document.documentElement;
  if (value) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  localStorage.setItem('dark', JSON.stringify(value));
};
console.log(router.currentRoute.value.path);

const url = router.currentRoute.value.path;

const menuRoutes = useRoutesStore();

onMounted(() => {
  settingStore.darkMode && switchDark(true);
});
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  // background-color: red;

  .layout_left {
    width: $slider_width;
    background-color: $slider_color;
    color: white;

    // transition: all 0.3s;
    .scrollbar {
      height: calc(100vh - $logo_height);

      .el-menu {
        border-right: none;
      }

      .title {
        font-size: 18px;
      }
    }

    &.fold {
      width: $slider_min_width;
    }
    &.dark {
      background-color: $black;
    }
  }

  .layout_top {
    width: calc(100% - $slider_width);
    height: $top_height;
    color: $black;
    position: fixed;
    top: 0;
    left: $slider_width;
    transition: all 0.3s;

    &.topFold {
      width: calc(100% - $slider_min_width);
      left: $slider_min_width;
    }
    &.dark {
      color: $white;
      background-color: $black;
    }
  }

  .layout_main {
    width: calc(calc(100% - $slider_width));
    height: calc(100vh - $top_height);

    position: absolute;
    top: $top_height;
    left: $slider_width;
    scroll-behavior: smooth;
    overflow: auto;
    transition: all 0.3s;

    &.mainFold {
      width: calc(100% - $slider_min_width);
      left: $slider_min_width;
    }
    &.dark {
      color: $white;
      background-color: $black;
    }
  }
}
</style>

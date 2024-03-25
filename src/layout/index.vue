<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_left">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <Menu :menuList="menuRoutes.menuRoutes"></Menu>
      </el-scrollbar>
    </div>
    <!-- 顶部菜单 -->
    <div class="layout_top">2222</div>
    <!-- 右侧内容 -->
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/logo.vue';
import Menu from '@/layout/Menu.vue';
import Main from '@/layout/Main.vue';

import useRoutesStore from '@/store/modules/menuRoutes';

const menuRoutes = useRoutesStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: red;

  .layout_left {
    width: $slider_width;
    background-color: $slider_color;
    color: white;

    .scrollbar {
      height: calc(100vh - $logo_height);
      .el-menu {
        border-right: none;
      }
      .title {
        font-size: 18px;
      }
    }
  }

  .layout_top {
    width: calc(100% - $slider_width);
    height: $top_height;
    background-color: cyan;
    position: fixed;
    top: 0;
    left: $slider_width;
  }

  .layout_main {
    width: calc(calc(100% - $slider_width));
    height: calc(100vh - $top_height);
    background-color: rgb(115, 255, 0);
    position: absolute;
    top: $top_height;
    left: $slider_width;
    padding: 20px;
    scroll-behavior: smooth;
    overflow: auto;
  }
}
</style>

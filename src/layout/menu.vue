<template>
  <div class="menu">
    <el-menu v-for="(item, index) in menuList" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item v-if="item.showInMenu" :index="item.path">
          <template #title>
            <span>xxx</span>
            {{ item.meta.title }}
          </template>
        </el-menu-item>
      </template>
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item v-if="item.children[0].meta.showInMenu" :index="item.children[0].path">
          <template #title>
            <span>xxx</span>
            {{ item.children[0].meta.title }}
          </template>
        </el-menu-item>
      </template>
      <!-- <el-sub-menu v-if="item.children && item.children.length > 1">
        <template #title><span>xxx</span>{{ item.meta.title }}</template>
        <el-menu-item v-for="(sub, index) in item.children" :key="sub.path" :index="sub.path"><span>xxx</span>{{ sub.meta.title }}</el-menu-item>
        </el-sub-menu> -->
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
        <template #title>
          <span>xxx</span>
          {{ item.meta.title }}
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts" name="Menu">
import { meta } from '@typescript-eslint/eslint-plugin';
import { defineProps } from 'vue';
defineProps(['menuList']);
</script>

<style scoped lang="scss">
.menu {
  height: 100%;
}
</style>

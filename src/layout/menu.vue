<template>
    <div class="menu">
        <el-menu v-for="(item, index) in menuList" :key="item.path">
            <el-menu-item v-if="!item.children" :index="item.path">xxx{{ item.meta.title }}</el-menu-item>
            <template #title>
                xxx{{ item.meta.title }}
            </template>
            <el-menu-item v-if="item.children && item.children.length == 1" :index="item.children[0].path">
                <template #title>
                    xxx{{ item.children[0].meta.title }}
                </template>
            </el-menu-item>
            <el-sub-menu v-if="item.children && item.children.length >1">
                <template #title>
                    xxx{{ item.meta.title }}
                </template>
                <el-menu-item v-for="(sub, index) in item.children" :key="index">xxx{{ sub.meta.title }}</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps(['menuList']);
</script>

<style scoped lang="scss">
.menu {
    height: 100%;
}
</style>

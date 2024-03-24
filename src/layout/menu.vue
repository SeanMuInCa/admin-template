<template>
    <div class="menu">
        <el-menu v-for="(item,index) in menuList" :key="item.path">
            <el-menu-item v-if="!item.children" :index="index+1">{{ item.name }}</el-menu-item>
            <el-sub-menu v-else v-for="(sub,index) in item.children" :key="index">
                <template #title>
                    {{ item.name }}
                </template>
                <el-menu-item >{{ sub.name }}</el-menu-item>
                </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps(['menuList'])



</script>

<style scoped lang="scss">
.menu{
    height: 100%;
}
</style>

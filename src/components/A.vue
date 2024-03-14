<template>
    <h1 class="px-36 font-medium underline">
        Hello world!
    </h1>
    <div v-for="(item,index) in data" :key="index" class="ml-5">
        <input type="checkbox" v-model="item.checked"><span>{{ item.name }}</span>
        <A :data="item.children" v-if="item?.children"></A>
    </div>
</template>

<script setup lang="ts" name="A">
import { defineProps } from 'vue'
interface Tree {
    name: string,
    checked: boolean,
    children?: Tree[]
}
defineProps<{
    data?: Tree[]
}>();
</script>

<style scoped></style>
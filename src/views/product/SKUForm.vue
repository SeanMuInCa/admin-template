<template>
  <el-card>
    456
    <el-button @click="cancel">click</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
const $emit = defineEmits(['setScene']);
const cancel = () => {
  $emit('setScene', 0);
};
</script>

<style scoped></style>

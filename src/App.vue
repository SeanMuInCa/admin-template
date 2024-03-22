<script setup lang="ts" name="App">
import { reactive } from 'vue';
interface Tree {
  name: string;
  checked: boolean;
  children?: Tree[];
}
//@ts-expect-error we know
const data = reactive<Tree[]>([
  {
    name: '1',
    checked: false,
    children: [
      {
        name: '1-1',
        checked: false,
      },
    ],
  },
  {
    name: '2',
    checked: true,
  },
  {
    name: '3',
    checked: false,
    children: [
      {
        name: '3-1',
        checked: false,
        children: [
          {
            name: '3-1-1',
            checked: true,
          },
          {
            name: '3-1-2',
            checked: true,
          },
        ],
      },
    ],
  },
]);
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-size: $size;
  color: $color;
}
</style>

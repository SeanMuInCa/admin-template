<script setup lang="ts" name="App">

import { reactive,onMounted } from 'vue';
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

import axiosRequest from '@/utils/request'
onMounted(() => {
  axiosRequest({
    url: '/user/login',
    method: 'post',
    data:{
      username:'admin',
      password:'111111'
    }
  }).then((res) => {
    console.log(res);
    
  })
});
</script>

<template>
  <div>
    <SvgIcon name="head" width="64px" height="64px"></SvgIcon>
    <h1>ceshi1</h1>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-size: $size;
  color: $color;
}
</style>

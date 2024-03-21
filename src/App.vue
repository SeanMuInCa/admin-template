<script setup lang="ts" name="App">
import axios from 'axios';
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

// axios({
//   url: '/api/user/login',//请求地址
//   method: 'post',//请求方式
//   data:{
//     username:'admin',
//     password:'111111'
//   }
// })


</script>

<template>
  <div>
    <SvgIcon name="head" width="64px" height="64px"></SvgIcon>
    <h1 >ceshi1</h1>
  </div>
</template>

<style scoped lang="scss">
h1{
  font-size: $size;
  color: $color;
}
</style>

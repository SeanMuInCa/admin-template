<template>
  <div class="box">
    <h1>I don't know where you are</h1>
    <h2>but I will send you back <a @click="goHome">home</a></h2>
    <img src="../../assets/images/error_images/404.png" alt="">
  </div>
</template>

<script setup lang="ts">
import { router } from '@/router';
const goHome = () => {
  router.push('/home');
}
</script>

<style scoped lang="scss">
.box{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  img{
    width: 800px;
    height: 400px;
  }
  h1{
    font-size: 50px;
    font-weight: 900;
  }
  h2{
    font-size: 30px;
    font-weight: 700;
    a{
      cursor: pointer;
      color: aqua;
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="screen">
      <div class="top">123</div>
      <div class="main">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container{
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen{
    width: 1920px;
    height: 1080px;
    background-color: red;
  }
}
</style>

<template>
  <div class="box">
    <div class="top">
      <p class="static">Statics</p>
      <p class="title"></p>
      <p class="number">Numbers of 999999</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box {
  background: url('../images/dataScreen-main-lt.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    color: white;
    margin-left: 20px;
    .static {
      font-size: 20px;
    }
    .title {
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: contain;
      height: 7px;
      width: 68px;
    }
    .number {
      margin-left: 190px;
    }
  }
}
</style>

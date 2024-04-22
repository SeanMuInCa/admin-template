<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">Home Page</span>
    </div>
    <div class="center">Data Screen for Duesytech System</div>
    <div class="right">
      <div class="rbtn">Report</div>
      <div></div>
      <div style="margin-right: 40px">{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from '@/router/index';
import moment from 'moment';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const time = ref('');
let timer = ref(0);
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY-MM-DD  hh:mm:ss');
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
const goHome = () => {
  router.push('/home');
};
</script>

<style scoped lang="scss">
.top {
  display: flex;
  width: 100%;
  height: 40px;

  .left {
    flex: 1;
    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;

    .lbtn {
      width: 135px;
      height: 40px;
      position: absolute;
      left: 260px;
      background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: cover;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
  }

  .center {
    height: 74px;
    color: #29fcff;
    line-height: 74px;
    text-align: center;
    font-size: 46px;
    flex: 3;
    background: url('../images/dataScreen-header-center-bg.png') no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  .right {
    flex: 1;
    background: url('../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: 100% 100%;
    color: #29fcff;
    line-height: 40px;
    text-align: center;
    display: flex;
    justify-content: space-between;

    .rbtn {
      width: 135px;
      height: 40px;
      position: absolute;
      right: 260px;
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: cover;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>

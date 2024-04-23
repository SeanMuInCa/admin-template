<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="top">
        <Top></Top>
      </div>
      <div class="main">
        <div class="left">
          <LeftTop class="leftTop"></LeftTop>
          <LeftMid class="leftMid"></LeftMid>
          <LeftBottom class="leftBottom"></LeftBottom>
        </div>
        <div class="center">2</div>
        <div class="right">3</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Top from './components/Top.vue';
import LeftTop from './components/LeftTop.vue';
import LeftMid from '@/views/screen/components/LeftMid.vue';
import LeftBottom from '@/views/screen/components/LeftBottom.vue';

const screenRef = ref();
onMounted(() => {
  screenRef.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});

//大屏缩放比例函数
const getScale = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w;
  let wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .main {
      display: flex;
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .leftTop {
          flex: 1.5;
        }
        .leftMid {
          flex: 1;
        }
        .leftBottom {
          flex: 1;
        }
      }
      .center {
        flex: 3;
      }
      .right {
        flex: 1;
      }
    }
  }
}
</style>

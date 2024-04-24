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
        <div class="center">
          <CenterTop class="centerTop"></CenterTop>
          <CenterBottom class="centerBottom"></CenterBottom>
        </div>
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
import CenterTop from './components/CenterTop.vue';
import CenterBottom from './components/CenterBottom.vue';

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
  background-color: rgba(255, 255, 255, 0.5);
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
        display: flex;
        flex-direction: column;
        color: #fff;
        .centerTop {
          flex: 4;
          width: 100%;
          margin-top: 50px;
        }
        .centerBottom {
          flex: 1;
        }
      }
      .right {
        flex: 1;
      }
    }
  }
}
.container::before {
  content: ''; /* 必须有内容，才能显示伪元素 */
  position: absolute; /* 设置绝对定位 */
  top: 0;
  left: 0;
  width: 100%; /* 充满整个父元素 */
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
}
</style>

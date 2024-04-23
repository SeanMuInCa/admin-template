<template>
  <div class="box">
    <div class="top">
      <div class="left">
        <p class="static">Statics</p>
        <p class="title"></p>
      </div>
      <div class="number">
        <p>Numbers of Visitors</p>
        <p>
          <span>{{ num }}</span>
        </p>
      </div>
    </div>
    <div class="middle">
      <span v-for="item in num" :key="item">{{ item }}</span>
    </div>
    <div class="charts" ref="chart1"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
console.log(echarts);
const num = ref('2169088');
const chart1 = ref();
onMounted(() => {
  const chart = echarts.init(chart1.value);

  chart.setOption({
    title: {
      text: 'Chart',
      textStyle: {
        color: 'white',
        fontWeight: 'bolder',
      },
      subtext: 'hello world',
      subtextStyle: {
        color: 'white',
        fontWeight: 'bolder',
      },
    },
    series: [
      {
        type: 'liquidFill',
        data: [0.5, 0.4, 0.3],
        color: ['#29fcff'],
        itemStyle: {
          opacity: 0.6,
        },
        radius: '80%',
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'none',
            borderColor: '#294D99',
            borderWidth: 5,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
        },
        emphasis: {
          itemStyle: {
            opacity: 0.9,
          },
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  });
});
</script>

<style scoped lang="scss">
.box {
  background: url('../images/dataScreen-main-lt.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    color: white;
    margin: 10px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .static {
      font-size: 20px;
    }

    .left {
      flex: 1;
    }

    .title {
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: contain;
      height: 7px;
      width: 68px;
      margin-top: 10px;
    }

    .number {
      font-size: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      flex: 1;

      p {
        margin: 5px;
        width: 100%;
        text-align: center;
      }

      span {
        color: #29fcff;
      }
    }
  }

  .middle {
    display: flex;
    justify-content: space-around;

    span {
      font-size: 40px;
      text-align: center;
      color: #29fcff;
      margin-top: 10px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      background: url('../images/total.png');
    }
  }

  .charts {
    width: 100%;
    height: 304px;
  }
}
</style>

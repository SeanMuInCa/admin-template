<template>
  <div class="box">
    <div class="top">
      <p style="line-height: 20px">Next 30 days</p>
      <p class="title"></p>
    </div>
    <div class="chart" ref="chart1"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
const chart1 = ref();
onMounted(() => {
  const myChart = echarts.init(chart1.value);
  myChart.setOption({
    title: {
      text: 'visitors',
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: false,
      },
      boundaryGap: false,
      // axisLine:{
      //   show:false
      // }
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
    grid: {
      left: 30,
      right: 20,
      top: 0,
      bottom: 60,
    },
    series: [
      {
        type: 'line',
        data: [120, 210, 888, 222, 333, 444, 888, 120, 210, 888, 222, 333, 444, 888, 324, 62, 551, 113, 209, 123, 442, 525, 1222, 353, 434, 343, 111, 333, 144, 921, 113],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#0176f5', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#11144e', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: {
          focus: 'self',
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.box {
  margin: 0 20px;
  width: 100%;
  height: 100%;
  background: url('../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .top {
    color: white;
    margin: 5px 20px;

    .title {
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: contain;
      height: 7px;
      width: 68px;
      margin-top: 5px;
    }
  }

  .chart {
    width: 100%;
    height: 180px;
    padding: 10px;
  }
}
</style>

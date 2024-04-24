<template>
  <div class="box">
    <div class="top">
      <p class="static">Statics</p>
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
  myChart.setOption(option);
});
const option = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%',
  },
  grid: {},
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      detail: {
        formatter: '{value}',
      },
      itemStyle: {
        color: '#fff',
      },
      data: [
        {
          value: 50,
          name: 'SCORE',
        },
      ],
    },
  ],
};
</script>

<style scoped lang="scss">
.box {
  margin: 5px 0;
  background-color: aqua;
  background: url('../images/dataScreen-main-lc.png') no-repeat;
  background-size: 100% 100%;
  height: 200px;

  .top {
    color: white;
    margin: 10px 20px;

    .title {
      background: url('../images/dataScreen-title.png') no-repeat;
      background-size: contain;
      height: 7px;
      width: 68px;
      margin-top: 10px;
    }
  }
  .chart {
    height: 260px;
  }
}
</style>

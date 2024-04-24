<template>
  <div class="box">
    <div class="top">
      <div class="left">
        <p class="static">Statics</p>
        <p class="title"></p>
      </div>
    </div>
    <div class="middle"></div>
    <div class="charts" ref="chart1"></div>
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
  xAxis: {},
  title: {
    text: 'Statics',
    left: '40%',
    top: '20',
    textStyle: {
      color: 'yellowgreen',
    },
  },
  yAxis: { type: 'category' },
  series: [
    {
      type: 'bar',
      data: [120, 230, 150, 190, 320, 120, 330],
      label: { show: true },
      showBackground: true,
      backgroundStyle: { color: '#333' },
      itemStyle: {
        borderRadius: 10,
        color: function (data: any) {
          const arr = ['red', 'blue', 'cyan', 'yellowgreen', 'hotpink', 'aqua', 'green'];
          return arr[data.dataIndex];
        },
      },
    },
  ],
  grid: {
    left: 30,
    right: 0,
    bottom: 40,
    top: 80,
  },
};
</script>

<style scoped lang="scss">
.box {
  background: url('../images/dataScreen-main-rt.png') no-repeat;
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
  }

  .charts {
    width: 100%;
    height: 304px;
  }
}
</style>

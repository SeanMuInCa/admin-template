<template>
    <div class="box">
        <div class="top">
            <p class="static">Rate</p>
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
    tooltip: {
    trigger: 'item'
  },
  legend: {
    orient:'vertical',
    right: '10',
    top:50,
    textStyle:{
        color:'#fff',
        fontSize:'18'
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['30%', '70%'],
      avoidLabelOverlap: false,
      center:['30%', '50%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside',
        color:'#fff',
        fontWeight:'bold',
        padding: 4,
        borderColor:'red'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'teen' },
        { value: 735, name: '20~30' },
        { value: 580, name: '30~40' },
        { value: 484, name: '40~50' },
        { value: 300, name: 'elder' }
      ]
    }
  ],
  grid:{
    top:0,
    left:0,
    right:0,
    bottom:0
  }
  })
})
</script>

<style scoped lang="scss">
.box {
    background-color: aqua;
    background: url('../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    height: 262px;

    .top {
        color: white;
        margin: 5px 20px;

        .title {
            background: url('../images/dataScreen-title.png') no-repeat;
            background-size: contain;
            height: 7px;
            width: 68px;
            margin-top: 10px;
        }
    }
    .chart{
        width: 100%;
        height:260px;
        padding: 10px;
    }
}
</style>

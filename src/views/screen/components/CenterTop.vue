<template>
    <div class="box">
        <div class="top" style="text-align: center;">
            <span>unread messages (<i style="color: #29fcff; cursor: pointer;">2</i>)</span>
            <img src="../images/dataScreen-header-warn-bg.png" alt="">
        </div>
        <div class="chart" ref="chart1"></div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import * as echarts from 'echarts';
import chinaJSON from './china.json';

const chart1 = ref();
echarts.registerMap('china', chinaJSON as any);
onMounted(() => {
    const myChart = echarts.init(chart1.value);
    myChart.setOption({
        geo:{
            map:'china',
            zoom:1.6,
            top:200,
            label:{
                show:true,
                color:'#fff'
            },
            itemStyle:{
                areaColor:'#007afe',
                opacity:0.7,
                borderColor:'#fff',
                borderWidth:0.2,
            },
            emphasis:{
                itemStyle:{
                    color:'#007afe',
                    opacity:1,
                },
                label:{
                    color:"#fff",
                    fontSize:20,
                    fontWeight:700,
                }
            }
        }
    })
})
</script>

<style scoped lang="scss">
span{
    position: fixed;
    font-size: 20px;
    left: 850px;
    top: 95px;
    font-weight: 900;
}
.chart{
    width: 100%;
    height:100%
}
</style>
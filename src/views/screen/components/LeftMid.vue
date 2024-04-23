<template>
    <div class="box">
        <div class="top">
            <p class="static">Gender</p>
            <p class="title"></p>
        </div>
        <div class="mid">
            <div class="male">
                <span>Male</span>
                <img src="../images/man.png" alt="" style="width: 61px; height: 61px;">
            </div>
            <div class="female">
                <span>Female</span>
                <img src="../images/woman.png" alt="" style="width: 61px; height: 61px;">
            </div>
        </div>
        <div class="bottom">
            <div class="number">
                <p>52%</p>
                <p>48%</p>
            </div>
            <div class="chart" ref="chart1"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
const chart1 = ref();
onMounted(() => {
    const myChart = echarts.init(chart1.value);
    myChart.setOption({
        xAxis: {
            show: false,
            min:0,
            max:100
        },
        yAxis: {
            show: false,
            type:'category'
        },
        series: [
            {
                type:'bar',
                data:[58],
                barWidth:20,
                z:100,
                itemStyle:{
                    borderRadius:20
                }
            },
            {
                type:'bar',
                data:[100],
                barWidth:20,
                barGap:'-100%',
                itemStyle:{
                    color:'#ff4b7a',
                    borderRadius:20
                }
            },

        ]
    })
})
</script>

<style scoped lang="scss">
.box {
    margin: 10px 0;
    background-color: aqua;
    background: url('../images/dataScreen-main-lc.png') no-repeat;
    background-size: 100% 100%;
    height: 262px;

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

    .mid {
        width: 100%;
        display: flex;
        justify-content: space-around;
        color: #fff;

        .male,
        .female {
            width: 110px;
            height: 115px;
            background-color: red;
            margin-top: 5px;
        }

        .male {
            background: url('../images/man-bg.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;

            span {
                margin-top: -10px;
            }
        }

        .female {
            background: url('../images/woman-bg.png') no-repeat;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;

            span {
                margin-top: -10px;
            }
        }
    }

    .bottom {
        color: #fff;
        width: 100%;

        .number {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 20px;
        }

        .chart {
            height: 50px;
        }
    }
}
</style>

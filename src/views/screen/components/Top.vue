<template>
    <div class="top">
        <div class="left">
            <span class="lbtn">Home Page</span>
        </div>
        <div class="center">1</div>
        <div class="right">
            <span class="rbtn">Report</span>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.top{
    display: flex;
    width: 100%;
    height: 40px;
    .left{
        flex: 1;
        background: url('../images/dataScreen-header-left-bg.png') no-repeat;
        background-size: cover;
        .lbtn{
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
    .center{
        height: 74px;
        flex:3;
        background: url('../images/dataScreen-header-center-bg.png') no-repeat;
        background-position: center;
        background-size: cover;
    }
    .right{
        flex: 1;
        background: url('../images/dataScreen-header-right-bg.png') no-repeat;
        background-size: cover;
        .rbtn{
            width: 135px;
            height: 40px;
            position: absolute;
            right: 260px;
            background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
            background-size: cover;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            cursor: pointer;
        }
    }
}
</style>
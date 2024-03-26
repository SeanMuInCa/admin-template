<template>
  <div class="logo_container">
    <h1>
      <img src="../assets/images/logo.png" alt="" />
      <p v-show="!settingStore.isFold">Raina的家</p>
    </h1>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting';

const settingStore = useSettingStore();
</script>

<style scoped lang="scss">
.logo_container {
  height: $logo_height;
  padding: 5px 20px;
  h1 {
    display: flex;
    height: 100%;
    align-items: center;
    img {
      height: 100%;
    }
    p {
      padding: 10px;
      color: white;
      font-size: $title_size;
      font-weight: 700;
    }
  }
}
</style>

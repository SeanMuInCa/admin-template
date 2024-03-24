<template>
  <div class="logo_container">
    <h1>
      <img src="../assets/images/logo.png" alt="" />
      <p>Raina的家</p>
    </h1>
  </div>
</template>

<script setup lang="ts"></script>

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

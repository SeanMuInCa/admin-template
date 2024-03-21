<template>
  <div>
    <svg class="icon">
      <use :xlink:href="prefix + name" :height="height" :width="width"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: `#icon-`,
  },
  name: String,
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
});
</script>

<style scoped></style>

<template>
  <el-card>
    <el-form class="demo-form-inline" :inline="true">
      <el-form-item label="Category I">
        <el-select placeholder="please select category" clearable style="width: 240px" v-model="categoryStore.c1_id" @change="selectA" @clear="clearA">
          <el-option v-for="item in categoryStore.c1Arr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Category II">
        <el-select v-model="categoryStore.c2_id" clearable placeholder="please select category" @change="selectB" style="width: 240px">
          <el-option v-for="item in categoryStore.c2Arr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Category III">
        <el-select v-model="categoryStore.c3_id" clearable placeholder="please select category" @change="selectC" style="width: 240px">
          <el-option v-for="item in categoryStore.c3Arr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

const categoryStore = useCategoryStore();
const props = defineProps(['setFlag']);

onMounted(() => {
  getCategoryInit();
});
const getCategoryInit = async () => {
  await categoryStore.getC1();
};

const selectA = async () => {
  await categoryStore.getC2();
};

const selectB = async () => {
  await categoryStore.getC3();
};


</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>

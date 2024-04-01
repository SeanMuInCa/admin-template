<template>
  <Category :setFlag="setFlag"></Category>
  <el-card>
    <el-button type="primary" icon="Plus" @click="handleAdd">add an attribute</el-button>
    <el-table :data="categoryStore.list" style="width: 100%; margin: 20px 0" height="600" border>
      <el-table-column fixed type="index" prop="index" label="No." width="100px" align="center" />
      <el-table-column prop="attrName" label="Attribute Name" width="300px"></el-table-column>
      <el-table-column prop="attrValueList" label="Attribute Value Name" width="700px" style="display: flex; justify-content: space-around">
        <template #default="{ row }">
          <!-- <span v-for="item in row.attrValueList" :key="item.id" style="display: inline-block; padding: 5px; margin: 0 10px; background-color: aqua " >{{ item.valueName }}</span> -->
          <el-button v-for="item in row.attrValueList" :key="item.id" :type="Math.random() > 0.5 ? 'success' : 'warning'" plain>{{ item.valueName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="Operation" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import type { categoryType } from '@/api/production/type';
import useCategoryStore from '@/store/modules/category';

const categoryStore = useCategoryStore();
const flag = ref(false);

const setFlag = (value: boolean) => {
  flag.value = value;
};
watchEffect(() => {
  if (flag.value) {
    categoryStore.list = [];
    getList();
    flag.value = false;
  }
});

watch(
  () => categoryStore.c1_id,
  () => {
    categoryStore.c2_id = '';
    categoryStore.c3_id = '';
    categoryStore.c2Arr = [];
    categoryStore.c3Arr = [];
  }
);

watch(
  () => categoryStore.c2_id,
  () => {
    categoryStore.c3_id = '';
    categoryStore.c3Arr = [];
  }
);

const getList = async () => {
  await categoryStore.getList();
};
</script>

<style scoped></style>

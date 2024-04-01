<template>
  <Category :setList="setList"></Category>
  <el-card>
    <el-button type="primary" icon="Plus" @click="handleAdd">add an attribute</el-button>
    <el-table :data="list" style="width: 100%; margin: 20px 0" height="600" border>
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
import { reactive } from 'vue';
import type { categoryType } from '@/api/production/type';
const list = reactive<categoryType[]>([]);

const setList = (value: categoryType[]) => {
  Object.assign(list, value);
};
</script>

<style scoped></style>

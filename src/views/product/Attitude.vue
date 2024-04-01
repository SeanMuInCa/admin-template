<template>
  <el-card>
    <el-form class="demo-form-inline" :inline="true">
      <el-form-item label="Category I">
        <el-select placeholder="please select category" clearable style="width: 240px" v-model="form.categoryA_id" @change="selectA">
          <el-option v-for="item in dataA" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Category II">
        <el-select v-model="form.categoryB_id" placeholder="please select category" @change="selectB" style="width: 240px">
          <el-option v-for="item in dataB" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Category III">
        <el-select v-model="form.categoryC_id" placeholder="please select category" @change="selectC" style="width: 240px">
          <el-option v-for="item in dataC" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" icon="Plus" @click="handleAdd">add an attribute</el-button>
    <el-table :data="list" style="width: 100%; margin: 20px 0" height="600" border>
      <el-table-column fixed type="index" prop="index" label="No." width="100px" align="center" />
      <el-table-column prop="attrName" label="Attribute Name" width="300px"></el-table-column>
      <el-table-column prop="attrValueList" label="Attribute Value Name" width="700px" style="display: flex; justify-content: space-around;">
        <template #default={row} >
          <span v-for="item in row.attrValueList" :key="item.id" >{{ item.valueName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="Operation" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { getCategory1, getCategory2, getCategory3, getAttrList } from '@/api/production/attribute';
import type { categoryType, categoryReturnType } from '@/api/production/type';
const form = reactive({
  categoryA_id: null as number | null,
  categoryB_id: null as number | null,
  categoryC_id: null as number | null,
});
const dataA = reactive<categoryType[]>([]);
const dataB = reactive<categoryType[]>([]);
const dataC = reactive<categoryType[]>([]);
const list = reactive<categoryType[]>([]);

onMounted(async () => {
  const data: categoryReturnType = await getCategory1();
  if (data.code == 200) {
    Object.assign(dataA, data.data);
  }
  console.log('dataA', dataA);
});

const selectA = async () => {
  const data = await getCategory2(form.categoryA_id!);
  if (data.code == 200) {
    Object.assign(dataB, data.data);
  }
  console.log('dataB', dataB);
};

const selectB = async () => {
  const data = await getCategory3(form.categoryB_id!);
  if (data.code == 200) {
    Object.assign(dataC, data.data);
  }
  console.log('dataC', dataC);
};

const selectC = async () => {
  const data = await getAttrList(form.categoryA_id!, form.categoryB_id!, form.categoryC_id!);
  console.log(data);

  if (data.code == 200) {
    Object.assign(list, data.data);
  }
  console.log(data);
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

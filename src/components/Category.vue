<template>
  <el-card>
    <el-form class="demo-form-inline" :inline="true">
      <el-form-item label="Category I">
        <el-select placeholder="please select category" clearable style="width: 240px" v-model="form.categoryA_id" @change="selectA" @clear="clearA">
          <el-option v-for="item in dataA" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Category II">
        <el-select v-model="form.categoryB_id" clearable placeholder="please select category" @change="selectB" style="width: 240px">
          <el-option v-for="item in dataB" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Category III">
        <el-select v-model="form.categoryC_id" clearable placeholder="please select category" @change="selectC" style="width: 240px">
          <el-option v-for="item in dataC" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { getCategory1, getCategory2, getCategory3, getAttrList } from '@/api/production/attribute';
import type { categoryType, categoryReturnType } from '@/api/production/type';
import { ElMessage } from 'element-plus';

const props = defineProps(['setList']);

const form = reactive({
  categoryA_id: null as number | null,
  categoryB_id: null as number | null,
  categoryC_id: null as number | null,
});

let dataA = reactive<categoryType[]>([]);
let dataB = reactive<categoryType[]>([]);
const dataC = reactive<categoryType[]>([]);

onMounted(async () => {
  getCategoryInit();
});
const getCategoryInit = async () => {
  const data: categoryReturnType = await getCategory1();
  if (data.code == 200) {
    Object.assign(dataA, data.data);
  }
  console.log('dataA', dataA);
};
const clearA = () => {
  dataA = {};
  console.log(dataA);

  dataB = {};
  console.log(dataB);

  Object.assign(dataC, null);
  getCategoryInit();
};
const selectA = async () => {
  Object.assign(dataB, null);
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

  if (data.code == 200) {
    props.setList(data.data);
  } else {
    ElMessage.error('network error');
  }
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

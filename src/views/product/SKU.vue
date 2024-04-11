<template>
  <el-card >
    <el-table style="width: 100%;" :data="tableData" border>
      <el-table-column type="index" label="No." width="80"></el-table-column>
      <el-table-column prop="skuName" label="Name" width="200"></el-table-column>
      <el-table-column prop="skuDesc" label="Description" width="400"></el-table-column>
      <el-table-column  label="Default Logo" width="200">
        <template #default="{ row }">
              <img :src="row.skuDefaultImg" style="width: 100px" />
            </template>
      </el-table-column>
      <el-table-column prop="weight" label="Weight(g)" width="200"></el-table-column>
      <el-table-column prop="price" label="Price($)" width="200"></el-table-column>
      <el-table-column fixed="right" label="Operations" width="320">
          <template #default="{ row }">
            <el-button type="primary" icon="Plus" size="small" title="Plus SKU" ></el-button>
            <el-button type="warning" icon="Edit" size="small" title="Edit SPU" ></el-button>
            <el-button type="info" icon="Warning" size="small" title="SKU Info" ></el-button>
            <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?" >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small" title="Delete SPU"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
    <!-- pagination -->
    <div class="demo-pagination-block">
        <div class="demonstration"></div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10,20,30]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
  </el-card>
</template>

<script setup lang="ts">
import {getAllSKU} from '@/api/production/sku';
import { onMounted,ref } from 'vue';
import {SKUType, SKUListReturnType} from '@/api/production/type'
const tableData = ref<SKUType[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
onMounted(() => {
  getData();
})
const getData = async() => {
  const data:SKUListReturnType = await getAllSKU(currentPage.value,pageSize.value);
  if(data.code == 200){
    total.value = data.data.total;
    tableData.value = data.data.records;
  }
}

const handleSizeChange = async () => {
  currentPage.value = 1;
  await getData();
};

const handleCurrentChange = async () => {
  await getData();
};
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

<template>
  <el-card>
    <el-table style="width: 100%" :data="tableData" border>
      <el-table-column type="index" label="No." width="80"></el-table-column>
      <el-table-column prop="skuName" label="Name" width="200"></el-table-column>
      <el-table-column prop="skuDesc" label="Description" width="400"></el-table-column>
      <el-table-column label="Default Logo" width="200">
        <template #default="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="Weight(g)" width="200"></el-table-column>
      <el-table-column prop="price" label="Price($)" width="200"></el-table-column>
      <el-table-column fixed="right" label="Operations" width="320">
        <template #default="{ row }">
          <el-button v-if="!row.isSale" type="primary" icon="Top" size="small" title="OnSale SKU"
            @click="handleOnSale(row)"></el-button>
          <el-button v-else type="info" icon="Bottom" size="small" title="OffSale SKU"
            @click="handleOnSale(row)"></el-button>
          <el-button type="warning" icon="Edit" size="small" title="Coming soon" disabled></el-button>
          <el-button type="info" icon="Warning" size="small" title="SKU Info" @click="handleInfo(row)"></el-button>
          <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled"
            icon-color="#626AEF" title="Are you sure to delete this?" @confirm="confirmDel(row)">
            <template #reference>
              <el-button type="danger" icon="Delete" size="small" title="Delete SKU"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <div class="demo-pagination-block">
      <div class="demonstration"></div>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
        :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
        @size-change="handleSizeChange" @current-change="getData" />
    </div>
    <el-drawer v-model="openDrawer" title="SKU Info Details" direction="rtl" size="50%">

    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { getAllSKU, onSale, offSale, getSKUInfo, deleteSku } from '@/api/production/sku';
import { onMounted, ref } from 'vue';
import { SKUType, SKUListReturnType, skuDataType } from '@/api/production/type';
import { ElMessage } from 'element-plus';
const tableData = ref<SKUType[]>([]);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const openDrawer = ref(false);
onMounted(() => {
  getData();
});
const getData = async (pager = 1) => {
  currentPage.value = pager;
  const data: SKUListReturnType = await getAllSKU(currentPage.value, pageSize.value);
  if (data.code == 200) {
    total.value = data.data.total;
    tableData.value = data.data.records;
  }
};

const handleSizeChange = async () => {
  currentPage.value = 1;
  await getData();
};

const handleOnSale = async (row: skuDataType) => {
  if (row.isSale === 1) {
    const data: any = await offSale(row.id);
    if (data.code == 200) {
      ElMessage.info('offSale success');
    }
  } else if (row.isSale === 0) {
    const data: any = await onSale(row.id);
    if (data.code == 200) {
      ElMessage.success('onSale success');
    }
  }
  getData(currentPage.value);
};

const handleInfo = async (row: skuDataType) => {
  const data:any = await getSKUInfo(row.id);
  if (data.code == 200) {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    openDrawer.value = true;
  }
}

const confirmDel = async (row:skuDataType) => {
  if(row.isSale === 1){
    ElMessage.error('this SKU is onSale, can not delete!');
    return;
  }else{
    const data:any = await deleteSku(row.id);
  if (data.code == 200) {
    ElMessage.success('deleted success!');
    getData();
  }
  }
};
</script>

<style scoped>
.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

<template>
  <div>
    <Category :showTable="scene == 0"></Category>
    <el-card style="width: 100%; height: 100%; margin: 10px 0" v-show="scene === 0">
      <el-button type="primary" icon="Plus" @click="handleAdd(categoryStore.c3_id)" :disabled="!categoryStore.c3_id">add a SPU</el-button>
      <!-- main data table -->
      <el-table :data="tableData" style="width: 100%; margin: 20px 0" height="600" border v-loading="categoryStore.loading">
        <el-table-column fixed type="index" prop="index" label="No." width="100" align="center" />
        <el-table-column prop="spuName" label="SPU name" width="200" />
        <el-table-column prop="description" label="description" style="height: '220px'"></el-table-column>
        <el-table-column fixed="right" label="Operations">
          <template #default="{ row }">
            <el-button type="primary" icon="Plus" size="small" title="Plus SKU" @click="addSku(row)"></el-button>
            <el-button type="warning" icon="Edit" size="small" title="Edit SPU" @click="editSPU(row)"></el-button>
            <el-button type="info" icon="Warning" size="small" title="SKU Info" @click="showList(row)"></el-button>
            <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?" @confirm="confirmDel(row)">
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
          :page-sizes="[3, 5, 7, 10]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <SPUForm ref="SPUFormRef" v-show="scene === 1" :setScene="setScene"></SPUForm>
    <SKUForm ref="SKUFormRef" v-show="scene === 2" @setScene="setScene"></SKUForm>
  </div>
  <el-dialog v-model="dialogTableVisible" title="SKU List">
    <el-table border :data="skuList">
      <el-table-column label="No." prop="index" type="index" width="80"></el-table-column>
      <el-table-column label="Sku Name" prop="skuName"></el-table-column>
      <el-table-column label="Sku weight" prop="weight"></el-table-column>
      <el-table-column label="Sku logo" width="150">
        <template #default="{row}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px; height: 100px">
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue';
import useCategoryStore from '@/store/modules/category';
import { getSPUList, deleteSpu,getSKUList } from '@/api/production/spu';
import type { records, spuReturnType, spuData } from '@/api/production/type';
import SPUForm from './SPUForm.vue';
import SKUForm from './SKUForm.vue';
import useSPUStore from '@/store/modules/spu';
import { ElMessage } from 'element-plus';
const SpuStore = useSPUStore();
const categoryStore = useCategoryStore();
const currentPage = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
const tableData = ref<records>([]);
const scene = ref<number>(0); // 0 table 1 add&edit spu 2 add sku
const SPUFormRef = ref();
const SKUFormRef = ref();
const dialogTableVisible = ref(false);
const skuList = ref([]);
const showList = async(row) => {
  const data = await getSKUList(row.id);
  console.log(data);
  dialogTableVisible.value = true;
  skuList.value = data.data;
}
const editSPU = (row: spuData) => {
  scene.value = 1;
  SPUFormRef.value.initSPUData(row);
  SPUFormRef.value.setBlank();
};
const addSku = (row: spuData) => {
  scene.value = 2;
  console.log(row);
  SKUFormRef.value.initSKUData(row);
};
const setScene = (value) => {
  scene.value = value;
};

const confirmDel = async (row) => {
  const data = await deleteSpu(row.id);
  if (data.code == 200) {
    ElMessage.success('deleted success!');
    getList();
  }
};
watch(
  () => scene.value,
  () => {
    getList();
  }
);
watch(
  () => categoryStore.c3_id,
  async () => {
    if (categoryStore.c3_id) {
      getList();
    }
  }
);
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

const handleAdd = (id) => {
  scene.value = 1;
  SPUFormRef.value.setBlank();
  SPUFormRef.value.initSpuParams();
  SPUFormRef.value.initSPUDataForAdd(id);
};

const getList = async () => {
  categoryStore.loading = true;
  const data: spuReturnType = await getSPUList(currentPage.value, pageSize.value, categoryStore.c3_id);
  console.log(data);
  total.value = data.data.total;
  tableData.value = data.data.records;
  nextTick(() => {
    categoryStore.loading = false;
  });
};

const handleSizeChange = async () => {
  currentPage.value = 1;
  await getList();
};

const handleCurrentChange = async () => {
  await getList();
};

onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

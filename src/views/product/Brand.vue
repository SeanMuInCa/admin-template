<template>
  <Dialog :title="title" :show="show" :getStatus="getStatus" :flag="addFlag" v-if="show" :getData="getData" :rowData="rowData"></Dialog>
  <el-card style="width: 100%; height: 100%">
    <el-button type="primary" icon="Plus" @click="handleAdd">add a brand</el-button>
    <!-- main data table -->
    <el-table :data="tableData" style="width: 100%; margin: 20px 0" height="660" border>
      <el-table-column fixed type="index" prop="index" label="No." width="100" align="center" />
      <el-table-column prop="tmName" label="Brand name" />
      <el-table-column prop="logoUrl" label="Brand Logo" style="height: '220px'">
        <template #default="{ row }">
          <div style="height: 180px">
            <img :src="handleUrl(row.logoUrl)" alt="" style="width: 218px; height: 100%" />
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations">
        <template #default="{ row }">
          <el-button type="warning" icon="Edit" @click="editBrand(row)"></el-button>
          <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?" @confirm="confirm(row)">
            <template #reference>
              <el-button type="danger" icon="Delete" ></el-button>
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
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import useProductStore from '@/store/modules/product';
import type { getBrandReturnType, brandType } from '@/api/production/type';
import Dialog from './Dialog.vue';
import { ElMessage } from 'element-plus';
const productStore = useProductStore();
const currentPage = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);
const tableData = ref<brandType[]>([]);
const show = ref(false);
const title = ref('');
const addFlag = ref(true);
let rowData = reactive({});

const handleAdd = () => {
  show.value = true;
  title.value = 'Add New Brand';
  addFlag.value = true;
};
const getStatus = (value: boolean) => {
  show.value = value;
};

const handleUrl = (url: string) => {
  if (url.startsWith('http')) return url;
  return `http://${url}`;
};

const handleSizeChange = async () => {
  currentPage.value = 1;
  await getData();
};

const handleCurrentChange = async () => {
  await getData();
};

onMounted(async () => {
  await getData();
});

const getData = async () => {
  await productStore
    .getProdcution(currentPage.value, pageSize.value)
    .then((data: getBrandReturnType['data']) => {
      console.log(data);
      total.value = data.total;
      tableData.value = data.records;
    })
    .catch(() => {});
};
const confirm = async (row) => {
  await productStore
    .deleteBrand(row.id)
    .then((data) => {
      console.log('data', data);
      if (data.code == 200) {
        ElMessage.success('deleted');
        getData();
      } else {
        ElMessage.error('system data can not be deleted');
      }
    })
    .catch(() => {
      ElMessage.error('server wrong');
    });
};

const editBrand = (row) => {
  title.value = 'Edit Brand';
  show.value = true;
  addFlag.value = false;
  rowData = row;
};
const deleteBrand = async (row) => {
  // await productStore.deleteBrand(row.id).then(() => {
  //   ElMessage.success('deleted')
  // })
};
</script>

<style scoped lang="scss">
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

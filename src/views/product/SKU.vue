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
          <el-button v-if="!row.isSale" type="primary" icon="Top" size="small" title="OnSale SKU" @click="handleOnSale(row)"></el-button>
          <el-button v-else type="info" icon="Bottom" size="small" title="OffSale SKU" @click="handleOnSale(row)"></el-button>
          <el-button type="warning" icon="Edit" size="small" title="Coming soon" disabled></el-button>
          <el-button type="info" icon="Warning" size="small" title="SKU Info" @click="handleInfo(row)"></el-button>
          <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?" @confirm="confirmDel(row)">
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
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getData"
      />
    </div>
    <el-drawer v-model="openDrawer" title="SKU Info Details" direction="rtl" size="40%">
      <template #default>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>Name:</div>
          </el-col>
          <el-col :span="16">
            <div>{{ skuInfoData.skuName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>Description:</div>
          </el-col>
          <el-col :span="16">
            <div>{{ skuInfoData.skuDesc }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>Weight(g):</div>
          </el-col>
          <el-col :span="16">
            <div>{{ skuInfoData.weight }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>Price($):</div>
          </el-col>
          <el-col :span="16">
            <div>{{ skuInfoData.price }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>Status:</div>
          </el-col>
          <el-col :span="16">
            <div>{{ skuInfoData.isSale === 1 ? 'OnSale' : 'OffSale' }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>Platform Attribute:</div>
          </el-col>
          <el-col :span="16">
            <div>
              <el-tag type="success" v-for="item in skuInfoData.skuAttrValueList" :key="item.id" style="margin: 2px">{{ item.valueName }}</el-tag>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>Sale Attribute:</div>
          </el-col>
          <el-col :span="16">
            <div>
              <el-tag type="warning" v-for="item in skuInfoData.skuSaleAttrValueList" :key="item.id" style="margin: 2px">{{ item.saleAttrValueName }}</el-tag>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>Images</div>
          </el-col>
          <el-col :span="16">
            <div>
              <el-carousel :interval="2000" type="card" height="200px" autoplay>
                <el-carousel-item v-for="item in skuInfoData.skuImageList" :key="item">
                  <h3 text="2xl" justify="center">
                    <img :src="item.imgUrl" alt="" style="width: 100%" />
                  </h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </template>
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
const skuInfoData = ref<SKUType>({});
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
  const data: any = await getSKUInfo(row.id);
  if (data.code == 200) {
    openDrawer.value = true;
    skuInfoData.value = data.data;
  }
};

const confirmDel = async (row: skuDataType) => {
  if (row.isSale === 1) {
    ElMessage.error('this SKU is onSale, can not be deleted!');
    return;
  } else {
    const data: any = await deleteSku(row.id);
    if (data.code == 200) {
      ElMessage.success('deleted success!');
      getData();
    }
  }
};
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-carousel__item h3 {
  /* color: #475669; */
  opacity: 1;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
</style>

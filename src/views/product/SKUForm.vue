<template>
  <el-card>
    <el-form label-width="150">
      <el-form-item label="Sku Name">
        <el-input placeholder="sku name"></el-input>
      </el-form-item>
      <el-form-item label="Sku Price($)">
        <el-input placeholder="sku price(g)" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Sku Weight(g)">
        <el-input placeholder="sku weight(g)" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Sku Description">
        <el-input placeholder="description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Platform Attribute">
        <el-form inline>
          <el-form-item :label="item.attrName" v-for="item in platformAttrList" :key="item.id">
            <el-select placeholder="please select" v-model="skuParams.attrId">
              <el-option v-for="op in item.attrValueList" :key="op.id" :label="op.valueName" :value="op.attrId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="Sale Attribute">
        <el-form inline>
          <el-form-item :label="item.saleAttrName" v-for="item in saleAttrList" :key="item.id">
            <el-select placeholder="please select" v-model="skuParams.saleAttrValueNameId">
              <el-option v-for="op in item.spuSaleAttrValueList" :key="op.id" :label="op.saleAttrValueName" :value="op.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="logo name">
        <el-table border :data="spuImageList">
          <el-table-column type="selection" width="80" align="center"></el-table-column>
          <el-table-column label="logo" prop="imgUrl">
            <template #default="{ row }">
              <img :src="row.imgUrl" alt="" style="height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="name" prop="imgName"></el-table-column>
          <el-table-column label="Operation"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">Save</el-button>
        <el-button @click="cancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { getAttrList } from '@/api/production/attribute';
import { getSPUSaleAttrList, getSPUImageList } from '@/api/production/spu';
import useCategoryStore from '@/store/modules/category';
const categoryStore = useCategoryStore();
const $emit = defineEmits(['setScene']);
const cancel = () => {
  $emit('setScene', 0);
};
const platformAttrList = ref([]);
const saleAttrList = ref([]);
const spuImageList = ref([]);
const initSKUData = async (row) => {
  const data = await getAttrList(categoryStore.c1_id, categoryStore.c2_id, categoryStore.c3_id);
  if (data.code == 200) {
    platformAttrList.value = data.data;
  }
  const data1 = await getSPUSaleAttrList(row.id);
  if (data1.code == 200) {
    console.log(data1);
    saleAttrList.value = data1.data;
  }
  const data2 = await getSPUImageList(row.id);
  if (data2.code == 200) {
    console.log(data2);
    spuImageList.value = data2.data;
  }
};

const skuParams = ref({
  attrId: '',
  saleAttrValueNameId: '',
});

defineExpose({ initSKUData });
</script>

<style scoped></style>

<template>
  <el-card>
    <el-form label-width="150">
      <el-form-item label="Sku Name">
        <el-input placeholder="sku name" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="Sku Price($)">
        <el-input placeholder="sku price(g)" type="number" v-model="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="Sku Weight(g)">
        <el-input placeholder="sku weight(g)" type="number" v-model="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="Sku Description">
        <el-input placeholder="description" type="textarea" v-model="skuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="Platform Attribute">
        <el-form inline>
          <el-form-item :label="item.attrName" v-for="(item, index) in platformAttrList" :key="item.id">
            <el-select v-model="item.attrIdAndValueId" placeholder="please select">
              <el-option v-for="op in item.attrValueList" :key="op.id" :label="op.valueName" :value="`${item.id}:${op.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="Sale Attribute">
        <el-form inline>
          <el-form-item :label="item.saleAttrName" v-for="item in saleAttrList" :key="item.id">
            <el-select placeholder="please select" v-model="item.saleIdAndValueId">
              <el-option v-for="op in item.spuSaleAttrValueList" :key="op.id" :label="op.saleAttrValueName" :value="`${item.id}:${op.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="logo name">
        <el-table border :data="spuImageList" ref="imageTable" >
          <el-table-column type="selection" width="80" align="center"></el-table-column>
          <el-table-column label="logo" prop="imgUrl">
            <template #default="{ row }">
              <img :src="row.imgUrl" style="width: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="name" prop="imgName"></el-table-column>
          <el-table-column label="Operation">
            <template #="{ row,$index }">
              <el-button type="primary" @click="setAsDefault(row,$index)" ref="btn">set as default</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">Save</el-button>
        <el-button @click="cancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { getAttrList } from '@/api/production/attribute';
import { getSPUSaleAttrList, getSPUImageList, addSKU } from '@/api/production/spu';
import useCategoryStore from '@/store/modules/category';
import { ElMessage } from 'element-plus';
const categoryStore = useCategoryStore();
const $emit = defineEmits(['setScene']);
const cancel = () => {
  $emit('setScene', 0);
};
const platformAttrList = ref([]);
const saleAttrList = ref([]);
const spuImageList = ref([]);
const imageTable = ref();

const btn = ref();

const save = async () => {
  skuParams.value.skuAttrValueList = platformAttrList.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':');
      prev.push({
        attrId,
        valueId,
      });
    }
    return prev;
  }, []);

  //把属性从对象里拿出来，拆分成一个新对象，放到一个数组里去
  skuParams.value.skuSaleAttrValueList = saleAttrList.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
      prev.push({
        saleAttrId,
        saleAttrValueId,
      });
    }
    return prev;
  }, []);

  const data = await addSKU(skuParams.value);
  if (data.code == 200) {
    ElMessage.success('added success');
    $emit('setScene', 0);
  } else {
    ElMessage.error('added failed');
  }
};



const setAsDefault = (row,index) => {
  console.log(imageTable.value);
  btn.value.type = 'danger';
  // buttonStyle.value = 'danger';
  imageTable.value.clearSelection();
  imageTable.value.toggleRowSelection(row, true);
  skuParams.value.skuDefaultImg = row.imgUrl;
};
const initSKUData = async (row) => {
  console.log(row);

  const data: any = await getAttrList(categoryStore.c1_id, categoryStore.c2_id, categoryStore.c3_id);
  if (data.code == 200) {
    platformAttrList.value = data.data;
  }
  const data1 = await getSPUSaleAttrList(row.id);
  if (data1.code == 200) {
    saleAttrList.value = data1.data;
  }
  const data2 = await getSPUImageList(row.id);
  if (data2.code == 200) {
    spuImageList.value = data2.data;
  }
  skuParams.value.category3Id = row.category3Id;
  skuParams.value.tmId = row.tmId;
  skuParams.value.spuId = row.id;
};

let temp = ref(['', '']);
const skuParams = ref({
  category3Id: '',
  spuId: '',
  tmId: '',

  skuName: '',
  weight: '',
  price: '',
  skuDesc: '',

  skuAttrValueList: [
    // {
    //   attrId: '',
    //   valueId: '',
    // },
  ],

  skuSaleAttrValueList: [
    // {
    //     saleAttrId:'',
    //     saleAttrValueId:''
    // }
  ],

  skuDefaultImg: '',
});

defineExpose({ initSKUData });
</script>

<style scoped></style>

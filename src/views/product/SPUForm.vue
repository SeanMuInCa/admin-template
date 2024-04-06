<template>
  <el-card style="margin: 10px 0">
    <el-form-item label="Spu name" label-width="135">
      <el-input placeholder="please input your spu name" v-model="SpuStore.spuName"></el-input>
    </el-form-item>

    <el-form-item label="Spu brand" label-width="135">
      <el-select placeholder="select your brand" style="width: 240px" v-model="SpuStore.tmId">
        <el-option v-for="item in brandList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Spu description" label-width="135">
      <el-input type="textarea" placeholder="please input your description" v-model="SpuStore.description"></el-input>
    </el-form-item>

    <el-form-item label-width="135" label="Brand Logo">
      <el-upload v-model:file-list="fileList" action="/api/admin/product/fileUpload" list-type="picture-card" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img :src="dialogImageUrl" alt="Preview Image" width="100%" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="Spu attribute" label-width="135">
      <el-select placeholder="select your attribute" style="width: 240px; margin-right: 10px">
        <el-option label="111" value="111"></el-option>
      </el-select>
      <el-button type="primary" icon="Plus">add attribute</el-button>
      <el-table border style="margin: 10px 0" :data="SpuStore.spuSaleAttrList">
        <el-table-column label="No." type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="Attribute Name" width="140px" prop="saleAttrName"></el-table-column>
        <el-table-column label="Attribute Values">
          <template #default="{ row }">
            <el-tag v-for="item in row.spuSaleAttrValueList" :key="item.id" closable style="margin: 0 5px">
              {{ item.saleAttrValueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operation" width="100px">
          <el-button type="danger" icon="Delete"></el-button>
        </el-table-column>
      </el-table>
      <el-button type="primary">Save</el-button>
      <el-button @click="cancel">Cancel</el-button>
    </el-form-item>
  </el-card>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus';
import { reactive, ref, onMounted, nextTick, onBeforeMount, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { getTrademarkList, getSPUImageList, getSPUSaleAttrList, getBaseSaleAttrList } from '@/api/production/spu';
import type { brandType, getImageListReturnType } from '@/api/production/type';
import useSPUStore from '@/store/modules/spu';
const SpuStore = useSPUStore();
const props = defineProps(['setScene']);

const cancel = () => {
  props.setScene(0);
};
onBeforeMount(() => {
  getTrademarkData();
  getImageList();
  getSaleAttr();
  getAttri();
});

let brandList = reactive<brandType[]>([]);
const getTrademarkData = async () => {
  const data = await getTrademarkList();
  console.log(data);
  Object.assign(brandList, data.data);
};
const getImageList = async () => {
  const data: getImageListReturnType = await getSPUImageList(SpuStore.id);
  if (data.code == 200) {
    SpuStore.spuImageList = data.data;
    for (let i = 0; i < SpuStore.spuImageList.length; i++) {
      fileList.value.push({
        url: SpuStore.spuImageList[i].imgUrl,
      });
    }
  }
};
let nameList = [];
const getSaleAttr = async () => {
  const data = await getSPUSaleAttrList(SpuStore.id);
  console.log(data, '12312');
  SpuStore.spuSaleAttrList = data.data;
  nameList = data.data.map((item) => item.saleAttrName);
};

const getAttri = async () => {
  const data = await getBaseSaleAttrList();
  console.log('getAttri', data);
  Object.assign(attrList, data.data);
};

const attrList = reactive([]);

//Todo: 属性值这里还没有处理好
watch(
  () => brandList.length,
  () => {
    console.log(attrList);
    console.log(nameList);

    let result = attrList.filter((item) => {
      return nameList.includes(item.name);
    });
    console.log(result);
  }
);
const fileList = ref<UploadUserFile[]>([]);

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log('@@@', uploadFile);

  dialogImageUrl.value = uploadFile.imgUrl!;
  dialogVisible.value = true;
};
const newSPUDataParams = reactive<any>({
  id: undefined,
  spuName: '',
  tmId: '',
  category3Id: '',
  description: '',
  spuImageList: [],
  spuPosterList: null,
  spuSaleAttrList: null,
});
const handleAvatarSuccess: UploadProps['onSuccess'] = async (response: any) => {
  const data = await response;
  if (data.code == 200) {
    newSPUDataParams.spuImageList.push(data.data);
  } else {
    ElMessage.error('upload failed, please try again!');
  }
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('Logo picture size can not exceed 2MB!');
      return false;
    } else return true;
  }
  ElMessage.error('Logo picture must be JPG or PNG or GIF format!');
  return false;
};
</script>

<template>
  <el-card style="margin: 10px 0">
    <el-form-item label="Spu name" label-width="135">
      <el-input placeholder="please input your spu name" v-model="newSPUDataParams.spuName"></el-input>
    </el-form-item>

    <el-form-item label="Spu brand" label-width="135">
      <el-select placeholder="select your brand" style="width: 240px" v-model="newSPUDataParams.tmId">
        <el-option v-for="item in brandList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Spu description" label-width="135" >
      <el-input type="textarea" placeholder="please input your description" v-model="newSPUDataParams.description"></el-input>
    </el-form-item>

    <el-form-item label-width="135" label="Brand Logo" prop="logoUrl">
      <el-upload v-model:file-list="fileList" action="/api/admin/product/fileUpload" list-type="picture-card" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon>
          <Plus />
        </el-icon>
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
      <el-table border style="margin: 10px 0">
        <el-table-column label="No." type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="Attribute Name" width="140px"></el-table-column>
        <el-table-column label="Attribute Values"></el-table-column>
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
import { reactive, ref, onMounted, nextTick, onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus';
import { getTrademarkList } from '@/api/production/spu';
import type { brandType } from '@/api/production/type';
const props = defineProps(['setScene']);

const cancel = () => {
  props.setScene(0);
};
onBeforeMount(() => {
  getTrademarkData();
});
let brandList = reactive<brandType[]>([]);
const getTrademarkData = async () => {
  const data = await getTrademarkList();
  console.log(data);
  Object.assign(brandList,data.data)
};
const fileList = ref<UploadUserFile[]>([]);

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
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

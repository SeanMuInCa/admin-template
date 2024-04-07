<template>
  <el-card style="margin: 10px 0">
    <el-form-item label="Spu name" label-width="135">
      <el-input placeholder="please input your spu name" v-model="SpuParams.spuName"></el-input>
    </el-form-item>

    <el-form-item label="Spu brand" label-width="135">
      <el-select placeholder="select your brand" style="width: 240px" v-model="SpuParams.tmId">
        <el-option v-for="item in SpuStore.allBrands" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Spu description" label-width="135">
      <el-input type="textarea" placeholder="please input your description" v-model="SpuParams.description"></el-input>
    </el-form-item>

    <el-form-item label-width="135" label="Brand Logo">
      <el-upload
        v-model:file-list="SpuStore.imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="Spu attribute" label-width="135">
      <el-select style="width: 240px; margin-right: 10px" v-model="tempAttr" :placeholder="spuAttrLeftList.length + ' left'">
        <el-option v-for="item in spuAttrLeftList" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`"></el-option>
      </el-select>
      <el-button type="primary" icon="Plus" @click="pushAttrValue" :disabled="!tempAttr">add attribute</el-button>
      <el-table border style="margin: 10px 0" :data="SpuStore.saleAttrList">
        <el-table-column label="No." type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="Attribute Name" width="140px" prop="saleAttrName"></el-table-column>
        <el-table-column label="Attribute Values">
          <template #default="{ row }">
            <el-tag v-for="item in row.spuSaleAttrValueList" :key="item.id" closable style="margin: 0 5px" @close="handleClose(row, item)">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-button v-show="!row.flag" type="success" size="small" icon="plus" @click="row.flag = true"></el-button>
            <el-input v-show="row.flag" style="width: 100px" @blur="addValue(row)" v-model="newAttrValue" :ref="attrInput"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="Operation" width="100px">
          <template #default="{ row, $index }">
            <el-button type="danger" icon="Delete" @click="deleteAttr($index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="modifySPUSave">Save</el-button>
      <el-button @click="cancel">Cancel</el-button>
    </el-form-item>
  </el-card>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus';
import { reactive, ref, nextTick, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getTrademarkList, getSPUImageList, getSPUSaleAttrList, getBaseSaleAttrList,modifySPU } from '@/api/production/spu';
import type { getImageListReturnType, spuData, brandListType, saleAttrListReturnType, baseSaleAttrReturnType } from '@/api/production/type';
import useSPUStore from '@/store/modules/spu';
const SpuStore = useSPUStore();
const props = defineProps(['setScene']);
const newAttrValue = ref('');
let SpuParams = ref<spuData>({});
const tempAttr = ref('');

const handleClose = (row, item) => {
  row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(item), 1);
};
const pushAttrValue = () => {
  let id = tempAttr.value.split(':')[0];
  let name = tempAttr.value.split(':')[1];
  SpuStore.saleAttrList.push({
    baseSaleAttrId: id,
    flag: false,
    saleAttrName: name,
    spuSaleAttrValueList: [],
  });
  tempAttr.value = '';
};
const setBlank = () => {
  tempAttr.value = '';
  SpuStore.$reset();
};
const attrInput = (ele) => {
  nextTick(() => {
    ele.focus();
  });
};

const addValue = (row) => {
  if (
    row.spuSaleAttrValueList.find((item) => {
      return item.saleAttrValueName === newAttrValue.value;
    })
  ) {
    ElMessage.error('attribute value can not be duplicated');
    return;
  }
  if (newAttrValue.value.trim()) {
    row.spuSaleAttrValueList.push({
      baseSaleAttrId: row.baseSaleAttrId,
      saleAttrName: row.saleAttrName,
      saleAttrValueName: newAttrValue.value,
      spuId: row.spuId,
    });
  }
  row.flag = false;
  newAttrValue.value = '';
};

const deleteAttr = (index) => {
  SpuStore.saleAttrList.splice(index, 1);
};

const modifySPUSave = async() => {
    //clean up the data
    //imageList
    // SpuParams.value.spuImageList = 
    console.log(SpuStore.imgList);
    let temp = [];
    // SpuStore.imgList.forEach((item) => {
    //     temp.push({
    //         imgName:item.name,
    //         imgUrl:item.url.startsWith('http') ? item.url : item.url.slice(item.url.indexOf('http'))
    //     })
    // })
    temp = SpuStore.imgList.map(item =>{
        return {
            imgName:item.name,
            imgUrl:(item.response ? item.response.data : item.url)
        }
    })
    SpuParams.value.spuImageList = temp;
    SpuStore.spuImageList = temp;
    SpuParams.value.spuSaleAttrList = SpuStore.saleAttrList;
    SpuStore.spuSaleAttrList = SpuStore.saleAttrList;
    const data = await modifySPU(SpuParams.value);
    if(data.code == 200) {
        ElMessage.success('modified success');
        props.setScene(0);
    }
}
/**
 * 计算剩余属性
 */
const spuAttrLeftList = computed(() => {
  return SpuStore.baseAttrList.filter((item) => {
    return SpuStore.saleAttrList.every((ele) => {
      return ele.saleAttrName !== item.name;
    });
  });
});

const initSPUData = async (row: spuData) => {
  SpuParams.value = row;
  console.log(row);
  const data: brandListType = await getTrademarkList();
  const data1: getImageListReturnType = await getSPUImageList(row.id as number);
  const data2: saleAttrListReturnType = await getSPUSaleAttrList(row.id as number);
  const data3: baseSaleAttrReturnType = await getBaseSaleAttrList();
  SpuStore.allBrands = data.data;
  SpuStore.imgList = data1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
  SpuStore.saleAttrList = data2.data.map((item) => {
    item.flag = false;
    return item;
  });
  SpuStore.baseAttrList = data3.data;
  tempAttr.value = null;
};


defineExpose({ initSPUData, setBlank }); //向父组件暴露该方法

const cancel = () => {
  props.setScene(0);
};

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadUserFile, uploadFiles: UploadUserFile) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile: UploadUserFile) => {
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
    // SpuStore.imgList[SpuStore.imgList.length - 1].url = data.data;
    console.log(data.data);
    
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

<template>
    <el-dialog v-model="dialogVisible" :show-close="false" @close="handleCancel">
        <template #header>
            <h2>{{ title }}</h2>
        </template>
        <el-form :model="newBrandDataParams" style="width: 80%" :rules="rules" ref="dialogForm">
            <el-form-item label-width="110" label="Brand Name" prop="tmName">
                <el-input v-model="newBrandDataParams.tmName" placeholder="please input your new brand name" />
            </el-form-item>
            <el-form-item label-width="110" label="Brand Logo" prop="logoUrl">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="true"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="newBrandDataParams.logoUrl" :src="newBrandDataParams.logoUrl" class="avatar" limit="1" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel">Cancel</el-button>
                <el-button type="primary" @click="handleConfirm">Confirm</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { UploadProps } from 'element-plus';
import { reactive, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { brandType } from '@/api/production/type';
import useProductStore from '@/store/modules/product';


const productStore = useProductStore();

const props: any = defineProps(['title', 'show', 'getStatus', 'flag', 'getData', 'rowData']);

const dialogVisible = props.show;

const newBrandDataParams = reactive<brandType>({
    id: undefined,
    tmName: '',
    logoUrl: '',
});
onMounted(() => {
    if (!props.flag) {
        newBrandDataParams.tmName = props.rowData.tmName;
        newBrandDataParams.logoUrl = props.rowData.logoUrl;
        newBrandDataParams.id = props.rowData.id;
    }
});
const handleAvatarSuccess: UploadProps['onSuccess'] = async (response: any) => {
    const data = await response;
    if (data.code == 200) {
        newBrandDataParams.logoUrl = data.data;
        dialogForm.value.clearValidate('logoUrl');
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

const handleCancel = () => {
    props.getStatus(false);
};
const handleConfirm = async () => {
    await dialogForm.value.validate();//这样写就可以了
    if (newBrandDataParams.id) {
            await productStore
                .updateBrand(newBrandDataParams)
                .then(async () => {
                    await props.getData();
                    ElMessage.success('edit brand success');
                })
                .catch(() => {
                    ElMessage.error('server error');
                });
        } else {
            await productStore
                .addNewBrand(newBrandDataParams)
                .then(async () => {
                    await props.getData();
                    ElMessage.success('add new brand success');
                })
                .catch(() => {
                    ElMessage.error('server error');
                });
        }
        props.getStatus(false);
};

//自定义校验规则

const dialogForm = ref();
const validatorTmName = (_rule: any, value: any, callback: any) => {

    if (value.trim().length == 0) {
        return callback(new Error('brand name is required'))
    } else if (value.trim().length < 2) {
        return callback(new Error('brand name at least two characters'))
    } else {
        callback();
    }
}
const validatorLogoUrl = (_rule: any, value: any, callback: any) => {
    if (value.trim().length === 0 || !value.trim().startsWith('http')) {
        return callback(new Error('must upload a logo'))
    }
    callback();
}

const rules = {
    tmName: [
        {
            required: true,
            trigger: 'blur',
            validator: validatorTmName,
        }
    ],
    logoUrl: [
        {
            required: true,
            validator: validatorLogoUrl,
        }
    ]
}


</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>

<template>
    <el-dialog v-model="dialogVisible" :show-close="false">
        <template #header>
            <h2>{{ title }}</h2>
        </template>
        <el-form :model="newBrandDataParams" style="width: 80%">
            <el-form-item label-width="110" label="Brand Name" :rules="[
        {
            required: true,
            message: 'brand name required at least two characters',
            trigger: 'change',
        },
        {
            required: true,
            message: 'must input a brand name',
            trigger: 'blur',
        },
    ]">
                <el-input v-model="newBrandDataParams.tmName" placeholder="please input your new brand name" />
            </el-form-item>
            <el-form-item label-width="110" label="Brand Logo" :rules="[
        {
            required: true,
            message: 'must upload a logo image',
            trigger: 'change',
        },
    ]">
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
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { brandType } from '@/api/production/type';
import useProductStore from '@/store/modules/product';

const productStore = useProductStore();

const props = defineProps(['title', 'show', 'getStatus', 'flag', 'getData', 'rowData']);

const dialogVisible = props.show;

const newBrandDataParams = reactive<brandType>({
    id:undefined,
    tmName: '',
    logoUrl: '',
});
onMounted(() => {
    if (!props.flag) {
        newBrandDataParams.tmName = props.rowData.tmName;
        newBrandDataParams.logoUrl = props.rowData.logoUrl;
        newBrandDataParams.id = props.rowData.id;
    }
})
const handleAvatarSuccess: UploadProps['onSuccess'] = async (response) => {
    const data = await response;
    if (data.code == 200) {
        newBrandDataParams.logoUrl = data.data;
    } else {
        ElMessage.error('upload failed, please try again!')
    }
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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
    if (newBrandDataParams.id) {
        await productStore.updateBrand(newBrandDataParams).then(async () => {
            await props.getData();
        }).catch(() => {
            ElMessage.error('server error')
        })
    } else {
        await productStore.addNewBrand(newBrandDataParams).then(async () => {
            await props.getData();
        }).catch(() => {
            ElMessage.error('server error')
        })
    }
    props.getStatus(false);
};
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

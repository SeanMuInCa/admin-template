<template>
  <div>
    <el-table :data="allMenu" row-key="id">
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Permission" prop="code"></el-table-column>
      <el-table-column label="Last updated" prop="updateTime"></el-table-column>
      <el-table-column label="Operation">
        <template #default="{ row }">
          <el-button type="primary" icon="Plus" size="small" :disabled="row.level === 4" @click="handleAdd(row)">{{ row.level === 3 ? 'Add feature' : 'Add Menu' }}</el-button>
          <el-button type="warning" icon="Edit" size="small" :disabled="row.level === 1" @click="editPermit(row)">Edit</el-button>
          <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?" @confirm="delMenu(row)">
            <template #reference>
              <el-button type="danger" icon="Delete" size="small" :disabled="row.level === 1">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="centerDialogVisible" :title="permitParams.id ? 'Edit' : 'Add'">
      <el-form label-width="200" style="max-width: 600px" :rules="rules" ref="ruleFormRef" :model="permitParams">
        <el-form-item :label="permitParams.level === 4 ? 'Feature name' : 'Menu name'" prop="name">
          <el-input v-model="permitParams.name" />
        </el-form-item>
        <el-form-item label="Permission code" prop="code">
          <el-input v-model="permitParams.code" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { getAllMenu, modifyMenu, deleteMenu } from '@/api/acl/permission';
import { permit, permissionReturnType } from '@/api/acl/type';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
const ruleFormRef = ref<FormInstance>();
const allMenu = ref<permit[]>([]);
const centerDialogVisible = ref<boolean>(false);
const permitParams = ref<permit>({
  id: '',
  level: '',
  name: '',
  code: '',
  pid: '',
});
const resetPermitParams = () => {
  permitParams.value = {
    id: '',
    level: '',
    name: '',
    code: '',
    pid: '',
  };
};
onMounted(() => {
  getData();
});

const getData = async () => {
  const data: permissionReturnType = await getAllMenu();
  if (data.code == 200) {
    console.log(data);
    allMenu.value = data.data;
  }
};

const handleAdd = (row: permit) => {
  ruleFormRef.value?.clearValidate();
  resetPermitParams();
  centerDialogVisible.value = true;
  permitParams.value.level = parseInt(row.level as string) + 1;
  permitParams.value.code = row.code;
  permitParams.value.pid = row.id as number;
};
const editPermit = (row: permit) => {
  resetPermitParams();
  centerDialogVisible.value = true;
  permitParams.value = row;
};
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      const data = await modifyMenu(permitParams.value);
      if (data.code == 200) {
        ElMessage.success(permitParams.value.id ? 'updated' : 'added');
        centerDialogVisible.value = false;
        getData();
      } else {
        ElMessage.error('something went wrong');
      }
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const cancel = () => {
  resetPermitParams();
  centerDialogVisible.value = false;
  getData();
};
const validateCode = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('name should at least two characters'));
  }
};
const validateName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('code should at least two characters'));
  }
};
const rules = reactive<FormRules>({
  code: [{ required: true, validator: validateCode, trigger: 'blur' }],
  name: [{ required: true, validator: validateName, trigger: 'blur' }],
});

const delMenu = async (row: permit) => {
  const data = await deleteMenu(row.id as number);
  if (data.code == 200) {
    ElMessage.success('deleted');
    getData();
  } else ElMessage.error('something went wrong');
};
</script>

<style scoped></style>

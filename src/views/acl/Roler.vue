<template>
  <div>
    <el-card>
      <el-form inline style="display: flex; justify-content: space-between; align-items: center">
        <el-form-item label="Role Name" label-width="" style="margin: auto 10px">
          <el-input placeholder="input a role name to search" style="width: 300px" v-model="roleToSearch"></el-input>
        </el-form-item>
        <el-form-item style="margin: auto 10px">
          <el-button type="primary" @click="searchRole" :disabled="!roleToSearch.trim().length">Search</el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd" icon="Plus">Add a new role</el-button>
      <el-table border style="margin: 20px 0" :data="roleRecords">
        <el-table-column label="No." width="100" type="index"></el-table-column>
        >
        <el-table-column label="id" width="150" prop="id"></el-table-column>
        >
        <el-table-column label="role name" width="200" prop="roleName"></el-table-column>
        >
        <el-table-column label="created time" width="300" prop="createTime"></el-table-column>
        >
        <el-table-column label="last updated" width="300" prop="updateTime"></el-table-column>
        >
        <el-table-column label="operation">
          <template #default="{ row }">
            <el-button type="primary" icon="User" size="small" @click="assignPermit(row)">Assign Permission</el-button>
            <el-button type="warning" icon="Edit" size="small" @click="editRole(row)">Edit Role</el-button>
            <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?" @confirm="confirmDel(row)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small">Delete</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        >
      </el-table>
      <div class="demo-pagination-block">
        <div class="demonstration"></div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 15]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrectChange"
        />
      </div>
    </el-card>
    <el-dialog v-model="centerDialogVisible" :title="roleParams.roleName ? 'edit a role' : 'add a role'" width="500" align-center>
      <el-form inline :model="roleParams" :rules="rules" ref="formRef">
        <el-form-item label="Role Name" prop="roleName">
          <el-input v-model="roleParams.roleName" placeholder="new role name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmAdd">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer title="Assign Permission" size="30%" v-model="showAssign">
      <template #default>
        <el-tree :data="allMenu" default-expand-all show-checkbox node-key="id" :props="defaultProps" ref="tree" :default-checked-keys="roleMenu"></el-tree>
      </template>
      <template #footer>
        <el-button type="primary" @click="confirmAssign">Confirm</el-button>
        <el-button @click="showAssign = false">Cancel</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { getAllRoles, delRole, saveRole, getRoleMenu, reqSetPermisstion } from '@/api/acl/role';
import { getRoleReturnType, role, permissionReturnType, permit } from '@/api/acl/type';
import { ElMessage } from 'element-plus';
const tree = ref();
const roleToSearch = ref<string>('');
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);
const roleRecords = ref<role[]>([]);
const centerDialogVisible = ref(false);
const searchMode = ref(false);
const showAssign = ref(false);
const roleParams = reactive({
  id: '',
  roleName: '',
});
const formRef = ref();
const allMenu = ref<permit[]>([]);
const roleMenu = ref<number[]>([]);
const handleCurrectChange = async () => {
  if (searchMode.value) {
    const data = await getAllRoles(currentPage.value, pageSize.value, roleToSearch.value);
    roleRecords.value = data.data.records;
  } else {
    getData(currentPage.value);
  }
};

const handleAdd = () => {
  Object.assign(roleParams, {
    id: '',
    roleName: '',
  });
  centerDialogVisible.value = true;
  formRef.value?.clearValidate('roleName'); //也可以用nextTick
};
const confirmAdd = async () => {
  formRef.value
    .validate()
    .then(async () => {
      if (roleParams.roleName.trim()) {
        const data = await saveRole(roleParams);
        if (data.code == 200) {
          ElMessage.success(roleParams.id ? 'updated' : 'added');
          centerDialogVisible.value = false;
          getData();
        } else {
          ElMessage.error('something went wrong');
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
const handleSizeChange = async () => {
  if (searchMode.value) {
    const data = await getAllRoles(1, pageSize.value, roleToSearch.value);
    if (data.code == 200) {
      roleRecords.value = data.data.records;
    }
  } else {
    currentPage.value = 1;
    await getData();
  }
};
const searchRole = async () => {
  searchMode.value = true;
  if (roleToSearch.value.trim()) {
    const data = await getAllRoles(1, pageSize.value, roleToSearch.value);
    if (data.code == 200) {
      total.value = data.data.total;
      roleRecords.value = data.data.records;
    }
  } else getData();
};
const reset = () => {
  searchMode.value = false;
  getData();
};

onMounted(() => {
  getData();
});

const getData = async (pager = 1) => {
  currentPage.value = pager;
  const data: getRoleReturnType = await getAllRoles(currentPage.value, pageSize.value);
  if (data.code == 200) {
    total.value = data.data.total;
    roleRecords.value = data.data.records;
  }
};

const editRole = (row: role) => {
  Object.assign(roleParams, row);
  centerDialogVisible.value = true;
};

const confirmDel = async (row: role) => {
  const data = await delRole(row.id as number);
  if (data.code == 200) {
    ElMessage.success('deleted!');
    getData(currentPage.value);
  } else {
    ElMessage.error('something went wrong');
  }
};

const validatorRoleName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('role name should at least two characters'));
  }
};

//校验规则，职位名不能小于两个字符
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
};

const assignPermit = async (row: role) => {
  roleMenu.value = [];
  Object.assign(roleParams, row);
  const data: permissionReturnType = await getRoleMenu(row.id as number);
  if (data.code == 200) {
    allMenu.value = data.data;
    roleMenu.value = getId(data.data, []);
    // roleMenu.value = [41,55];
    showAssign.value = true;
  }
};

const getId = (arr: permit[], initArr: number[]) => {
  arr.forEach((item) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      getId(item.children, initArr);
    }
  });
  return initArr;
};

const defaultProps = {
  children: 'children',
  label: 'name',
};

const confirmAssign = async () => {
  const arr = tree.value.getCheckedKeys();
  const arr1 = tree.value.getHalfCheckedKeys();
  const permissionId = arr.concat(arr1);
  const data: any = await reqSetPermisstion(parseInt(roleParams.id), permissionId);
  if (data.code == 200) {
    ElMessage.success('set!');
    showAssign.value = false;
  } else {
    ElMessage.error('something went wrong');
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
</style>

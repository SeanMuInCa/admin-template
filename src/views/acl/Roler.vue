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
            <el-button type="primary" icon="User" size="small">Assign Role</el-button>
            <el-button type="warning" icon="Edit" size="small" @click="editRole(row)">Edit Role</el-button>
            <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled"
              icon-color="#626AEF" title="Are you sure to delete this?" @confirm="confirmDel(row)">
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
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15]"
          :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
          @size-change="handleSizeChange" @current-change="getData" />
      </div>
    </el-card>
    <el-dialog v-model="centerDialogVisible" :title="roleParams.roleName ? 'edit a role': 'add a role'" width="500" align-center>
      <el-form inline>
        <el-form-item label="Role Name">
          <el-input v-model="roleParams.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmAdd">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllRoles, delRole,saveRole } from '@/api/acl/role';
import { getRoleReturnType, role } from '@/api/acl/type';
import { ElMessage } from 'element-plus';
const roleToSearch = ref<string>('');
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);
const roleRecords = ref<role[]>([])
const centerDialogVisible = ref(false);
const roleParams = ref({
  id:'',
  roleName:''
})


const handleAdd = () => {
  roleParams.value.roleName = '';
  centerDialogVisible.value = true;
}
const confirmAdd = async() => {
  if(roleParams.value.roleName.trim()){
    const data = await saveRole(roleParams.value);
    if(data.code == 200){
      ElMessage.success(roleParams.value.id? 'updated':'added');
      centerDialogVisible.value = false;
      getData();
    }else{
      ElMessage.error('something went wrong')
    }
  }
}
const handleSizeChange = async () => {
  currentPage.value = 1;
  await getData();
};
const searchRole = () => {
  if (roleToSearch.value.trim()) {
    roleRecords.value = roleRecords.value.filter((item: role) => item.roleName.includes(roleToSearch.value));
    roleToSearch.value = '';
  } else getData();
 };
const reset = () => {
  getData();
 };

onMounted(() => {
  getData();
})

const getData = async (pager = 1) => {
  currentPage.value = pager;
  const data: getRoleReturnType = await getAllRoles(currentPage.value, pageSize.value);
  if (data.code == 200) {
    total.value = data.data.total;
    roleRecords.value = data.data.records;
  }
};

const editRole = (row:role) => {
  Object.assign(roleParams.value, row);
  centerDialogVisible.value = true;
}

const confirmDel = async (row: role) => {
  const data = await delRole(row.id as number);
  if (data.code == 200) {
    ElMessage.success('deleted!');
    getData(currentPage.value);
  } else {
    ElMessage.error('something went wrong');
  }
}
</script>

<style scoped>
.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

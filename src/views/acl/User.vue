<template>
  <div>
    <el-card>
      <el-form inline style="display: flex; justify-content: space-between; align-items: center">
        <el-form-item label="User Name" label-width="" style="margin: auto 10px">
          <el-input placeholder="input a user's name to search" style="width: 300px" v-model="nameToSearch"></el-input>
        </el-form-item>
        <el-form-item style="margin: auto 10px">
          <el-button type="primary" @click="searchName">Search</el-button>
          <el-button @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="openDrawer = true">Add One</el-button>
      <el-button type="warning" @click="massDelete" :disabled="!delList.length">Mass Delete</el-button>
      <el-table border style="margin: 20px 0" :data="userData" :show-overflow-tooltip="true" ref="tableRef" @selection-change="selectRow">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" label="No." width="80" align="center"></el-table-column>
        <el-table-column label="User Id" width="80" prop="id" align="center"></el-table-column>
        <el-table-column label="User Name" width="140" prop="username"></el-table-column>
        <el-table-column label="Nick Name" width="140" prop="name"></el-table-column>
        <el-table-column label="User Role" width="340" prop="roleName"></el-table-column>
        <el-table-column label="Created Time" width="200" prop="createTime"></el-table-column>
        <el-table-column label="Last Update" width="200" prop="updateTime"></el-table-column>
        <el-table-column label="Operation">
          <template #default="{ row }">
            <el-button type="primary" icon="User" size="small">Assign Role</el-button>
            <el-button type="warning" icon="Edit" size="small" @click="editUser(row)">Edit User</el-button>
            <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?" @confirm="confirmDel(row)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small">Delete</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
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
          @current-change="getData"
        />
      </div>
      <el-drawer v-model="openDrawer" :title="userParams.id ? 'Edit a user' : 'Add a user'" direction="rtl" size="30%">
        <template #default>
          <el-row :gutter="20">
            <el-col :span="6">
              <div style="line-height: 30px">Nick Name:</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="userParams.name"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="16">
            <el-col :span="6">
              <div style="line-height: 30px">UserName:</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="userParams.username"></el-input>
            </el-col>
          </el-row>
          <el-row :gutter="16" v-show="!userParams.id">
            <el-col :span="6">
              <div style="line-height: 30px">Password:</div>
            </el-col>
            <el-col :span="16">
              <el-input v-model="userParams.password" type="password"></el-input>
            </el-col>
          </el-row>
          <el-button type="primary" @click="confirmAdd">Confirm</el-button>
          <el-button @click="cancelAdd">Cancel</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getAllUsers, modifyUser, massDel, delUser } from '@/api/acl/user';
import { ref, onMounted } from 'vue';
import type { userRecordsType, UserListReturnType } from '@/api/acl/type';
import { ElMessage } from 'element-plus';
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const userData = ref<userRecordsType[]>([]);
const userParams = ref<userRecordsType>({
  id: '',
  name: '',
  username: '',
  password: '',
});
const openDrawer = ref<boolean>(false);
const nameToSearch = ref<string>('');
const tableRef = ref<any>();
const delList = ref<userRecordsType[]>([]);

const getData = async (pager = 1) => {
  currentPage.value = pager;
  const data: UserListReturnType = await getAllUsers(currentPage.value, pageSize.value);
  if (data.code == 200) {
    total.value = data.data.total;
    userData.value = data.data.records;
  }
};

onMounted(() => {
  getData();
});
const handleSizeChange = async () => {
  currentPage.value = 1;
  await getData();
};

const cancelAdd = () => {
  openDrawer.value = false;
  userParams.value = {
    id: '',
    name: '',
    username: '',
    password: '',
  };
};
const confirmAdd = async () => {
  const data = await modifyUser(userParams.value);
  if (data.code == 200) {
    ElMessage.success(userParams.value.id ? 'edit success' : 'added success');
    openDrawer.value = false;
    getData();
  } else {
    ElMessage.error('something went wrong');
  }
};

const searchName = () => {
  if (nameToSearch.value.trim()) {
    userData.value = userData.value.filter((item: userRecordsType) => item.name.includes(nameToSearch.value));
  } else getData();
};
const reset = () => {
  nameToSearch.value = '';
  getData();
};

const massDelete = async () => {
  let idList = delList.value.map((item: userRecordsType) => item.id);
  if (idList.length > 0) {
    const data = await massDel({ idList });
    if (data.code == 200) {
      ElMessage.success('deleted!');
    } else {
      ElMessage.error('something went wrong');
    }
  }
  getData();
};
const selectRow = (data: userRecordsType[]) => {
  delList.value = data;
};

const confirmDel = async (row: userRecordsType) => {
  const data = await delUser(row.id as number);
  if (data.code == 200) {
    ElMessage.success('deleted!');
  } else {
    ElMessage.error('something went wrong');
  }
  getData(currentPage.value);
};

const editUser = (row: userRecordsType) => {
  userParams.value = row;
  openDrawer.value = true;
};
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
</style>

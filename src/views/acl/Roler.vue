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
      <el-table border style="margin: 20px 0">
        <el-table-column label="No." width="100"></el-table-column>
        >
        <el-table-column label="id" width="150"></el-table-column>
        >
        <el-table-column label="role name" width="200"></el-table-column>
        >
        <el-table-column label="created time" width="300"></el-table-column>
        >
        <el-table-column label="last updated" width="300"></el-table-column>
        >
        <el-table-column label="operation">
          <template #default="{ row }">
            <el-button type="primary" icon="User" size="small">Assign Role</el-button>
            <el-button type="warning" icon="Edit" size="small">Edit User</el-button>
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
          @current-change="getData"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const roleToSearch = ref('');
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const handleSizeChange = async () => {
  currentPage.value = 1;
  await getData();
};
const searchRole = () => {};
const reset = () => {};
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

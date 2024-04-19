<template>
  <div>
    <el-table :data="allMenu" row-key="id">
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Permission" prop="level"></el-table-column>
      <el-table-column label="Last updated" prop="updateTime"></el-table-column>
      <el-table-column label="Operation">
        <template #default="{ row }">
          <el-button type="primary" icon="Plus" size="small">Add</el-button>
          <el-button type="warning" icon="Edit" size="small" :disabled="row.id === 1">Edit</el-button>
          <el-popconfirm width="220" confirm-button-text="OK" cancel-button-text="No, Thanks" icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?">
            <template #reference>
              <el-button type="danger" icon="Delete" size="small" :disabled="row.id === 1">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllMenu } from '@/api/acl/permission';
const allMenu = ref([]);
onMounted(() => {
  getData();
});

const getData = async () => {
  const data = await getAllMenu();
  if (data.code == 200) {
    console.log(data);
    allMenu.value = data.data;
  }
};
</script>

<style scoped></style>

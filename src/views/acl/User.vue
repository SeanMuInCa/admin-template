<template>
  <div>
    <el-card>
      <el-form inline style="display: flex; justify-content: space-between; align-items: center;">
        <el-form-item label="User Name" label-width="" style="margin: auto 10px;">
          <el-input placeholder="input a user's name to search" style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item style="margin: auto 10px;">
          <el-button type="primary">Search</el-button>
          <el-button>Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
      <el-button>a</el-button>
      <el-button>a</el-button>
      <el-table border>
        <el-table-column type="selection"  width="80" align="center"></el-table-column>
        <el-table-column type="index" label="No." width="80"></el-table-column>
        <el-table-column  label="User Id." width="140"></el-table-column>
        <el-table-column  label="User Name." width="140"></el-table-column>
        <el-table-column  label="Nick Name." width="140"></el-table-column>
        <el-table-column  label="Nick Role." width="100"></el-table-column>
        <el-table-column  label="Created Time." width="240"></el-table-column>
        <el-table-column  label="Last Update." width="240"></el-table-column>
        <el-table-column  label="Operation." ></el-table-column>
      </el-table>
      <div class="demo-pagination-block">
      <div class="demonstration"></div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="10"
        @size-change="handleSizeChange"
        @current-change="getData"
      />
    </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

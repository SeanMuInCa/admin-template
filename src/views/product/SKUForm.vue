<template>
  <el-card>
    <el-form label-width="150">
      <el-form-item label="Sku Name">
        <el-input placeholder="sku name"></el-input>
      </el-form-item>
      <el-form-item label="Sku Price($)">
        <el-input placeholder="sku price(g)" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Sku Weight(g)">
        <el-input placeholder="sku weight(g)" type="number"></el-input>
      </el-form-item>
      <el-form-item label="Sku Description">
        <el-input placeholder="description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="Platform Attribute">
        <el-form inline>
          <el-form-item label="no.1 attribute">
            <el-select placeholder="please select">
              <el-option label="attr 1" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="no.1 attribute">
            <el-select placeholder="please select">
              <el-option label="attr 1" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="no.1 attribute">
            <el-select placeholder="please select">
              <el-option label="attr 1" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="Sale Attribute">
        <el-form inline>
          <el-form-item label="no.1 attribute">
            <el-select placeholder="please select">
              <el-option label="attr 1" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="no.1 attribute">
            <el-select placeholder="please select">
              <el-option label="attr 1" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="no.1 attribute">
            <el-select placeholder="please select">
              <el-option label="attr 1" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="logo name">
        <el-table border>
          <el-table-column type="selection" width="80" align="center"></el-table-column>
          <el-table-column label="logo"></el-table-column>
          <el-table-column label="name"></el-table-column>
          <el-table-column label="Operation"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">Save</el-button>
        <el-button @click="cancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
const $emit = defineEmits(['setScene']);
const cancel = () => {
  $emit('setScene', 0);
};
</script>

<style scoped></style>

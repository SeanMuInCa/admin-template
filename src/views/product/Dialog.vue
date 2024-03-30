<template>
  <el-dialog v-model="dialogVisible">
    <template #header>
      <h2>{{ title }}</h2>
    </template>
    <el-form :model="dynamicValidateForm" style="max-width: 600px">
      <el-form-item
        label="Brand Name"
        :rules="[
          {
            required: true,
            message: 'brand name required at least two characters',
            trigger: 'change,blur',
          },
        ]"
      >
        <el-input v-model="dynamicValidateForm.brandName" placeholder="please input your new brand name" style="padding: 0 10px" />
      </el-form-item>
      <el-form-item
        label="Brand Logo"
        :rules="[
          {
            required: true,
            message: 'must upload a logo image',
            trigger: 'change',
          },
        ]"
      >
        <el-upload>
          <el-icon class="el-icon--upload" size="64"><upload-filled /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import { ElMessageBox } from 'element-plus';
const props = defineProps(['title', 'show', 'getStatus', 'flag']);

const dialogVisible = props.show;
console.log(props);

const dynamicValidateForm = ref({
  brandName: '',
});

const handleCancel = () => {
  props.getStatus(false);
};
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style scoped lang="scss"></style>

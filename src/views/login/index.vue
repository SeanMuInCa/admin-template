<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello!</h1>
          <h2>Welcome to Saskatoon</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginInfo.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" :prefix-icon="Lock" v-model="loginInfo.password" :show-password="true"></el-input>
            <!-- <div class="view" @click="handleView"></div> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%; height: 40px" @click="handleLogin">Login</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive } from 'vue';
import { loginRequest } from '@/api/user';
import { router } from '@/router';
import { ElMessage } from 'element-plus';
const loginInfo = reactive({
  username: '',
  password: '',
});

const handleLogin = async () => {
  const data = await loginRequest(loginInfo);
  console.log(data);

  if (data.code === 200) {
    router.push('/');
    ElMessage({
      type: 'success',
      message: 'Welcome back',
    });
  } else {
    ElMessage({
      type: 'error',
      message: data.data.message,
    });
  }
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    width: 80%;
    position: relative;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 3.125rem;
      font-weight: 700;
    }
    h2 {
      font-size: 30px;
      color: white;
      margin: 20px 0;
    }
    .view {
      width: 20px;
      height: 20px;

      position: absolute;
      right: 10px;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginInfo" :rules="rules" ref="loginForm">
          <h1>Hello!</h1>
          <h2>Welcome to Saskatoon</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginInfo.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginInfo.password" :show-password="true"></el-input>
            <!-- <div class="view" @click="handleView"></div> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%; height: 40px" @click="handleLogin" :loading="loading">Login</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import useUserStore from '@/store/modules/user';
import { getWelcome } from '@/utils/time';
import useRoutesStore from '@/store/modules/menuRoutes';
import { router } from '@/router';//导航路由



const $route = useRoute();//路由


const menuRoutes = useRoutesStore();
let $router = useRouter();//路由器
const userStore = useUserStore();
const loading = ref(false);
const loginInfo = reactive({
  username: '',
  password: '',
});
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (value.length < 5) {
    callback(new Error('the username at least has 5 characters'));
  } else if (value.length > 10) {
    callback(new Error('the username can not longer than 10 characters'));
  } else callback();
};
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (/^(?:[a-zA-Z]{6,12}|\d{6,12})$/.test(value)) callback();
  else callback(new Error('the password requires 6-12 characters long'));
};
//表单校验对象
const rules = reactive({
  username: [
    {
      validator: validateUsername,
      trigger: 'change',
    },
  ],
  password: [
    {
      validator: validatePassword,
      trigger: 'change',
    },
  ],
});

let loginForm = ref();
const handleLogin = async () => {
  //校验表单
  await loginForm.value
    .validate()
    .then(() => {
      loading.value = true;
      userStore
        .userLogin(loginInfo)
        .then(() => {
          $router.push($route.query.redirect === undefined ? '/' : $route.query.redirect);
          ElNotification({
            type: 'success',
            title: getWelcome(),
            message: `Welcome back ${userStore.userInfo.username}`,
          });
          loading.value = false;
        })
        .catch((reason: string) => {
          loading.value = false;
          ElNotification({
            type: 'error',
            message: reason,
          });
        });
    })
    .catch(() => {});
};

document.body.onkeyup = (e) => {
  if (e.key === 'Enter') {
    handleLogin();
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

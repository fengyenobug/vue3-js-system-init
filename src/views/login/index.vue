<script setup>
import { Login } from "@/apis/login";
import router from "@/router";
import { useLoginStore } from "@/stores/login";
import { ElMessage } from "element-plus";
import { ref } from "vue";
const loginStore = useLoginStore()
const username = ref('')
const password = ref('')
const login = async () => {
  const res = await Login({ phone: username.value, password: password.value })
  console.log(res);
  if (res.result === 1) {
    loginStore.setToken(res.token)
    localStorage.setItem(import.meta.env.VITE_TIME_KEY, String(Date.now()))
    loginStore.setUserInfo(res.courtyard)
    router.push('/')
  } else {
    ElMessage.error(res.message)
  }
}

</script>

<template>
  <div>登录</div>
  用户名<input type="text" v-model="username">
  密码<input type="text" v-model="password">
  <el-button type="primary" @click="login">登录</el-button>
</template>

<style scoped lang="less"></style>

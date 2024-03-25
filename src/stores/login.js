// 创建组合式api仓库
import { defineStore } from "pinia"
import { ref } from "vue"
import router from "@/router"

// 创建 & 导出仓库
export const useLoginStore = defineStore('loginStore', () => {
  const token = ref(localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) || null)
  const userInfo = ref({})

  const setToken = (tk) => {
    token.value = tk // 将数据设置给pinia
    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, tk) // 将数据同步给缓存
  }
  const removeToken = () => {
    token.value = null // 将pinia的token数据置空
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY) // 缓存同步置空
  }

  const logout = () => {
    removeToken() //清空pinia和缓存中的token
    localStorage.removeItem(import.meta.env.VITE_TIME_KEY)
    localStorage.clear()
    router.push('/login')
  }
  const setUserInfo = (obj) => {
    userInfo.value = obj
    localStorage.setItem('userInfo', JSON.stringify(obj))
  }
  return {
    token,
    setToken,
    removeToken,
    logout,
    setUserInfo
  }
})
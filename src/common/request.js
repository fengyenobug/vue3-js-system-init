import axios from 'axios'
import router from '@/router/index'
import { storeToRefs } from 'pinia'
import { useLoginStore } from "@/stores/login";
import { ElMessage } from 'element-plus';

const tokenTimeOut = Number(import.meta.env.VITE_TOKEN_TIMEOUT)
// 创建一个axios的实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: Number(import.meta.env.VITE_APP_TIMEOUT)
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const loginStore = useLoginStore();
    const user = storeToRefs(loginStore); // 响应式

    if (location.pathname === '/login') { // 1.如果是登录页，免校验token
      console.log('登录页免检tk');
      config.headers['token'] = `${user.token}`

    } else if (user.token.value) { // 2.如果有token,检测token是否过期
      if (IsCheckTimeOut()) {
        loginStore.logout();
        router.push('/login')
        return Promise.reject(new Error('token过期，请重新登录'))
      }
      config.headers['token'] = `${user.token}`
    } else { // 3.如果没有token
      loginStore.logout();
      router.push('/login')
      return Promise.reject(new Error('没有token,未登录'))
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error && error.response && error.response.status === 401) { // 当等于401时候，表示后端告诉我们token超时了
    const loginStore = useLoginStore();
    loginStore.logout(); // 调用退出登录，删除token
    router.push('/login')
  }
  error && error.message && ElMessage.error(error.message)
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入catch
})

function IsCheckTimeOut() {
  const currentTimeStamp = Date.now();
  return (currentTimeStamp - Number(localStorage.getItem(import.meta.env.VITE_TIME_KEY))) / 1000 > tokenTimeOut
}
export default request // 导出axios实例

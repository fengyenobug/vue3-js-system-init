import request from "@/common/request"
// 账号密码登录 参数phone password
export const Login = data => {
  return request({
    url: 'agent-service/courtyard/loginByPassword',
    method: 'POST',
    data
  })
}
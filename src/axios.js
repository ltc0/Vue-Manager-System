import axios from "axios"
import { getToken,toast } from "./composables/auth";
const instance = axios.create({
    baseURL: '/api',
  });

// 添加请求拦截器
instance.interceptors.request.use(function (res) {
  // 在发送请求之前做些什么
  const token = getToken()
  if(token){
    res.headers["token"] = token
  }
  return res;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
    toast(error.response.data.msg || "登录错误","error")
  return Promise.reject(error);
});

export default instance


import { useCookies } from '@vueuse/integrations/useCookies'
import { ElNotification } from 'element-plus'
const TokenKey = "admin-token"
const cookie = useCookies()

//获取token
export function getToken(){
    return cookie.get(TokenKey)
}
//设置token
export function setToken(token){
    return cookie.set(TokenKey,token)
}
//清除token
export function removeToken(){
    return cookie.remove(TokenKey)
}

//消息提示
export function toast(message,type="success")
{ElNotification({
    message,
    type,
    duration:3000
  })
};

//弹出提示框
import { ElMessage, ElMessageBox } from 'element-plus'
export function showModel(content="提示内容",type="",title=""){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type,
        })
}

//显示全屏loading
import nprogress from 'nprogress'
export function showFullloading(){
    nprogress.start()
}
//隐藏全屏loading
export function hideFullloading(){
    nprogress.done()
}


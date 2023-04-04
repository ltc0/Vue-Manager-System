import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import {Names} from './store-name'
import { login,getInfo, logout } from "../Api/mananger";
import {setToken,toast,removeToken} from '../composables/auth'
import { set } from 'nprogress';
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
const useStore  = defineStore(Names.TEST, {
  state: ()=>({
      //用户信息
      user:{
        menus:[],
        ruleNames:[],
      },

      //侧边宽度
      asideWidth:"250px",
  }),
  getters:{
  },
  actions: {
    //登录
    login({commit},{username,password}){
      return new Promise((resolve,reject)=>{
        login(username,password).then(res=>{
            setToken(res.token)
            
            resolve(res)
        }).catch(err=>reject(err))
      })
    },
    //获取当前用户信息
    getinfo(){
      return new Promise((resolve,reject)=>{
        getInfo().then(res=>{
          const store = useStore()
          store.user = res
          store.user.ruleNames = res.ruleNames
          store.user.menus = res.menus
          resolve(res)
        }).catch(err=>reject(err))
      }
      )
    },
    //退出登录
    logout(){
      const store = useStore()
      removeToken()
      store.user = {}

    },
    //展开/缩起侧边
    handleAsideWidth(){
      //用于判断，如果侧边跨度为250px则是展开状态
      const store = useStore()
      store.asideWidth = store.asideWidth === "250px" ? "64px" : "250px"
    },

    //设置menus
    set_Menus(state,menus){
      const store = useStore()
      state.menus = menus
    },
    set_RuleNames(state,ruleNames){
      const store = useStore()
      state.ruleNames = ruleNames
    }
  }
})

export default useStore


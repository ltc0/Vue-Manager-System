import {router,addRoutes} from './router/index'
import {getToken,toast,showFullloading
,hideFullloading} from './composables/auth' 
import useStore from "./store/index"
import { getInfo } from './Api/mananger';
import { ref } from "vue";
import {storeToRefs} from "pinia"
//全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to,from,next) => {
    showFullloading()
    //显示loading
    const token = getToken()
    
    //没有登录，强制跳转回登录页
    //即没有登录信息（token）又进入到不是登录页面，跳回到登录页面(使用next()方法)
    if(!token && to.path!="/login"){
        toast("请先登录","error")
        return next({path:"/login"})
    }

    //防止重复登录,from.path能获得从哪来的路径
    if(token && to.path == "/login"){
        toast("请勿重复登录","success")
        return next({path:from.path ? from.path:"/"})
    }

    //如果用户登录，自动获取用户信息，并存储
    let hasNewRoutes = false
    if(token && !hasGetInfo){
        const store = useStore()
        let {menus} = await store.getinfo()
        hasGetInfo = true
        hasNewRoutes =  addRoutes(menus)
    }

    //设置页面标题
    let title = (to.meta.title ? to.meta.title : "") +　"-商城后台"
    document.title = title

    hasNewRoutes ? next(to.fullPath) : next()
})

//全局前置守卫
router.afterEach((to,from) => hideFullloading())
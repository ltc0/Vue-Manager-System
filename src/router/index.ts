import { componentSizeMap } from 'element-plus'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Admin from "../layouts/admin.vue"

//默认路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: () => import('../pages/login.vue'),
        meta: {
            title: "登录页"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name:"NotFound",
        component: () => import('../pages/404.vue'),
    },
    {
        path: '/',
        name:"admin",
        component: () => import('../layouts/admin.vue'),
    }
]

//动态路由，用于后台传回来的匹配菜单
const asyncRoutes = [{
        path: '/',
        component: () => import('../pages/back.vue'),
        name:'/',
        meta: {
            title: "后台首页"
        }
    },
    {
        path: '/goods/list',
        component: () => import('../pages/goods/list.vue'),
        name:'/goods/list',
        meta: {
            title: "商品管理"
        }
    },
    {
        path: '/category/list',
        component: () => import('../pages/goods/category.vue'),
        name:'/category/list',
        meta: {
            title: "分类管理"
        }
    },
    {
        path: '/user/list',
        component: () => import('../pages/user/list.vue'),
        name:'/user/list',
        meta: {
            title: "用户列表"
        }
    },
    {
        path: '/order/list',
        component: () => import('../pages/order/list.vue'),
        name:'/order/list',
        meta: {
            title: "管理列表"
        }
    },
    {
        path: '/comment/list',
        component: () => import('../pages/comment/comment.vue'),
        name:'/comment/list',
        meta: {
            title: "评价列表"
        }
    },
    {
        path: '/coupon/list',
        component: () => import('../pages/coupon/list.vue'),
        name:'/coupon/list',
        meta: {
            title: "优惠列表"
        }
    },
    {
        path: '/image/list',
        component: () => import('../pages/image/list.vue'),
        name:'/image/list',
        meta: {
            title: "图库管理"
        }
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

//动态添加路由的方法
export function addRoutes(menus){
    //是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr)=>{
        arr.forEach(e=>{
            let item = asyncRoutes.find(o=>o.path == e.frontpath)
            if(item && !router.hasRoute(item.path)){
                router.addRoute('admin',item)
                hasNewRoutes = true
            }
            if(e.child && e.child.length>0){
                findAndAddRoutesByMenus(e.child)
            }
        })
    }
    findAndAddRoutesByMenus(menus)
    return hasNewRoutes
}


import { ref } from "vue";
import useStore from "C:/0000项目/Vue_keshihua/vite-project/src/store";
import {useRouter,useRoute,onBeforeRouteUpdate, onBeforeRouteLeave, routerKey} from "vue-router"
import { useCookies } from '@vueuse/integrations/useCookies'
import { ArrowDown } from "@element-plus/icons-vue";
import Cookies from "universal-cookie";
export function useTabList(){
    const route = useRoute()
    const router = useRouter()
    const cookies = useCookies()
    const store = useStore();
    const activeTab = ref(route.path);
    const tabList = ref([
      {
        title: "后台首页",
        path: "/",
      },
    
    ]);    
    //添加标签导航
    function addTab(Tab){
        //用来设置默认固定
        //这句话用来判断现有的标签Tab是否具有传进来的tab -- path路径
        let noTab = tabList.value.findIndex(t=>t.path == Tab.path) == -1
        //如果没有PATH则把Tab传进tabList当中,此时只能添加已经有的
        if(noTab){
            tabList.value.push(Tab)
        }
    
        cookies.set("tabList",tabList.value)
    }
    onBeforeRouteUpdate((to,from) => {
        activeTab.value = to.path
        addTab(
                {    
        title:to.meta.title,
        path:to.path
        }
        )
        
    })
    
    //根据标签改变路由
    const changeTab = (t)=>{
        activeTab.value = t
        router.push(t)
    }
    
    //初始化标签导航
    function initTabList(){
        let tbs = cookies.get("tabList")
        if(tbs){
           tabList.value = tbs
        }
    }
    initTabList()
    
    //关闭导航
    const removeTab = (t) => {
      //t传进来的是路径，activeTab.value是当前的路径
      let tabs = tabList.value
      let a = activeTab.value
      //现在关闭的是当前导航条，因此要跳转到上一个或下一个导航条
      if(a===t){
        //现在要根据导航所有的条目来推断当前关闭的导航条上一个或下一个是谁，因此要用到循环
        tabs.forEach((tab,index) => {
          if(tab.path === t){
            //tab.path[index+1]这样获取的不是路径，而是o
            const nextTab = tabs[index+1] || tabs[index-1]
            
            //如果路径存在则，将a赋值
            if(nextTab){
              a = nextTab.path
            }
          }
        })
        //这样就会触发changeTab的功能
        activeTab.value = a
      }
      //此时完成了点击关闭切换路由，但目前导航条还没进行关闭
      //tabList不需要已经关闭的导航条，用filter方法可以使用回调函数过滤掉条件,下面即返回tab.path除了关的其他所有的值
      tabList.value = tabList.value.filter(
        tab=>tab.path!=t
      )
    
      //更改Cookie
      cookies.set("tabList",tabList.value)
    }
    
    //这里连接的是下拉菜单，传入的c关联的是下拉菜单的item
    //此时可以使用判断来触发条件
    const handleClose = (c) => {
      if(c ==="clearAll"){
        //当前激活切换为首页
        activeTab.value = '/',
        //导航页只剩下首页
        tabList.value = [{
              title: "后台首页",
              path: "/",
        }]
      }else if(c === "clearOther"){
        //导航页只剩下首页和当前激活页
        tabList.value = tabList.value.filter(
          //可以是首页 ||(或者是) 激活页
          tab=>tab.path === '/' || tab.path === activeTab.value
        )
      }
      cookies.set("tabList",tabList.value)
    }

    return{
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}

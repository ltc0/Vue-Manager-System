import useStore from "C:/0000项目/Vue_keshihua/vite-project/src/store/index";

//
//此时已经拿到传进来的数组值，要与ruleNames进行比对
function hasPermission(value,el=false){
    if(!Array.isArray(value)){
        throw new Error(`需要配置权限,例如...`)
    }
    const store = useStore();
    const hasAuth = value.findIndex(v=>store.user.ruleNames.includes(v)) != -1
    if(el && !hasAuth){
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}
export default{
    install(app){
        //app.use(permission)是在app.create之后，此时拿到的时已经创建好的app里面具有directive功能
        //directive有两个参数el是绑定的节点，binding是传入的值
        app.directive("permission",{
            mounted(el,binding){
                console.log(el,binding);
                hasPermission(binding.value,el)
            }
        })
    }
}
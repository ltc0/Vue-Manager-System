//登录登出功能进行封装
import { reactive, ref } from "vue";
import {
    logout,
    update,
} from "../Api/mananger.js";
import useStore from "../store";
import { useRouter } from "vue-router";
import {
    showModel,
    toast,
} from "../composables/auth.js";
import FormDrawer from "../components/FormDrawer.vue";

export function uesRepassword() {

    const ruleFormRef = ref(null);
    const formref = ref(null);
    const drawer = ref(false);
    //登录形式
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: "",
    });
    //定义登录规则
    const rules = reactive({
        oldpassword: [
            { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        repassword: [
            { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
    });
    //点击登录按钮
    const onSubmit = () => {
        ruleFormRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            formref.value.showloading();
            update(form)
                .then((res) => {
                    toast("修改密码成功,请重新登录");
                    store.logout();
                    router.push("/login");
                })
                .finally(() => {
                    formref.value.hideloading();
                });
        });
    };
    //打开修改密码功能,要登陆完修改了formref的值formref才有值，因此要放在登录的后面,
    //要写成匿名函数的形式
    const openRePassword = () => formref.value.open();
    return {
        ruleFormRef,
        formref,
        drawer,
        form,
        rules,
        onSubmit,
        openRePassword
    }
}

export function handlelogout() {
    const store = useStore()
    showModel("是否要退出登录", "warning", "").then((res) => {
      logout().finally(() => { 
        //移除cookietoken
        store.logout();
        //跳转回登录页
        router.push("/login");
        toast("退出成功");
      });
    });
  }
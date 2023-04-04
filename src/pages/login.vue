<template>
  <el-row class="el">
    <el-col :span="16" class="left">
      <div>
        <div class="wel">欢迎光临</div>
        <div class="w">LTC项目测试xxxxxxxxxx</div>
      </div>
    </el-col>

    <!-- //右半部分 -->
    <el-col :span="8" class="log">
      <h2 class="cc">欢迎回来</h2>
      <div class="dd">
        <span></span>
        <span>账号密码登录</span>
        <span></span>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleFormRef" class="form2">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            :loading="loading"
            type="primary"
            plain
            @click="onSubmit"
            class="btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style  lang='less' scoped>
.el {
  display: flex;

  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: purple;
    flex-direction: column;

    .wel {
      font: bold 70px light, serif;
      color: lightgoldenrodyellow;
      margin-bottom: 20px;
      margin-left: -4px;
    }
    .w {
      font-size: 25px;
      color: gray;
    }
  }
}

.log {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .cc {
    font: bold 35px gray;
    margin-bottom: 20px;
  }
  .dd {
    opacity: 50%;
    font: normal 20px gray;
    margin-bottom: 20px;
  }
  .form2 {
    width: 250px;
    height: 30px;
    .btn {
      width: 250px;
      font: normal 20px gray;
      border-radius: 6%;
    }
  }
}
</style>

<script lang="ts" setup>
import { reactive, ref, onMounted,onBeforeUnmount } from "vue";
import { Calendar, Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import useStore from "../store";
import type { FormInstance, FormRules } from "element-plus";
import { setToken, toast } from "../composables/auth";
// do not use same name with ref
const ruleFormRef = ref<FormInstance>();
//登录形式

const form = reactive({
  username: "",
  password: "",
});
const router = useRouter();
const store = useStore();

//定义登录规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    { min: 3, max: 5, message: "用户名必须为3-5个字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
});
//定义loading状态
const loading = ref<boolean>(false);
//点击登录按钮
const onSubmit = () => {
  ruleFormRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true;
    store.login("login", form)
      .then((res) => {
        toast("登录成功");
        router.push("/");
      })
      .finally(() => {
        loading.value = false;
      });
  });
};


//添加回车事件，按下回车触发登录按钮
function onKeyUp(e){
  if(e.key === 'Enter')
  onSubmit()
}
//添加键盘监听
onMounted(()=>{
  document.addEventListener("keyup",onKeyUp)
})
onBeforeUnmount(()=>{
  document.removeEventListener("keyup",onKeyUp)
})
</script>


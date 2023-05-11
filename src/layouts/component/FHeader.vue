 <template>
  <div class="wrapper">
    <span class="logo">
      <el-icon><eleme-filled /></el-icon>
      学习编程
    </span>
    <!-- 折叠标签 -->
    <!-- 这个是显示 -->
    <el-tooltip content="折叠" 
    placement="bottom">
      <!-- 这个是标签 -->
      <el-icon class="icon-btn" @click="folder">
        <fold v-if="store.asideWidth == '250px'"/>
        <Expand v-else/>
        </el-icon>
    </el-tooltip>
    <!-- 刷新标签 -->
    <el-tooltip content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
    </el-tooltip>
    <!-- 用户图标 -->
    <div class="icon">
      <!-- 全屏标签 -->
      <el-tooltip content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <aim v-else="isFullscreen" />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="25" :src="store.user.avatar" class="avatar" />
          {{ store.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <form-drawer ref="formref" title="修改密码" @submit="onSubmit">
      123
      <!-- 弹框主体部分，用来存储表单，登陆页面等数据 -->
      <div class="drawer">
        <el-form :model="form" :rules="rules" ref="ruleFormRef" class="form2">
          <el-form-item prop="oldpassword" label="旧密码">
            <el-input
              type="password"
              v-model="form.oldpassword"
              placeholder="请输入旧密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="新密码">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请再次输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="repassword" label="确认密码">
            <el-input
              type="password"
              v-model="form.repassword"
              placeholder="请确认新密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item label=""> </el-form-item>
        </el-form>
      </div>
    </form-drawer>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import {uesRepassword,handlelogout} from "../../composables/useManager"
import FormDrawer from "../../components/FormDrawer.vue";
import useStore from "../../store";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
console.log(store.asideWidth);
const{
    //代表的是表单 
    ruleFormRef,
    //代表的是抽屉
    formref,
    drawer,
    form,
    rules,
    onSubmit,
    openRePassword
  } = uesRepassword()
  //将输入密码进行封装

//下拉拆单监听事件
const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handlelogout();
      break;
    case "rePassword":
      openRePassword();
      break;
  }
};

//刷新/全屏
const handleRefresh = () => location.reload();
import { useFullscreen } from "@vueuse/core";
const { isFullscreen, toggle } = useFullscreen();

//折叠
const folder = ()=>{
  store.handleAsideWidth()
}
</script>


 <style scoped>
.wrapper {
  display: flex;
  background: #4243d0;
  color: #fff;
  text-decoration-color: lightgray;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 1000;
}

.logo {
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}

.icon {
  justify-content: flex-end;
  display: flex;
  align-items: center;
  flex: 1;
}

.icon-btn {
  display: flex;
  width: 42px;
  height: 64px;
  justify-content: center;
  align-items: center;
}

.icon-btn:hover {
  opacity: 75;
  background: burlywood;
}

.dropdown {
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  align-content: center;
}

.avatar {
  margin-right: 5px;
  align-content: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  justify-content: center;
  font: 12px;
  font-family: "Times New Roman", Times, serif;
  color: #c7cadd;
}

.drawer {
  width: 100%;
  height: 1000px;
}
</style>
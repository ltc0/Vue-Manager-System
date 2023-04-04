<template>
  <!-- 修改密码抽屉 -->
  <el-drawer v-model="drawer" 
  :title="title" 
  :size="size"
  :destroy-on-close="destroyOnClose">
    <div class="fromDrawer">
      <div class="body">
          <slot></slot>
      </div>
      <div class="action">
        <el-button class="btn" type="primary"
        @click="submit">{{confirmText}}</el-button>
        <el-button class="btn" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const drawer = ref(false);
//打开
const open = () => (drawer.value = true);

//关闭
const close = () => (drawer.value = false);

//提交
const emit = defineEmits(["submit"])
const submit = () => emit("submit")

//登录条
const loading = ref(false)
const showloading = () => loading.value = true
const hideloading = () => loading.value = false
//向父组件暴露方法
defineExpose({
  open,
  close,
  showloading,
  hideloading
});

//由于标题，宽度是动态变化的，因此需要暴露出去
const props = defineProps({
    title:String,
    size:{
        type:String,
        default:"45%"
    },
    destroyOnClose:{
        type:Boolean,
        default:true
    },
    confirmText:{
        type:String,
        default:"提交"
    }

})
</script>


<style scoped>
.fromDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  
}

.body{
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 45px;
    overflow-y: auto; 
    margin-bottom: 10px;
}

.action{
    height: 50px;
    margin-top: auto;
    display: flex;
      
}
</style>

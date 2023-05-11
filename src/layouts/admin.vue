<template>
  <el-container>
    <!-- 头部部分 -->
    <el-header>
      <f-header></f-header>
    </el-header>
    <!-- 下边部分 -->
    <el-container>
      <!-- 侧边部分 -->
      <el-aside :width="store.asideWidth">
        <f-menu></f-menu>
      </el-aside>
      <!-- 主体部分 -->
      <el-main>
        <f-tag-list></f-tag-list>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from "./component/FHeader.vue";
import FMenu from "./component/FMenu.vue";
import FTagList from "./component/FTagList.vue";
import useStore from "../store";
const store = useStore();
</script>

<style>
.el-aside {
  transition: all 0.2s;
}
.fade-enter-from {
  opacity: 0;
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}
.fade-enter-to {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
/* 加入下列条件，便不会内容先进行变换 */
.fade-enter-active{
  transition-delay: 0.2s;
}
</style>
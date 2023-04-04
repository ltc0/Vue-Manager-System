<template>
  <div
    style="margin-bottom: 20px"
    class="f-tag-list"
    :style="{ left: store.asideWidth }"
  >
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-change="changeTab"
      style="min-width: 100px"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/'"
      >
      </el-tab-pane>
    </el-tabs>

    <!-- 下拉菜单 -->
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>

        <template #dropdown>
          <el-dropdown-menu>
            <!-- command点击菜单触发的事件回调 -->
            <el-dropdown-item command="clearAll">关闭全部</el-dropdown-item>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>
<script lang="ts" setup>
import { useTabList } from "../../composables/useTabList.js";
import useStore from "C:/0000项目/Vue_keshihua/vite-project/src/store";
const store = useStore();
const { activeTab, tabList, changeTab, removeTab, handleClose } = useTabList();
</script>

<style scoped>
.f-tag-list {
  position: fixed;
  top: 64px;
  right: 0;
  height: 44px;
  display: flex;
  z-index: 100;
  align-items: center;
  background-color: #f4f6f8;
}

.tag-btn {
  background: #ffffff;
  height: 32px;
  width: 32px;
  margin-left: auto;
  border-radius: rounded;
  display: flex;
  position: absolute;
  right: 5px;
  top: 5px;
}

.el-icon--right {
  cursor: pointer;
  margin: auto;
  position: absolute;
  left: 10px;
  top: 10px;
}

:deep(.el-tabs__header) {
  margin-bottom: 0px;
  border: 0 !important;
}

:deep(.el-tabs__nav) {
  border: 0px !important ;
  margin: 4px 10px;
}

:deep(.el-tabs__item) {
  border: 0px !important ;
  background: white;
  height: 32px;
  line-height: 32px;
  margin: 0px 10px;

  border-radius: rounded;
}
</style>
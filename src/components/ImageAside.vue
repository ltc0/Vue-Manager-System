<template >
  <el-aside width="220px" class="image-aside">
    <div class="top">
      <div class="aside-list">
        <span>分类标题</span>
        <el-button type="primary" size="small" text>
          <el-icon :size=12 ><Edit /></el-icon>
        </el-button>
        <el-button type="primary" size="small" text>
          <el-icon :size=12><Close /></el-icon>
        </el-button>
      </div>
    </div>

    <div class="bottom">分页区域</div>
  </el-aside>
</template>
    

<style scoped>
.image-aside .top {
  overflow-y: auto;
  position: absolute;
  bottom: 50px;
  right: 0;
  left: 0;
  top: 0;
}

.image-aside .bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 50px;
}
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.aside-list{
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
}
</style>
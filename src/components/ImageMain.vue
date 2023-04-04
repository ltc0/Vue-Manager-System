<template>
  <el-main class="image-main">
    <div class="top">
      <div v-for="i in 100" :key="i">
        {{ i }}
      </div>
    </div>
    <div class="bottom">分页区域</div>
  </el-main>
</template>

<style scoped>
.image-main .top{
  overflow-y: auto;
  position: absolute;
  bottom: 50px;
  right: 0;
  left: 0;
  top: 0;
}

.image-main .bottom{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 50px;
}
.image-main {
  border-right: 1px solid #eeeeee;
  position: relative;
}
</style>
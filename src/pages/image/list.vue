<template>

      <el-container :style="{ height: h + 'px' }"
      style="background: white">
        <el-header class="image-header"       >Header</el-header>
        <el-container>
            <ImageAside></ImageAside>
            <ImageMain></ImageMain>
        </el-container>
      </el-container>

</template>

<script setup>
const windowHeight = window.innerHeight || document.body.clientHeight;
//减去头部,导航栏高度,和padding
const h = windowHeight - 64 - 44 - 40 - 50;
import ImageAside from "../../components/ImageAside.vue"
import ImageMain from "../../components/ImageMain.vue"
</script>

<style scoped>
.image-header {
  display: flex;
  border-bottom: 1px solid #eeeeee;
  align-items: center;
}


</style>
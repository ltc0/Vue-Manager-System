<template >
  <el-card shadow="never" style="margin-top: 20px">
    <!-- card title -->
    <template #header>
      <div style="display: flex; justify-content: space-between">
        <span style="font: 14px sans-serif"> {{ title }}</span>
        <el-tag type="danger" effect="plain" round>
          {{ tip }}
        </el-tag>
      </div>
    </template>
    <!-- card body -->
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" v-for="(item,index) in btns"
      :key="index">
      <el-card shadow="hover" style="background:#f8f8f8">
        <div
          style="display: flex; align-items: center; justify-content: center;
          flex-direction:column"   
        >
          <span style="font: 30px sans-serif;margin-bottom:5px">{{item.value}}</span>
          <span style="font: 12px sans-serif">{{item.label}}</span>
        </div>
      </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
defineProps({
  title: String,
  tip: String,
  btns:Array,
});
</script>


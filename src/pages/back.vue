<template>
  <div>
    <el-row :gutter="20">
      <template v-if="panels.length == 0">
        <!-- 骨架屏 -->
        <el-col :span="6" :offset="0" v-for="i in 4" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="card">
                <template #header>
                  <div class="card-header">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 20%" />
                  </div>
                </template>
                <!-- card body -->
                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider></el-divider>
                <div class="card-body">
                  <el-skeleton-item variant="text" style="width: 30%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
              <el-skeleton-item variant="text" style="width: 30%" />
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <el-col
        :span="6"
        :offset="0"
        v-for="(item, index) in panels"
        :key="index"
      >
        <el-card shadow="hover" class="card">
          <template #header>
            <div class="card-header">
              <span :style="{ font: '14px sans-serif' }">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain" round>
                {{ item.unit }}
              </el-tag>
            </div>
          </template>

          <!-- card body -->
          <span :style="{ font: '30px sans-serif' }">
            <CountTo :value="item.value"></CountTo>
          </span>
          <el-divider></el-divider>
          <div class="card-body">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>


    <!-- 中间部分 -->
    <IndexNavs></IndexNavs>

    <!-- 图标部分 -->
    <el-row :gutter="20">
      <!-- 左侧ECharts部分 -->
      <el-col :span="12" :offset="0">
        <indexChart v-permission="['getStatistics3,GET']"></indexChart>
      </el-col>

      
      <!-- 右侧部分 -->
      <el-col :span="12" :offset="0">
        <IndexCard title="店铺及商品提示"
        tip="店铺及商品提示"
        :btns="goods"
        >
        </IndexCard>
        <IndexCard title="交易提示"
        tip="需要立即处理的订单"
        :btns="order">
        </IndexCard>
      </el-col>
    </el-row>
    
    
  </div>
</template>

<script setup lang='ts'>
import { gstatistics1,gstatistics2 } from "../Api/index";
import { ref } from "vue";
import CountTo from "../components/CountTo.vue";
import IndexNavs from "../components/IndexNavs.vue";
import indexChart from "../components/indexChart.vue";
import IndexCard from "../components/IndexCard.vue";
const panels = ref([]);
gstatistics1().then((res) => {
  panels.value = res.panels;
  console.log(panels.value);
});

const goods = ref([]);
const order = ref([]);
gstatistics2().then((res) => {
  goods.value = res.goods
  order.value = res.order
  console.log(res);
});
</script>

<style >
.card {
  border: 0;
}
.card-header {
  display: flex;
  justify-content: space-between;
}

.card-body {
  display: flex;
  justify-content: space-between;
  font: 12px sans-serif;
  color: #99989b;
}
</style>
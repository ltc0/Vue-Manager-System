<template>
  <el-row :gutter="20" class="card">
    <el-col
      :span="3"
      :offset="0"
      v-for="(item, index) in iconNavs"
      :key="index"
    >
      <el-card shadow="hover" @click="$router.push(item.path)">
        <div class="card-body">
          <el-icon size="25" :style="{ color: item.color }"
            ><component :is="item.icon"
          /></el-icon>
          <span class="card-s">{{ item.title }}</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
const iconNavs = [
  {
    icon: "user",
    color: "#928dad",
    title: "用户",
    path: "/user/list",
  }, 
  {
    icon: "shopping-cart",
    color: "#d4cbf8",
    title: "商品",
    path: "/goods/list",
  },
  {
    icon: "Tickets",
    color: "#b98abd",
    title: "订单",
    path: "/category/list",
  },
  {
    icon: "ChatLineSquare",
    color: "#72a5a0",
    title: "评价",
    path: "/comment/list",
  },
  {
    icon: "Picture",
    color: "#ca8f97",
    title: "图库",
    path: "/goods/list",
  },
  {
    icon: "Comment",
    color: "#5aa191",
    title: "公告",
    path: "/goods/list",
  },
  {
    icon: "Histogram",
    color: "#5d5d5c",
    title: "配置",
    path: "/goods/list",
  },
  {
    icon: "Sell",
    color: "#d6b160",
    title: "优惠",
    path: "/coupon/list",
  },
];
</script>

<style scoped>
.card {
  margin-top: 15px;
}
.card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

.card-s {
  display: flex;
  font: x-small;
  margin-top: 2px;
}
</style>
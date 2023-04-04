<template>
  <el-card shadow="never" style="margin-top: 20px">
    <template #header>
      <div class="card-header">
        <span>订单统计</span>
        <div>
          <el-check-tag
            style="margin-right: 8px"
            v-for="(item, index) in options"
            :key="index"
            :checked="current == item.value"
            @click="handleChoose(item.value)"
            >{{ item.text }}</el-check-tag
          >
        </div>
      </div>
    </template>
    <!-- card body -->
    <div id="chart" style="width: 100%; height: 300px" ref="el"></div>
  </el-card>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { gstatistics3 } from "../Api/index";
import { useResizeObserver } from "@vueuse/core";
const current = ref("week");
const options = [
  {
    text: "近1个月",
    value: "month",
  },
  {
    text: "近1周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
];

const handleChoose = (type) => {
  current.value = type;
  getData();
};

//由于在setup语法糖模式下，onMounted前还未创建dom，因此要在onMounted里面进行渲染
//我们要现在外面定义一个myChart，以防止其未定义
let myChart = null;
onMounted(() => {
  let chartDom = document.getElementById("chart");
  if(chartDom){
  myChart = echarts.init(chartDom);
  getData();
  }

});

//如果没有销毁组件，会导致白屏的情况
//因此在页面被销毁之前，要销毁掉echarts的实例
onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose();
  }
});
//获取后台得到的数据
function getData() {
  let option = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  //在跳转页面时可以有loading效果
  myChart.showLoading();

  //调用方法，传入的是近一个月,近一周,近24小时
  gstatistics3(current.value)
    .then((res) => {
      option.xAxis.data = res.x;
      option.series[0].data = res.y;
      myChart.setOption(option);
    })
    .finally(() => {
      myChart.hideLoading();
    });
}

//使ECharts缩放时可以适配
const el = ref(null);
useResizeObserver(el, (entries) => {
  //此时已经可以监听到缩小时触发事件
  /* console.log(el); */
  //来定义myChart定义size的变化
  if(myChart){
     myChart.resize();
  }
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
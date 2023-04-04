<template>
  <div>
      {{d.num.toFixed(2)}}
  </div>
</template>

<script setup>
import gsap from "gsap"
import { reactive, watch, watchEffect } from "vue"

//从0开始渲染
const d = reactive({
    num:0
})
//获取参数，即获取到需要滚动到什么值，从别的组件获取参数
const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})


function animateToValue(){
   //第一个参数d表示传进来的对象
   //第二个参数表述持续时间duration，num传过来的属性
   gsap.to(d,{
       duration:0.5,
       num:props.value
   })
}
animateToValue()

//为了防止后面的value值发生变化，因此使用watch函数对props.value进行监听，
//当发生变化时，再次执行滚动动画
watchEffect(() => {
    props.value,()=>animateToValue()
}) 
</script>

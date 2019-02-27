<template>
  <!-- TODO:vue通过ref设置dom元素，通过$refs方法获取此dom节点 -->
  <div class="slider" ref="slider">
    <div class="sliderGroup" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intervalId: 0
    };
  },
  mounted() {
    this.setSize();
    this.slide();
  },
  methods: {
    setSize() {
      let imgWidth = this.$refs.slider.offsetWidth; //获取轮播图父级宽度
      // console.log(imgWidth)
      this.$refs.slider.style.overflow = "hidden";
      this.$refs.sliderGroup.style.width = 5 * imgWidth + "px"; //设置整个轮播组是一个个轮播图的五倍宽度

      //获取每个轮播图div节点，遍历，控制轮播图的样式
      for (let i = 0;i < document.getElementsByClassName("banner").length;i++) {
        document.getElementsByClassName("banner")[i].style.width = imgWidth + "px";
        document.getElementsByClassName("banner")[i].style.float = "left";
      }
      //获取轮播图第一个节点，并进行深度复制
      let firstNode = document.getElementsByClassName("banner")[0].cloneNode(true);
      this.$refs.sliderGroup.appendChild(firstNode); //将第一个节点添加到父节点里（直接为最后一个节点）
    },
    slide() {
      let index = 0;
      //添加定时执行
      let intervalId = setInterval(() => {
        clearInterval(intervalId);
        index = index + 1;
        //设置轮播图动作，向左移动
        this.$refs.sliderGroup.style.transform ="translate(" + -375 * index + "px,0px)";  //移动距离
        this.$refs.sliderGroup.style.transition = "all 1500ms";  //过渡时间
        }, 3000);
      this.intervalId = intervalId;
      //添加一个过渡结束的监听
      this.$refs.sliderGroup.addEventListener("webkitTransitionEnd", () => {
        //图片移动到4的时候，重置index，瞬间回到0的位置，过渡时间为0
        if (index == 4) { 
          index = 0; //重置起点
          this.$refs.sliderGroup.style.transform = "translate(0px,0px)";
          this.$refs.sliderGroup.style.transition = "0ms";
        }
        //重新添加定时执行
        intervalId = setInterval(() => {
          clearInterval(intervalId); //停止执行
          index = index + 1;
          this.$refs.sliderGroup.style.transform ="translate(" + -375 * index + "px,0px)";
          this.$refs.sliderGroup.style.transition = "all 1500ms";
        }, 3000);
        this.intervalId = intervalId;
      });
    },
    beforeDestroy() {  
       //组件销毁前，清除定时执行
      clearInterval(this.intervalId);
    }
  }
};
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
.bannerimg {
  width: 100%;
}
</style>
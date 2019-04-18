<!--  -->
<template>
  <div><div class="div" style="width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:0;">1</div>
    <div class="div" style="width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:110px;">2</div>
    <div class="div" style="width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:0;left:220px;">3</div>
    <div class="div" style="width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:0;">4</div>
    <div class="div" style="width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:110px;">5</div>
    <div class="div" style="width:100px;height:100px;line-height:100px;background-color:red;position:absolute;top:110px;left:220px;">6</div></div>
</template>

<script>

export default {
  data () {
    return {
    };
  },
  computed: {},

  methods: {
      touchfn() {
   function getcolor(){
        var color_arr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
        function suiji(){
            return Math.floor(Math.random()*16);
        }
        var colorSTR ="#"+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()]+color_arr[suiji()];
        return colorSTR;
    }
    var divd = $(".div");
    divd.each(function(index){
        $(this).on('touchstart', function(evt) {
            var e = event || evt;
            e.preventDefault();//阻止其他事件
            //要做的事情
        }).on('touchmove', function(evt) {
            var e = event || evt;
            e.preventDefault();//阻止其他事件

            // 如果这个元素的位置内只有一个手指的话
            //console.log(e.targetTouches)
            console.log(event.targetTouches[0].clientX+"/"+event.targetTouches[0].clientY+"/"+event.targetTouches[0].pageX+"/"+event.targetTouches[0].pageY)
            if (e.targetTouches.length == 1) {
                var touch = e.targetTouches[0];  // 把元素放在手指所在的位置
                $(this).css("left",(touch.pageX- parseInt($(this).width())/2 + 'px'));
                $(this).css("top",(touch.pageY- parseInt($(this).height())/2 + 'px'));
                $(this).css("background", getcolor());
            }
        }).on('touchend', function(evt) {
            var e = event || evt;
            e.preventDefault();//阻止其他事件
            $(this).css("background",getcolor());
        })
    });
      }
       
  },
  components: {},
  mounted () {
      this.touchfn()
  }

}

</script>
<style  scoped>
  .div{text-align: center;font-size:30px;}
</style>
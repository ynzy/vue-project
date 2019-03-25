
#硅谷外卖项目介绍

前后端分离的SPA应用，前台采用vue全家桶制作webapp，后台使用nodejs,mongoDB开发，后台是直接拿过来用的，我是做前端的，所以只学习前端这一块

[项目地址](https://github.com/ynzy/vue-project/tree/master/gshop)
### 前台技术选型

```
vue,vue-router,axios
vant,swiper,mint-ui
stylus
```
# day01
## 1、搭建项目结构
1. 静态资源导入
  1. --static--css--reset.css，在index.html页面引入即可
  2. 引入阿里图标库，在阿里图标库设计好自己需要用到的图标，生成在线代码直接在index.html引入
  3. 解决点击响应延时 0.3s 问题
   
```
  <link rel="stylesheet" href="/static//css/reset.css">
  <!-- 引入阿里图标库 -->
  <link rel="stylesheet" href="http://at.alicdn.com/t/font_1077199_3kjjxyuafdw.css">
  <!-- TODO: 解决点击响应延时 0.3s 问题 -->
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
```

## 2、vue-router的理解和使用
  * router-view/router-link/keep-alive
  * $router: 路由对象，包含一些操作路由的功能函数，来实现编程式导航(路由跳转)
  * $route： 当前路由对象，一些当前路由信息数据容器，path/meta/query/params
1. 路由拆分
  * 拆分路由，当拿到ui图或者静态页面时，要对路由进行布局拆分，知晓，每个页面跳转到哪里，会显示什么
  * 底部导航组件：FooterGuide
  * 此导航路由组件： Msite/Search/Order/Profile
* 路由结构：

```js
 routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      name: 'msite',
      component: Msite,
      meta: {  //配置元数据确定是否显示footer
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
```  

```js
<template>
  <div>
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item to="/msite" icon="shop">外卖</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/order" icon="column">订单</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {},

  computed: {},

  methods: {},
  mounted() {
    //TODO: 监听路由路径，修改相对应的底部的菜单项
    let path = this.$route.path;
    if (path == "/msite") {
        this.active = 0;
      } else if (path == "/search") {
        this.active = 1;
      } else if (path == "/order") {
        this.active = 2;
      } else if (path == "/profile") {
        this.active = 3;
      }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl';
</style>
```

* 使用vant的Tabbar组件实现底部导航，由于点击跳转页面，再次刷新页面时，路由页面与底部导航激活的部分不匹配，所以在每次加载页面时，监听当前路由，使底部激活部分与之匹配

2. 抽取组件
有些组件在很多页面都是一样的，只是显示的数据不一样，所有将其抽取出来放在--components公共组件中，通过solt插槽来实现组件通信标签结构，props获取父组件数据，实现多页面公用一个组件
* 头部组件: HeaderTop, 通过slot来实现组件通信标签结构
* 商家列表组件: ShopList
* 示例

```js
//HeaderTop公共组件
<template>
  <header class="header">
    <!-- 使用插槽获取内容 -->
    <slot name="left"></slot> 
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: String  //从父组件获取标题信息
  }

}
</script>
//Msite父组件
<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop title="昌平区北七家宏福科技园(337省道北)">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
      </section>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  data() {
    return {};
  },
 components: {
    HeaderTop,
    ShopList
  }
};
</script>
```

3. 登录路由组件
只有路由导航的四个页面需要显示底部菜单，登录组件是不需要显示底部导航的，所以，通过路由的meta属性，配置点击的路由组件显示为true
* 在app页面进行设置

```js
<template>
  <div id="app">
    <router-view/>
    <!-- TODO: 底部菜单组件是否要显示 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
```
## 6. 后台项目
    启动后台项目: 理解前后台分离
    测试后台接口: 使用postman
    修正接口文档

## 7、前后台交互
* ajax请求：axios
* ajax请求封装： axios + promise

```js
/**
 * ajax请求函数模块
 * 返回值： promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
/**
 * @export
 * @param {*} url   //请求地址
 * @param {*} [data={}]  //请求数据对象
 * @param {string} [type='GET']  //请求方法
 */
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

```

* 接口请求函数封装: 每个后台接口

```js
/**
 * 包含n个接口请求函数的模块
 * 函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = 'http://localhost:4000'
// const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = function (geohash) {
    ajax(`${BASE_URL}/position/${geohash}`)
} 
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (latitude,longitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash,keyword) => ajax(BASE_URL+'/shops', {geohash, keyword})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax(BASE_URL+'/captcha')
// 6、用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) => ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone,code) => ajax(BASE_URL + '/login_sms', {phone,code},'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')
/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')
/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')
/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
```

* 调用

```js
mounted () {
   const result =  reqFoodCategorys()
  //  console.log(result)
  result.then(function(res) {
    console.log(res)
  })
  }
```

# day02
## 一、异步数据
#### 1、封装ajax：（第一天已写，这个很重要）
  * 要学会promise+axios封装ajax请求的函数
  * 要能封装每个接口对应的请求函数(根据接口定义ajax请求函数)
  * 解决ajax的跨域问题：配置代理，对代理的理解。
  * 配置--config--index.js

```js
proxyTable: {
  '/api': { // 匹配所有以 '/api'开头的请求路径
    target: 'http://localhost:3000', // 代理目标的基础路径
    changeOrigin: true, // 支持跨域
    pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
      '^/api': ''
    }
  }
}
```

#### 2、vuex编码:
  1. 创建所有相关的模块: store/index|state|mutations|actions|getters|mutations-types
  2. 设计state：也就是从后台获取的数据存储在state中
      * 出现问题：对于暴露导入的理解

```js
const state = {}
export default state
import state from './xxx.js'
//暴露时没有加{},在import时也不需要加{}
const state = {}
export default {state}
//export default {} 导出的是对象，那么引入的时候就要 import {state} from './xxx.js'
```

  3. 实现actions，此文件是用来异步获取数据的
      * 定义异步action： async/await
      * 流程： 发送ajax获取数据，commit提交给mutation
  4. 实现mutation：给状态赋值，也就是更新state数据
  5. 实现index:创建store对象(固定的模式)
  6. main.js: 配置store
#### 3、组件异步显示数据
1. 异步获取数据
    * 在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
    * mapActions(['getAddress'])以数组形式映射模块中的方法，在mounted中调用也可以异步获取后台数据

```js
import { mapActions } from "vuex";
methods: {
 //TODO: 方法2.以数组形式映射模块中的方法
 ...mapActions(['getAddress'])
},
mounted () {
 //TODO: 方法1.含有异步操作，例如向后台提交数据
 // this.$store.dispatch('getAddress')
 this.getAddress();
}
```

2. 读取数据
    * mapState(['...'])读取state中数据到组件中
3. 显示数据
    * 在模板中显示xxx数据
#### 4、模板中显示数据的来源
1. data：自身的数据(内部改变)
2. props:外部传入的数据(外部改变)
3. computed： 根据data/props/别的compute/state/getters(计算的数据)
#### 5、异步显示轮播图
1. 通过vuex获取foodCategorys数据(发请求，读取)
2. 对获取的数据进行整合计算(一维变特定的二维数据)

```js
  computed: {
    ...mapState(["categorys"]),
    /*
      根据categorys一维数组生成一个2维数组
      小数组中的元素个数最大是8
       */
    categorysArr() {
      //解构赋值
      const { categorys } = this;
      // 准备空的2维数组
      const arr = [];
      // 准备一个小数组(最大长度为8)
      let minArr = [];
      categorys.forEach(c => {
        // 如果当前小数组已经满了, 创建一个新的
        if (minArr.length === 8) {
          minArr = [];
        }
        // 如果minArr是空的, 将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        // 将当前分类保存到小数组中
        minArr.push(c);
      });
      return arr;
    }
  },
```

3. 通过双循环对二维数组进行遍历显示,如果没有数据时，显示预加载图片

```html
<nav class="msite_nav">
 <!-- 判断是否有数据 -->
 <div class="swiper-container" v-if="categorys.length">
   <div class="swiper-wrapper">
     <!-- 第一层遍历二维数组 -->
     <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
       <!-- 第二层遍历，对二维数组中的一维数组遍历 -->
       <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
         <div class="food_container">
           <img :src="baseImageUrl+category.image_url">
         </div>
         <span>{{category.title}}</span>
       </a>
     </div>

   </div>
   <!-- Add Pagination -->
   <div class="swiper-pagination"></div>
 </div>
 <!-- 没有数据时显示预加载svg -->
 <img src="./images/msite_back.svg" alt="back" v-else >
</nav>
```

4. 使用Swiper显示轮播图，如何在界面更新之后创建Swiper对象？
    * 使用watch+$nextTick(),监视显示的数据，如果数据有值立即更新

```js
  watch: {
    categorys(value) {
      // categorys数组中有数据了, 在异步更新界面之前执行
      // 使用setTimeout可以实现效果, 但不是太好
      /*setTimeout(() => {
       //创建一个Swiper实例对象，实现轮播
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项,可以循环轮播
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      }, 100);*/
       // 界面更新就立即创建Swiper对象
        this.$nextTick(() => {// TODO: 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
          // 创建一个Swiper实例对象, 来实现轮播
          new Swiper('.swiper-container', {
            loop: true, // 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          }) 
        })
    }
  }
```

## 二、登录/注册：界面相关效果
1. 切换登录方式
* 初始化一个boolean值(longinWay)，true为短信登录，false为密码登录
* 使用@click方法设置boolean值
* 定义一个class类绑定此布尔值控制表单显示选择
`loginWay: true  //true代表短信登陆, false代表密码`
![登录方式切换.png](https://upload-images.jianshu.io/upload_images/13505073-07a17e145f6da30b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![登录方式切换.gif](https://upload-images.jianshu.io/upload_images/13505073-78b784c1c53b2722.gif?imageMogr2/auto-orient/strip)
2. 手机号合法检查，发送验证码倒计时
* 通过计算属性验证输入的手机号是否正确，正确时可以点击发送获取验证码,`right_phone`类改变字的颜色

```html
 <section class="login_message">
  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
  <!-- 计算属性验证输入的手机号是否正确，正确则能点击获取验证码，添加显示状态。 -->
  <!-- 表单里面的button默认行为是提交表单，要取消默认行为 -->
  <!-- 三目运算，模板字符串，如果时间大于0则显示当前秒数 -->
  <button
    :disabled="!rightPhone"
    class="get_verification"
    :class="{right_phone: rightPhone}"
    @click.prevent="getCode"
  >{{computeTime>0? `已发送(${computeTime}s)` :'获取验证码'}}</button>
</section>
```
```js
data() {
  return {
    phone: "", // 手机号
    computeTime: 0, //计时时间
  }
},
computed: {
    rightPhone() {
      //使用计算属性测试输入的手机号是否正确，正确则显示类名
      return /^1\d{10}$/.test(this.phone);
    }
  },
methods: {
  //异步获取验证码
  getCode() {
    //如果当时没有计时
    if (!this.computeTime) {
      //启动倒计时
      this.computeTime = 30;
      //TODO: 间歇调用
      const intervalId = setInterval(() => {
        this.computeTime--;
        if (this.computeTime <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }
}
```
![手机号码检车，发送验证码倒计时.gif](https://upload-images.jianshu.io/upload_images/13505073-01bd15d53c5cefce.gif?imageMogr2/auto-orient/strip)
3. 切换显示或隐藏密码
* 通过两个输入框，一个按钮，改变密码的显示与隐藏状态

`showPwd: false, //是否显示密码`
```html
<section class="login_verification">
  <!-- 切换密码显示隐藏状态，改变按钮选择状态，默认为隐藏 -->
  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
  <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
  <!-- 点击改变类的状态和圆圈的移动 -->
  <div class="switch_button" :class="showPwd?'on': 'off'" @click="showPwd = !showPwd">
    <div class="switch_circle" :class="{right:showPwd}"></div>
    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
  </div>
</section>
```
![密码显示和隐藏.gif](https://upload-images.jianshu.io/upload_images/13505073-0c36bbad3e5565b9.gif?imageMogr2/auto-orient/strip)
4. 前台验证提示
* 学会如何使用模板组件
* 调用--components-AlertTip-AlertTip.vue组件，使用提示框组件

```html
<!-- 提示模板组件 -->
<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      alertText: String  //传入的参数
    },

    methods: {
      closeTip() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('closeTip')
      }
    }
  }
</script>
```
```html
<form @submit.prevent="login">
</form>
<!-- 调用组件，@closeTip自定义事件 -->
<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
```
```js
import AlertTip from "../../components/AlertTip/AlertTip.vue";
data() {
  return {
      alertText: "", //提示文本
      alertShow: false //是否显示警告框
  }
}
methods: {
  //展示提示框
  showAlert(alertText) {
    this.alertShow = true;
    this.alertText = alertText;
  },
 //关闭警告框
  closeTip() {
    this.alertShow = false;
    this.alertText = '';
  },
  //异步登录
  login() {
    //前台表单验证
    if (this.loginWay) {
      //短信登录
      const { phone, code } = this;
      if (!this.rightPhone) {
        //手机号不正确
        this.showAlert("手机号不正确");
      } else if (!/^\d{6}$/.test(code)) {
        alert(this.code)
        //验证码必须是6位数字
        this.showAlert("验证码必须是6位数字");
      }
    } else {
      //密码登录
      const { name, pwd, captcha } = this;
      if (!this.name) {
        //用户名必须指定
        this.showAlert("用户名必须指定");
      } else if (!this.pwd) {
        //密码必须指定
        this.showAlert("密码必须指定");
      } else if (!this.captcha) {
        //图形验证码必须指定
        this.showAlert("图形验证码必须指定");
      }
    }
  }  
}
```

## 三、前后台交互相关问题
1. 如何查看你的应用是否发送某个ajax请求？
    * 浏览器的network
![查看network](https://upload-images.jianshu.io/upload_images/13505073-f8431b542cc6969e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 发ajax请求404怎么办
    * 查看请求路径的对错
    * 单利是否生效(配置和重启)
    * 服务器应用是否运行
3. 后台返回了数据，但页面没有显示？
    * vuex中是否有数据
    * 组件是否读取了数据

# day03
## 一、完成登录注册功能
1. 2种登录方式
   * 手机号/验证码登录
   * 用户名/密码/图片验证码登录
2. 登录的基本流程
   * 表单前台验证，如果不通过，提示
   * 发送ajax请求，得到返回的结果
3. 根据结果的标识(code)来判断登录请求是否成功
    * 1： 不成功，显示提示
    * 0： 成功，保存用户信息，跳转到个人中心路由
```js
async login() {
 let result
 //前台表单验证
 if (this.loginWay) {
   // 发送ajax请求，短信登录
   result = await reqSmsLogin(phone,code)

 } else {
   // 发送ajax请求，密码登录
   result = await reqPwdLogin({name,pwd,captcha})
 }
 //根据结果数据处理
   if(result.code === 0) {
     const user = result.data
     //将user保存到vuex的state中
     this.$store.dispatch('recordUser',user)
     //去个人中心界面
     this.$router.replace('/profile')
   } else {
     //显示新的图形验证码
     this.getCaptcha()
     //显示警告提示
     const msg = result.msg
     this.showAlert(msg)
   }
}

//action.js
  // TODO: 同步记录用户信息
  recordUser ({commit},userInfo) {
    commit(RECEIVE_USER_INFO,{userInfo})
  }
//mutations.js
  [RECEIVE_USER_INFO](state,{userInfo}) {
      state.userInfo = userInfo
  },
```

4. vue自定义事件
   * 监听事件： @eventName="fn"  function fn (data) {//处理}
   * 分发事件： this.$emit('eventName',data)

```html
<!-- AlertTip提示组件 -->
<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      alertText: String
    },

    methods: {
      closeTip() {
        // 分发自定义事件(事件名: closeTip)
        this.$emit('closeTip')
      }
    }
  }
</script>

<!-- login组件调用AlertTip组件 -->
<AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>

<script>
  import AlertTip from "../../components/AlertTip/AlertTip.vue";
  export default {
    methods: {
      //关闭警告框
      closeTip() {
        this.alertShow = false;
        this.alertText = '';
      },
    }
  }
</script>
```

4. 注意
   * 使用network查看请求(路径/参数/请求方式/响应数据)
   * 使用vue的chrome插件查看vuex中的state和组件中的数据
   * 使用debugger语句调试代码
   * 实参类型与形参类型的匹配问题

```js
//定义 
fun({a,b,c})  //{a,b,c}是一个对象
//调用
fun({a,b,c})  //也要传对象
```


## 2、自动登录，退出登录
1. 通过会话获取后台用户信息，后台处理session保持登录状态，刷新页面时登录存在

```js
// 根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
  // 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo()
    if(result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
```

2. 点击退出登录，返回退出登录状态给后台，删除前台用户信息

```js
logout() {
   Dialog.confirm({
     title: "提示",
     message: "确认退出吗"
   })
   .then(() => {
     //请求退出
     this.$store.dispatch("logout");
     Toast('退出成功');
   })
   .catch(() => {
     console.log("点击了取消");
   });
}
//actions
  // 异步登出
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code === 0) {
      commit(RESET_USER_INFO)
    }
  }
```

## 3、搭建商家整体界面
1. 学会拆分界面路由，看出页面拆分成几个组件
![页面组件和路由拆分](https://upload-images.jianshu.io/upload_images/13505073-5594f277ebd5c5d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 路由的定义/配置|使用---父子路由，路由重定向

```js
{
   path: '/shop',
   component: Shop,
   children: [
     {
       path: '/shop/goods',
       component: ShopGoods
     },
     {
       path: '/shop/ratings',
       component: ShopRatings
     },
     {
       path: '/shop/info',
       component: ShopInfo
     },
     {
       path: '',
       redirect: '/shop/goods'
     },
   ]
},
```

## 4、模拟(mock)数据/接口
1. 前后台分离的理解
2. mock.js的理解和使用
3. json数据设计的理解
   * JSON分为json对象和json数组，
   * 结构：名称/数据类型
   * 结构 + value值，值可以变，结构不可以变 

```js
//接口
//获取商家信息
export const reqShopInfo = () => ajax('/info')  //mock模拟数据不需要代理api
//获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')
//获取商家商品数组
export const reqShopGoods = () => ajax('/goods')

/*mockServer.js*/
/*
使用mockjs提供mock数据接口
 */
 import Mock from 'mockjs'
 import data from './data.json'
// 返回goods的接口
Mock.mock('/goods',{code: 0, data: data.goods})
// 返回ratings的接口
Mock.mock('/ratings',{code: 0, data: data.ratings})
// 返回info的接口
Mock.mock('/info',{code: 0, data: data.info})
// export default ???  不需要向外暴露任何数据, 只需要保存能执行即可
```

## 5、ShopHeader组件
1. 异步显示数据效果的编码流程
  * ajax
    * ajax请求函数
    * 接口请求函数
  * vuex
    * state
    * mutation-types
    * actions
    * mutations
  * 组件
    * dispatch(): 异步获取后台数据到vuex的state
    * mapState(): 从vuex的state中读取对应的数据
    * 模板中显示
2. 初始化显示异常
   * 情况1：`Cannot read property 'xxx' of undefined"`
   * 原因： 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
   * `a.b.xxx`,undefined表示b未定义
   * 解决： 使用v-if指令
   * 情况2: `Cannot read property 'xxx' of null"`
   * 原因： 数据定义时使用了`a=null`
   * 解决： 直接使用`a=[]或a={}`定义空对象空数组
3. vue transition动画
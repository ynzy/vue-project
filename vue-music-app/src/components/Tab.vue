<template>
  <div class="tab">
    <nav>
      <li class="item">
        <router-link class="tab-item" to="/recommend">
          <span class="tab-link">推荐音乐</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="tab-item" to="/hot">
          <span class="tab-link">热歌榜</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="tab-item" to="/search">
          <span class="tab-link">搜索</span>
        </router-link>
      </li>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
nav 
  height 40px
  line-height 40px
  .item
    float left 
    width 33.3%
    flex 1
    text-align center
    cursor pointer
    list-style none
    a 
      text-decoration none 
    .tab-link
      display inline-block
      line-height 40px
      font-size 15px
      color #333
      text-decoration none
    .active .tab-link
  		color #d33a31
     	border-bottom 2px solid #d33a31	 
</style>
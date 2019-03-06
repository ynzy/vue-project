<template>
    <div class="home">
        <!-- 标题 -->
        <HomeNav></HomeNav>
        <!-- 轮播图 -->
        <HomeBanner></HomeBanner>
        <!-- 列表菜单项 -->
        <HomeColumn></HomeColumn>
        <!-- 广告 -->
        <HomeAd></HomeAd>
        <!-- 商品列表 -->
        <HomeShop></HomeShop>
    </div>
</template>

<script>
import HomeNav from './HomeNav.vue'
import HomeBanner from './HomeBanner.vue'
import HomeColumn from './HomeColumn.vue'
import HomeAd from './HomeAd.vue'
import HomeShop from './HomeShop.vue'
    export default {
        components: {
            HomeNav,
            HomeBanner,
            HomeColumn,
            HomeAd,
            HomeShop
        }
    }
</script>

<style lang="less" scoped>
.home {
    padding-bottom: 0.45rem;
}
</style>
<template>
    <div>
        美食

        <button @click='goback'>返回</button>
    </div>
</template>

<script>
    export default {
        methods: {
            goback() {
                this.$router.back();  //TODO: 路由导航
            }
        }
    }
</script>

<style scoped>

</style>
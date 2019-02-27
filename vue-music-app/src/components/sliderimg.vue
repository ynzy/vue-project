<template>
  <div>
    <div v-for="item in songList" class="banner">
      <a :href="item.linkUrl">
        <img class="bannerimg" :src="item.songImgSrc" :alt="item.songName">
      </a>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            songList: []
        }
    },
    mounted () {
        this.getSongList();
    },
    methods: {
        getSongList() {
      this.$axios.get("/static/data/songList.json").then(resp => {
        if (resp.status == 200) {
          this.songList = resp.data;
        //   console.log(resp.data);
        }
      });
    }
    }
};
</script>

<style scoped>
</style>
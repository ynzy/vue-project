<template>
  <div class="g-homecolumn">
    <van-cell-group>
      <van-row type="flex" justify="space-around">
        <van-col v-for="(item,key) in icons1" span="6" :key="item.id">
          <a href="javascript:void(0);" @click="routeTo(item)" >
            <img :src="item.path" alt>
            {{item.name}}
          </a>
        </van-col>
      </van-row>
    </van-cell-group>
    <van-cell-group>
      <van-row type="flex" justify="space-around">
        <van-col class="small" v-for="(item,key) in icons2" span="6" :key="item.id">
          <a href="javascript:void(0);" @click="routeTo(item)">
            <img :src="item.path" alt>
            {{item.name}}
          </a>
        </van-col>
      </van-row>
    </van-cell-group>
    <van-cell-group>
      <van-row type="flex" justify="space-around">
        <van-col class="small" v-for="(item,key) in icons3" span="6" :key="item.id">
          <a href="javascript:void(0);" @click="routeTo(item)">
            <img :src="item.path" alt>
            {{item.name}}
          </a>
        </van-col>
      </van-row>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons1: [],
      icons2: [],
      icons3: []
    };
  },
  methods: {
    routeTo(item) {
      this.$router.push(item.link);
    }
  },
  mounted() {
    this.axios.get("../../../static/json/column.json").then(resp => {
      // console.log(resp)
      if (resp.data) {
        this.icons1 = resp.data.images;
        this.icons2 = resp.data.icon1;
        this.icons3 = resp.data.icon2;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.g-homecolumn {
  text-align: center;
}
.van-col {
  margin: 5px 0;
  img {
    width: 80%;
  }
}
.small {
  a {
    img {
      width: 50%;
    }
  }
}
a {
  display: flex;
  flex-direction: column;
  color: #000;
  img {
    margin: 0 auto;
  }
}
</style>
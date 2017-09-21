<template>
  <div class="container">
    <div class="trailer">
      <div class="title">最新预告片</div>
      <div class="prevue" ref="imgWrapper">
        <ul v-if="movieData.trailer" :class="'length-'+movieData.trailer.length">
          <li v-for="item in movieData.trailer">
            <a :href="item.url"><img :src='item.img'/></a>
              <span class="movieName">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="release" v-for="(item,index) in movieData.coming">
      <div class="release-to">{{item.title}}</div>
      <movielist :movieData="movieData.coming[index].movies" :iconShow="iconShow"></movielist>
    </div>
  </div>
</template>

<script>
  import IScroll from "iscroll"
  import movielist from "../list/MovieList.vue"
  export default{
    data(){
      return {
        iconShow: false
      }
    },
    props: {
      movieData: {
        type: Object
      }
    },
    components: {
      movielist
    },
    created(){
      if (this.movieData.trailer) {
        this.$nextTick(() => {
          if (!this.imgscroll) {
            this.imgscroll = new IScroll(this.$refs.imgWrapper, {
              click: true,
              scrollX: true,
              scrollY: false,
            })
          } else {
            this.imgscroll.refresh()
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  @length: 110px;
  .container {
    position: relative;
    top: 55px;
    .trailer {
      width: 100%;
      height: 120px;
      .title {
        font-size: 13px;
        font-weight: 600;
        height: 20px;
        line-height: 20px;
        padding-left: 8px;
        background-color: rgba(221, 216, 206, 0.3);
      }
      .prevue {
        box-sizing: border-box;
        overflow: hidden;
        padding: 10px 8px;
        height: 110px;
        width: 100%;
        li {
          display: flex;
          flex-direction: column;
          float: left;
          width: @length;
          height: 85px;
          margin-right: 10px;
          img {
            display: inline-block;
            width: 100%;
            height: 65px;
          }
          .movieName {
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
    .release {
      position: relative;
      top: 0;
      right: 0;
      .release-to {
        box-sizing: border-box;
        font-size: 13px;
        font-weight: 600;
        width: 100%;
        height: 20px;
        line-height: 20px;
        padding-left: 8px;
        background-color: rgba(221, 216, 206, 0.3);
      }
    }
  }

</style>

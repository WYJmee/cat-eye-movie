<template>
  <div class="container">
    <div class="bgMove">
      <ul v-if="movieData.scrollImg" ref="bg">
        <li v-for="item in movieData.scrollImg.concat([movieData.scrollImg[0]])" key="item.id">
          <span class="bgImg"><img :src='item.bigImgTypeUrl'/></span>
        </li>
      </ul>
    </div>
    <moviesList :movieData="movieData.hot" :iconShow="iconShow"></moviesList>
  </div>
</template>

<script>
  import IScroll from 'iscroll'
  import {mapActions, mapMutations} from 'vuex'
  import moviesList from "../list/MovieList.vue"
  export default{
    data(){
      return {
        iconShow: true,
        itemData:{
            type:Object
        },
        idata:{
          type:Object
        }
      }
    },
    props: {
      movieData: {
        type: Object
      }
    },
    components: {
      moviesList,
    },
    methods: {
      ...mapActions(['transitionEnd', 'transitionAgain', 'startHeaderTransition']),
      ...mapMutations(['RECEIVE_LENGTH'])
    },
    watch: {
      movieData(val) {
        if (val.scrollImg) {
          this.RECEIVE_LENGTH(val.scrollImg.length)
          this.$nextTick(function () {
            this.startHeaderTransition(this.$refs.bg)
            this.transitionEnd({
              obj: this.$refs.bg,
              callback: () => {
                this.transitionAgain({obj: this.$refs.bg, modules: 'header'})
              }
            })
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @color: #9B9B9B;
  .container {
    position: relative;
    top: 55px;
    .bgMove {
      overflow: hidden;
      width: 100%;
      height: 90px;
      li {
        &:last-child {
          margin-bottom: 0;
        }
        .bgImg > img {
          display: inline-block;
          vertical-align: top;
          width: 100%;
          height: 90px;
          margin-right: 4px;
          background-repeat: no-repeat;
        }
      }
    }
  }

</style>

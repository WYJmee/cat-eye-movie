<template>
  <div ref="warpper">
  <div class="billboard">
    <div class="category" v-for="(item,index) in movieData.billboard">
      <div class="title">
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span>{{item.title}}</span>
          <span class="right">&gt</span>
        </div>
      </div>
      <div class="movies" ref="scroll">
        <ul :class="'length-'+item.movies.length">
          <li v-for="(movie,index) in item.movies">
            <a @click="saveItem(movie),saveShow(false)"><img :src='movie.img'/></a>
            <span class="movieName"><i>{{index + 1}}</i>{{movie.nm}}</span>
            <span v-show="movie.sc?true:movie.pubDateAsMills?true:movie.wish>0?true:false"
                  class="score">{{movie.sc ? movie.sc : movie.wish > 0 ? (movie.wish / 10000).toFixed(1) : movie.pubDateAsMills ? (movie.pubDateAsMills / 1000000000).toFixed(1) : ''}}{{movie.sc ? '分' : movie.wish > 0 ? '万人想看' : movie.pubDateAsMills ? '万美元' : ''}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="more">
      <div>查看更多榜单</div>
      <div class="movieType">
        <span class="classification">影片分类(按类型)</span>
        <ul class="type">
          <li>剧情</li>
          <li>喜剧</li>
          <li>爱情</li>
          <li>动画</li>
          <li>动作</li>
          <li>恐怖</li>
          <li>惊悚</li>
          <li>悬疑</li>
          <li>冒险</li>
          <li>科幻</li>
          <li>犯罪</li>
          <li>战争</li>
          <li>记录</li>
          <li>其他</li>
        </ul>
      </div>
      <div class="movieRegion">
        <span class="classification">影片分类(按地区)</span>
        <ul class="type">
          <li>大陆</li>
          <li>港台</li>
          <li>美国</li>
          <li>英国</li>
          <li>法国</li>
          <li>日本</li>
          <li>韩国</li>
          <li>印度</li>
          <li>泰国</li>
          <li>德国</li>
          <li>其他</li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import IScroll from "iscroll"
  import {mapActions} from "vuex"
  export default{
      data(){
        return{
          scroll:[this.bgscrol0,this.bgscrol1,this.bgscrol2,this.bgscrol3,this.bgscrol4,this.bgscrol5,this.bgscroll6]
        }
      },
    props: {
      movieData: {
        type: Object
      }
    },
    methods:{
      ...mapActions(['saveItem','saveShow'])
    },
    created(){
      console.log(this.movieData)
      let self=this
      if (this.movieData.billboard) {
        this.$nextTick(() => {
          for(let i=0;i<self.scroll.length;i++){
          if (!self.scroll[i]) {
            self.scroll[i] = new IScroll(this.$refs.scroll[i], {
              eventPassthrough:true,
              freeScroll : true,
              scrollX: true,
              scrollY:true
            })
          } else {
            self.scroll[i].refresh()
          }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  @length: 80px;
  .billboard {
    position: relative;
    top: 55px;
    width: 100%;
    height: 100%;
    .category {
      height: 200px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      .title {
        box-sizing: border-box;
        padding: 10px 8px;
        width: 100%;
        height: 40px;
        div:first-of-type {
          height: 20px;
          line-height: 20px;
          span {
            display: inline-block;
          }
          span:nth-of-type(1) {
            width: 3px;
            height: 5px;
            background: red;
          }
          span:nth-of-type(2) {
            width: 3px;
            height: 8px;
            background: red;
          }
          span:nth-of-type(3) {
            width: 3px;
            height: 11px;
            background: red;
          }
          span:nth-of-type(4) {
            font-size: 13px;
          }
          .right {
            float: right;
            color: #5e5e5e;
          }
        }
      }
      .movies {
        box-sizing: border-box;
        overflow: hidden;
        padding: 10px 8px 0;
        height: 160px;
        width: 100%;
        li {
          display: flex;
          flex-direction: column;
          float: left;
          width: @length;
          height: 145px;
          margin-right: 10px;
          a {
            height: 105px;
          }
          img {
            display: inline-block;
            border: none;
            width: 100%;
            height: 105px;
          }
          span {
            height: 20px;
            line-height: 20px;
            text-align: center;
            i {
              font-weight: bold;
              margin-right: 5px;
              font-style: italic;
              color: red;
            }
          }
          .movieName {
            width: 100%;
            font-size: 14px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .score {
            font-size: 12px;
            color: #5e5e5e;
          }
        }
      }
    }
    .more {
      width: 100%;
      div:first-of-type {
        width: 100%;
        height: 35px;
        line-height: 40px;
        color: red;
        text-align: center;
        font-size: 14px;
      }
      .classification{
        box-sizing: border-box;
        display: block;
        width: 100%;
        padding-left: 10px;
        height: 35px;
        line-height: 35px;
        font-size: 13px;
        background-color: rgba(244, 244, 244, 0.7);
        color: #5e5e5e;
      }
      .type li{
          box-sizing: border-box;
          float: left;
          text-align: center;
          width: 25%;
          line-height: 40px;
          height: 40px;
          font-size: 13px;
          border-bottom: 1px solid #ccc;
          border-right:1px solid #ccc;
      }
      .movieType {
        width: 100%;
        ul{
          width: 100%;
          height: 160px;
          li:nth-of-type(4),li:nth-of-type(8),li:nth-of-type(12){
            border-right: none;
          }
          li:nth-of-type(13),li:nth-of-type(14){
            border-bottom: none;
          }
        }
      }
      .movieRegion{
        width: 100%;
        ul{
          width: 100%;
          height: 120px;
          li:nth-of-type(4),li:nth-of-type(8){
            border-right: none;
          }
          li:nth-of-type(9),li:nth-of-type(10),li:nth-of-type(11){
            border-bottom: none;
          }
        }
      }
    }
  }

</style>

<template>
  <div class="movie-list">
    <div class="content" v-for="item in movieData">
      <div class="details">
        <div class="movieImg"><a :href="item.videourl"><img :src='item.img'/></a></div>
        <div class="movieMessage" @click="saveItem(item),saveShow(false)">
          <div class="movieName">
            <span class="name">{{item.nm}}</span>
            <span class="IMX"></span>
            <span class="score">{{item.sc == 0 ? item.wish : item.sc}}<span>{{item.sc == 0 ? '人想看' : '分'}}</span></span>
          </div>
          <div class="introduce">
            <div class="box">
              <span class="des">{{item.scm}}</span>
              <span class="show">{{item.desc}}</span>
            </div>
            <div class="ticket" v-show="iconShow" :class="{'isRed': item.globalReleased}">
              {{item.globalReleased == true ? "购票" : "预售"}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IScroll from "iscroll"
  import {mapActions} from "vuex"
  export default{
    props: {
      movieData: {
        type: Array
      },
      iconShow: {
        type: Boolean
      }
    },
    methods:{
      ...mapActions(['saveItem','saveShow'])
    }
//    updated(){
//      if (this.movieData.length>0) {
//          console.log(this.$refs.movieWrapper)
//        this.$nextTick(() => {
//          if (!this.moviescroll) {
//            this.moviescroll = new IScroll(this.$refs.movieWrapper, {
//              scrollX: false,
//              scrollY: true,
//            })
//          } else {
//            this.moviescroll.refresh()
//          }
//        })
//      }
//    }
  }
</script>

<style lang="less" scoped>
  @color: #9B9B9B;
  .movie-list {
    position: relative;
    top: 0;
    .content {
      width: 100%;
      height: 100px;
      border-bottom: 1px solid #eee;
      .details {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 7px;
        display: flex;
        .movieImg {
          width: 65px;
          height: 100%;
          img {
            display: inline-block;
            width: 65px;
            height: 100%;
          }
        }
        .movieMessage {
          height: 100%;
          width: 100%;
          margin-left: 10px;
          .movieName {
            height: 50%;
            width: 100%;
            .name {
              float: left;
              font-size: 14px;
              margin-top: 10px;
            }
            .IMX {
              float: left;
              font-size: 12px;
              margin: 12px 0 0 5px;
            }
            .score {
              float: right;
              margin: 10px 5px 0 0;
              font-size: 14px;
              color: #FFD777;
              & > span {
                font-size: 12px;
              }
            }
          }
          .introduce {
            width: 100%;
            height: 50%;
            .box {
              display: flex;
              flex-direction: column;
              float: left;
              height: 100%;
              font-size: 13px;
              color: @color;
              .des {
                flex: 0 0 22px;
              }
            }
            .ticket {
              float: right;
              border: 1px solid #52B0EB;
              color: #52B0EB;
              padding: 4px 8px;
              margin: 5px 5px 0 0;
              border-radius: 4px;
              font-size: 15px;
              &.isRed {
                border: 1px solid #E54847;
                color: #E54847;
              }
            }
          }
        }
      }
    }
  }
</style>

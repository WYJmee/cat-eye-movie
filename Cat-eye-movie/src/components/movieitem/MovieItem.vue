<template>
  <div class="jump" v-show="showOrHidden">
    <div class="error" v-show="item.length==0">
    <div class="header">
      <span class="back" @click="saveShow(true)"></span>
    </div>
      Sorry!暂无此电影的详情数据
      <img src="../../common/img/error.jpeg" />
    </div>
    <div  v-if="item.length>0">
    <div class="header">
      <span class="back" @click="saveShow(true)"></span>
      <div class="name">
        <span class="nm">{{item[0].movie.nm}}</span>
        <span class="enm">{{item[0].movie.enm}}</span>
      </div>
      <span class="share">分享</span>
    </div>
    <div class="content">
      <div class="movieInformation">
        <div><a :href="item[0].movie.videourl"><img :src="item[0].movie.img"/></a></div>
        <div class="information">
          <div class="wish" v-show="!item[0].movie.globalReleased">
            {{item[0].movie.wish}}人想看
          </div>
          <div class="stars" v-if="item[0].movie.globalReleased">
            <div class="isNo" v-show="!item[0].movie.sc">暂无星级</div>
            <div class="score" v-show="item[0].movie.sc">
              <span
                :class="item[0].movie.sc/2>=1?'star-full':item[0].movie.sc/2>=0&item[0].movie.sc%2>=1.5?'star-half':'star-empty'"></span>
              <span
                :class="item[0].movie.sc/2>=2?'star-full':item[0].movie.sc/2>=1&item[0].movie.sc%2>=1.5?'star-half':'star-empty'"></span>
              <span
                :class="item[0].movie.sc/2>=3?'star-full':item[0].movie.sc/2>=2&item[0].movie.sc%2>=1.5?'star-half':'star-empty'"></span>
              <span
                :class="item[0].movie.sc/2>=4?'star-full':item[0].movie.sc/2>=3&item[0].movie.sc%2>=1.5?'star-half':'star-empty'"></span>
              <span
                :class="item[0].movie.sc/2>=5?'star-full':item[0].movie.sc/2>=4&item[0].movie.sc%2>=1.5?'star-half':'star-empty'"></span>
              <span class="nub" v-if="item[0].movie.sc>0">{{item[0].movie.sc}}</span>
            </div>
            <div class="comment">({{item[0].movie.snum}}人评分)</div>
          </div>
          <span class="details">{{item[0].movie.cat}}</span>
          <span class="details">{{item[0].movie.fra?item[0].movie.fra:'未知'}}/{{item[0].movie.dur}}分钟</span>
          <span class="details">{{item[0].movie.pubDesc}}></span>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="container">
        <div class="dra">
          <button>立即购票</button>
          <div class="message" :class="{'changeHeight':changeHeight}"><p>{{item[0].movie.dra}}</p></div>
          <div class="bottom" @click="change">{{changeHeight ? '∧' : '∨'}}</div>
          <div class="photos">
            <ul>
              <li v-for="(img,index) in item[0].movie.photos"><img :src="img"/><span
                v-if="index==4">{{item[0].movie.pn}}张>></span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="performer">
        <div class="movies" ref="imgWrapper">
          <ul :class="'length-'+(item[0].actors.length+item[0].directors.length)">
            <li v-for="items in item[0].directors">
              <img :src="items.avatar"/>
              <span class="performerAvatar">{{items.cnm}}</span>
              <span class="director">导演</span>
            </li>
            <li v-for="items in item[0].actors">
              <img :src="items.avatar"/>
              <span class="performerName">{{items.cnm}}</span>
              <span class="role">{{items.enm}}</span>
            </li>
          </ul>
        </div>
        <div class="all">
          <span>全体演职人员</span>
          <span>＞</span>
        </div>
      </div>
      <div class="comment">
        <div class="hotCom">
          <span>热门影评</span>
          <span>发影评</span>
        </div>
        <div class="comMessage">
          <div>
            <div class="time">{{item[0].hcmts[0].time}}</div>
            <div class="critic">{{item[0].hcmts[0].content}}</div>
            <div class="user">
              <span><img :src="item[0].hcmts[0].avatarurl"/></span>
              <span>{{item[0].hcmts[0].nickName}}</span>
            </div>
          </div>
        </div>
        <div class="comMessage">
          <div>
            <div class="time">{{item[0].hcmts[1].time}}</div>
            <div class="critic">{{item[0].hcmts[1].content}}</div>
            <div class="user">
              <span><img :src="item[0].hcmts[1].avatarurl"/></span>
              <span>{{item[0].hcmts[1].nickName}}</span>
            </div>
          </div>
        </div>
        <div class="comMessage">
          <div>
            <div class="time">{{item[0].hcmts[2].time}}</div>
            <div class="critic">{{item[0].hcmts[2].content}}</div>
            <div class="user">
              <span><img :src="item[0].hcmts[2].avatarurl"/></span>
              <span>{{item[0].hcmts[2].nickName}}</span>
            </div>
          </div>
        </div>
        <div class="allCom">查看更多影评</div>
      </div>
    </div>
    <div class="more">
      <div>更多相关电影</div>
      <div class="movie" ref="moreScroll">
        <ul :class="'length-'+(moreMovies.length-1)">
          <li v-if="moreMovies.length>0" v-for="item in moreMovies">
            <img :src="item.img"/>
            <span>{{item.title}}</span>
          </li>
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
      return {
        changeHeight: false,
        item: [],
        moreMovies: []
      }
    },
    props: {
      movieId: {
        type: Number
      },
      movieData: {
        type: Array
      },
      showOrHidden: {
        type: Boolean
      }
    },
    created(){
      let self = this
      this.$ajax.get('/api/data')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.moreMovies = response.data.moreMovies
          }
        })
        .catch((error) => {
          alert(error)
        })
      if (this.movieId) {
        this.$nextTick(() => {
          for (let i = 0; i < this.movieData.length; i++) {
            if (this.movieData[i].id == this.movieId) {
              console.log(this.movieData[i],this.movieId)
              this.item.push(this.movieData[i])
            }
          }
          console.log(this.item.length)
        })
      }
    },
    updated(){
      if(this.showOrHidden){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
      if (this.item.length > 0) {
        this.$nextTick(() => {
          if (!this.imgscroll) {
            this.imgscroll = new IScroll(this.$refs.moreScroll, {
              eventPassthrough: true,
              scrollX: true,
            })
          } else {
            this.imgscroll.refresh()
          }
          if (!this.scroll) {
            this.scroll = new IScroll(this.$refs.imgWrapper, {
              eventPassthrough: true,
              scrollX: true,
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    methods: {
      ...mapActions(['saveShow']),
      change: function () {
        if (this.changeHeight) {
          this.changeHeight = false
        } else {
          this.changeHeight = true
        }
      }
    },
    watch:{
      showOrHidden(val){
        if(val==false){
            this.item=[]
        }
      },
      movieId(val){
          for (let i = 0; i < this.movieData.length; i++) {
            if (this.movieData[i].id == val) {
              console.log(this.movieData[i], val)
              this.item.push(this.movieData[i])
            }
          }
      }
    }
  }

</script>

<style lang="less">
  .loop(100);
  .loop(@counter) when (@counter > 0) {
    .loop((@counter - 1));
    .length-@{counter} {
      width: ((@width+8) * (@counter));
      height: 100%;
    }
  }

  @width: 65px;
  .jump {
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    background-color: #f4f4f4;
    z-index: 10;
    .error{
      width: 100%;
      img{
        margin-top: 10px;
        width: 100%;
        border-bottom: none;
      }
    }
    .header {
      display: flex;
      width: 100%;
      height: 55px;
      background-color: #E54847;
      color: white;
      .back {
        flex: 1;
      }
      .name {
        flex: 5;
        display: flex;
        flex-direction: column;
        height: 35px;
        margin: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        span {
          flex: 1;
          height: 50%;
          line-height: 17.5px;
          text-align: center;
          &.nm {
            font-size: 14px;
          }
          &.enm {
            font-size: 12px;
          }
        }
      }
      .share {
        flex: 1;
        line-height: 55px;
        text-align: center;
        font-size: 14px;
      }

      .back::after {
        content: '';
        top: 16px;
        left: 12px;
        width: 12px;
        height: 13px;
        position: absolute;
        border: 2px solid #FFF;
        border-width: 0 0 2px 2px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    .content {
      box-sizing: border-box;
      position: relative;
      height: 160px;
      width: 100%;
      padding: 10px 0 0 10px;
      background-color: rgba(126, 136, 137, 0.4);
      .movieInformation {
        display: flex;
        width: 100%;
        height: 140px;
        img {
          flex: 0 0 100px;
          display: inline-block;
          height: 140px;
        }
        .information {
          flex: 1;
          margin-left: 15px;
          height: 110px;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          color: white;
          .wish {
            flex: 2;
            text-align: left;
            font-size: 16px;
            line-height: 44px;
            color: #FFD97F;
            font-weight: bold;
          }
          .stars {
            flex: 2;
            display: flex;
            flex-direction: column;
            .isNo{
              height: 22px;
              line-height: 22px;
            }
            .score {
              height: 22px;
              .nub {
                vertical-align: top;
                line-height: 15px;
                font-weight: bold;
                font-size: 15px;
                color: #FFD97F;
              }
              .star-full {
                background-image: url("../../common/img/star-full-new.png");
                background-size: 15px;
                background-repeat: no-repeat;
              }
              .star-empty {
                background-image: url("../../common/img/star-empty-new.png");
                background-size: 15px;
                background-repeat: no-repeat;
              }
              .star-half {
                background-image: url("../../common/img/star-half-new.png");
                background-size: 15px;
                background-repeat: no-repeat;
              }
              span {
                display: inline-block;
                width: 15px;
                height: 15px;
              }
            }
            .comment {
              height: 22px;
            }
          }
          .details {
            flex: 1;
            line-height: 22px;
          }
        }
      }
    }
    .box {
      background-color: #f4f4f4;
      .container {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 10px;
        background-color: white;
        .dra {
          width: 100%;
          color: #555;
          button {
            height: 35px;
            width: 100%;
            border-radius: 5px;
            border: none;
            color: white;
            background: #E70000;
            margin-bottom: 10px;
          }
          .message {
            overflow: hidden;
            height: 45px;
            width: 100%;
            p {
              width: 100%;
              font-size: 15px;
            }
          }
          .changeHeight {
            height: auto;
          }
          .bottom {
            text-align: center;
            height: 15px;
            line-height: 15px;
            padding: 5px 0;
            color: red;
            width: 100%;
          }
          .photos {
            width: 100%;
            height: 45px;
            margin-top: 5px;
            ul {
              height: 45px;
              width: 100%;
              overflow: hidden;
              li:nth-of-type(5) {
                img {
                  display: none;
                }
                span {
                  display: inline-block;
                  margin-left: 10px;
                  line-height: 45px;
                  text-align: center;
                  height: 100%;
                  width: 100%;
                  color: white;
                  font-size: 13px;
                }
                background-color: rgba(79, 82, 83, 0.9);
              }
              li {
                box-sizing: border-box;
                padding-right: 8px;
                float: left;
                width: 20%;
                height: 45px;
                img {
                  width: 100%;
                  height: 45px;
                }
              }
            }
          }
        }
      }
      /*.ticket{*/
      /*margin-top: 10px;*/
      /*width: 100%;*/
      /*height: 50px;*/
      /*background-color: white;*/
      /*}*/
      .performer {
        width: 100%;
        height: 180px;
        text-align: center;
        font-size: 14px;
        margin-top: 15px;
        background: white;
        .movies {
          box-sizing: border-box;
          overflow: hidden;
          padding: 10px 0 10px 10px;
          height: 150px;
          width: 100%;
          li {
            display: flex;
            flex-direction: column;
            float: left;
            width: @width;
            height: 130px;
            margin-right: 8px;
            img {
              display: inline-block;
              width: 100%;
              height: 90px;
            }
            span:last-of-type {
              color: #A3A3A3;
            }
            span {
              height: 20px;
              line-height: 20px;
              text-align: center;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .role {
            font-size: 12px;
          }
        }
        .all {
          border-top: 1px solid #E5E5E5;
          height: 30px;
          width: 100%;
          span {
            height: 100%;
            line-height: 30px;
            color: #a3a3a3;
          }
          span:first-of-type {
            margin-left: 10px;
            float: left;
          }
          span:last-of-type {
            margin-right: 10px;
            float: right;
          }
        }
      }
      .comment {
        width: 100%;
        margin-top: 10px;
        background: white;
        .hotCom {
          height: 30px;
          width: 100%;
          font-size: 13px;
          border-bottom: 1px solid #E5E5E5;
          span:first-of-type {
            height: 100%;
            float: left;
            margin-left: 10px;
            line-height: 30px;
            color: #a3a3a3;
          }
          span:last-of-type {
            width: 50px;
            height: 18px;
            line-height: 20px;
            text-align: center;
            float: right;
            margin: 5px 10px;
            border: 1px solid red;
            color: red;
            border-radius: 8px;
          }
        }
        .comMessage {
          width: 100%;
          box-sizing: border-box;
          padding: 10px;
          border-bottom: 1px solid #E5E5E5;
          div:first-of-type {
            width: 100%;
            height: 100%;
            .time {
              height: 25px;
              line-height: 25px;
              width: 100%;
              color: #a3a3a3;
            }
            .critic {
              width: 100%;
              line-height: 16px;
              font-size: 14px;
            }
            .user {
              box-sizing: border-box;
              padding: 5px 0;
              height: 30px;
              line-height: 20px;
              width: 100%;
              span:first-of-type {
                width: 20px;
                height: 100%;
                border-radius: 50%;
                img {
                  width: 20px;
                  height: 100%;
                  border-radius: 50%;
                }
              }
              span:last-of-type {
                display: inline-block;
                height: 100%;
                font-size: 13px;
                vertical-align: top;
              }
            }
          }
        }
        .allCom {
          height: 35px;
          line-height: 35px;
          text-align: center;
          color: red;
          font-size: 14px;
        }
      }

    }
    .more {
      width: 100%;
      height: 160px;
      background: white;
      margin: 10px 0 15px 0;
      div:first-of-type {
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        font-size: 13px;
        color: #a4a4a4;
        border-bottom: 1px solid #e5e5e5;
      }
      .movie {
        box-sizing: border-box;
        overflow: hidden;
        padding: 10px 8px 0;
        height: 130px;
        width: 100%;
        li {
          display: flex;
          flex-direction: column;
          float: left;
          width: 65px;
          height: 120px;
          margin-right: 8px;
          img {
            display: inline-block;
            width: 100%;
            height: 90px;
          }
          span {
            height: 30px;
            line-height: 15px;
            text-align: left;
            font-size: 13px;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>

<template>
  <div id="app">
    <movieitem v-if="movieData.item&&movieId" :showOrHidden="!showOrHidden" :movieId="movieId" :movieData="movieData.item"></movieitem>
    <div v-show="showOrHidden">
    <v-header></v-header>
    <div class="nav">
      <div class="center">
        <div class="item">
          <router-link to="/hot">热映</router-link>
        </div>
        <div class="item">
          <router-link to="/wait">待映</router-link>
        </div>
        <div class="item">
          <router-link to="/billboard">榜单</router-link>
        </div>
      </div>
      <div class="search">
        <router-link to="/search"><img src="./common/img/search.png" /></router-link>
      </div>
    </div>
    <router-view :movieData="movieData" ></router-view>
    </div>
  </div>
</template>

<script>
  import movieitem from "./components/movieitem/MovieItem.vue"
  import Header from "./components/header/Header"
  import {mapState, mapGetters} from "vuex"
  export default {
    name: 'app',
    data(){
      return {
        movieData: {
          type: Object
        }
      }
    },
    computed: {
      movieId(){
        return this.$store.state.movieitem.movieId
      },
      showOrHidden(){
          return this.$store.state.movieitem.showOrHidden
      }
    },
    created() {
      let self = this
      this.$ajax.get('/api/data')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            self.movieData = response.data
            console.log(self.movieData,self.movieId)
          }
        })
        .catch((error) => {
          alert(error)
        })
    },
    components: {
      'v-header': Header,
      movieitem
    }
  }
</script>

<style lang="less" scoped>
  #app {
    position: relative;
    .nav {
      position: fixed;
      width: 100%;
      left: 50%;
      margin-left: -65px;
      top: 20px;
      height: 25px;
      width: 130px;
      border-radius: 5px;
      background-color: rgba(7, 17, 27, 0.1);
      z-index: 10;
      .center{
        display: flex;
        .item {
          width: 100%;
          flex: 1;
          line-height: 25px;
          font-size: 15px;
          text-align: center;
          & > a {
            display: block;
            border-radius: 5px;
            width: 100%;
            &.active {
              background-color: white;
              color: #E54847;
            }
          }
        }
      }
      .search{
        position: fixed;
        top: 20px;
        right: 20px;
        height: 25px;
        width: 25px;
        line-height: 25px;
        font-size: 15px;
        float: right;
        img{
          display: block;
          height: 23px;
          width: 25px;
        }
      }
    }
  }
</style>

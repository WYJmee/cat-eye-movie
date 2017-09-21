<template>
  <div class="search">
    <div>
      <input type="text" placeholder="输入电影名" ref="val"/>
      <span @click="search">搜索</span>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex"
  export default{
    data: function () {
      return {
        movieData: []
      }
    },
    methods: {
      ...mapActions(['saveItem', 'saveShow']),
      search: function () {
        let str = this.$refs.val.value
        let reg = new RegExp(str)
        for (let i = 0; i < this.movieData.length; i++) {
          if (reg.test(this.movieData[i].movie.nm)) {
            this.saveItem(this.movieData[i].movie)
            this.saveShow(false)
          }
        }
        this.$refs.val.value = ""
      }
    },
    created(){
      let self = this
      this.$ajax.get('/api/data')
        .then((response) => {
          response = response.data
          if (response.error === 0) {
            this.movieData = response.data.item
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
</script>

<style lang="less">
  .search {
    position: relative;
    top: 55px;
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    div:first-of-type {
      width: 100%;
      height: 30px;
      input {
        width: 80%;
        height: 20px;
        border-radius: 10px;
        border-color: red;
        padding-left: 5px;
        outline: medium;
      }
      span {
        vertical-align: middle;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>

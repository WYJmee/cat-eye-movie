<template>
  <div class="header">
    <div class="nav">
      <div class="region">
        <span>广州</span>
      </div>
      <!--<div class="search">-->
        <!--<span class="icon-search"></span>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default{
    data: function () {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/base";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background-color: #E54847;
    z-index: 9;
    .nav {
      position: relative;
      top: 20px;
      height: 30px;
      .region {
        display: block;
        position: absolute;
        top: 7px;
        left: 15px;
        font-size: 15px;
        height: 20px;
        color: white;
        &::after {
          content: '';
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 4px;
          border-width: 5px;
          border-color: #fff transparent transparent;
          border-style: solid;
          font-size: 0;
          vertical-align: -2px;
        }
      }
      /*.search {*/
        /*position: absolute;*/
        /*top: 5px;*/
        /*right: 20px;*/
        /*.icon-search {*/
          /*display: block;*/
          /*height: 25px;*/
          /*width: 25px;*/
          /*background-image: url("../../common/img/search.png");*/
          /*background-size: 25px;*/
          /*background-repeat: no-repeat;*/
        /*}*/
      /*}*/
    }
  }
</style>

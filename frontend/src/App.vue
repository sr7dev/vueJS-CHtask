<template>
  <div id="app">
    <router-view :key="$route.fullPath" ></router-view>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return {
                msg : 'hello everyBody!'
            }
        }
    }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
#app {
  width: 100%;
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f5f6fa;
}
  .container{
    padding: 20px;
    box-sizing: border-box;
  }
  .title .el-breadcrumb{
    font-size: 20px;
    margin-bottom: 30px;
  }
  .title .el-breadcrumb .actived .el-breadcrumb__inner{
    color: #5d9ad1;
  }
  .box{
    background: #fff;
    box-shadow: 5px 5px 5px #ccc;
    padding: 25px 40px;
    box-sizing: border-box;
  }
  .el-table th.is-leaf{
    background: #ecf5fc;
    color: #333;
    height: 70px;
    font-size: 20px;
  }
  .el-table td{
    height: 60px;
  }
  .iptBox{
    margin-bottom: 35px;
    text-align: left;
  }
  .pageBox{
    margin-top: 30px;
    text-align: right;
  }
  .select_label{
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
    margin: 0 20px 0 30px;
  }
</style>

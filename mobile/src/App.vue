<template>
  <div id="app">
    <router-view :key="$route.fullPath + new Date()"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {

}
.mint-search{
  height: 3.3rem;
}
/*头部样式*/
.mint-header{
  height: 3rem;
  background-color:#26a2ff ;
}
/*按钮样式*/
.mint-button--primary{
  background-color: #2391f7;
  width: 95%;
  margin: 0 auto;
  border-radius:25px;
}
  .header{
    margin-top: 2.5rem;
  }
  ul li{
    list-style-type:none;
  }
  /*顶部返回按钮*/
.mint-button-icon{
  margin-top: -0.1rem;
  }
</style>

<template>
    <el-container>
            <el-header>
              <top></top>
            </el-header>
        <el-container>
            <el-aside style="width:200px; background: #fff"><!-- 左侧菜单 --><!--:style="{height:global.navMenuHeight+'px'}" style="background: #ccc"-->
              <navBar></navBar>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import top from '@/components/common/top'
    import navBar from '@/components/common/navBar'
    export default {
        data(){
            return{

            }
        },
        //引用组件
        components: {
            top: top,
            navBar: navBar
        }
    }
</script>

<style scoped>
    .el-header{background: #253032; height: 80px!important;padding:0}
    .el-container{ height: 100%}
    .el-main{height: calc(100vh - 80px);overflow: auto;}
    .el-menu{border: 0}
    .el-container{min-width: 1200px;overflow: auto}


</style>

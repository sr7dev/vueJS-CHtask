<template>
    <el-row class="tac" style="margin-top: 50px">
        <el-col :span="24">
<!--            <el-menu-->
<!--                    class="el-menu-vertical-demo"-->
<!--                    router-->
<!--                    unique-opened-->
<!--                    @select="handleSelect"-->
<!--                    background-color="#424242"-->
<!--                    text-color="#fff"-->
<!--                    active-text-color="#ffd04b"-->
<!--                    :default-openeds="openeds"-->
<!--            >-->
<!--                &lt;!&ndash;        <el-menu-item v-for="(item,index) in menu" :index="String(item.routerUrl)" :key="(index+1).toString()" :class="activeMenu==item.routerUrl?'active':''">&ndash;&gt;-->
<!--                <el-menu-item v-for="(item,index) in menu" :index="String(item.routerUrl)" :key="(index+1).toString()"  :class="activeMenu==item.routerUrl?'active':''">-->
<!--                    <router-link :to="{path:item.routerUrl}">{{item.menuName}}</router-link>-->
<!--                </el-menu-item>-->
<!--            </el-menu>-->
            <el-menu
                    outer
                    :default-active="$route.fullPath                          "
                    class="el-menu-vertical-demo"
                    background-color="#fff"
                    text-color="#333"
                    active-text-color="#4787c7">
                <el-submenu index="/">
                    <template slot="title">
                        <span>监管对象</span>
                    </template>
                    <el-menu-item-group >
                        <el-menu-item index="/productionSubject">生产主体</el-menu-item>
                        <el-menu-item index="/businessProducts" >经营主体</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/">
                    <span slot="title">企业信用档案</span>
                </el-menu-item>
                <el-menu-item index="/creditRating">
                    <span slot="title">信用评级</span>
                </el-menu-item>
                <el-menu-item index="/">
                    <span slot="title">红黑名单</span>
                </el-menu-item>
                <el-menu-item index="/threeProductsCertification">
                    <span slot="title">三品一标管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data(){
            return {
                menu:[
                    {
                        menuName:"微信扫码",
                        routerUrl:"productionSubject"
                    }
                ],
                openeds:[1],
                activeMenu:""
            }
        },
        methods: {
            handleSelect(key, keyPath){
                let that=this
                // that.SET_ACTIVEMENU(key)
                /*防止刷新后拿不到对应显示的栏目*/
                sessionStorage.setItem("activeMenu",key)
            },
        }
    }
</script>

<style scoped>
    ul li{list-style: none}
    .el-menu-item-group__title{display:none!important;}
    .el-menu-item a{display: block;color: #fff;text-decoration: none;}
    .tac .active{ background: #919d9d!important;}
</style>

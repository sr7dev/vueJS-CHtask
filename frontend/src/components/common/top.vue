<template>
    <div class="xyh_top">
        <div class="changshu_left">
            <img src="../../assets/images/logo.jpg" alt="" >
        </div>
        <h2>
            <div class="quit">
                <span style="padding-right: 20px">
                    <img src="../../assets/images/head.png" alt="">admin</span>
                <span @click="quit()">
                    <img src="../../assets/images/quit.png" alt="">
                    退出
                </span>
            </div>
        </h2>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        data () {
            return {
                title: '平台',
                userName:""
            }
        },
        methods: {
            quit:function(){
                let that=this
                that.$confirm('确定要退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            }
        },
        components: {},
    }
</script>

<style scoped>
    .changshu_left{width:200px; background: #253032; height: 80px;float:left}
    .xyh_top h2{text-align: left;font-weight: normal; padding:0 0 0 260px;margin:0; line-height: 80px;color:#fff; position:relative}
    .quit{position: relative; height: 60px;float:right;color:#fff;font-size: 16px;text-align: center}
    .quit span{padding: 0 60px 0 20px;margin-left: 20px; line-height:80px;display:inline-block}
    .quit span img{position: relative;top: 4px;margin-right: 8px}
    .quit span:hover{ background: #424242;cursor: pointer}
    .xyh_top{position: relative}
    .changshu_left img{position: absolute;top: 0;left:0;z-index: 100;width:310px;}
</style>

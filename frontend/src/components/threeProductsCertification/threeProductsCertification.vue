<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">监管对象</el-breadcrumb-item>
                <el-breadcrumb-item class="actived">三品认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
            <div class="iptBox">
                <el-button style="background:#00b282;color: #fff;">梅李镇和和合稻米专业合作社</el-button>
                <div class="select_label">分类</div>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">认证类别</div>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" plain style="margin-left: 20px;" @click="goAdd()">添加认证</el-button>
            </div>

            <el-container>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-class-name="rowIndex">
                    <el-table-column
                        :formatter="order"
                        label="序号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="产品">
                    </el-table-column>
                    <el-table-column
                        prop="classification"
                        label="分类">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="认证类型">
                    </el-table-column>
                    <el-table-column
                        prop="bookNo"
                        label="证书编号">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="证书有效期">
                    </el-table-column>
                    <el-table-column
                            prop="limitedPeriod"
                            label="有效时间">
                    </el-table-column>
                    <el-table-column
                            prop="yield"
                            label="产量">
                    </el-table-column>
                </el-table>
            </el-container>
            <div class="pageBox">
                <el-pagination
                        v-if="total>page.pageSize"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.pageIndex"
                        :page-sizes="[10, 20, 50]"
                        :page-size="page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                page:{
                    pageIndex: 1,
                    pageSize: 10
                },
                total:100,
                options:[
                    {
                        value:'全部',
                        label:''
                    }
                ],
                tableData: [
                    {
                        name: '产品',
                        classification: '分类',
                        type: '认证类型',
                        bookNo:'123456',
                        date:'2018-09-01至2020-05-01',
                        limitedPeriod:'1年',
                        yield:'600'
                    },
                    {
                        name: '产品',
                        classification: '分类',
                        type: '认证类型',
                        bookNo:'123456',
                        date:'2018-09-01至2020-05-01',
                        limitedPeriod:'1年',
                        yield:'600'
                    },
                    {
                        name: '产品',
                        classification: '分类',
                        type: '认证类型',
                        bookNo:'123456',
                        date:'2018-09-01至2020-05-01',
                        limitedPeriod:'1年',
                        yield:'600'
                    },
                    {
                        name: '产品',
                        classification: '分类',
                        type: '认证类型',
                        bookNo:'123456',
                        date:'2018-09-01至2020-05-01',
                        limitedPeriod:'1年',
                        yield:'600'
                    }
                ]
            }
        },
        methods:{
            rowIndex({row, rowIndex}) {
                row.rowIndex = rowIndex;
            },
            order(row) {
                return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
            },
            //分页数量改变
            handleSizeChange(val){
                let that=this
                that.page.pageSize=val;
                that.fullPage(1);
            },
            //分页索引改变
            handleCurrentChange(val){
                let that=this
                that.page.pageIndex=val
                that.fullPage(1)
            },
            //跳转添加
            goAdd(){
                this.$router.push({path: 'addThreeProducts'})
            }
        }
    }
</script>

<style scoped>

</style>
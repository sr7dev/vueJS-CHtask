<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator=" ">
                <el-breadcrumb-item :to="{ path: '/' }">监管记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
            <div class="iptBox">
                <el-button type="primary" plain style="margin-left: 20px;" @click="goAdd()" >添加监管记录</el-button>
                <el-button type="primary" plain style="margin-left: 20px;" @click="goAdd()">常用语管理</el-button>
                <el-button type="primary" plain style="margin-left: 20px;" @click="goAdd()" icon="el-icon-download">扫码下载客户端</el-button>
                <el-button type="primary" plain style="margin-left: 20px;" @click="goAdd()" icon="el-icon-download">说明书下载</el-button>
                <el-button type="primary" plain style="margin-left: 20px;" @click="goAdd()" >返回</el-button>
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
                            label="日期">
                    </el-table-column>
                    <el-table-column
                            prop="classification"
                            label="乡镇">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="受检单位">
                    </el-table-column>
                    <el-table-column
                            prop="bookNo"
                            label="检查人">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="结论">
                    </el-table-column>
                    <el-table-column
                            prop="limitedPeriod"
                            label="其他">
                    </el-table-column>
                    <el-table-column
                            prop="yield"
                            label="照片数量">
                    </el-table-column>
                    <el-table-column
                            prop="yield"
                            label="确认">
                    </el-table-column>
                    <el-table-column
                            prop="yield"
                            label="专利1"
                            align="center">
                        <template>
                            <icon class="el-icon-check"></icon>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="yield"
                        label="操作">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="详情" placement="top">
                                <el-button icon="el-icon-search" circle></el-button>
                            </el-tooltip>
                            <el-tooltip v-if="scope.row.record==true" class="item" effect="dark" content="整改记录" placement="top">
                                <el-button icon="el-icon-document" circle></el-button>
                            </el-tooltip>
                            <el-tooltip v-else class="item" effect="dark" content="整改详情" placement="top">
                                <el-button icon="el-icon-s-order" circle></el-button>
                            </el-tooltip>
                        </template>
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
                        yield:'600',
                        record:true
                    },
                    {
                        name: '产品',
                        classification: '分类',
                        type: '认证类型',
                        bookNo:'123456',
                        date:'2018-09-01至2020-05-01',
                        limitedPeriod:'1年',
                        yield:'600',
                        record:false
                    },
                    {
                        name: '产品',
                        classification: '分类',
                        type: '认证类型',
                        bookNo:'123456',
                        date:'2018-09-01至2020-05-01',
                        limitedPeriod:'1年',
                        yield:'600',
                        record:false
                    },
                    {
                        name: '产品',
                        classification: '分类',
                        type: '认证类型',
                        bookNo:'123456',
                        date:'2018-09-01至2020-05-01',
                        limitedPeriod:'1年',
                        yield:'600',
                        record:true
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
            goAdd(){
                this.$router.push({path: 'addRegulatoryRecord'})
            },
        }
    }
</script>

<style scoped>

</style>
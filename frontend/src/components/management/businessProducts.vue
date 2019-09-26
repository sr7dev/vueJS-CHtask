<template>
        <div class="container">
            <div class="title">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">经营主体</el-breadcrumb-item>
                    <el-breadcrumb-item>经营产品</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="box">
                <div class="iptBox">
                    <el-button>返回</el-button>
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
                                label="产品名称">
                        </el-table-column>
                        <el-table-column
                                prop="classification"
                                label="单价">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="产地">
                        </el-table-column>
                        <el-table-column
                                prop="bookNo"
                                label="品种">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="规格">
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

<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">经营主体</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
            <div class="iptBox">
                <div class="select_label">产品</div>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">企业规模</div>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
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
                            label="企业名称">
                    </el-table-column>
                    <el-table-column
                            prop="classification"
                            label="企业规模">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="产品类型">
                    </el-table-column>
                    <el-table-column
                            prop="bookNo"
                            label="法定代表人">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="企业地址">
                    </el-table-column>
                    <el-table-column
                            prop="limitedPeriod"
                            label="社会信用统一代码">
                    </el-table-column>
                    <el-table-column
                            prop="yield"
                            label="联系方式">
                    </el-table-column>
                    <el-table-column
                            prop="yield"
                            label="监管对象性质">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <el-tooltip class="item" effect="dark" content="企业详情" placement="top">
                            <el-button icon="el-icon-search" circle></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="经营产品"  placement="top">
                            <el-button icon="el-icon-goods" circle @click="goBussinessProducts"></el-button>
                        </el-tooltip>
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
            //去经营产品
            goBussinessProducts(){
                this.$router.push({path: 'businessProducts'})
            }
        }
    }
</script>

<style scoped>

</style>
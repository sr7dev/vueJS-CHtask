<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">监管对象</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="box">
            <div class="iptBox">
                <div class="select_label">乡镇</div>
                <el-select v-model="value" placeholder="请选择" style="width: 150px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">类型</div>
                <template>
                    <el-radio v-model="radio" label="1">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                </template>
                <div class="select_label">行业</div>
                <el-select v-model="value" placeholder="请选择" style="width: 150px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">三品认证</div>
                <el-select v-model="value" placeholder="请选择" style="width: 150px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">监管记录</div>
                <el-select v-model="value" placeholder="请选择" style="width: 150px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">农业监测</div>
                <el-select v-model="value" placeholder="请选择" style="width: 150px;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" plain style="margin-left: 20px;" @click="goAdd()">添加监管对象</el-button>
                <div class="allCompany">共计20家企业</div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="rowIndex">
                <el-table-column
                        :formatter="order"
                        label="序号">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="企业名称">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="法人代表">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="企业地址">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="三品认证">
                    <template>
                        <el-button>认证信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="监管记录">
                    <template>
                        <el-button>是</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="农药检测">
                    <template>
                        <el-button>认证信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="联系人">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="联系方式">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="所在乡镇">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="企业诚信">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作">
                    <template>
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <el-button icon="el-icon-edit" circle></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="产品" placement="top">
                            <el-button icon="el-icon-warning-outline" circle></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="仓储环境" placement="top">
                            <el-button icon="el-icon-office-building" circle></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="详情" placement="top">
                            <el-button icon="el-icon-search" circle></el-button>
                        </el-tooltip>



                    </template>

                </el-table-column>
            </el-table>
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
                radio: '1',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
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
        }
    }
</script>

<style scoped>
    .allCompany{
        display: inline-block;
        line-height: 40px;
        margin: 0 20px;
    }
</style>

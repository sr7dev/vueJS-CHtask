<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator=" ">
                <el-breadcrumb-item>红黑名单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs v-model="activeTabName" type="border-card" @tab-click="handleTabClick">
            <el-tab-pane label="红名单" name="first"></el-tab-pane>
            <el-tab-pane label="红名单" name="second"></el-tab-pane>
            <div>
                <label
                        style="margin-right: 30px">乡镇</label>
                <el-select v-model="vtValue" placeholder="Select">
                    <el-option
                            v-for="item in villageTown"
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
                            prop="companyName"
                            label="企业名称">
                    </el-table-column>
                    <el-table-column
                            prop="currentCreditRating"
                            label="现信用评级">
                    </el-table-column>
                    <el-table-column
                            prop="ratingTime"
                            label="评级时间">
                    </el-table-column>
                    <el-table-column
                            prop="ratingUnit"
                            label="评级单位">
                    </el-table-column>
                </el-table>
            </el-container>
            <div class="pageBox">
                <pagination v-show="total>0" :total="total" :page.sync="page.pageIndex" 
                    :limit.sync="page.pageSize" @pagination="getList" />
            </div>
        </el-tabs>
    </div>
</template>

<script>
    import Pagination from '@/components/common/pagination'
    export default {
        components: { Pagination },
        data(){
            return{
                listLoading: true,
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
                activeTabName: 'first',
                villageTown: [{
                    value: '全部',
                    label: '全部'
                }, {
                    value: '梅李镇',
                    label: '梅李镇'
                }, {
                    value: '古里镇',
                    label: '古里镇'
                }],
                vtValue: '全部',
                tableData: [
                    {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    },
                    {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    },
                    {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    },
                    {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    }, {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    },
                    {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    }, {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    }, {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    },
                    {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    }, {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    },
                ]
            }
        },
        created() {
            this.getList();
        },
        methods:{
            getList() {
            this.listLoading = true;
            // fetchListAPI(this.status, this.page.pageIndex, this.page.pageSize, "credit_gradeid")
            //   .then(response => {
                // this.tableData = sampleData;  // this.tableData = response;  
                this.total = this.tableData.length;
                setTimeout(() => {
                    this.listLoading = false
                }, 0.5 * 1000);
            // })
            },
            handleTabClick() {
                if (this.activeTabName == 'first') {
                    this.tableData = [
                        {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        }, {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        }, {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        }, {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        }, {
                            companyName: '产品',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                    ]
                }
                else {
                    this.tableData = [
                        {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        }, {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        }, {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        }, {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                        {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        }, {
                            companyName: '产品1',
                            currentCreditRating: '分类',
                            ratingTime: '2018-09-01至2020-05-01',
                            ratingUnit:'123456'
                        },
                    ]
                }
            },
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
                this.$router.push({path: 'addRedBlackList'})
            },
        }
    }
</script>

<style scoped>
</style>
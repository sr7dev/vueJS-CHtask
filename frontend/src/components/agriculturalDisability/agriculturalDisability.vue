<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator=" ">
                <el-breadcrumb-item>农残检测</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <div class="iptBox">
                <div class="select_label">乡镇</div>
                <el-select v-model="villageTownValue" placeholder="全部" style="width: 150px;">
                    <el-option
                            v-for="item in villageTown"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            size="large">
                    </el-option>
                </el-select>
                <div class="select_label">项目</div>
                <el-select v-model="projectsValue" placeholder="全部" style="width: 150px;">
                    <el-option
                            v-for="item in projects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">样品</div>
                <el-select v-model="samplesValue" placeholder="全部" style="width: 150px;">
                    <el-option
                            v-for="item in samples"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">定性</div>
                <el-select v-model="qualitativesValue" placeholder="全部" style="width: 150px;">
                    <el-option
                            v-for="item in qualitatives"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">检测单位</div>
                <el-select v-model="detectionUnitValue" placeholder="全部" style="width: 150px;">
                    <el-option
                            v-for="item in detectionUnit"
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
                villageTownValue: '',
                projects: [{
                    value: '全部',
                    label: '全部'
                }, {
                    value: '农药残留',
                    label: '农药残留'
                }, {
                    value: '甲醛',
                    label: '甲醛'
                }],
                projectsValue: '',
                samples: [{
                    value: '全部',
                    label: '全部'
                }, {
                    value: '梅李镇',
                    label: '梅李镇'
                }, {
                    value: '古里镇',
                    label: '古里镇'
                }],
                samplesValue: '',
                qualitatives: [{
                    value: '全部',
                    label: '全部'
                }, {
                    value: '种植',
                    label: '种植'
                }, {
                    value: '养殖',
                    label: '养殖'
                }],
                qualitativesValue: '',
                detectionUnit: [{
                    value: '全部',
                    label: '全部'
                }, {
                    value: '卫生局',
                    label: '卫生局'
                }, {
                    value: '品鉴局',
                    label: '品鉴局'
                }],
                detectionUnitValue: '',
                tableData: [
                    {
                        companyName: '产品',
                        currentCreditRating: '分类',
                        ratingTime: '2018-09-01至2020-05-01',
                        ratingUnit:'123456'
                    },
                ]
            }
        },
        methods:{
            handleTabClick() {
                if (this.activeTabName == 'first') {
                    this.tableData = [
                        {
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
            },
            //分页索引改变
            handleCurrentChange(val){
                let that=this
                that.page.pageIndex=val
            },
            goAdd(){
                this.$router.push({path: 'addRedBlackList'})
            },
        }
    }
</script>

<style scoped>
</style>
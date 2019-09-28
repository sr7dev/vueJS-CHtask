<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator=" ">
                <el-breadcrumb-item>农残检测</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
            <div class="iptBox">
                <div class="select_label">乡镇</div>
                <el-select v-model="currTown" placeholder="全部">
                    <el-option
                            v-for="item in township"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            size="large">
                    </el-option>
                </el-select>
                <div class="select_label">项目</div>
                <el-select v-model="projectsValue" placeholder="全部">
                    <el-option
                            v-for="item in projects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">样品</div>
                <el-select v-model="samplesValue" placeholder="全部">
                    <el-option
                            v-for="item in samples"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">定性</div>
                <el-select v-model="qualitativesValue" placeholder="全部">
                    <el-option
                            v-for="item in qualitatives"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="select_label">检测单位</div>
                <el-select v-model="detectionUnitValue" placeholder="全部">
                    <el-option
                            v-for="item in detectionUnit"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="iptBox">
                <div class="select_label">开始日期</div>
                <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="startDate"
                        style="width: 300px;"
                ></el-date-picker>
                <div class="select_label">结束日期</div>
                <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="endDate"
                        style="width: 300px;"
                ></el-date-picker>
                <el-checkbox v-model="bGreenProducts" style="margin-left: 30px">专项1:绿色优质农产品生产基地</el-checkbox>
                <el-button v-on:click="onClickExport" style="margin-left: 30px">导出表格</el-button>
                <span style="float: right">总计{{totalSize}}条检测</span>
            </div>
            <el-container>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-class-name="rowIndex">
                    <el-table-column
                            :formatter="order"
                            label="序号"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="no"
                            label="编号"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="item"
                            label="检测项目">
                    </el-table-column>
                    <el-table-column
                            prop="sample"
                            label="样品名称">
                    </el-table-column>
                    <el-table-column
                            prop="source"
                            label="来源">
                    </el-table-column>
                    <el-table-column
                            prop="resultDl"
                            label="定量结果">
                    </el-table-column>
                    <el-table-column
                            prop="resultDx"
                            label="定性结果">
                    </el-table-column>
                    <el-table-column
                            prop="detectTime"
                            label="检测时间"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="detectUnit"
                            label="检测单位"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="operator"
                            label="检验员">
                    </el-table-column>
                    <el-table-column
                            prop="particular"
                            label="专项1">
                        <template scope="scope">
                            <i v-if="scope.row.particular" class="el-icon-check"></i>
                            <i v-else></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-container>
            <div class="pageBox">
                <pagination v-show="total>0" :total="total" :page.sync="page.pageIndex"
                            :limit.sync="page.pageSize" @pagination="getList" />
            </div>
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/common/pagination';
    import Request from "../../services/api/request.js";
    export default {
        name: "disabilityCheck",
        components: { Pagination },
        data(){
            return{
                page:{
                    pageIndex: 1,
                    pageSize: 20
                },
                total:100,
                options:[
                    {
                        value:'全部',
                        label:''
                    }
                ],
                township: [{ id: 0, name: "全部" }],
                currTown: 0,
                status: 1,
                tableData: [ ],
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
                startDate: '',
                endDate: '',
                bGreenProducts: false,
                totalSize: '',
            }
        },
        created() {
            this.getTown();
            this.getList();
            // this.getCompanyProduction();
        },
        methods:{
            onClickExport() {

            },
            getTown() {
                Request()
                    .get("/api/town/all")
                    .then(response => {
                        this.township = this.township.concat(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            getList() {
                this.listLoading = true;
                Request()
                    .get("/api/disability_check/all", {
                        pageNo: this.page.pageIndex - 1,
                        pageSize: this.page.pageSize
                    })
                    .then(response => {
                        this.tableData = response;
                        this.total = this.tableData.length;
                        this.totalSize = this.total;
                        setTimeout(() => {
                            this.listLoading = false;
                        }, 0.5 * 1000);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            rowIndex({row, rowIndex}) {
                row.rowIndex = rowIndex;
            },
            order(row) {
                return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
            },
            goAdd(){
                this.$router.push({path: 'addDisabilityCheck'})
            },
        }
    }
</script>

<style scoped>
</style>
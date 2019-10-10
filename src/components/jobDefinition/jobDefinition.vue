<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="actived">
                    作业定义
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
            <div class="iptBox">
                <el-button
                    type="primary"
                    v-on:click="$router.push(`/jobDefinition/create`)"
                    plain
                >
                    添加
                </el-button>
            </div>

            <el-container>
                <el-table
                    :data="tableData"
                    v-loading="listLoading"
                    style="width: 100%"
                    :row-class-name="rowIndex"
                    highlight-current-row
                >
                    <el-table-column
                        :formatter="order"
                        label="序号"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column prop="jobName" label="作业名称">
                    </el-table-column>
                    <el-table-column prop="jobType" label="作业类型">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{ row }">
                            <el-button
                                type="success"
                                plain
                                v-on:click="handleEdit(`${row.id}`)"
                            >
                                查看
                            </el-button>
                            <el-button
                                type="danger"
                                v-on:click="handleDelete(`${row.id}`)"
                                plain
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-container>
            <div class="pageBox">
                <Pagination
                    v-show="total > 0"
                    :total="total"
                    :page.sync="page.pageIndex"
                    :limit.sync="page.pageSize"
                    @pagination="getList"
                    layout="prev, pager, next, sizes, jumper"
                />
            </div>
        </div>
    </div>
</template>
<script>
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";

export default {
    name: "jobDefinition",
    components: { Pagination },
    data() {
        return {
            jobName: "",
            jobType: 0,
            page: {
                pageIndex: 1,
                pageSize: 20
            },
            listLoading: true,
            total: 100,
            tableData: [],
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        rowIndex({ row, rowIndex }) {
            row.rowIndex = rowIndex;
        },
        getList() {
            this.listLoading = true;
            Request()
                .get("/api/job_definition/all", {
                    pageNo: this.page.pageIndex - 1,
                    pageSize: this.page.pageSize,
                })
                .then(response => {
                    this.tableData = response;
                    this.total = this.tableData.length;
                    setTimeout(() => {
                        this.listLoading = false;
                    }, 0.5 * 1000);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
};
</script>

<style lang="scss">
    @import "./jobDefinition.scss";
</style>
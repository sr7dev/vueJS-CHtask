<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator=" ">
        <el-breadcrumb-item :to="{ path: '/' }" class="actived">监管记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button type="primary" plain v-on:click="$router.push(`/regulatoryRecord/create`)">添加监管记录</el-button>
        <el-button type="primary" plain>常用语管理</el-button>
        <el-button type="primary" plain>扫码下载客户端</el-button>
        <el-button type="primary" plain>说明书下载</el-button>
      </div>

      <el-container>
        <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex" v-loading="listLoading" highlight-current-row>
          <el-table-column :formatter="order" label="序号"  width="70"></el-table-column>
          <el-table-column prop="numberDate" label="日期" width="100"></el-table-column>
          <el-table-column prop="township" label="乡镇" width="70"></el-table-column>
          <el-table-column prop="unitinspec" label="受检单位"></el-table-column>
          <el-table-column prop="checker" label="检查人"></el-table-column>
          <el-table-column prop="inconclusion" label="结论" width="70"></el-table-column>
          <el-table-column prop="other" label="其他" width="80"></el-table-column>
          <el-table-column prop="photo" label="照片" width="70"></el-table-column>
          <el-table-column prop="confirm" label="确认" width="70"></el-table-column>
          <el-table-column prop="confirm" label="操作">
            <template slot-scope="{row}">
              <el-button type="success" plain v-on:click="$router.push(`/regulatoryRecord/${row.id}`)">查看</el-button>
              <el-button
                type="danger"
                 v-on:click="$router.push(`/regulatoryRecord/edit/${row.id}`)" plain>整改记录</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="yield" label="专利1" align="center" width="100">
            <template>
              <i class="el-icon-check"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
         <Pagination v-show="total>0" :total="total" :page.sync="page.pageIndex" 
            :limit.sync="page.pageSize" @pagination="getList" layout="prev, pager, next, sizes, jumper"/>
      </div>
    </div>
  </div>
</template>

<script>
import sampleData from './_data'
import Pagination from '@/components/common/pagination'
export default {
  name: "regulatoryRecord",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true,
      total: 100,
      options: [
        {
          value: "全部",
          label: ""
        }
      ],
      tableData: sampleData,
      listLoading:true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    //分页数量改变
   getList() {
    this.listLoading = true;
    // fetchListAPI(this.status, this.page.pageIndex, this.page.pageSize, "credit_gradeid")
    //   .then(response => {
        this.tableData = sampleData;  // this.tableData = response;  
        this.total = this.tableData.length;
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000);
    // })
    }
  }
};
</script>

<style lang="scss">
@import "./regulatoryRecord.scss";
</style>
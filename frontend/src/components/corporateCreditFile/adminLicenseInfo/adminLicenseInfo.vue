<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">行政许可信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      
      <div class="iptBox">
        <div class="select_label">稻米专业合作社</div>
        <el-button type="outline-primary" v-on:click="$router.go(-1)">返回</el-button>
      </div>

      <el-container>
        <el-table :data="tableData" v-loading="listLoading" fit style="width: 100%;"
        :row-class-name="rowIndex" highlight-current-row>
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column prop="approvalGrade" label="行政许可决定书文号" width="250"></el-table-column>
          <el-table-column prop="approvalGrade" label="项目名称" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="行政许可编码" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="审查类别" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="许可内容" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="行政相对人名称" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="统一社会信用代码" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="组织机构代码" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="工商登记码" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="税务登记号" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="居民身份证号" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="法定代表人姓名" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="许可决定日期" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="许可截止期" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="许可机关" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="当前状态" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="地方编码" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="数据更新时间戳" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="备注" width="200"></el-table-column>
          <el-table-column prop="approvalGrade" label="信息使用范围" width="200"></el-table-column>
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
import sampleData from '../_data';
import Pagination from '@/components/common/pagination'
export default {
  name: 'adminLicenseInfo',
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true,
      total: 100,
      tableData: sampleData,
      id: -1,
      
    };
  },
  created() {
    this.getList();
    this.id = this.$route.params.id;
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
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
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
  }
};
</script>
<style lang="scss">
@import "./adminLicenseInfo.scss";
</style>
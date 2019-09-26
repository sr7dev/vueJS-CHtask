<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">经营主体</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">乡镇</div>
        <el-select v-model="township" placeholder="请选择">
          <el-option v-for="item in ['全部', '梅李镇', '古里镇']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <div class="select_label">状态</div>
        <el-select v-model="status" placeholder="请选择">
          <el-option v-for="item in ['全部', '待审批', '已同意', '已拒绝']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="outline-primary" v-on:click="filterData()">同步数据</el-button>
      </div>

      <el-container>
        <el-table :data="tableData" v-loading="listLoading" fit style="width: 100%;" highlight-current-row :row-class-name="rowIndex">
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="approvalGrade" label="名称"></el-table-column>
          <el-table-column prop="originalGrade" label="原信用评级"></el-table-column>
          <el-table-column prop="nowGrade" label="现信用评级"></el-table-column>
          <el-table-column prop="gradeTime" label="评级时间"></el-table-column>
          <el-table-column prop="gradeUnit" label="评级单位"></el-table-column>
          <el-table-column prop="approvalStatus" label="状态"></el-table-column>
          <el-table-column label="操作">
            <el-tooltip class="item" effect="dark" content="企业详情" placement="top">
              <el-button v-on:click="$router.push(`/credit-rating/${data.item.creditGradeId}`)">查看</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="经营产品" placement="top">
              <el-button v-on:click="$router.push(`/credit-rating/edit/${data.item.creditGradeId}`)">修改评级</el-button>
            </el-tooltip>
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
import sampleData from './_data';
import Pagination from '@/components/common/pagination'
export default {
  name: 'creditRating',
  components: { Pagination },
  data() {
    return {
      township: '全部',
      status: '全部',
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true,
      total: 100,
      tableData: sampleData
    };
  },
  created() {
      this.getList();
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    
    getList() {
      this.listLoading = true;
      this.tableData = sampleData
      this.total = this.tableData.length;
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000);
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    //分页数量改变
    handleSizeChange(val) {
      let that = this;
      that.page.pageSize = val;
      that.fullPage(1);
    },
    //分页索引改变
    handleCurrentChange(val) {
      let that = this;
      that.page.pageIndex = val;
      that.fullPage(1);
    },
    //去经营产品
    goBussinessProducts() {
      this.$router.push({ path: "businessProducts" });
    }
  }
};
</script>

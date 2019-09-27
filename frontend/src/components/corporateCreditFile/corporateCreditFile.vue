<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">企业信用档案</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">乡镇</div>
        <el-select v-model="township" placeholder="请选择" @change="getList()">
          <el-option v-for="item in ['全部', '梅李镇', '古里镇']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <div class="select_label">行政许可</div>
        <el-radio v-model="types" label="1">是</el-radio>
        <el-radio v-model="types" label="2">否</el-radio>
        <div class="select_label">行政许可</div>
        <el-select v-model="adminLicense" placeholder="请选择" @change="getList()">
          <el-option v-for="item in ['全部', '有', '无']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <div class="select_label">行政处罚</div>
        <el-select v-model="adminPenalties" placeholder="请选择" @change="getList()">
          <el-option v-for="item in ['全部', '有', '无']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <div class="select_label">
            <el-button type="outline-primary" v-on:click="getList()" disabled>导入</el-button>
        </div>
      </div>

      <el-container>
        <el-table :data="tableData" v-loading="listLoading" fit style="width: 100%;"
        :row-class-name="rowIndex" highlight-current-row>
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column prop="approvalGrade" label="企业名称" width="150"></el-table-column>
          <el-table-column prop="originalGrade" label="统一社会信用代码"></el-table-column>
          <el-table-column prop="nowGrade" label="行政许可信息">
            <template slot-scope="{row}">
              <el-button v-on:click="$router.push(`/corporateCreditFile/adminLicenseInfo/${row.creditGradeId}`)">行政许可信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="gradeTime" label="行政处罚信息">
            <template slot-scope="{row}">
              <el-button v-on:click="$router.push(`/corporateCreditFile/adminPenaltyInfo/${row.creditGradeId}`)">行政许可信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="gradeUnit" label="评级信息"></el-table-column>
          <el-table-column label="三品一标认证" width="200">
            <template slot-scope="{row}">
                <el-button v-on:click="$router.push(`/creditRating/${row.creditGradeId}`)">三品一标</el-button>
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
import sampleData from './_data';
import Pagination from '@/components/common/pagination'
export default {
  name: 'creditRating',
  components: { Pagination },
  data() {
    return {
      township: '全部',
      types: '全部',
      adminLicense: "全部",
      adminPenalties: "全部",
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
@import "./corporateCreditFile.scss";
</style>
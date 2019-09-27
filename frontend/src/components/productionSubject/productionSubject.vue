<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">监管对象</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <div class="select_label">乡镇</div>
          <el-select v-model="township" placeholder="请选择">
            <el-option v-for="item in ['全部', '梅李镇', '古里镇']" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="select_label">类型</div>
          <template>
            <el-radio v-model="farmType" label="1">备选项</el-radio>
            <el-radio v-model="farmType" label="2">备选项</el-radio>
          </template>
        </div>
        <div class="filter-item">
          <div class="select_label">行业</div>
          <el-select v-model="industry" placeholder="请选择">
            <el-option v-for="item in ['全部', '养殖业', '畜牧业']" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="select_label">三品认证</div>
          <el-select v-model="prodCertifi" placeholder="请选择">
            <el-option v-for="item in ['全部', '有', '无']" :key="item"
              :label="item" :value="item" ></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="select_label">监管记录</div>
          <el-select v-model="regulatoryType" placeholder="请选择">
            <el-option v-for="item in ['全部', '有', '无']" :key="item"
              :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="select_label">农业监测</div>
          <el-select v-model="pesticideType" placeholder="请选择">
            <el-option v-for="item in ['全部', '有', '无']" :key="item"
              :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <el-button type="primary" plain style="margin-left: 20px;" @click="gotoAddRegulatoryObject()">添加监管对象</el-button>
          <div class="allCompany">共计{{total}}家企业</div>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex">
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="companyName" label="企业名称" width="150"></el-table-column>
        <el-table-column prop="date" label="法人代表" width="150"></el-table-column>
        <el-table-column prop="companyAddress" label="企业地址" width="250"></el-table-column>
        <el-table-column prop="qualityStandardId" label="三品认证" width="120">
          <template><el-button>认证信息</el-button></template>
        </el-table-column>
        <el-table-column prop="doSupervision" label="监管记录" width="120">
          <template><el-button>是</el-button></template>
        </el-table-column>
        <el-table-column prop="address" label="农药检测" width="120">
          <template><el-button>认证信息</el-button></template>
        </el-table-column>
        <el-table-column prop="contactPerson" label="联系人" width="250"></el-table-column>
        <el-table-column prop="contactWay" label="联系方式" width="250"></el-table-column>
        <el-table-column prop="address" label="所在乡镇" width="250"></el-table-column>
        <el-table-column prop="address" label="企业诚信" width="250"></el-table-column>
        <el-table-column prop="operations" label="操作"  width="450">
          <template slot-scope="{row}">
            <el-button v-on:click="gotoEditProductPage(row)" >修改</el-button>
            <el-button v-on:click="gotoProductPage(row)">产品</el-button>
            <el-button v-on:click="gotoWarehousingEnvironmentPage(row)">仓储环境</el-button>
            <el-button v-on:click="gotoDetailsProductPage(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  name: 'productionSubject',
  components: { Pagination },
  data() {
    return {
      township: "全部",
      farmType: -1,
      industry: "全部",
      prodCertifi: "全部",
      regulatoryType: "全部",
      pesticideType: "全部",
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 100,
      radio: "1",
      tableData: sampleData
    };
  },
  created() {
    this.getList();
  },
  methods: {
    gotoAddRegulatoryObject() {
      this.$router.push(`/productionSubject/addRegulatoryObject`);
    },
    gotoEditProductPage(row) {
      this.$router.push(`/productionSubject/editRegulatoryObject/${row.companyId}`);
    },
    gotoDetailsProductPage(row) {
      this.$router.push(`/productionSubject/detailsRegulatoryObject/${row.companyId}`);
    },
    gotoProductPage(row) {
      console.log(row);
      this.$router.push(`/productionSubject/mainProduct/${row.companyId}`);
    },
    gotoWarehousingEnvironmentPage(row) {
      console.log(row);
      this.$router.push(`/productionSubject/warehouseEnv/${row.companyId}`);
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
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
  }
};
</script>

<style lang="scss">
@import "./productionSubject.scss";
</style>

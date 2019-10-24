<template>
  <div class="container" id="production-subject">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">监管对象</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item margin-bottom-20" v-if="loggedinUserType !== 3">
          <div class="select_label no-margin-left">乡镇</div>
          <el-select v-model="townId" placeholder="请选择" style="width:150px;" @change="getList">
            <el-option label="全部" :value="0"></el-option>
            <el-option v-for="item in townList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="filter-item" v-if="loggedinUserType !== 3">
          <div class="select_label">类型</div>
          <template>
            <el-radio v-model="companyType" label="1" @change="getList">企业</el-radio>
            <el-radio v-model="companyType" label="2" @change="getList">农户</el-radio>
          </template>
        </div>
        <div class="filter-item" v-if="loggedinUserType !== 3">
          <div class="select_label">行业</div>
          <el-select
            v-model="agriculturalClassification"
            placeholder="请选择"
            style="width:150px;"
            @change="getList"
          >
            <el-option
              v-for="item in [
                { value: 0, label: '全部' },
                { value: 1, label: '养殖业' },
                { value: 2, label: '畜牧业' },
                { value: 3, label: '种植业' }
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="filter-item" v-if="loggedinUserType !== 3">
          <div class="select_label">三品认证</div>
          <el-select
            v-model="quality_standard"
            placeholder="请选择"
            style="width:100px;"
            @change="filterList"
          >
            <el-option
              v-for="item in [
                { value: -1, label: '全部' },
                { value: 1, label: '有' },
                { value: 0, label: '无' }
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="filter-item" v-if="loggedinUserType !== 3">
          <div class="select_label">监管记录</div>
          <el-select
            v-model="supervision_record"
            placeholder="请选择"
            style="width:100px;"
            @change="filterList"
          >
            <el-option
              v-for="item in [
                { value: -1, label: '全部' },
                { value: 1, label: '有' },
                { value: 0, label: '无' }
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="filter-item" v-if="loggedinUserType !== 3">
          <div class="select_label">农业监测</div>
          <el-select
            v-model="disability_check"
            placeholder="请选择"
            style="width:100px;"
            @change="filterList"
          >
            <el-option
              v-for="item in [
                { value: -1, label: '全部' },
                { value: 1, label: '有' },
                { value: 0, label: '无' }
              ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="filter-item" v-if="loggedinUserType === 2 || loggedinUserType === 0">
          <el-button
            size="small"
            type="primary"
            plain
            @click="gotoAddRegulatoryObject()"
            class="margin-left-20"
          >添加监管对象</el-button>
        </div>
        <div class="allCompany" v-if="loggedinUserType !== 3">
          共计
          <b class="blue-colored">{{ total }}</b> 家企业
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="companyName" label="企业名称" width="150"></el-table-column>
        <el-table-column prop="chargePerson" label="法人代表" width="150"></el-table-column>
        <el-table-column prop="companyAddress" label="企业地址"></el-table-column>
        <el-table-column
          prop="qualityStandardId"
          label="三品认证"
          class-name="text-center normal-line-height"
          width="120"
          v-if="loggedinUserType !== 3"
        >
          <template slot-scope="{ row }">
            <el-image
              class="button-img small-size"
              :src="Button2"
              @click="$router.push({path: `/productionSubject/threeProduct`,query: {creditCode:row.creditCode}})"
              v-if="row.qualityStandard !== 0 && row.qualityStandard != null"
            ></el-image>
            <p
              class="padding-left-10 button-p"
              @click="$router.push({path: `/productionSubject/threeProduct`,query: {creditCode:row.creditCode}})"
              v-if="row.qualityStandard !== 0 && row.qualityStandard != null"
            >认证信息</p>
            <p
              class="padding-left-10"              
              v-if="row.qualityStandard === 0 || row.qualityStandard == null"
            >无</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="doSupervision"
          label="监管记录"
          class-name="text-center normal-line-height"
          width="90"
          v-if="loggedinUserType !== 3"
        >
          <template slot-scope="{ row }">
            <el-image
              class="button-img"
              :src="Button1"
              v-on:click="
                $router.push({
                  path: `/regulatoryRecord/`,
                  query: { companyId: row.companyId }
                })"
                v-if="row.supervisionRecord !== 0 && row.supervisionRecord != null"
            ></el-image>
            <p
              class="padding-left-10"              
              v-if="row.supervisionRecord === 0 || row.supervisionRecord == null"
            >无</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="农药检测"
          size="mini"
          class-name="text-center normal-line-height"
          width="90"
          v-if="loggedinUserType !== 3"
        >
          <template slot-scope="{ row }">
            <el-image
              class="button-img"
              :src="Button1"
              v-on:click="$router.push({path: `/disabilityCheck/`,query: { creditCode: row.creditCode }})"
              v-if="row.disabilityCheck !== 0 && row.disabilityCheck != null"
            ></el-image>
            <p
              class="padding-left-10"              
              v-if="row.disabilityCheck === 0 || row.disabilityCheck == null"
            >无</p>
          </template>
        </el-table-column>
        <el-table-column prop="contactPerson" label="联系人" width="90"></el-table-column>
        <el-table-column prop="contactMobile" label="联系方式" width="120"></el-table-column>
        <el-table-column prop="address" label="所在乡镇" width="90">
          <template slot-scope="{ row }">
            {{
            getTownship(row.townId)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="nowGrade" label="企业诚信" width="150">
          <template slot-scope="{ row }">
            <span class="rating-action" v-on:click="gotoCreditRatingPage(row)">
              <el-rate
                :value="row.nowGrade"
                :max="row.nowGrade"
                :texts="['C:失信', 'B:基本守信', 'A:守信']"
                :colors="colors"
                disabled
                show-text
              ></el-rate>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="operations" label="操作" width="300" class-name="text-center">
          <template slot-scope="{ row }">
            <el-button
              size="small"
              v-on:click="gotoEditProductPage(row)"
              type="warning"
              v-if="loggedinUserType !== 1"
            >修改</el-button>
            <el-button size="small" v-on:click="gotoProductPage(row)" type="primary">产品</el-button>
            <el-button
              size="small"
              v-on:click="gotoWarehousingEnvironmentPage(row)"
              type="success"
            >仓储环境</el-button>
            <el-button
              size="small"
              v-on:click="gotoDetailsProductPage(row)"
              type="info"
              v-if="loggedinUserType !== 3"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page.pageIndex"
          :limit.sync="page.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request";
import Auth from "@/services/authentication/auth.js";
import Button1 from "@/assets/images/button1.png";
import Button2 from "@/assets/images/button2.png";
export default {
  name: "productionSubject",
  components: { Pagination },
  data() {
    return {
      Button1: Button1,
      Button2: Button2,
      loggedinUserType: null,
      townId: 0,
      companyType: 0,
      agriculturalClassification: 0,
      quality_standard: "全部",
      supervision_record: "全部",
      disability_check: "全部",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      radio: "1",
      listLoading: true,
      townList: [],
      tableData: [],
      srcData: [],
      colors: { 1: "#f00", 2: "#F7BA2A", 3: "#0f0" },
      value2: 2
    };
  },
  created() {
    this.getList();
    this.getTownList();
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    getTownship(townId) {
      let pos = this.townList.findIndex(item => item.id == townId);
      if (pos < 0) return "";
      return this.townList[pos].name;
    },
    gotoCreditRatingPage(row) {
      this.$router.push({
        path: `/corporateCreditFile/ratingInfo`,
        query: { creditCode: row.creditCode }
      });
    },
    gotoAddRegulatoryObject() {
      this.$router.push(`/productionSubject/addRegulatoryObject`);
    },
    gotoEditProductPage(row) {
      this.$router.push(
        `/productionSubject/editRegulatoryObject/${row.companyId}`
      );
    },
    gotoDetailsProductPage(row) {
      this.$router.push(
        `/productionSubject/detailsRegulatoryObject/${row.companyId}`
      );
    },
    gotoProductPage(row) {
      this.$router.push(`/productionSubject/mainProduct/${row.companyId}`);
    },
    gotoWarehousingEnvironmentPage(row) {
      this.$router.push(`/productionSubject/warehouseEnv/${row.companyId}`);
    },
    getTownList() {
      Request()
        .get("/api/town/all", {})
        .then(response => {
          this.townList = response;
        })
        .catch(err => {
          console.error(err);
        });
    },
    async getNowGrade(creditCode, gradeArray) {
      let nowGrade = "";
      if (!gradeArray || !gradeArray.length) {
        nowGrade = "";
      } else {
        nowGrade = gradeArray.pop().nowGrade;
      }
      return nowGrade;
    },

    filterList() {    
      this.tableData = this.srcData;
      
      if (this.quality_standard === 1){
        this.tableData = this.tableData.filter(it => it.qualityStandard > 0)
      }
      else if ( this.quality_standard === 0){
        this.tableData = this.tableData.filter(it => it.qualityStandard === 0 || it.qualityStandard == null)
      }

      if (this.supervision_record === 1){
        this.tableData = this.tableData.filter(it => it.supervisionRecord > 0)
      }
      else if ( this.supervision_record === 0){
        this.tableData = this.tableData.filter(it => it.supervisionRecord === 0 || it.supervisionRecord == null)
      }

      if (this.disability_check === 1){
        this.tableData = this.tableData.filter(it => it.disabilityCheck > 0)
      }
      else if ( this.disability_check === 0){
        this.tableData = this.tableData.filter(it => it.disabilityCheck === 0 || it.disabilityCheck == null)
      }
    },

    getList() {
      this.tableData = [];
      this.listLoading = true;
      Request()
        .get("/api/company_production/getAllList", {
          agriculturalClassification: this.agriculturalClassification,
          companyType: this.companyType,
          townId: this.townId
        })
        .then(response => {
          this.tableData = response;
          this.srcData = response;
          this.total = this.tableData.length;

          this.tableData.forEach(e => {
            e.nowGrade = this.getGradeString(e.grade);
          });

          this.filterList();
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);

          this.tableData = [];
          this.total = 0;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        });
    },
    getGradeString(grade) {
      let strGrade = "";
      switch (grade) {
        case "A":
          strGrade = 3;
          break;
        case "B":
          strGrade = 2;
          break;
        case "C":
          strGrade = 1;
          break;
        default:
          strGrade = 3;
      }
      return strGrade;
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./productionSubject.scss";
</style>

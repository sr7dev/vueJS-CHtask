<template>
  <div class="container" id="production-subject">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">监管对象</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <div class="select_label">乡镇</div>
          <el-select v-model="townId" placeholder="请选择" @change="getList">
            <el-option label="全部" :value="0"></el-option>
            <el-option v-for="item in townList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="select_label">类型</div>
          <template>
            <el-radio v-model="companyType" label="1" @change="getList">企业</el-radio>
            <el-radio v-model="companyType" label="2" @change="getList">农户</el-radio>
          </template>
        </div>
        <div class="filter-item">
          <div class="select_label">行业</div>
          <el-select v-model="agriculturalClassification" placeholder="请选择" @change="filterList">
            <el-option
              v-for="item in [
                          {value: 0, label: '全部'},
                          {value: 1, label: '养殖业'}, 
                          {value: 2, label: '畜牧业'}, 
                          {value: 3, label: '种植业'}
                        ]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="select_label">三品认证</div>
          <el-select v-model="quality_standard" placeholder="请选择" @change="filterList">
            <el-option v-for="item in [{value: -1, label: '全部'}, {value: 1, label: '有'}, {value: 0, label: '无'}]"
               :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="select_label">监管记录</div>
          <el-select v-model="supervision_record" placeholder="请选择" @change="filterList">
            <el-option v-for="item in [{value: -1, label: '全部'}, {value: 1, label: '有'}, {value: 0, label: '无'}]"
               :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <div class="select_label">农业监测</div>
          <el-select v-model="disability_check" placeholder="请选择" @change="filterList">
            <el-option v-for="item in [{value: -1, label: '全部'}, {value: 1, label: '有'}, {value: 0, label: '无'}]"
               :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <el-button
            type="primary"
            plain
            style="margin-left: 20px;"
            @click="gotoAddRegulatoryObject()"
          >添加监管对象</el-button>
          <div class="allCompany">共计{{total}}家企业</div>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex">
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="companyName" label="企业名称" width="150"></el-table-column>
        <el-table-column prop="chargePerson" label="法人代表" width="150"></el-table-column>
        <el-table-column prop="companyAddress" label="企业地址"></el-table-column>
        <el-table-column prop="qualityStandardId" label="三品认证" width="120">
          <template slot-scope="{row}">
            <!-- <el-button v-if="row.quality_standard==0" disabled>否</el-button> -->
            <el-button @click="$router.push(`/corporateCreditFile/threeProduction/${row.creditCode}`)"
              >认证信息</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="doSupervision" label="监管记录" width="120">
          <template slot-scope="{row}">
            <!-- <el-button v-if="row.quality_standard==0" disabled>否</el-button> -->
            <el-button v-on:click="$router.push({path:`/regulatoryRecord/`,query: {companyId:row.companyId}})"
              >是</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="农药检测" width="120">
          <template slot-scope="{row}">
            <!-- <el-button v-if="row.quality_standard==0" disabled>否</el-button> -->
            
            <el-button v-on:click="$router.push({path:`/disabilityCheck/`,query: {creditCode:row.creditCode}})"
              >是</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="contactPerson" label="联系人" width="120"></el-table-column>
        <el-table-column prop="contactMobile" label="联系方式" width="120"></el-table-column>
        <el-table-column prop="address" label="所在乡镇" width="120">
          <template slot-scope="{row}">{{getTownship(row.townId)}}</template>
        </el-table-column>
        <el-table-column prop="nowGrade" label="企业诚信" width>
          <template slot-scope="{row}">
            <span class="rating-action" v-on:click="gotoCreditRatingPage(row)">{{row.nowGrade}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operations" label="操作" width="450">
          <template slot-scope="{row}">
            <el-button v-on:click="gotoEditProductPage(row)">修改</el-button>
            <el-button v-on:click="gotoProductPage(row)">产品</el-button>
            <el-button v-on:click="gotoWarehousingEnvironmentPage(row)">仓储环境</el-button>
            <el-button v-on:click="gotoDetailsProductPage(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <pagination
          v-show="total>0"
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
import sampleData from "./_data";
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request";
export default {
  name: "productionSubject",
  components: { Pagination },
  data() {
    return {
      townId: 0,
      companyType: 0,
      agriculturalClassification: 0,
      quality_standard: "全部",
      supervision_record: "全部",
      disability_check: "全部",
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 100,
      radio: "1",
      listLoading: true,
      townList: [],
      tableData: sampleData,
      srcData: [],
    };
  },
  created() {
    this.getList();
    this.getTownList();
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
    async getNowGrade(creditCode) {
      let nowGrade = "";
      await Request()
        .get("/api/company_credit_grade/all", {
          approvalStatus: -1,
          creditCode: creditCode,
          // sortBy: 'creditGradeId DESC',
          pageNo: 0,
          pageSize: 20,
          townId: 0
        })
        .then(response => {
          if (!response || !response.length) nowGrade = "";
          else nowGrade = response.pop().nowGrade;
          return nowGrade;
        })
        .catch(error => {
          console.error(error);
        });
      return nowGrade;
    },
    filterList() {
      this.tableData = this.srcData;
      if(this.agriculturalClassification > 0) {
        this.tableData = this.tableData.filter(it => it.agriculturalClassification == this.agriculturalClassification);
      }
      // if(this.quality_standard > 0) {
      //   this.tableData = this.tableData.filter(it => it.quality_standard?true:false);
      // }
      // if(this.supervision_record > 0) {
      //   this.tableData = this.tableData.filter(it => it.supervisionRecord?true:false);
      // }
      // if(this.agriculturalClassification > 0) {
      //   this.tableData = this.tableData.filter(it => it.disabilityCheck?true:false);
      // }

    },
    getList() {
      this.listLoading = true;
      console.log(this.companyType);
      Request()
        .get("/api/company_production/all", {
          companyType: this.companyType,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          townId: this.townId,
        })
        .then(response => {
          let dt = response;
          this.tableData = [];
          this.srcData = [];
          this.total = dt.length;
          dt.map(item => {
            this.getNowGrade(item.creditCode).then(res => {
              item.nowGrade = this.getGradeString(res);
              this.tableData.push(item);
              this.srcData.push(item);
            });
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    getGradeString(grade) {
      let strGrade = "";
      switch (grade) {
        case "A":
          strGrade = "A级";
          break;
        case "B":
          strGrade = "B级";
          break;
        case "C":
          strGrade = "C级";
          break;
        default:
          strGrade = "A级";
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

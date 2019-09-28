<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator=" ">
        <el-breadcrumb-item>农残检测</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div v-if="typeof this.creditCode == 'undefined'" class="select_label">乡镇</div>
        <div v-else class="select_label" style="display: none">乡镇</div>
        <el-select v-if="typeof this.creditCode == 'undefined'" v-model="currTown" placeholder="全部">
          <el-option
            v-for="item in township"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            size="large"
          ></el-option>
        </el-select>
        <div v-else class="select_label">{{getCompanyName()}}</div>
        <div class="select_label">项目</div>
        <el-select v-model="itemValue" placeholder="全部" @change="getList">
          <el-option v-for="item in items" :key="item.id" :label="item.item" :value="item.item"></el-option>
        </el-select>
        <div class="select_label">样品</div>
        <el-select v-model="samplesValue" placeholder="全部" @change="getList">
          <el-option
            v-for="item in samples"
            :key="item.id"
            :label="item.sample"
            :value="item.sample"
          ></el-option>
        </el-select>
        <div class="select_label">定性</div>
        <el-select v-model="qualitativesValue" placeholder="全部">
          <el-option
            v-for="item in qualitatives"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="select_label">检测单位</div>
        <el-select v-model="detectionUnitValue" placeholder="全部" @change="getList">
          <el-option
            v-for="item in detectionUnit"
            :key="item.id"
            :label="item.detectUnit"
            :value="item.detectUnit"
          ></el-option>
        </el-select>
      </div>
      <div class="iptBox">
        <div class="select_label">开始日期</div>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="startDate"
          style="width: 300px;"
          @change="getList"
        ></el-date-picker>
        <div class="select_label">结束日期</div>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="endDate"
          style="width: 300px;"
          @change="getList"
        ></el-date-picker>
        <el-checkbox
          v-model="bGreenProducts"
          style="margin-left: 30px"
          @change="getList"
        >专项1:绿色优质农产品生产基地</el-checkbox>
        <el-button v-on:click="handleDownload" style="margin-left: 30px">导出表格</el-button>
        <el-button
          v-if="typeof this.creditCode != 'undefined'"
          type="outline-primary"
          v-on:click="$router.go(-1)"
        >返回</el-button>
        <el-button
          v-else
          type="outline-primary"
          v-on:click="$router.go(-1)"
          style="display: none;"
        >返回</el-button>
        <span style="float: right">总计{{totalSize}}条检测</span>
      </div>
      <el-container>
        <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex">
          <el-table-column :formatter="order" label="序号" width="80"></el-table-column>
          <el-table-column prop="no" label="编号"></el-table-column>
          <el-table-column prop="item" label="检测项目"></el-table-column>
          <el-table-column prop="sample" label="样品名称"></el-table-column>
          <el-table-column prop="source" label="来源"></el-table-column>
          <el-table-column prop="resultDl" label="定量结果"></el-table-column>
          <el-table-column prop="resultDx" label="定性结果"></el-table-column>
          <el-table-column prop="detectTime" label="检测时间" width="240"></el-table-column>
          <el-table-column prop="detectUnit" label="检测单位" width="240"></el-table-column>
          <el-table-column prop="operator" label="检验员"></el-table-column>
          <el-table-column prop="particular" label="专项1">
            <template scope="scope">
              <i v-if="scope.row.particular" class="el-icon-check"></i>
              <i v-else></i>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
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
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";
export default {
  name: "disabilityCheck",
  components: { Pagination },
  data() {
    return {
      creditCode: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 100,
      options: [
        {
          value: "全部",
          label: ""
        }
      ],
      township: [{ id: 0, name: "全部" }],
      currTown: "",
      status: 1,
      tableData: [],
      items: [{ id: 0, item: "全部" }],
      itemValue: "",
      samples: [{ id: 0, sample: "全部" }],
      samplesValue: "",
      qualitatives: [{ id: "0", name: "全部" }],
      qualitativesValue: "",
      detectionUnit: [{ id: "0", detectUnit: "全部" }],
      detectionUnitValue: "",
      startDate: "",
      endDate: "",
      bGreenProducts: false,
      totalSize: "",
      companyData: [],
      filename: "农残检测"
    };
  },
  created() {
    this.getTown();
    this.getItem();
    this.getSample();
    this.getDetectUnit();
    this.getList();
    this.getCompanyProduction();
    this.creditCode = this.$route.query.creditCode;
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "编号",
          "编号",
          "检测项目",
          "来源",
          "定量结果",
          "定性结果",
          "检测时间",
          "检测单位",
          "检验员",
          "专项1"
        ];
        const filterVal = [
          "no",
          "item",
          "sample",
          "source",
          "resultDl",
          "resultDx",
          "detectTime",
          "detectUnit",
          "particular"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          bookType: "csv"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    },
    getCompanyProduction() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyData = response;
        })
        .catch(error => {
          console.log(error);
        });
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
    getItem() {
      Request()
        .get("/api/disability_check/item")
        .then(response => {
          this.items = this.items.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getSample() {
      Request()
        .get("/api/disability_check/sample ")
        .then(response => {
          this.samples = this.samples.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDetectUnit() {
      Request()
        .get("/api/disability_check/detect_unit")
        .then(response => {
          this.detectionUnit = this.detectionUnit.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/disability_check/all", {
          creditCode: this.$route.query.creditCode,
          detectUnit:
            this.detectionUnitValue == "全部" ? "" : this.detectionUnitValue,
          fromDate: this.startDate,
          toDate: this.endDate,
          sample: this.samplesValue == "全部" ? "" : this.samplesValue,
          item: this.item == "全部" ? "" : this.item,
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
    getCompanyName() {
      let product = this.companyData.find(
        x => x.creditCode === this.creditCode
      );
      if (product) {
        return product.companyName;
      } else {
        return "";
      }
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    goAdd() {
      this.$router.push({ path: "addDisabilityCheck" });
    }
  }
};
</script>

<style scoped>
</style>
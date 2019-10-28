<template>
  <div class="container">
    <div class="box">
      <el-container>
        <el-header>种植业绿色优质农产品统计汇总</el-header>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
          border
          :span-method="objectSpanMethod"
        >
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="plate" label="板块"></el-table-column>
          <el-table-column prop="greenFoodArea" label="绿色食品面积"></el-table-column>
          <el-table-column prop="organicArea" label="有机面积"></el-table-column>
          <el-table-column prop="greenHighBaseArea" label="绿色优质基地面积"></el-table-column>
          <el-table-column prop="repeatArea" label="重复面积"></el-table-column>
          <el-table-column prop="total" label="合计"></el-table-column>
          <el-table-column prop="cultivatedArea" label="耕地面积"></el-table-column>
          <el-table-column prop="proportion" label="占比"></el-table-column>
          <el-table-column prop="greenOrganic" label="绿色,有机"></el-table-column>
          <el-table-column prop="landMark" label="地标"></el-table-column>
          <el-table-column prop="estimatedArea" label="预计面积"></el-table-column>
          <el-table-column prop="expectedRatio" label="预计占比"></el-table-column>
        </el-table>
      </el-container>

      <div class="pageBox">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page.pageIndex"
          :limit.sync="page.pageSize"
          @pagination="getData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "plantingTownshipStatistics",
  components: { Pagination },
  props: {
    year: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      alert_dialogVisible: false,
      confirm_dialogVisible: false,

      loggedinUserType: null,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      tableData: [
        {
          plate: "常福街道",
          greenFoodArea: 5700,
          organicArea: 0,
          greenHighBaseArea: 637.6,
          repeatArea: 0,
          total: 10000,
          cultivatedArea: 12313,
          proportion: 123.12,
          greenOrganic: 21400,
          landMark: 8880,
          estimatedArea: 3269.15,
          expectedRatio: 66.51
        },
        {
          plate: "常福街道",
          greenFoodArea: 5700,
          organicArea: 0,
          greenHighBaseArea: 637.6,
          repeatArea: 0,
          total: 10000,
          cultivatedArea: 12313,
          proportion: 123.12,
          greenOrganic: 21400,
          landMark: 8880,
          estimatedArea: 3269.15,
          expectedRatio: 66.51
        }
      ],
      listLoading: true
    };
  },
  created() {
    this.loggedinUserType = Auth().user().userType;
    this.getData();
  },
  methods: {
    getData() {
      this.total = this.tableData.length;
      this.getTotal();
      this.listLoading = false;
    },
    getTotal() {
      this.tableData.push({
        plate: "合计",
        greenFoodArea: this.greenFoodQuality(),
        organicArea: this.organicAreaQuality(),
        greenHighBaseArea: this.greenHighQuality(),
        repeatArea: this.repeatAreaQuality(),
        total: this.totalQuality(),
        cultivatedArea: this.cultivateQuality(),
        proportion: this.proportionQuality(),
        greenOrganic: this.greenOrganicQuality(),
        landMark: this.landmarkQuality(),
        estimatedArea: this.estimateQuality(),
        expectedRatio: this.expectedQuality()
      });
    },

    greenFoodQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.greenFoodArea;
      });
      return total;
    },

    organicAreaQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.organicArea;
      });
      return total;
    },

    greenHighQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.greenHighBaseArea;
      });
      return total;
    },

    repeatAreaQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.repeatArea;
      });
      return total;
    },

    totalQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.total;
      });
      return total;
    },

    cultivateQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.cultivatedArea;
      });
      return total;
    },

    proportionQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.proportion;
      });
      return total;
    },

    greenOrganicQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.greenOrganic;
      });
      return total;
    },

    landmarkQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.landMark;
      });
      return total;
    },

    estimateQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.estimatedArea;
      });
      return total;
    },

    objectSpanMethod({ row, col, rowIndex, columnIndex }) {
      if (rowIndex == this.tableData.length - 1) {
        if (columnIndex == 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        } 
        if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 2
          };
        } 
      }
    },

    expectedQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.expectedRatio;
      });
      return total;
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

<style>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
}

</style>
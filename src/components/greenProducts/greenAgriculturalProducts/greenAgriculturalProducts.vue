<template>
  <div class="container">
    <div class="box">
      <el-container>
        <el-header>绿色优质农产品统计汇总</el-header>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
          border
          :span-method="spanMethod"
        >
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="plate" label="板块"></el-table-column>
          <el-table-column prop="plantingIndustry" label="种植业占比"></el-table-column>
          <el-table-column prop="livestockRatio" label="畜牧业占比"></el-table-column>
          <el-table-column prop="greenArgriculturalProducts" label="绿色优质农产品占比"></el-table-column>
          <el-table-column prop="expectedPlantingIndustry" label="下半年种植业预计占比"></el-table-column>
          <el-table-column prop="estimatedShare" label="下半年畜牧业预计占比"></el-table-column>
          <el-table-column prop="greenHighQuality" label="绿色优质农产品预计占比"></el-table-column>
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
  name: "greenAgriculturalProducts",
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
          plantingIndustry: 65.51,
          livestockRatio: 100,
          greenArgriculturalProducts: 82.67,
          expectedPlantingIndustry: 78.36,
          estimatedShare: 100,
          greenHighQuality: 89.18
        },
        {
          plate: "常福街道",
          plantingIndustry: 65.51,
          livestockRatio: 100,
          greenArgriculturalProducts: 82.67,
          expectedPlantingIndustry: 78.36,
          estimatedShare: 100,
          greenHighQuality: 89.18
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
      this.calcualteTotal();
      this.listLoading = false;
    },

    calcualteTotal(){
      let plantTotal = 0, liveTotal = 0, greenTotal = 0, expectedTotal = 0, estimateTotal = 0, greenHighTotal = 0;
      this.tableData.forEach(data => {
        plantTotal += data.plantingIndustry;
        liveTotal += data.livestockRatio;
        greenTotal += data.greenArgriculturalProducts;
        expectedTotal += data.expectedPlantingIndustry;
        estimateTotal += data.estimatedShare;
        greenHighTotal += data.greenHighQuality;
      });
      this.tableData.push({        
          plate: "合计",
          plantingIndustry: plantTotal,
          livestockRatio: liveTotal,
          greenArgriculturalProducts: greenTotal,
          expectedPlantingIndustry: expectedTotal,
          estimatedShare: estimateTotal,
          greenHighQuality: greenHighTotal,
      });      
    },

    spanMethod({ row, column, rowIndex, columnIndex }){
      if (rowIndex == this.tableData.length - 1){
        if (columnIndex == 0){
          return{
            rowspan: 0,
            colspan: 0,
          }
        }
        else if (columnIndex == 1){
          return{
            rowspan: 1,
            colspan: 2,
          }
        }       
      }
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
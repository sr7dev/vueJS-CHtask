<template>
  <div class="container">
    <div class="box">     
      <el-container>
        <el-header>镇（街道）、开发区推进高质量发展考核指标数据填报表</el-header>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
          :span-method="spanMethod"
        >
          <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
          <el-table-column prop="title" label=""></el-table-column>
          <el-table-column label="绿色优质农产品比重(畜牧)" align="center">
            <el-table-column :prop="col.prop" :label="col.label" v-for="col in columns" :key="col.prop"></el-table-column>
          </el-table-column>
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
  name: "animalHusbandryBase",
  components: { Pagination },
  props: {
    year: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      columns:[
        {
          prop: "firstHalf_2018",
          label: "2018年1-6月实绩",
        },
        {
          prop: "secondHalf_2018",
          label: "2018年全年实绩",
        },
        {
          prop: "firstHalf_2019",
          label: "2019年1-6月实绩",
        },
        {
          prop: "secondHalf_2019",
          label: "2019年全年预测",
        }
      ],
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
          title: "经济技术开发区(含碧溪)",
          firstHalf_2018: 26.09,
          secondHalf_2018: 87.5,
          firstHalf_2019: 87.5,
          secondHalf_2019: 100,
        },
        {
          title: "高新技术产业开发区",
          firstHalf_2018: 26.09,
          secondHalf_2018: 87.5,
          firstHalf_2019: 87.5,
          secondHalf_2019: 100,
        },
        {
          title: "常福街道",
          firstHalf_2018: 66.67,
          secondHalf_2018: 100,
          firstHalf_2019: 100,
          secondHalf_2019: 100,
        },
        {
          title: "梅李镇",
          firstHalf_2018: 100,
          secondHalf_2018: 100,
          firstHalf_2019: 100,
          secondHalf_2019: 100,
        },
        {
          title: "海虞镇",
          firstHalf_2018: 0,
          secondHalf_2018: 100,
          firstHalf_2019: 100,
          secondHalf_2019: 100,
        },
        {
          title: "古里镇",
          firstHalf_2018: 33.33,
          secondHalf_2018: 100,
          firstHalf_2019: 100,
          secondHalf_2019: 100,
        },
        {
          title: "沙家浜镇",
          firstHalf_2018: 26.09,
          secondHalf_2018: 87.5,
          firstHalf_2019: 87.5,
          secondHalf_2019: 100,
        },
        {
          title: "支塘镇",
          firstHalf_2018: 22.22,
          secondHalf_2018: 80,
          firstHalf_2019: 80,
          secondHalf_2019: 100,
        },
        {
          title: "董浜镇",
          firstHalf_2018: 0,
          secondHalf_2018: 0,
          firstHalf_2019: 0,
          secondHalf_2019: 100,
        },
        {
          title: "辛庄镇",
          firstHalf_2018: 26.09,
          secondHalf_2018: 87.5,
          firstHalf_2019: 87.5,
          secondHalf_2019: 100,
        },
        {
          title: "尚湖镇",
          firstHalf_2018: 0,
          secondHalf_2018: 100,
          firstHalf_2019: 100,
          secondHalf_2019: 100,
        },
      ],
      listLoading: true
    };
  },
  created() {
    this.loggedinUserType = Auth().user().attrs.userType;
    this.getData();    
  },
  methods: {
    getData() {      
      this.total = this.tableData.length;
      this.calculateTotal();
      this.listLoading = false;
    },

    calculateTotal(){
      let fnum = 0;
      let snum = 0;
      this.tableData.forEach(data =>{
        fnum += data.firstHalf_2019;
        snum += data.secondHalf_2019;
      })

      this.tableData.push({
        title: "合计",
          firstHalf_2018: "备注：乡镇87.5为无畜牧场，取平均值",
          secondHalf_2018: "",
          firstHalf_2019: fnum,
          secondHalf_2019: snum,
      });
    },

    spanMethod({ row, column, rowIndex, columnIndex }) {
      if  ( rowIndex == this.tableData.length -1) {        
        if (columnIndex == 1 || columnIndex == 2){
          return{
            rowspan: 1,
            colspan: 2,
          }
        }
        else if (columnIndex == 0 || columnIndex == 3){
          return{
            rowspan: 0,
            colspan: 0,
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
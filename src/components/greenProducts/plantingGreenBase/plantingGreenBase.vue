<template>
  <div class="container">
    <div class="box">
      <el-container>
        <el-header>2019年建设中待验收种植业绿色优质基地</el-header>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          :span-method="objectSpanMethod"
          v-loading="listLoading"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
          <el-table-column prop="createUnit" label="创建单位"></el-table-column>
          <el-table-column prop="productType" label="产品类型"></el-table-column>
          <el-table-column prop="baseArea" label="基地面积"></el-table-column>
          <el-table-column prop="baseAddress" label="基地地址(到村)"></el-table-column>
          <el-table-column label="与部基地,产品基地重合">
            <el-table-column prop="coincident" label="(是/否)" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="应扣除的重合部分" align="center">
            <el-table-column
              :prop="col.prop"
              :label="col.label"
              v-for="col in columns"
              :key="col.prop"
            ></el-table-column>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
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
  name: "plantingGreenBase",
  components: { Pagination },
  props: {
    year: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      columns: [
        {
          prop: "company",
          label: "重合企业/部基地"
        },
        {
          prop: "coincidentArea",
          label: "重合面积"
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
          createUnit: "尚湖镇人民政府",
          productType: "粮油",
          baseArea: 2.48,
          baseAddress:
            "常熟市尚湖镇罗墩村,常兴村,新裕村,吉桥村,练南村,福寿村,新鑫村,新和村,新巷村",
          coincident: "是",
          company: "常熟市虞盛农产品专业合作社",
          coincidentArea: 0.15,
          remarks: "绿色食品"
        },
        {
          createUnit: "尚湖镇人民政府",
          productType: "粮油",
          baseArea: 2.48,
          baseAddress:
            "常熟市尚湖镇罗墩村,常兴村,新裕村,吉桥村,练南村,福寿村,新鑫村,新和村,新巷村",
          coincident: "是",
          company: "常熟市虞盛农产品专业合作社",
          coincidentArea: 0.15,
          remarks: "绿色食品"
        }
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
      this.listLoading = false;
      this.total = this.tableData.length;
      this.calculateTotal();
      this.Total();
    },

    calculateTotal() {
      this.tableData.push({
        createUnit: "合计",
        productType: "",
        baseArea: this.baseQuality(),
        baseAddress: "",
        coincident: "",
        company: "",
        coincidentArea: this.coincidentQuality(),
        remarks: ""
      });
    },
    baseQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.baseArea;
      });
      return total;
    },
    coincidentQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.coincidentArea;
      });
      return total;
    },
    Total() {
      this.tableData.push({
        createUnit: "纳入统计范围的基地面积（扣除重合后）：",
        productType: "",
        baseArea: "",
        baseAddress: "",
        coincident: this.totalQuality(),
        company: "",
        coincidentArea: "",
        remarks: ""
      });
    },
    totalQuality() {
      let total = 0;
      let index = 0;
      this.tableData.forEach(data => {
        if (index === this.tableData.length - 1)      
          return total;

        total += (data.baseArea - data.coincidentArea);
        index ++;
      });
      return total;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == this.tableData.length - 2) {
        if (columnIndex == 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        } else if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 2
          };
        }
      } else if (rowIndex == this.tableData.length - 1) {
        if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 5
          };
        } else if (columnIndex == 5) {
          return {
            rowspan: 1,
            colspan: 4
          };
        } else if (
          columnIndex == 0 ||
          columnIndex == 2 ||
          columnIndex == 3 ||
          columnIndex == 4 ||
          columnIndex == 6 ||
          columnIndex == 7 ||
          columnIndex == 8
        ) {
          return {
            rowspan: 0,
            colspan: 0
          };
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
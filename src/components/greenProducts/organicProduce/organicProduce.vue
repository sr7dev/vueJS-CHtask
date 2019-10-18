<template>
  <div class="container">
    <div class="box">
      <div class="iptBox">
        <el-button type="primary" plain @click="getAll()">全部</el-button>
        <el-button type="primary" plain @click="shajiabanTown()">沙家浜镇</el-button>
        <el-button type="primary" plain @click="merlinTown()">梅林镇</el-button>
        <el-button type="primary" plain @click="zhitangTown()">支塘镇</el-button>
      </div>
      <el-dialog :visible.sync="alert_dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;请选择 !!!</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="alert_dialogVisible = false" type="primary" plain>取消</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
        </span>
      </el-dialog>

      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="townDistrict" label="所在镇(区)"></el-table-column>
          <el-table-column prop="declarationUnitName" label="申报单位名称"></el-table-column>
          <el-table-column prop="numbering" label="编号"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="area" label="面积(亩)"></el-table-column>
          <el-table-column prop="production" label="产量(吨)"></el-table-column>
          <el-table-column prop="address" label="详细地址"></el-table-column>
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
  name: "organicProduce",
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
          townDistrict: "虞山街道(637.6)",
          declarationUnitName: "常熟市维摩剑门绿茶有限公司",
          numbering: "100OP1200293",
          productName: "太白茶",
          area: 637.6,
          production: 1.1,
          address: "常熟市虞山中路维摩"
        },
        {
          townDistrict: "虞山街道(637.6)",
          declarationUnitName: "常熟市维摩剑门绿茶有限公司",
          numbering: "100OP1200293",
          productName: "太白茶",
          area: 637.6,
          production: 1.1,
          address: "常熟市虞山中路维摩"
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
    },
    getAll() {},
    shajiabanTown() {},
    merlinTown() {},
    zhitangTown() {},

    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>

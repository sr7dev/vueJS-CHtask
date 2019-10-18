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
          <el-table-column prop="plate" label="板块"></el-table-column>
          <el-table-column prop="productionUnit" label="生产单位"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productCertificateNum" label="产品证书编号"></el-table-column>
          <el-table-column prop="baseArea" label="基地面积(亩)"></el-table-column>
          <el-table-column prop="production" label="产量(吨)"></el-table-column>
          <el-table-column prop="baseAddress" label="基地地址(到村)"></el-table-column>
          <el-table-column prop="certified" label="面积统计(已获证)"></el-table-column>
          <el-table-column prop="declared" label="面积统计(已申报)"></el-table-column>
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
  name: "greenFood",
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
          plate: "梅李镇",
          productionUnit: "常熟市吉健葡萄科技有限公司",
          productName: "猕猴桃",
          productCertificateNum: "LB-18-1701100080A",
          baseArea: 60,
          production: 60,
          baseAddress: "常熟市梅李镇珍北村",
          certified: 1130,
          declared: 770
        },
        {
          plate: "常福街道",
          productionUnit: "常熟市梨花邨农业生态园有限公司",
          productName: "翠冠梨",
          productCertificateNum: "LB-18-1603101264A",
          baseArea: 600,
          production: 600,
          baseAddress: "常熟市常福街道新红村",
          certified: 5700,
          declared: 2100
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

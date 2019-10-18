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
          <el-table-column prop="createUnit" label="创建单位"></el-table-column>
          <el-table-column prop="productType" label="产品类型"></el-table-column>
          <el-table-column prop="baseArea" label="基地面积"></el-table-column>
          <el-table-column prop="baseAddress" label="基地地址(到村)"></el-table-column>
          <el-table-column prop="coincident" label="与部基地,产品基地重合(是/否)"></el-table-column>
          <el-table-column prop="company" label="应扣除的重合部分(重合企业/部基地)"></el-table-column>
          <el-table-column prop="coincidentArea" label="应扣除的重合部分(重合面积)"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
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
            "常熟市尚湖镇罗墩村、常兴村、新裕村、吉桥村、练南村、福寿村、新鑫村、新和村、新巷村",
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
            "常熟市尚湖镇罗墩村、常兴村、新裕村、吉桥村、练南村、福寿村、新鑫村、新和村、新巷村",
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

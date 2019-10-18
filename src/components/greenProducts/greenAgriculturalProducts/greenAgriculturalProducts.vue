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

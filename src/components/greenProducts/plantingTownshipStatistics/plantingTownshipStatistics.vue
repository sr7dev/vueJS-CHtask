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

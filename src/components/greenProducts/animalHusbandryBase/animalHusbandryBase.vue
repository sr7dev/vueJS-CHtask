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
          <el-table-column prop="ecoTechnologicalZone" label="经济技术开发区(含碧溪)"></el-table-column>
          <el-table-column prop="highTechZone" label="高新技术产业开发区"></el-table-column>
          <el-table-column prop="chanfuStreet" label="常福街道"></el-table-column>
          <el-table-column prop="meiLizhen" label="梅李镇"></el-table-column>
          <el-table-column prop="haitangTown" label="海虞镇"></el-table-column>
          <el-table-column prop="guriTown" label="古里镇"></el-table-column>
          <el-table-column prop="shajibangTown" label="沙家浜镇"></el-table-column>
          <el-table-column prop="zhitangTown" label="支塘镇"></el-table-column>
          <el-table-column prop="dongYuzhen" label="董浜镇"></el-table-column>
          <el-table-column prop="xinzhuangTown" label="辛庄镇"></el-table-column>
          <el-table-column prop="shanghuTown" label="尚湖镇"></el-table-column>
          <el-table-column prop="total" label="合计"></el-table-column>
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
          ecoTechnologicalZone: 26.9,
          highTechZone: 28.9,
          chanfuStreet: 66.67,
          meiLizhen: 100,
          haitangTown: 0,
          guriTown: 22.8,
          shajibangTown: 0,
          zhitangTown: 229,
          dongYuzhen: 11.1,
          xinzhuangTown: 20,
          shanghuTown: 5,
          total: 3.4
        },
        {
          ecoTechnologicalZone: 26.9,
          highTechZone: 28.9,
          chanfuStreet: 66.67,
          meiLizhen: 100,
          haitangTown: 0,
          guriTown: 22.8,
          shajibangTown: 0,
          zhitangTown: 229,
          dongYuzhen: 11.1,
          xinzhuangTown: 20,
          shanghuTown: 5,
          total: 3.4
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

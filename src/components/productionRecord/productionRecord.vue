<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">生产记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button size="small" type="primary" plain v-on:click="$router.push(`/productionRecord/create`)">添加</el-button>
      </div>
      <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;你确定要删除吗?</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
          <el-button size="small" type="success" @click="deleteRow()" plain>确认</el-button>
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
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productionQuantity" label="产量（公斤)"></el-table-column>
          <el-table-column prop="productionArea" label="产地"></el-table-column>
          <el-table-column prop="productionTime" label="生产时长">
            <template slot-scope="{ row }">{{ row.productionTime }}天</template>
          </el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button size="small"
                type="success"
                plain
                v-on:click="
                  $router.push({
                    path: `/productionRecord/editProductionRecord/${row.id}`
                  })
                "
              >修改</el-button>
              <el-button size="small" type="danger" @click="showConfirmDialog(`${row.id}`)" plain>删除</el-button>
            </template>
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
import Request from "../../services/api/request.js";
export default {
  name: "productionRecord",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      tableData: [],
      listLoading: false,
      confirm_dialogVisible: false,
      selectedId: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/production_record/all", {
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize
        })
        .then(response => {
          this.tableData = response.data;
          this.total = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteRow() {
      Request()
        .delete("/api/production_record/delete/" + this.selectedId)
        .then(response => {
          setTimeout(() => {
            this.confirm_dialogVisible = false;
          }, 0.5 * 1000);
          this.getData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    showConfirmDialog(id) {
      this.selectedId = id;
      this.confirm_dialogVisible = true;
    }
  }
};
</script>

<style lang="scss">
</style>
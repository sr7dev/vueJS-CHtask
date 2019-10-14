<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产主体</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">仓储环境</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button
            type="primary"
            plain
            @click="$router.push({
              path: `/productionSubject/warehouseEnv/addWarehouse/${id}`              
            })"
            v-if="loggedinUserType === 3"
          >添加</el-button>
          <el-button type="primary" plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column
          :formatter="order"
          label="序号"
          width="70"
        ></el-table-column>
        <el-table-column prop="warehouseName" label="仓库名称" >
          <template slot-scope="{ row }">
            {{row.warehouseName}}
          </template>
        </el-table-column>
        <el-table-column prop="warehouseAddress" label="仓库地址" >
          <template slot-scope="{ row }">
            {{row.warehouseAddress}}
          </template>
        </el-table-column>
        <el-table-column prop="warehouseArea" label="仓库面积" >
          <template slot-scope="{ row }">
            {{row.warehouseArea}}
          </template>
        </el-table-column>
        <el-table-column prop="warehouseScope" label="仓库规模">
          <template slot-scope="{ row }">
            {{row.warehouseScope}}
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="{ row }">
            <el-button 
              type="success" 
              v-on:click="showDetailWarehouse(row)"
              v-if="loggedinUserType === 3"
            >修改</el-button>          
            <el-button 
              type="danger" 
              v-on:click="handleDelete(`${row.id}`)" 
              plain
              v-if="loggedinUserType === 3"
            >删除</el-button>
            <el-button 
              type="primary" 
              v-on:click="showViewWarehouse(row)"
              v-if="loggedinUserType !== 3"
            >查看</el-button>  
          </template>
        </el-table-column>         
      </el-table>
      <div class="pageBox">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page.pageIndex"
          :limit.sync="page.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
import Pagination from "@/components/common/pagination";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "warehouseEnv",
  components: { Pagination },
  data() {
    return {
      loggedinUserType: null,
      id: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      radio: "1",
      tableData: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList(this.id);
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    showDetailWarehouse(row) {
      this.$router.push({
        path: `/productionSubject/warehouseEnv/detailsWarehouse/${this.id}`,
        query: {id: row.id}
      });
    },
    showViewWarehouse(row) {
      this.$router.push({
        path: `/productionSubject/warehouseEnv/viewWarehouse/${this.id}`,
        query: {id: row.id}
      });
    },
    getList(id) {
      this.listLoading = true;
      Request()
        .get("/api/warehose/all", {
          company_id: id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "id"
        })
        .then(response => {
          this.tableData = response.data;
          this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 100);
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
    goBack() {
      this.$router.go(-1);
    },
    handleDelete(id) {
       this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'})
      .then(() => {
        Request()
          .delete("/api/warehouse/delete/" + id)
          .then(response => {
            this.getList(this.id);
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./warehouseEnv.scss";
</style>

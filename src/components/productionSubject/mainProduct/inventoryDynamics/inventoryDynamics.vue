<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">库存动态</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button
            size="small"
            type="primary"
            plain
            @click="$router.push({
              path: `/productionSubject/mainProduct/inventoryDynamics/addInventoryDynamics/${companyId}`,
              query: {
                productId: productId
              }
            })"
            v-if="loggedinUserType === 3 || loggedinUserType === 0"
          >添加</el-button>
          <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="productName" label="产品名称">
          <template slot-scope="{ row }">
            {{
            filterProduct(row.productId)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="warehouse" label="所在仓库">
          <template slot-scope="{ row }">
            {{
            filterWarehouse(row.warehouseId)
            }}
          </template>
        </el-table-column>
        <el-table-column prop="repertoryAmount" label="储存数量">
          <template slot-scope="{ row }">{{ row.repertoryAmount }}</template>
        </el-table-column>
        <el-table-column prop="variety" label="品种">
          <template slot-scope="{ row }">{{ row.variety }}</template>
        </el-table-column>
        <el-table-column prop="grade" label="评级">
          <template slot-scope="{row}">
            {{
            getGradeName(row.grade)
            }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="loggedinUserType === 3 || loggedinUserType === 0"
          label="操作"
          class-name="text-center"
        >
          <template slot-scope="{ row }">
            <el-button
              size="small"
              type="success"
              plain
              @click="$router.push({
                path: `/productionSubject/mainProduct/inventoryDynamics/editInventoryDynamics/${row.id}`,
                query: {
                  productId: row.productId,
                  repertoryAmount: row.repertoryAmount,
                  warehouseId: row.warehouseId,
                  grade: row.grade,
                  variety: row.variety,
                  companyId: companyId
                }
              })
              "
            >修改</el-button>
            <el-button size="small" type="danger" v-on:click="handleDelete(`${row.id}`)" plain>删除</el-button>
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
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "inventoryDynamics",
  components: { Pagination },
  data() {
    return {
      loggedinUserType: null,
      companyId: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      radio: "1",
      tableData: null,
      productName: "",
      warehouses: [],
      productId: -1,
      productDetail: []
    };
  },
  created() {
    this.companyId = this.$route.params.id;
    this.productId = this.$route.query.productId;
    this.getList();
    this.getProductionDetail();
    this.getWarehouseDetail();
    this.loggedinUserType = Auth().user().userType;
  },
  methods: {
    handleDelete(id) {
      this.$confirm("确认删除该记录吗?", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          Request()
            .delete("/api/product_repetory/delete/" + id)
            .then(response => {
              this.getList();
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
            })
            .catch(error => {
              console.log(error);
            });
        }
      );
    },
    getWarehouseDetail() {
      Request()
        .get("/api/warehose/all", {
          company_id: this.companyId,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "id"
        })
        .then(response => {
          this.warehouses = response.data;
        })
        .catch(error => {
          error;
        });
    },
    filterWarehouse(ID) {
      console.log(this.warehouses, ID);
      let warehouse = this.warehouses.find(x => x.id === ID);
      console.log(warehouse);
      if (warehouse) {
        return warehouse.warehouseName;
      } else {
        return "";
      }
    },
    getGradeName(id) {
      const grade = ["低级", "中级", "高级", "特级"];
      return grade[id - 1];
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/product_repetory/all", {
          product_id: this.productId,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize
        })
        .then(res => {
          this.tableData = res.data;
          this.total = res.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    getProductionDetail() {
      Request()
        .get("/api/product_production/name")
        .then(response => {
          this.productDetail = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterProduct(ID) {
      let product = this.productDetail.find(x => x.productId === ID);
      if (product) {
        return product.productName;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./inventoryDynamics.scss";
</style>

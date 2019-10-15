<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">属性管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button
            type="primary"
            plain
            style="margin-right: .5rem"
            @click="$router.push({
              path: `/productionSubject/mainProduct/productProperty/addProductProperty/${id}`
            })"
          >添加</el-button>
          <el-select
            v-model="processType"
            :disabled="!(options.length > 0)"
            style="margin-right: .5rem"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="propertyName" label="属性名称">
          <template slot-scope="{ row }">{{ row.propertyName }}</template>
        </el-table-column>
        <el-table-column prop="propertyOptions" label="选项排序">
          <template slot-scope="{ row }">{{ row.propertyOptions }}</template>
        </el-table-column>
        <el-table-column label="操作" class-name="text-center">
          <template slot-scope="{ row }">
            <el-button
              type="success"
              plain
              @click="$router.push({
                path: `/productionSubject/mainProduct/productProperty/editProductProperty/${id}`,
                query: {
                  id: row.id
                }
              })
              "
            >修改</el-button>
            <el-button type="danger" v-on:click="handleDelete(`${row.id}`)" plain>删除</el-button>
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
export default {
  name: "productProperty",
  components: { Pagination },
  data() {
    return {
      id: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      radio: "1",
      tableData: null,
      productName: "",
      propertyName: "",
      propertyOptions: "",
      propertySort: "",
      options: [
        { value: "1", label: "属性共享" },
        { value: "2", label: "银针" },
        { value: "3", label: "白牡丹" }
      ],
      processType: ""
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.productName = this.$route.query.productName;
    this.getList(this.id);
  },
  methods: {
    handleDelete(id) {
      this.$confirm("确认删除该记录吗?", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          Request()
            .delete("/api/product_property/delete/" + id)
            .then(response => {
              this.getList(this.id);
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
    getList(id) {
      this.listLoading = true;
      Request()
        .get("/api/product_property/all", {
          productId: id,
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./productProperty.scss";
</style>

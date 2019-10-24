<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item>属性管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">/编辑选项</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button size="small"
            type="primary"
            plain
            style="margin-right: .5rem"
            @click="$router.push({
              path: `/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/addCustomProductProperty/${id}`,
              query: {
                productId: productId,
                optionData: tableData,
                propertySort: propertySort,
                companyId: companyId
              }
            })"
          >添加</el-button>
          <el-button size="small" 
            type="primary" 
            plain 
            v-on:click="goBack()">返回</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
      >
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column label="选项名称">
          <template slot-scope="{ row }">{{ row.name }}</template>
        </el-table-column>
        <el-table-column label="选项排序">
          <template>{{ propertySort }}</template>
        </el-table-column>
        <el-table-column label="操作" class-name="text-center">
          <template slot-scope="{ row }">
            <el-button size="small"
              type="success"
              plain
              @click="$router.push({
                path: `/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/editCustomProductProperty/${id}`,
                query: {
                  productId: productId,
                  optionData: tableData,
                  propertySort: propertySort,
                  companyId: companyId,
                  id: row.rowIndex
                }
              })
              "
            >修改</el-button>
            <el-button size="small" type="danger" v-on:click="handleDelete(`${rowIndex}`)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
export default {
  name: "customProductProperty",
  data() {
    return {
      id: -1,
      companyId: -1,
      productId: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      tableData: null,
      propertySort: null,
      listLoading: true,
      total: 0,
      radio: "1",
      name: "",
      sort: "",
      customValue: 1
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.productId = this.$route.query.productId;
    this.tableData = this.$route.query.optionData;
    this.propertySort = this.$route.query.propertySort;
    this.companyId = this.$route.query.companyId;
  },
  methods: {
    handleDelete(id) {
      this.$confirm("确认删除该记录吗?", "提示", { type: "warning" }).then(
        () => {
          this.tableData.splice(id, 1);
        }
      );
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    goBack() {
      this.$router.push({
        path: `/productionSubject/mainProduct/productProperty/editProductProperty/${this.id}`,
        query: {
          productId: this.productId,
          optionData: this.tableData,
          propertySort: this.propertySort,
          companyId: this.companyId,
          customValue: 1
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./customProductProperty.scss";
</style>

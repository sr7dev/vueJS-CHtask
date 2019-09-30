<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button @click="goAdd()" plain type="primary">添加</el-button>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
        >
          <el-table-column
            :formatter="order"
            label="序号"
            width="180"
          ></el-table-column>
          <el-table-column prop="name" label="产品名称"></el-table-column>
          <el-table-column
            prop="classification"
            label="是否有机"
          ></el-table-column>
          <el-table-column prop="classification" label="单价"></el-table-column>
          <el-table-column prop="type" label="产地"></el-table-column>
          <el-table-column prop="bookNo" label="品种"></el-table-column>
          <el-table-column prop="date" label="规格"></el-table-column>
          <el-table-column prop="date" label="评级"></el-table-column>
          <el-table-column prop="yield" label="操作">
            <!-- <template slot-scope="scope"> -->
            <template>
              <el-tooltip
                class="item"
                effect="dark"
                content="产品批次"
                placement="top"
              >
                <el-button
                  icon="el-icon-edit"
                  circle
                  @click="goProductBatch()"
                  plain
                  type="success"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="作业定义"
                placement="top"
              >
                <el-button
                  icon="el-icon-warning-outline"
                  circle
                  plain
                  type="primary"
                  @click="goJobDefinition()"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="品种定义"
                placement="top"
              >
                <el-button
                  icon="el-icon-office-building"
                  circle
                  @click="goVarietyDefinition()"
                  plain
                  type="warning"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="修改"
                placement="top"
              >
                <el-button
                  icon="el-icon-edit"
                  circle
                  @click="goEdit()"
                  plain
                  type="danger"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="第三方抽检记录"
                placement="top"
              >
                <el-button
                  icon="el-icon-close"
                  circle
                  @click="goThirdRecords()"
                  plain
                  type="info"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="属性管理"
                placement="top"
              >
                <el-button
                  icon="el-icon-warning-outline"
                  circle
                  @click="goAttributeManagement()"
                  plain
                  type="danger"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="定义等级"
                placement="top"
              >
                <el-button
                  icon="el-icon-office-building"
                  circle
                  @click="goDefinitionLevel()"
                  plain
                  type="success"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="库存动态"
                placement="top"
              >
                <el-button
                  icon="el-icon-close"
                  circle
                  @click="gocInventoryDynamics()"
                  plain
                  type="danger"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <el-pagination
          v-if="total > page.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageIndex"
          :page-sizes="[10, 20, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 100,
      options: [
        {
          value: "全部",
          label: ""
        }
      ],
      tableData: [
        {
          name: "产品",
          classification: "分类",
          type: "认证类型",
          bookNo: "123456",
          date: "2018-09-01至2020-05-01",
          limitedPeriod: "1年",
          yield: "600"
        },
        {
          name: "产品",
          classification: "分类",
          type: "认证类型",
          bookNo: "123456",
          date: "2018-09-01至2020-05-01",
          limitedPeriod: "1年",
          yield: "600"
        },
        {
          name: "产品",
          classification: "分类",
          type: "认证类型",
          bookNo: "123456",
          date: "2018-09-01至2020-05-01",
          limitedPeriod: "1年",
          yield: "600"
        },
        {
          name: "产品",
          classification: "分类",
          type: "认证类型",
          bookNo: "123456",
          date: "2018-09-01至2020-05-01",
          limitedPeriod: "1年",
          yield: "600"
        }
      ]
    };
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    //分页数量改变
    handleSizeChange(val) {
      let that = this;
      that.page.pageSize = val;
      that.fullPage(1);
    },
    //分页索引改变
    handleCurrentChange(val) {
      let that = this;
      that.page.pageIndex = val;
      that.fullPage(1);
    },
    //跳转产品批次
    goProductBatch() {
      this.$router.push({ path: "cp_productBatch" });
    },
    //跳转作业定义
    goJobDefinition() {
      this.$router.push({ path: "cp_jobDefinition" });
    },
    //跳转品种定义
    goVarietyDefinition() {
      this.$router.push({ path: "cp_varietyDefinition" });
    },
    //编辑
    goEdit() {
      this.$router.push({ path: "cp_editProduct" });
    },
    // 添加
    goAdd() {
      this.$router.push({ path: "cp_editProduct" });
    },
    //跳转第三方抽检记录
    goThirdRecords() {
      this.$router.push({ path: "cp_thirdRecords" });
    },
    //跳转属性管理
    goAttributeManagement() {
      this.$router.push({ path: "cp_attributeManagement" });
    },
    //跳转定义等级
    goDefinitionLevel() {
      this.$router.push({ path: "cp_definitionLevel" });
    },
    //跳转库存动态
    gocInventoryDynamics() {
      this.$router.push({ path: "cp_inventoryDynamics" });
    }
  }
};
</script>

<style scoped>
</style>

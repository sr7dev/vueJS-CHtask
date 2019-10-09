<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item>定义等级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button
          style="margin-right: 25px"
          @click="add()"
          plain
          type="primary"
          >添加</el-button
        >
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
          <el-table-column prop="name" label="等级名称"></el-table-column>
          <el-table-column
            prop="classification"
            label="等级排序"
          ></el-table-column>
          <el-table-column prop="yield" label="操作">
            <!-- <template slot-scope="scope"> -->
            <template>
              <el-tooltip
                class="item"
                effect="dark"
                content="修改"
                placement="top"
              >
                <el-button
                  icon="el-icon-edit"
                  circle
                  @click="edit()"
                  plain
                  type="warn"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <el-button
                  icon="el-icon-close"
                  circle
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="150px">
        <el-form-item label="等级名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="等级排序">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" plain type="success"
          >取 消</el-button
        >
        <el-button type="primary" @click="dialogFormVisible = false" plain
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTitle: "添加等级",
      dialogFormVisible: false,
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
      form: {
        name: ""
      },
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
    //添加
    add() {
      let that = this;
      that.dialogFormVisible = true;
    },
    edit() {
      let that = this;
      that.dialogFormVisible = true;
    }
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // }
  }
};
</script>

<style scoped>
</style>

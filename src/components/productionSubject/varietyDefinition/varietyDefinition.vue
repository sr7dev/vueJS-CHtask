<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item>品种定义</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button size="small"
          type="primary"
          @click="$router.push(`/productVariety/create/${productId}`)"
          plain
        >添加</el-button>
        <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
        <!-- <div class="select_label">是否共享</div>
        <el-select v-model="filter_Share" placeholder="请选择是否共享" @change="getList()">
          <el-option  v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
      </div>

      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
        >
          <el-table-column :formatter="order" label="序号" width="180"></el-table-column>
          <el-table-column prop="varietyName" label="品种名称"></el-table-column>
          <el-table-column prop="varietySort" label="品种排序"></el-table-column>
          <el-table-column prop="yield" label="操作" class-name="text-center">
            <!-- <template slot-scope="scope"> -->
            <template slot-scope="{ row }">
              <el-button size="small"
                @click="$router.push({path:`/productVariety/edit/${row.id}`})"
                plain
                type="success"
              >修改</el-button>
              <el-button size="small" @click="handleDelete(`${row.id}`)" plain type="danger">删除</el-button>
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
  name: "varietyDefinition",
  components: { Pagination },
  data() {
    return {
      filter_Share: 0,
      productId: -1,
      listLoading: false,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      options: [
        { value: 0, label: "全部" },
        { value: 1, label: "否" },
        { value: 2, label: "是" }
      ],
      tableData: []
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/product_variety/all", {
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          productId: this.productId,
          sortBy: "id"
        })
        .then(response => {
          var tempData = response.data;
          this.total = tempData.length;

          // if (this.filter_Share == 1) {
          //   this.tableData = tempData.filter(function(obj){
          //       return obj.doShare == 0;
          //   })
          // }
          // else if ( this.filter_Share == 2) {
          //   this.tableData = tempData.filter(function(obj){
          //       return obj.doShare == 1;
          //   })
          // }
          // else {
          this.tableData = tempData;
          // }

          setTimeout(() => {
            this.listLoading = false;
          }, 0.01 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleDelete(id) {
      this.$confirm("确认删除该记录吗?", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          Request()
            .delete("/api/product_variety/delete/" + id)
            .then(response => {
              this.getList();
            })
            .catch(error => {
              console.log(error);
            });
        }
      );
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

<style scoped>
</style>

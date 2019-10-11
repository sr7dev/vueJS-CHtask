<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">生产标准</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-row class="w-100">
          <el-col :span="6">
            <div class="select_label no-margin-left">产品名称</div>
            <el-input v-model="productName" @change="getList()" class="w-80"></el-input>
          </el-col>
          <el-col :span="6">
            <div class="select_label">类别</div>
            <el-select v-model="category" @change="getList()">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button
              type="primary"
              v-on:click="$router.push(`/productionStandard/create`)"
              plain
            >添加</el-button>
          </el-col>
        </el-row>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
          <el-table-column prop="productName" label="产品"></el-table-column>
          <el-table-column prop="category" label="类别"></el-table-column>
          <el-table-column prop="releaseTime" label="发布时间" class-name="text-center">
            <template slot-scope="{ row }">{{ row.releaseTime | formatDate }}</template>
          </el-table-column>
          <el-table-column prop="releasePerson" label="发布者"></el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                plain
                v-on:click="
                  $router.push({
                    path: `/productionStandard/detail/`+ row.id
                  })
                "
              >查看</el-button>
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
          layout="prev, pager, next, sizes, jumper"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";
export default {
  name: "productStandard",
  components: { Pagination },
  data() {
    return {
      releaseTimeFrom: "",
      releaseTimeTo: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: [],
      productName: "",
      category: 0,
      options: [
        { id: 0, name: "全部" },
        { id: 1, name: "畜牧业" },
        { id: 2, name: "水产业" },
        { id: 3, name: "养殖业" }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/production_standard/all", {
          category: this.category,
          productName: this.productName,
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
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    filterCategory(id) {
      let category = this.options.find(x => x.id === id);
      if (category) {
        return category.name;
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
</style>
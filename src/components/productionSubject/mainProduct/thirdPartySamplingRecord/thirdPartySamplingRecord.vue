<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">第三方抽检记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button
            size="small"
            type="primary"
            @click="
                    $router.push({
                      path:`/productionSubject/mainProduct/thirdPartySampling/create/${id}`
                    })"
            v-if="loggedinUserType === 3 || loggedinUserType === 0"
            plain
          >添加</el-button>
          <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <div class="iptBox">
        <div class="filter-item">银针 第三方质量安全检测记录</div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="productCheckTime" label="日期" width="150">
          <template slot-scope="{ row }">
            {{
            row.productCheckTime | formatDate
            }}
          </template>
        </el-table-column>
        <el-table-column prop="specimen" label="样品" width="150"></el-table-column>
        <el-table-column prop="checkItem" label="检测项目" width="150"></el-table-column>
        <el-table-column prop="checkResult" label="检测结果">
          <template slot-scope="{ row }">
            {{
            row.checkResult == 1 ? "阴性" : "阳性"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="determine" label="判定">
          <template slot-scope="{ row }">
            {{
            row.determine ? "合格" : "不合格"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="checkStandard" label="检测标准"></el-table-column>
        <el-table-column prop="checkOrganization" label="检测机构"></el-table-column>
        <el-table-column
          label="操作"
          v-if="loggedinUserType === 3 || loggedinUserType === 0"
          class-name="text-center"
        >
          <template slot-scope="{ row }">
            <el-button
              size="small"
              type="success"
              plain
              v-on:click="
                  $router.push({
                    path: `/productionSubject/mainProduct/thirdPartySampling/edit/${row.id}`,
                    query: {                      
                      checkId: row.id
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
  name: "thirdPartySamplingRecord",
  components: { Pagination },
  data() {
    return {
      loggedinUserType: null,
      id: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 100,
      radio: "1",
      tableData: [],
      listLoading: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList(this.id);
    this.loggedinUserType = Auth().user().userType;
  },
  methods: {
    getList(id) {
      this.listLoading = true;
      Request()
        .get("/api/product_check_record/all", {
          product_id: this.id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize
        })
        .then(response => {
          this.tableData = response.data;
          this.total = this.tableData.length;
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
    handleDelete(id) {
      this.$confirm("确认删除该记录吗?", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          Request()
            .delete("/api/product_check_record/delete/" + id)
            .then(response => {
              this.getList();
            })
            .catch(error => {
              console.log(error);
            });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./thirdPartySamplingRecord.scss";
</style>

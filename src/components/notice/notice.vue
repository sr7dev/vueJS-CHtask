<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">通知管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">通知公告</div>
      <div class="iptBox">
        <el-button type="primary" v-on:click="$router.push({path: `/notice/create`})" plain>发布公告</el-button>
        <el-button type="primary" plain>短信记录</el-button>
        <el-button 
          type="primary" 
          plain 
          v-if="loggedinUserType===0 || loggedinUserType===1"
          v-on:click="$router.push({path: `/notice/smsNotice`})"
        >短信通知</el-button>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column prop="type" label="类型" width="180"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="releaseTime" label="日期">
            <template slot-scope="{ row }">{{ row.releaseTime | formatDate }}</template>
          </el-table-column>
          <el-table-column prop="releasePerson" label="作者"></el-table-column>
          <el-table-column prop="emergencyDegree" label="紧急程度">
            <template slot-scope="{ row }">{{ getEmergencyDegree(row.emergencyDegree) }}</template>
          </el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                plain
                v-on:click="$router.push({path: `/notice/view/${row.id}`})"
              >查看</el-button>
              <el-button
                type="warning"
                v-on:click="$router.push({path: `/notice/edit/${row.id}`})"
                plain
              >修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <Pagination
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
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "notice",
  components: { Pagination },
  data() {
    return {
      loggedinUserType: null,
      releasePerson: "",
      emergencyDegree: 0,
      releaseTime: "",
      title: "",
      type: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: [],
      emergencyDegrees: [
        { id: 0, name: "高" },
        { id: 1, name: "中" },
        { id: 2, name: "低" }
      ]
    };
  },
  mounted() {
    this.getList();
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/notice/all", {
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
    getEmergencyDegree(id) {
      let type = this.emergencyDegrees.find(x => x.id === parseInt(id));
      if (type) {
        return type.name;
      } else {
        return "";
      }
    },
    handleDelete(id) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        Request()
          .delete("/api/job_definition/delete/" + id)
          .then(response => {
            this.getList();
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }
};
</script>

<style lang="scss">
@import "./notice.scss";
</style>
<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>通知管理</el-breadcrumb-item>
        <el-breadcrumb-item>通知公告</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">短信记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">短信记录</div>
      <div class="iptBox">
        <el-button type="primary" v-on:click="$router.go(-1)" plain>返回</el-button>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="80"></el-table-column>
          <el-table-column prop="sendTime" label="发送时间">
						<template slot-scope="{ row }">
              {{ row.sendTime | formatDate }}
            </template>
					</el-table-column>
          <el-table-column prop="noticeContents" label="短信内容" width="500"></el-table-column>
          <el-table-column prop="sender" label="发送人"></el-table-column>
          <el-table-column prop="sendStatus" label="发送结果">
            <template slot-scope="{ row }">
							{{ getSendStatus(row.sendStatus) }}</template>
          </el-table-column>
          <el-table-column label="发送数量" prop="sendCount"></el-table-column>
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
import Request from "@/services/api/request.js";
// import Auth from "@/services/authentication/auth.js";
export default {
  name: "detailSms",
  components: { Pagination },
  data() {
    return {
      // loggedinUserType: null,
      sendTime: "",
      noticeContents: 0,
      sendStatus: "",
      sender: "",
      sendCount: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: [],
    };
  },
  mounted() {
    this.getList();
    // this.loggedinUserType = Auth().user().attrs.userType;
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
        .get("/api/notice_record/all", {
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
    getSendStatus(id) {
      if (id == 1) {
				return "成功";
			}
			if (id == 0) {
				return "失败";
			}
    },
  }
};
</script>

<style lang="scss">
</style>
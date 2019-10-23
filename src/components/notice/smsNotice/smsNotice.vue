<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>通知管理</el-breadcrumb-item>
        <el-breadcrumb-item>通知公告</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">短信通知</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-row style="width: 1280px">
					<el-col style="width:100px;text-align:center">短信内容</el-col>
					<el-col style="width:1080px">
						<el-input 
							type="textarea" 
							v-model="content" 
              auto-complete="off"
              :rows="10"
						></el-input>
					</el-col>
        </el-row>
      </div>
			<div class="iptBox" style="margin-left:100px;width:800px">
				<el-checkbox v-model="checked">全选</el-checkbox>
				<el-item style="margin-left: 550px">
					共选择了0位联系人
					<el-button type="primary" @click="postData">发送</el-button>
				</el-item>
				<div style="width: 800px; margin:5px 0 5% 0">
					<el-table
						:data="tableData"
						v-loading="listLoading"
						style="width: 100%"
						:row-class-name="rowIndex"
						highlight-current-row
					>
						<el-table-column prop="type" label="单位" width="180"></el-table-column>
						<el-table-column prop="title" label="联系人"></el-table-column>
						<el-table-column prop="releaseTime" label="手机">
							<template slot-scope="{ row }">{{ row.releaseTime | formatDate }}</template>
						</el-table-column>
					</el-table>
				</div>
				<el-button plain @click="$router.go(-1)" type="success">返回</el-button>
			</div>
    </div>
  </div>
</template>
<script>
import Request from "../../../services/api/request.js";
export default {
  name: "smsNotice",
  data() {
    return {
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
</style>
<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>通知管理</el-breadcrumb-item>
        <el-breadcrumb-item>通知公告</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">短信通知</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box" v-loading="listLoading">
      <div class="iptBox">
        <el-row style="width: 1280px">
          <el-col style="width:100px;text-align:center">短信内容</el-col>
          <el-col style="width:1080px">
            <el-input type="textarea" v-model="content" auto-complete="off" :rows="10"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="iptBox" style="margin-left:100px;width:800px">
        <!-- <el-checkbox @change="selsChange">全选</el-checkbox> -->
        <span style="margin:0 auto; margin-right: 0;">
          共选择了{{ selectCount }}位联系人
          <el-button type="primary" @click="postData">发送</el-button>
        </span>
        <div style="width: 800px; margin:5px 0 5% 0">
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="rowIndex"
            highlight-current-row
            @selection-change="selsChange"
          >
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column prop="townId" label="单位" width="280">
              <template slot-scope="{ row }">
                {{
                getTownName(row.townId)
                }}
              </template>
            </el-table-column>
            <el-table-column prop="contactPerson" label="联系人"></el-table-column>
            <el-table-column prop="contactWay" label="手机"></el-table-column>
          </el-table>
        </div>
        <el-button plain @click="$router.go(-1)" type="success">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Request from "../../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";
import { Urls } from "@/services/constants.js";
import Storage from "store";
export default {
  name: "smsNotice",
  data() {
    return {
      loggedinUserName: "",
      listLoading: true,
      total: 0,
      tableData: [],
      selectCount: 0,
      township: [],
      receiver: [],
      content: "",
      title: "",
      checkedAll: false,
      isIndeterminate: true,
      checkedItem: false,
      sels: [],
      id: ""
    };
  },
  mounted() {
    this.getList();
    this.getTown();
    // this.loggedinUserName = Auth().user().contactName;
    this.loggedinUserName = Auth().user().username;
    this.id = this.$route.params.id;
    this.getData(this.id);
  },
  methods: {
    getData(id) {
      this.listLoading = true;
      Request()
        .get("/api/notice/get/" + id)
        .then(response => {
          this.content = response.content;
          this.title = response.title;
          setTimeout(() => {
            this.dataloading = false;
          }, 0.01 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTown() {
      this.listLoading = true;
      Request()
        .get("/api/town/all")
        .then(response => {
          this.township = this.township.concat(response);
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTownName(id) {
      let item = this.township.find(x => x.id === id);
      if (item) {
        return item.name + "农产品质量安全监管站";
      } else {
        return "";
      }
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/user/all", {
          userType: 2,
          sortBy: "id"
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
    postData() {
      this.listLoading = true;
      let dataInfo = [];
      // Request()
      //   .post("/api/notice_record/create", {
      //     noticeContents: this.content,
      //     noticeId: this.id,
      //     sendTime: new Date().toJSON(),
      //     sender: this.loggedinUserName,
      //     sendStatus: 1,
      //     sendCount: 0,
      //     receiverInfo: JSON.stringify(dataInfo),
      //     id: 0
      //   })
      Request()
        .post("/api/sendMsg", {
          content: this.content,
          sender: Storage.get("userData").mobile,
          mobile: this.receiver,
          msgType: 2,
          title: this.title
        })
        .then(response => {
          // this.tableData = response.data;
          // this.total = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
          this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        });
    },
    selsChange: function(sels) {
      this.sels = sels;
      for (let i = 0; i < this.sels.length; i++) {
        if (this.sels[i].contactWay)
          this.receiver.push(this.sels[i].contactWay);
      }
      this.receiver.push("sdfsdfsf");
      // console.log(Storage.get("userData").mobile);
      this.selectCount = this.sels.length;
    }
  }
};
</script>

<style lang="scss"></style>

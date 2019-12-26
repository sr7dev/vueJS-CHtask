<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工作任务</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box" v-if="!workData" v-loading="pageLoading">
      <div>装货...</div>
    </div>
    <div class="box" v-else>
      <el-row class="w-100 text-center margin-bottom-30">
        <el-col>
          <h1 class="middle-font">{{workData.title}}</h1>
        </el-col>
      </el-row>
      <el-row class="w-100 text-center margin-bottom-30 flex-justify-center">
        <el-col :span="5">发布日期：{{workData.releaseTime | formatDate}}</el-col>
        <el-col :span="5">发布者：{{workData.releasePerson}}</el-col>
      </el-row>
      <el-row class="w-100 text-center flex-justify-center margin-bottom-30">
        <el-col :span="12">{{workData.content}}</el-col>
      </el-row>
      <el-row class="w-100 flex-justify-center margin-bottom-30" v-if="workData.workTaskProfiles">
        <el-col :span="12">
          <el-button size="small" type="warning" plain @click="downloadFile()">附件下载</el-button>
          <span
            class="margin-left-20"
            v-if="workData.workTaskProfiles"
          >{{workData.workTaskProfiles.replace("/uploads/", "")}}</span>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-30">
        <el-col class="middle-font margin-left-20">工作任务汇报</el-col>
      </el-row>
      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column prop="reportTime" label="时间" class-name="padding-left-20">
            <template slot-scope="{ row }">{{ row.reportTime | formatDate }}</template>
          </el-table-column>
          <el-table-column prop="reportContent" label="汇报内容"></el-table-column>
          <el-table-column prop="townId" label="汇报单位">
            <template slot-scope="{ row }">{{filterTownName(row.townId)}}</template>
          </el-table-column>
          <el-table-column prop="reportPerson" label="汇报人"></el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page.pageIndex"
          :limit.sync="page.pageSize"
          @pagination="getTableData"
          layout="prev, pager, next, sizes, jumper"
        />
      </div>
      <el-button size="small" type="primary" plain v-on:click="$router.go(-1)">取消</el-button>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination";
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";
export default {
  name: "detailWorkTaskReport",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: false,
      pageLoading: true,
      total: 0,
      tableData: [],
      file: null,
      selectedId: null,
      workData: null,
      township: [{ id: -1, name: "全部" }]
    };
  },
  created() {
    this.selectedId = this.$route.params.id;
    this.getData(this.$route.params.id);
    this.getTableData();
    this.getTown();
  },
  methods: {
    getData(id) {
      Request()
        .get("/api/work_task/get/" + id)
        .then(response => {
          this.workData = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTableData() {
      this.listLoading = true;
      Request()
        .get("/api/work_task_report/all", {
          workTaskId: this.selectedId,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
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
    getTown() {
      Request()
        .get("/api/town/all")
        .then(response => {
          this.township = this.township.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.workData.workTaskProfiles,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          this.workData.workTaskProfiles.replace("/uploads/", "")
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    filterTownName(townId) {
      let town = this.township.find(x => x.id === townId);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss">
</style>
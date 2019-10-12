<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>共享文件</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">会议文件</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-row class="w-100">
          <el-col :span="3">
            <el-button type="primary" v-on:click="openDialog=true" plain>上传文件</el-button>
            <el-button type="warning" v-on:click="$router.go(-1)" plain>返回</el-button>
          </el-col>
          <el-col :span="5" class="margin-left-20 flex-center">
            <div>搜索</div>
            <el-input v-model="productId" class="w-80 margin-left-10"></el-input>
          </el-col>
        </el-row>
      </div>
      <el-dialog :visible.sync="openDialog" width="60%">
        <el-row>
          <el-col :span="3" class="margin-bottom-30 margin-left-30">文件上传</el-col>
        </el-row>
        <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="上传单位" prop="productId">
                <el-input v-model="productId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="上传者" prop="category">
                <el-input v-model="category"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <div class="item margin-left-30" style="display:flex">
                <div class="item-label" style="margin-bottom:20px;">
                  <input
                    type="file"
                    id="file"
                    style="display: none"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                  <el-button type="warning" plain @click="chooseFile()">添加附件</el-button>
                </div>
                <div
                  class="item-value"
                  style="margin-left:10px;
                      display: flex;
                      align-items: center;
                      padding-bottom: 20px;"
                >
                  <span v-if="file">({{ file.name }})</span>
                  <span v-else>请选择需要上传的文件...</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-form-item class="left-margin">
            <el-button @click="openDialog = false" type="primary" plain>添加</el-button>
            <el-button @click="openDialog = false" type="danger" plain>删除</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
          <el-table-column prop="releaseTime" label="文件名" class-name="text-center">
            <template slot-scope="{ row }">{{ row.releaseTime | formatDate }}</template>
          </el-table-column>
          <el-table-column prop="title" label="修改时间"></el-table-column>
          <el-table-column prop="releasePerson" label="上传单位"></el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template>
              <el-button type="success" plain>下载</el-button>
              <el-button type="danger" plain>删除</el-button>
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
import Request from "../../../services/api/request.js";
export default {
  name: "workTask",
  components: { Pagination },
  data() {
    return {
      openDialog: false,
      releaseTimeFrom: "",
      releaseTimeTo: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/work_task/all", {
          fromDate: this.creditCode,
          toDate: this.productCategory,
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
    chooseFile() {
      this.$refs.file.click();
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style scoped>
</style>
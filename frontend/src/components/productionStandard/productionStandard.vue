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
          <el-col :span="3">
            <el-button
              size="small"
              type="primary"
              v-on:click="$router.push(`/productionStandard/create`)"
              plain
              v-if="isShowAddButton"
            >添加生产标准</el-button>
          </el-col>
          <el-col :span="7">
            <div class="select_label no-margin-left">标准名称</div>
            <el-input v-model="productName" class="w-80"></el-input>
          </el-col>
          <el-button size="small" type="primary" @click="getList()" plain>搜索</el-button>
 
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
          <el-table-column prop="productStandard" label="标准">
            <template
              slot-scope="{ row }"
            >{{row.productStandard.indexOf("png") > -1 ? row.productStandard.replace(".png","") : row.productStandard}}</template>
          </el-table-column>

          <el-table-column prop="releaseTime" label="发布时间" class-name="text-center">
            <template slot-scope="{ row }">
              {{
              row.releaseTime | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column prop="releasePerson" label="发布者"></el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="primary"
                plain
                v-if="isShowEditButton"
                v-on:click="
                  $router.push({
                    path: `/productionStandard/detail/` + row.id
                  })
                "
              >查看</el-button>
              <el-button
                size="small"
                type="success"
                plain
                :disabled="
                  row.productionStandardProfiles == '' ||
                    row.productionStandardProfiles == undefined
                "
                v-on:click="
                  downloadStandardProfiles(row.productionStandardProfiles)
                "
              >下载</el-button>
            
              <el-button
                size="small"
                type="warning"
                plain
                v-if="isShowAddButton"
                v-on:click="
                  $router.push({
                    path: `/productionStandard/edit/` + row.id
                  })
                "
              >修改</el-button>
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
import Storage from "store";
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request.js";
import { Urls } from "@/services/constants";
import Auth from "@/services/authentication/auth.js";
import axios from "axios";

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
      downloadLoading: false,
      total: 0,
      tableData: [],
      productName: "",
      category: 0,
      isShowAddButton: null,
      isShowEditButton: null,
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
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "addProductionStandard"
    )
      ? true
      : false;
    this.isShowEditButton = Storage.get("authList").find(
      x => x.privilegeCode == "editRegulatoryObject"
    )
      ? true
      : false;
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/production_standard/all", {
          category: this.category,
          productName: this.productName,
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

    downloadStandardProfiles(profile) {
      const loading = this.$loading({
        lock: true,
        text: "正在下载中...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.8)"
      });
      this.downloadLoading = true;
      axios({
        url: Urls.DOWNLOAD_URL() + profile,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
         
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.setAttribute("download", profile.replace("/uploads/", "")); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, profile.replace("/uploads/", ""));
            return;
          }
        }
        setTimeout(() => {
          loading.close();
        }, 1000);
      });
      setTimeout(() => {
        if (this.downloadLoading) loading.close();
      }, 8000);
    },
    isIE() {
      let ua = navigator.userAgent;
      return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    filterCategory(id) {
      let category = this.options.find(x => x.id === parseInt(id));
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
.el-loading-spinner i {
  font-size: 3rem !important;
  font-weight: bold !important;
}
.el-loading-spinner .el-loading-text {
  font-size: 2rem !important;
  font-weight: bold !important;
}
</style>

<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">监管网格</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" label="名称" width="120">
            <!-- <template slot-scope="{row}">{{filterTown(row.id)}}</template> -->
          </el-table-column>
          <el-table-column prop="group1" label="分管副镇长">
            <template slot-scope="{row}">
              <div class="w-100">
                <p class="p-item" v-for="item in row.group1" :key="item.id">
                  <i class="el-icon-user-solid"></i>
                  {{item.title}}:{{item.name}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="group2" label="农服办">
            <template slot-scope="{row}">
              <div class="w-100">
                <p class="p-item">
                  <i class="el-icon-user-solid"></i>
                  站长:{{row.level2header.name}}
                </p>
                <p class="p-item" v-for="item in row.group2" :key="item.id">
                  <i class="el-icon-user-solid"></i>
                  {{item.title}}:{{item.name}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="group3" label="站所">
            <template slot-scope="{row}">
              <div class="w-100">
                <p class="p-item" v-for="item in row.group3" :key="item.id">
                  <i class="el-icon-user-solid"></i>
                  {{item.title}}:{{item.name}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="group4" label="村级协管">
            <template slot-scope="{row}">
              <div class="w-100">
                <p class="p-item" v-for="item in row.group4" :key="item.id">
                  <i class="el-icon-user-solid"></i>
                  {{item.title}}:{{item.name}}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" class-name="text-center" width="100">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="warning"
                plain
                class="no-margin-left margin-bottom-10 w-100"
                disabled
              >网格图</el-button>
              <el-button
                size="small"
                type="primary"
                plain
                class="no-margin-left w-100"
                v-on:click="
                  $router.push({
                    path: `/supervisionGrid/manage/${row.id}`
                  })
                "
              >管理</el-button>
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
          @pagination="getData"
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
  name: "supervisionGrid",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 50
      },
      dialogVisible: false,
      total: 0,
      tableData: [],
      listLoading: false,
      townList: null
    };
  },
  created() {
    this.getTown();
    // this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/supervision_grid/all", {
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "id"
        })
        .then(response => {
          let rawData = response.data;
          let town = null;
          for (town in this.townList) {
            let tmpData = {};
            for (let i = 1; i < 5; i++) {
              let row = rawData.filter(
                el =>
                  el.townId === this.townList[town].id &&
                  el.supervisorType === i
              );
              if (row) tmpData["group" + i] = row;
              else tmpData["group" + i] = [];
            }
            tmpData.id = this.townList[town].id;
            this.tableData.push(tmpData);
          }
          console.log(this.tableData);
          this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTown() {
      this.listLoading = true;
      return Request()
        .get("/api/town/all")
        .then(response => {
          this.townList = response;
          for (let i in this.townList) {
            var regex = new RegExp(/(?<="level1":)(.*)(?=,"level2leader")/g),
              results = regex.exec(this.townList[i].superviseSystem);
            const group1 = results ? results[1] : "[]";
            var regex1 = new RegExp(/(?<="level2leader":)(.*)(?=,"level2")/g),
              results1 = regex1.exec(this.townList[i].superviseSystem);
            const tmplevel2leader = results1 ? results1[1] : {};
            var regex2 = new RegExp(/(?<="level2":)(.*)(?=,"level3")/g),
              results2 = regex2.exec(this.townList[i].superviseSystem);
            const group2 = results2 ? results2[1] : "[]";
            var regex3 = new RegExp(/(?<="level3":)(.*)(?=,"level4")/g),
              results3 = regex3.exec(this.townList[i].superviseSystem);
            const group3 = results3 ? results3[1] : "[]";
            var regex4 = new RegExp(/(?<="level4":)(.*)(?=}")/g),
              results4 = regex4.exec(this.townList[i].superviseSystem);
            const group4 = results4 ? results4[1] : "[]";

            this.townList[i]["level2header"] = JSON.parse(tmplevel2leader);
            this.townList[i]["group1"] = JSON.parse(group1);
            this.townList[i]["group2"] = JSON.parse(group2);
            this.townList[i]["group3"] = JSON.parse(group3);
            this.townList[i]["group4"] = JSON.parse(group4);
          }
          console.log(this.townList);
          this.tableData = this.townList;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 100);
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
    filterTown(id) {
      let town = this.townList.find(x => x.id === id);
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
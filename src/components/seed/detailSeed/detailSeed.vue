<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>种子管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">查看详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox" style="align-items:center">
        <div class="header-left">
          <el-button class="margin-left-20" type="primary" plain :disabled="true">
            <div style="display: flex">
              <span v-if="villageId>0">{{ filterVillage(villageId) }}</span>
              <span v-if="townId>0">{{ filterTown(townId) }}</span>
              <span v-if="cityId>0">{{ filterCity(cityId) }}</span>
            </div>
          </el-button>
          <el-button class="margin-left-20" type="primary" plain v-on:click="$router.go(-1)">返回</el-button>
        </div>
        <div style="margin-left:auto; width: 70%;">
          <el-row class="margin-bottom-10">
            <el-col :span="1">合计：</el-col>
            <el-col :span="5">补贴面积(亩)：{{sum1}}</el-col>
            <el-col :span="5">种子应收金额(元)：{{sum2}}</el-col>
            <el-col :span="5">农户自负金额(元)：{{sum3}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="5">供种数量(公斤)：{{sum4}}</el-col>
            <el-col :span="5">种子补贴金额(元)：{{sum5}}</el-col>
          </el-row>
        </div>
      </div>
      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="field1" label="户名"></el-table-column>
          <el-table-column prop="field2" label="品种名称"></el-table-column>
          <el-table-column prop="field3" label="补贴面积 (亩)"></el-table-column>
          <el-table-column prop="field4" label="供种面积 （亩）"></el-table-column>
          <el-table-column prop="field5" label="中标价格 （元/公斤）"></el-table-column>
          <el-table-column prop="field6" label="种子应收金额 （元）"></el-table-column>
          <el-table-column prop="field7" label="种子补贴金额 （元）"></el-table-column>
          <el-table-column prop="field8" label="农户自负金额 （元）"></el-table-column>
        </el-table>
      </el-container>

      <div class="pageBox">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page.pageIndex"
          :limit.sync="page.pageSize"
          @pagination="getData"
          layout="prev, pager, next, sizes, jumper"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination";
import Request from "../../../services/api/request";

export default {
  name: "detailSeed",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      cityList: [],
      villageList: [],
      townList: [],
      total: 0,
      tableData: [],
      listLoading: false,
      companyProduction: null,
      id: -1,
      townId: null,
      cityId: null,
      villageId: null,
      sum1: 0,
      sum2: 0,
      sum3: 0,
      sum4: 0,
      sum5: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.villageId = this.$route.query.villageId;
    this.cityId = this.$route.query.cityId;
    this.townId = this.$route.query.townId;
    this.getData();
    this.getCity();
    this.getVillage();
    this.getTown();
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/seed/profile/" + this.id)
        .then(response => {
          this.tableData = response.data;
          this.total = response.total;
          for (let index in response.data) {
            this.sum1 = this.sum1 + parseFloat(response.data[index].field3);
            this.sum2 = this.sum2 + parseInt(response.data[index].field6);
            this.sum3 = this.sum3 + parseInt(response.data[index].field8);
            this.sum4 = this.sum4 + parseInt(response.data[index].field4);
            this.sum5 = this.sum5 + parseInt(response.data[index].field7);
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCity() {
      Request()
        .get("/api/city/all")
        .then(response => {
          this.cityList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getVillage() {
      Request()
        .get("/api/village/all")
        .then(response => {
          this.villageList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTown() {
      Request()
        .get("/api/town/all")
        .then(response => {
          this.townList = response;
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
    filterVillage(id) {
      let village = this.villageList.find(x => x.id === id);
      if (village) {
        return village.name;
      } else {
        return "";
      }
    },
    filterTown(id) {
      let town = this.townList.find(x => x.id === id);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    },
    filterCity(id) {
      let city = this.cityList.find(x => x.id === id);
      if (city) {
        return city.name;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss">
</style>
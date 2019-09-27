<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">监管对象</el-breadcrumb-item>
                <el-breadcrumb-item class="actived">三品认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
            <div class="iptBox">
                <el-button type="primary" v-on:click="$router.push(`/threeProductsCertification/create`)" plain>添加</el-button>
                <div class="select_label">企业名称</div>
                <el-select v-model="companyName" @change="getList()">
                  <el-option v-for="item in ['全部', '福鼎茶业', '万里香大米']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <div class="select_label">产品分类</div>
                <el-select v-model="productCategory" @change="getList()">
                  <el-option v-for="item in ['全部', '种植类', '古里镇']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <div class="select_label">认证类型</div>
                <el-select v-model="authType" @change="getList()">
                  <el-option v-for="item in ['全部', '梅李镇', '养殖类']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </div>

            <el-container>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-class-name="rowIndex"
                        fit
                      >
                    <el-table-column
                        :formatter="order"
                        label="序号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="companyname"
                        label="企业名称">
                    </el-table-column>
                    <el-table-column
                        prop="productname"
                        label="产品名称">
                    </el-table-column>
                    <el-table-column
                        prop="productcategory"
                        label="产品分类">
                    </el-table-column>
                    <el-table-column
                        prop="authType"
                        label="认证类型">
                    </el-table-column>
                     <el-table-column
                      label="操作">
                      <template slot-scope="{row}">
                        <el-button type="success" plain v-on:click="$router.push(`/threeProductsCertification/${row.id}`)">查看</el-button>
                        <el-button
                          type="danger"
                          @click="handleDelete(`${row.id}`)" plain>删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </el-container>
            <div class="pageBox">
              <Pagination v-show="total>0" :total="total" :page.sync="page.pageIndex" 
            :limit.sync="page.pageSize" @pagination="getList" />
            </div>
        </div>
    </div>
</template>
<script>
import sampleData from './_data.js'
import Pagination from '@/components/common/pagination'
export default {
    name: "threeProductCertificate",
    components: { Pagination },
    data(){
      return {
        companyName: '全部',
        productCategory: '全部',
        authType: '全部',
        page: {
          pageIndex: 1,
          pageSize: 10
        },
        listLoading: true,
        total: 100,
        tableData: sampleData
      };
    },
    created() {
        this.getList();
    },
    methods: {
      rowIndex({ row, rowIndex }) {
        row.rowIndex = rowIndex;
      },
      getList() {
        this.listLoading = true;
        // fetchListAPI(this.status, this.page.pageIndex, this.page.pageSize, "credit_gradeid")
        //   .then(response => {
            this.tableData = sampleData;  // this.tableData = response;  
            this.total = this.tableData.length;
            setTimeout(() => {
              this.listLoading = false
            }, 0.5 * 1000);
        // })
      },
      order(row) {
        return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
      },
    }
  };
</script>

<style scoped>
</style>
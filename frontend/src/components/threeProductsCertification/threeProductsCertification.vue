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
                <el-button type="primary" :to="{ path: 'addThreeProducts' }">添加</el-button>
                <div class="select_label">企业名称</div>
                <el-dropdown>
                  <el-button>
                    企业名称<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>全部</el-dropdown-item>
                    <el-dropdown-item>福鼎茶业</el-dropdown-item>
                    <el-dropdown-item>万里香大米</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div class="select_label">产品分类</div>
                <el-dropdown>
                  <el-button>
                      产品分类<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>全部</el-dropdown-item>
                      <el-dropdown-item>福鼎茶业</el-dropdown-item>
                      <el-dropdown-item>万里香大米</el-dropdown-item>
                  </el-dropdown-menu>
                  </el-dropdown>
                  <div class="select_label">产品分类</div>
                  <el-dropdown>
                    <el-button>
                        产品分类<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>全部</el-dropdown-item>
                        <el-dropdown-item>福鼎茶业</el-dropdown-item>
                        <el-dropdown-item>万里香大米</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </div>

            <el-container>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-class-name="rowIndex"
                        fit
                      >
                    <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
                    <el-table-column
                        prop="name"
                        label="企业名称">
                    </el-table-column>
                    <el-table-column
                        prop="classification"
                        label="产品名称">
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="产品分类">
                    </el-table-column>
                    <el-table-column
                        prop="bookNo"
                        label="认证类型">
                    </el-table-column>
                     <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button type="primary">查看</el-button>
                        <el-button
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </el-container>
            <div class="pageBox">
              <pagination v-show="total>0" :total="total" :page.sync="page.pageIndex" 
                  :limit.sync="page.pageSize" @pagination="getList" />
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/common/pagination'
    export default {
      components: { Pagination },
        created() {
            this.getList();
        },
        data(){
          return{
            total:100,
            page: 1,
            limit: 10,
            pageSizes: {
              type: Array,
              default() {
                return [10, 20, 30, 50]
              }
            },
            layout: {
              type: String,
              default: 'total, sizes, prev, pager, next, jumper'
            },
            background: {
              type: Boolean,
              default: true
            },
            hidden: {
              type: Boolean,
              default: false
            },
            tableData: [
              {
                  name: '产品',
                  classification: '分类',
                  type: '认证类型',
                  bookNo:'123456',
                  date:'2018-09-01至2020-05-01',
                  limitedPeriod:'1年',
                  yield:'600'
              },
              {
                  name: '产品',
                  classification: '分类',
                  type: '认证类型',
                  bookNo:'123456',
                  date:'2018-09-01至2020-05-01',
                  limitedPeriod:'1年',
                  yield:'600'
              },
              {
                  name: '产品',
                  classification: '分类',
                  type: '认证类型',
                  bookNo:'123456',
                  date:'2018-09-01至2020-05-01',
                  limitedPeriod:'1年',
                  yield:'600'
              },
              {
                  name: '产品',
                  classification: '分类',
                  type: '认证类型',
                  bookNo:'123456',
                  date:'2018-09-01至2020-05-01',
                  limitedPeriod:'1年',
                  yield:'600'
              },
            ]
          }
        },
        computed: {
          currentPage: {
            get() {
              return this.page
            },
            set(val) {
              this.$emit('update:page', val)
            }
          },
          pageSize: {
            get() {
              return this.limit
            },
            set(val) {
              this.$emit('update:limit', val)
            }
          }
        },
        methods: {
          getList() {
            this.listLoading = true;
            // fetchListAPI(this.status, this.page.pageIndex, this.page.pageSize, "credit_gradeid")
            //   .then(response => {
                // this.tableData = sampleData;  // this.tableData = response;  
                this.total = this.tableData.length;
                setTimeout(() => {
                  this.listLoading = false
                }, 0.5 * 1000);
            // })
          },
          rowIndex({ row, rowIndex }) {
            row.rowIndex = rowIndex;
          },
          order(row) {
            return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
          },
        }
    }
</script>

<style scoped>

</style>
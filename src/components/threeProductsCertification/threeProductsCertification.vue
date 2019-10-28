<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">三品一标管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button size="small"
          type="primary"
          v-on:click="$router.push(`/threeProductsCertification/create`)"
          plain
        >添加</el-button>
        <div class="select_label">企业名称</div>
        <el-select v-model="creditCode" @change="getList()">
          <el-option
            v-for="item in companyProduction"
            :key="item.creditCode"
            :label="item.companyName"
            :value="item.creditCode"
          ></el-option>
        </el-select>
        <div class="select_label">产品分类</div>
        <el-select v-model="productCategory" @change="getList()">
          <el-option v-for="(item, index) in appStatus1" :key="item" :label="item" :value="index"></el-option>
        </el-select>
        <div class="select_label">认证类型</div>
        <el-select v-model="authType" @change="getList()">
          <el-option v-for="(item, index) in appStatus2" :key="item" :label="item" :value="index"></el-option>
        </el-select>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;你确定你要删除?</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false" type="primary" plain>取消</el-button>
          <el-button size="small" @click="handleDelete" type="success" plain>确认</el-button>
        </span>
      </el-dialog>
      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="企业名称">
            <template slot-scope="{ row }">
              {{
              filterCompnay(row.creditCode)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="productname" label="产品名称">
            <template slot-scope="{ row }">
              {{
              filterProduct(row.productId)
              }}
            </template>
          </el-table-column>
          <el-table-column label="产品分类">
            <template slot-scope="{ row }">
              {{
              appStatus1[row.argriculturalClassification]
              }}
            </template>
          </el-table-column>
          <el-table-column label="认证类型" prop="certificationType">
            <template slot-scope="{ row }">{{ appStatus2[parseInt(row.certificationType)] }}</template>
          </el-table-column>
          <el-table-column prop="certificationNo" label="证书编号"></el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button size="small"
                type="success"
                plain
                v-on:click="
                  $router.push({
                    path: `/threeProductsCertification/${row.id}`,
                    query: {
                      company: filterCompnay(row.creditCode),
                      product: filterProduct(row.productId)
                    }
                  })
                "
              >查看</el-button>
              <el-button size="small" type="danger" v-on:click="confirmDelete(`${row.id}`)" plain>删除</el-button>
            </template>
          </el-table-column>
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
import Request from "../../services/api/request.js";
export default {
  name: "threeProductCertificate",
  components: { Pagination },
  data() {
    return {
      creditCode: "",
      productCategory: 0,
      authType: 0,
      dialogVisible: false,
      selectedId: null,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: [],
      companyProduction: [],
      productDetail: [],
      appStatus1: ["全部", "养殖业", "已同意", "畜牧业", "种植业"],
      appStatus2: ["全部", "无公害产品", "绿色食品", "有机食品", "地理标志"]
    };
  },
  created() {
    this.getCompanyProduction();
    this.getProductionDetail();
    this.getList();
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/quality_standard/all", {
          creditCode: this.creditCode,
          argriculturalClassification: this.productCategory,
          certificationType: this.authType,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          townId: this.currTown,
          sortBy: "id",
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
    getCompanyProduction() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyProduction = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProductionDetail() {
      Request()
        .get("/api/product_production/name")
        .then(response => {
          this.productDetail = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDelete() {
      Request()
        .delete("/api/quality_standard/delete/" + this.selectedId)
        .then(response => {
          this.dialogVisible = false;
          this.getList();
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterCompnay(credit) {
      let company = this.companyProduction.find(x => x.creditCode === credit);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    filterProduct(ID) {
      let product = this.productDetail.find(x => x.productId === ID);
      if (product) {
        return product.productName;
      } else {
        return "";
      }
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    confirmDelete(id) {
      this.dialogVisible = true;
      this.selectedId = id;
    }
  }
};
</script>

<style scoped>
</style>
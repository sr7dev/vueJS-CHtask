<template>
  <div class="container">
    <div class="box">
      <el-container>
        <el-header>常熟市2019年上半年度种植业绿色食品统计汇总</el-header>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          :row-class-name="rowIndex"
          :span-method="mainSpanMethod"
          v-loading="listLoading"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
          <el-table-column prop="plate.value" label="板块"></el-table-column>
          <el-table-column prop="productionUnit.value" label="生产单位"></el-table-column>
          <el-table-column prop="productName.value" label="产品名称"></el-table-column>
          <el-table-column prop="productCertificateNum.value" label="产品证书编号"></el-table-column>
          <el-table-column prop="baseArea.value" label="基地面积(亩)"></el-table-column>
          <el-table-column prop="production.value" label="产量(吨)"></el-table-column>
          <el-table-column prop="baseAddress.value" label="基地地址(到村)"></el-table-column>
          <el-table-column label="面积统计" align="center" style="color: black">
            <el-table-column
              :prop="col.prop"
              :label="col.label"
              v-for="col in columns"
              :key="col.prop"
              align="center"
            ></el-table-column>
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
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "greenFood",
  components: { Pagination },
  props: {
    year: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      columns: [
        {
          prop: "certified.value",
          label: "已获证"
        },
        {
          prop: "declared.value",
          label: "已申报"
        }
      ],
      alert_dialogVisible: false,
      confirm_dialogVisible: false,

      loggedinUserType: null,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      tableData: [],
      objectData: [
        {
          plate: "梅李镇",
          productionInfo: [
            {
              productionUnit: "常熟市吉健葡萄科技有限公司",
              productUnitInfo: [
                {
                  productName: "猕猴桃",
                  productCertificateNum: "LB-18-1701100080A",
                  baseArea: 60,
                  production: 60
                },
                {
                  productName: "葡萄",
                  productCertificateNum: "LB-18-1605101265A",
                  baseArea: 200,
                  production: 200
                }
              ],
              baseAddress: "常熟市梅李镇珍北村"
            },
            {
              productionUnit: "苏州市智惠岛农业科技有限公司",
              productUnitInfo: [
                {
                  productName: "虞仓大米",
                  productCertificateNum: "LB-03-18031001578A",
                  baseArea: 370,
                  production: 160
                }
              ],
              baseAddress: "常熟市梅李镇寨角村"
            }
          ],
          certified: 1130,
          declared: 770
        },
        {
          plate: "常福街道",
          productionInfo: [
            {
              productionUnit: "江苏勤川现代农业科技有限公司",
              productUnitInfo: [
                {
                  productName: "勤川大米",
                  productCertificateNum: "",
                  baseArea: 4000,
                  production: 1500
                }
              ],
              baseAddress: "常熟市常福街道勤丰村"
            },
            {
              productionUnit: "常熟市虞山镇中泾农地股份合作社",
              productUnitInfo: [
                {
                  productName: "火龙果",
                  productCertificateNum: "LB-18-19031001438A",
                  baseArea: 150,
                  production: 300
                }
              ],
              baseAddress: "常熟市常福街道中泾村"
            }
          ],
          certified: 5700,
          declared: 2100
        }
      ],
      listLoading: false
    };
  },

  created() {
    this.loggedinUserType = Auth().user().userType;
    this.getData();
  },
  methods: {
    arrangeData() {
      let data = this.objectData;
      this.total = data.length;
      let index = 0;
      data.forEach(pltUnit => {
        let pltotal = 0;

        pltUnit.productionInfo.forEach(puin => {
          let puintotal = 0;

          puin.productUnitInfo.forEach(pduin => {
            this.tableData.push({
              plate: { value: pltUnit.plate, spaning: 0 }, //plLen * puinLen},
              productionUnit: { value: puin.productionUnit, spaning: 0 }, // puinLen},
              productName: { value: pduin.productName, spaning: 0 },
              productCertificateNum: {
                value: pduin.productCertificateNum,
                spaning: 0
              },
              baseArea: { value: pduin.baseArea, spaning: 0 },
              production: { value: pduin.production, spaning: 0 },
              baseAddress: { value: puin.baseAddress, spaning: 0 }, // puinLen},
              certified: { value: pltUnit.certified, spaning: 0 }, //plLen * puinLen },
              declared: { value: pltUnit.declared, spaning: 0 } //plLen * puinLen},
            });
            puintotal++;
            index++;
          });
          this.tableData[index - puintotal].productionUnit.spaning = puintotal;
          this.tableData[index - puintotal].baseAddress.spaning = puintotal;
          pltotal += puintotal;
        });

        this.tableData[index - pltotal].plate.spaning = pltotal;
        this.tableData[index - pltotal].certified.spaning = pltotal;
        this.tableData[index - pltotal].declared.spaning = pltotal;
      });

      this.tableData.push({
        plate: { value: "合计", spaning: 0 },
        productionUnit: { value: "", spaning: 0 },
        productName: { value: "", spaning: 0 },
        productCertificateNum: { value: "", spaning: 0 },
        baseArea: { value: this.baseQuality(), spaning: 0 },
        production: { value: this.productionQuality(), spaning: 0 },
        baseAddress: { value: "", spaning: 0 },
        certified: { value: this.cetifiyQuality(), spaning: 0 },
        declared: { value: this.declareQuality(), spaning: 0 }
      });
    },

    baseQuality() {
      let total = 0;
      this.objectData.forEach(obj => {
        obj.productionInfo.forEach(pro => {
          pro.productUnitInfo.forEach(product => {
            total += product.baseArea;
          });
        });
      });

      return total;
    },

    productionQuality() {
      let total = 0;
      this.objectData.forEach(obj => {
        obj.productionInfo.forEach(pro => {
          pro.productUnitInfo.forEach(product => {
            total += product.production;
          });
        });
      });

      return total;
    },

    cetifiyQuality() {
      let total = 0;
      this.objectData.forEach(obj => {
        total += obj.certified;
      });

      return total;
    },

    declareQuality() {
      let total = 0;
      this.objectData.forEach(obj => {
        total += obj.declared;
      });
      return total;
    },

    mainSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex < this.tableData.length - 1) {
        if (columnIndex === 1) {
          if (row.plate.spaning > 0) {
            return {
              rowspan: row.plate.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex === 2) {
          if (row.productionUnit.spaning > 0) {
            return {
              rowspan: row.productionUnit.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex === 7) {
          if (row.baseAddress.spaning > 0) {
            return {
              rowspan: row.baseAddress.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex === 8) {
          if (row.certified.spaning > 0) {
            return {
              rowspan: row.certified.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex === 9) {
          if (row.declared.spaning > 0) {
            return {
              rowspan: row.declared.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      } else {
        if (rowIndex == this.tableData.length - 1) {
          if (columnIndex == 1) {
            return {
              rowspan: 1,
              colspan: 2
            };
          } else if (columnIndex == 2) {
            return {
              rowspan: 1,
              colspan: 3
            };
          } else if (columnIndex == 0 || columnIndex == 3 || columnIndex == 4) {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
    getData() {
      this.listLoading = false;
      this.arrangeData();
    },

    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>

<style>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
}

.el-table thead {
  color: #333 !important;
}

.el-table--border td {
  border-right: 1px solid #ebeef5 !important;
}
</style>
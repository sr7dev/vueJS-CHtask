<template>
  <div class="container">
    <div class="box">
      <el-container>
        <el-header>有机农产品清单</el-header>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          :row-class-name="rowIndex"
          :span-method="objectSpanMethod"
          v-loading="listLoading"
          fit
          highlight-current-row
        >
          <el-table-column
            :formatter="order"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="townDistrict.value"
            label="所在镇(区)"
          ></el-table-column>
          <el-table-column
            prop="declarationUnitName.value"
            label="申报单位名称"
          ></el-table-column>
          <el-table-column
            prop="numbering.value"
            label="编号"
          ></el-table-column>
          <el-table-column prop="kind.value" width="50"></el-table-column>
          <el-table-column
            prop="productName.value"
            label="产品名称"
            align="center"
          ></el-table-column>
          <el-table-column prop="area.value" label="面积(亩)"></el-table-column>
          <el-table-column
            prop="production.value"
            label="产量(吨)"
          ></el-table-column>
          <el-table-column
            prop="address.value"
            label="详细地址"
          ></el-table-column>
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
  name: "organicProduce",
  components: { Pagination },
  props: {
    year: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      alert_dialogVisible: false,
      confirm_dialogVisible: false,

      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      tableData: [],
      objData: [
        {
          townDistrict: "虞山街道(637.6)",
          declarationUnit: [
            {
              declarationUnitName: "常熟市维摩剑门绿茶有限公司",
              declaration: [
                {
                  numbering: "100OP1200293",
                  kind: "绿茶",
                  product: [
                    {
                      productName: "太白茶",
                      production: 1.1
                    },
                    {
                      productName: "碧螺春",
                      production: 2.5
                    },
                    {
                      productName: "茗毫",
                      production: 10
                    }
                  ],
                  address: "常熟市虞山中路维摩"
                },
                {
                  numbering: "100OP1200292",
                  kind: "茶青",
                  product: [
                    {
                      productName: "茶青",
                      production: 94.4
                    }
                  ],
                  address: "江苏常熟市虞山中路维摩茶园"
                }
              ],
              area: 637.6
            }
          ]
        },
        {
          townDistrict: "梅李镇(699.6)",
          declarationUnit: [
            {
              declarationUnitName: "苏州市吉成酱油酿造有限公司",
              declaration: [
                {
                  numbering: "100OP1200519",
                  kind: "酱油",
                  product: [
                    {
                      productName: "缘木记酱油",
                      production: 60
                    },
                    {
                      productName: "缘木记黑豆酱油",
                      production: 14
                    },
                    {
                      productName: "缘木记蔬菜汁酱油",
                      production: 15
                    }
                  ],
                  address: "江苏省常熟市梅李镇聚沙路11号"
                }
              ],
              area: 0
            },
            {
              declarationUnitName: "常熟市海明现代农业发展有限公司",
              kind: "",
              declaration: [
                {
                  numbering: "134OP1400173",
                  product: [
                    {
                      productName: "青菜",
                      production: 171
                    },
                    {
                      productName: "白菜",
                      production: 94.4
                    },
                    {
                      productName: "散叶莴苣 ",
                      production: 19.2
                    }
                  ],
                  address: "江苏省苏州市常熟市梅李镇海城村"
                }
              ],
              area: 699.6
            }
          ]
        }
      ],
      listLoading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = false;
      this.total = this.tableData.length;
      this.arrangData();
    },
    arrangData() {
      let data = this.objData;
      this.total = data.length;
      let index = 0;
      data.forEach(obj => {
        let objtotal = 0;

        obj.declarationUnit.forEach(declare => {
          let dectotal = 0;

          declare.declaration.forEach(deunit => {
            let deunitotal = 0;

            deunit.product.forEach(pro => {
              this.tableData.push({
                townDistrict: { value: obj.townDistrict, spaning: 0 },
                declarationUnitName: {
                  value: declare.declarationUnitName,
                  spaning: 0
                },
                kind: { value: deunit.kind, spaning: 0 },
                numbering: { value: deunit.numbering, spaning: 0 },
                productName: { value: pro.productName, spaning: 0 },
                production: { value: pro.production, spaning: 0 },
                address: { value: deunit.address, spaning: 0 },
                area: { value: declare.area, spaning: 0 }
              });

              deunitotal++;
              index++;
            });

            this.tableData[index - deunitotal].numbering.spaning = deunitotal;
            this.tableData[index - deunitotal].address.spaning = deunitotal;
            if (this.tableData[index - deunitotal].kind.value !== "") {
              this.tableData[index - deunitotal].kind.spaning = deunitotal;
            }
            dectotal += deunitotal;
          });

          this.tableData[
            index - dectotal
          ].declarationUnitName.spaning = dectotal;
          this.tableData[index - dectotal].area.spaning = dectotal;
          objtotal += dectotal;
        });

        this.tableData[index - objtotal].townDistrict.spaning = objtotal;
      });

      this.tableData.push({
        townDistrict: { value: "合计", spaning: 0 },
        declarationUnitName: { value: "", spaning: 0 },
        numbering: { value: "", spaning: 0 },
        productName: { value: "", spaning: 0 },
        production: { value: this.productionQuality(), spaning: 0 },
        address: { value: "预计下半年通过15000亩认证面积", spaning: 0 },
        area: { value: this.areaQualtiy(), spaning: 0 }
      });
    },

    areaQualtiy() {
      let total = 0;
      this.objData.forEach(obj => {
        obj.declarationUnit.forEach(dec => {
          total += dec.area;
        });
      });
      return total;
    },

    productionQuality() {
      let total = 0;
      this.objData.forEach(obj => {
        obj.declarationUnit.forEach(dec => {
          dec.declaration.forEach(pro => {
            pro.product.forEach(p => {
              total += p.production;
            });
          });
        });
      });
      return parseFloat(total).toFixed(2);
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex < this.tableData.length - 1) {
        if (columnIndex == 1) {
          if (row.townDistrict.spaning > 0) {
            return {
              rowspan: row.townDistrict.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex == 2) {
          if (row.declarationUnitName.spaning > 0) {
            return {
              rowspan: row.declarationUnitName.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex == 3) {
          if (row.numbering.spaning > 0) {
            return {
              rowspan: row.numbering.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex == 4) {
          if (row.kind.spaning > 0) {
            return {
              rowspan: row.kind.spaning,
              colspan: 1
            };
          } else if (row.kind.spaning == 0 && row.kind.value === "") {
            return {
              rowspan: 0,
              colspan: 2
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex == 6) {
          if (row.area.spaning > 0) {
            return {
              rowspan: row.area.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex == 8) {
          if (row.address.spaning > 0) {
            return {
              rowspan: row.address.spaning,
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
        } else if (columnIndex == 0 || columnIndex == 3 || columnIndex == 5) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
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

.el-table--border td {
  border-right: 1px solid #ebeef5 !important;
}
</style>

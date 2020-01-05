<template>
  <div class="box">
    <el-dialog
      :visible.sync="openDialog"
      width="90%"
      :before-close="handleClose"
    >
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm">
        <el-form-item class="left-margin flex-box w-100 no-margin-IE">
          <el-row
            v-for="(rowData, index) in dynamicValidateForm.data"
            :key="index"
          >
            <el-col :span="1">
              <el-form-item class="margin-left-20">
                <el-checkbox
                  @change="changeCheckStatus(index)"
                  true-label="1"
                  false-label="0"
                  class="form-checkbox"
                  v-model="checked[index]"
                ></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="板块："
                :prop="'data.' + index + '.town'"
                :rules="{ required: true, message: '请选择', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-select v-model="rowData.town" class="w-100">
                <el-option
                  v-for="town in township"
                  :key="town.id"
                  :label="town.name"
                  :value="town.id"
                ></el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="绿色食品面积:"
                :prop="'data.' + index + '.productName'"
                class="margin-left-10"
              >
                <el-input v-model="rowData.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="有机面积:"
                :prop="'data.' + index + '.organicArea'"                
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.organicArea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item
                label="绿色优质基地面积:"
                :prop="'data.' + index + '.highQualityArea'"                
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.highQualityArea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="重复面积:"
                :prop="'data.' + index + '.repeatArea'"                
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.repeatArea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="合计:"
                :prop="'data.' + index + '.sum'"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.sum"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="耕地面积:"
                :prop="'data.' + index + '.cultivatedArea'"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.cultivatedArea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="绿色,有机:"
                :prop="'data.' + index + '.greenOrganic'"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.greenOrganic"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="地标:"
                :prop="'data.' + index + '.target'"
                class="margin-left-10"
              >
                <el-input v-model="rowData.target"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="预计面积:"
                :prop="'data.' + index + '.predictArea'"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.predictArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="margin-left-40 margin-top-20">
            <el-col :span="17">
              <el-button size="small" @click="addFormRow()" type="primary" plain
                >添加</el-button
              >
              <el-button
                size="small"
                @click="deleteSelectedRows()"
                type="danger"
                plain
                >删除</el-button
              >
            </el-col>
            <el-col :span="4" v-show="dynamicValidateForm.data.length > 0">
              <span>插入时间:&nbsp;</span>
              <el-date-picker
                style="width:180px"
                type="date"
                v-model="registerTime"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" v-show="dynamicValidateForm.data.length > 0">
              <el-button
                size="small"
                @click="onSubmit('dynamicValidateForm')"
                type="success"
                plain
                >保存</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
      <span>
        <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="confirm_dialogVisible = false"
          type="primary"
          plain
          >取消</el-button
        >
        <el-button
          size="small"
          type="success"
          @click="updateSelectedRows()"
          plain
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-container>
      <el-header class="margin-bottom-10">种植业绿色优质农产品统计汇总</el-header>
      <div class="iptBox">
        <el-row class="w-80">
          <el-col :span="2">
            <el-button
              size="small"
              type="success"
              plain
              v-on:click="showAddDialog()"
              >添加</el-button
            >
          </el-col>
          <el-col :span="6">
            <span>开始日期:&nbsp;</span>
            <el-date-picker
              style="width:150px"
              type="date"
              v-model="registerTimeFrom"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <span>结束日期:&nbsp;</span>
            <el-date-picker
              style="width:150px"
              type="date"
              v-model="registerTimeTo"
            ></el-date-picker>
          </el-col>
          <el-col :span="9">
            <span>创建单位:&nbsp;</span>
            <el-input v-model="town" class="w-60"></el-input>
          </el-col>
          <el-col :span="1">
            <el-button
              size="small"
              type="primary"
              plain
              v-on:click="changeFilter()"
              class="margin-left-10"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
        highlight-current-row
        border
        :span-method="objectSpanMethod"
      >
        <el-table-column :formatter="order" label="序号">         
        </el-table-column>
        <el-table-column prop="town" label="板块"></el-table-column>
        <el-table-column
          prop="productName"
          label="绿色食品面积"
        >        
        <template slot-scope="{ row }">
          {{row.productName = (row.productName==-1)?"/" : row.productName}}
        </template>
        </el-table-column>
        <el-table-column prop="organicArea" label="有机面积">
          <template slot-scope="{ row }">
          {{row.organicArea = (row.organicArea==-1)?"/" : row.organicArea}}
        </template>
        </el-table-column>
        <el-table-column
          prop="highQualityArea"
          label="绿色优质基地面积"
        >
        <template slot-scope="{ row }">
          {{row.highQualityArea = (row.highQualityArea==-1)?"/" : row.highQualityArea}}
        </template>
        </el-table-column>
        <el-table-column prop="repeatArea" label="重复面积">
          <template slot-scope="{ row }">
          {{row.repeatArea = (row.repeatArea==-1)?"/" : row.repeatArea}}
        </template>
        </el-table-column>
        <el-table-column prop="sum" label="合计">
           <template slot-scope="{ row }">
          {{row.sum = (row.sum==-1)?"/" : row.sum}}
        </template>
        </el-table-column>
        <el-table-column
          prop="cultivatedArea"
          label="耕地面积"
        >
        <template slot-scope="{ row }">
          {{row.cultivatedArea = (row.cultivatedArea==-1)?"/" : row.cultivatedArea}}
        </template>
        </el-table-column>
        <el-table-column prop="proportion" label="占比">
          <template slot-scope="{ row }">
          {{row.proportion = (row.proportion==-1)?"/" : row.proportion}}
        </template>
        </el-table-column>
        <el-table-column
          prop="greenOrganic"
          label="绿色,有机"
        >
         <template slot-scope="{ row }">
          {{row.greenOrganic = (row.greenOrganic==-1)?"/" : row.greenOrganic}}
        </template>
        </el-table-column>
        <el-table-column prop="target" label="地标">
           <template slot-scope="{ row }">
          {{row.target = (row.target==-1)?"/" : row.target}}
        </template>
        </el-table-column>
        <el-table-column prop="predictArea" label="预计面积">
          <template slot-scope="{ row }">
          {{row.predictArea = (row.predictArea==-1)?"/" : row.predictArea}}
        </template>
        </el-table-column>
        <el-table-column
          prop="expectedRatio"
          label="预计占比"
        ></el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "plantingTownshipStatistics",
  props: {
    year: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      openDialog: false,
      dynamicValidateForm: {
        data: []
      },
      selectedRows: [],
      township: [],
      confirm_dialogVisible: false,
      checked: [],
      registerTime: new Date().toString("YYYY-MM-DD"),
      registerTimeFrom: new Date(new Date().getFullYear(), 0, 1),
      registerTimeTo: new Date(),
      town: "",
      sendcount: 0,

      alert_dialogVisible: false,
      // loggedinUserType: null,

      tableData: [],
      listLoading: true
    };
  },
  created() {
    // this.loggedinUserType = Auth().user().userType;
    this.getTown();
    this.getData();
  },
  methods: {
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
    showAddDialog() {
      this.dynamicValidateForm.data = [];
      this.selectedRows = [];
      this.checked = [];
      this.addFormRow();
      this.openDialog = true;
    },

    handleClose(done) {
      this.$confirm("您确定要关闭此对话框吗？")
        .then(_ => {
          this.getData();
          done();
        })
        .catch(_ => {});
    },

    addFormRow() {
      this.dynamicValidateForm.data.push({
        town: "",
        productName: "",
        organicArea: 0,
        highQualityArea: 0,
        repeatArea: 0,
        sum: 0,
        cultivatedArea: 0,
        greenOrganic: 0,
        target: "",
        predictArea: 0
      });
    },

    deleteSelectedRows() {
      if (this.selectedRows.length) {
        this.selectedRows = this.selectedRows.sort((a, b) => (a > b ? -1 : 1));
        for (let index in this.selectedRows) {
          let checkId = this.dynamicValidateForm.data[this.selectedRows[index]]
            .id;
          if (checkId) this.deletedRows.push(checkId);
          this.checked[this.selectedRows[index]] = false;
          this.dynamicValidateForm.data.splice(this.selectedRows[index], 1);
        }
        this.selectedRows = [];
      }
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.confirm_dialogVisible = true;
        }
      });
    },
    filterTownship(townId) {
      let town = this.township.find(x => x.id === townId);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    },

    changeCheckStatus(rowIndex) {
      let index = this.selectedRows.indexOf(rowIndex);
      if (index > -1) this.selectedRows.splice(index, 1);
      if (this.checked[rowIndex] == 1) {
        this.selectedRows.push(rowIndex);
      }
    },

    updateSelectedRows() {
      this.confirm_dialogVisible = false;
      this.openDialog = false;
      let updateTime = new Date();
      let createTime = new Date();
      this.listLoading = true;
      this.sendcount = 0;

      this.dynamicValidateForm.data.forEach(item => {
        let formdata = new FormData();
        formdata.append("createTime", createTime.toDateString("YYYY-MM-DD"));
        formdata.append("createUserId", Auth().user().id);
        
        formdata.append("cultivatedArea", (item.cultivatedArea == "" || item.cultivatedArea == undefined? -1:item.cultivatedArea) );
        formdata.append("greenOrganic", (item.greenOrganic == "" || item.greenOrganic == undefined? -1:item.greenOrganic));

        formdata.append("highQualityArea", (item.highQualityArea == "" || item.highQualityArea == undefined? -1:item.highQualityArea));
        formdata.append("id", 0);
        formdata.append("organicArea", (item.organicArea == "" || item.organicArea == undefined? -1:item.organicArea));
        formdata.append("predictArea", (item.predictArea == "" || item.predictArea == undefined? -1:item.predictArea));
        formdata.append("productName", item.productName);
        formdata.append(
          "registerTime",
          this.registerTime.toString("YYYY-MM-DD")
        );
        formdata.append("repeatArea", (item.repeatArea == "" || item.repeatArea == undefined? -1:item.repeatArea));
        formdata.append("sum", (item.sum == "" || item.sum == undefined? -1:item.sum));
        formdata.append("target", item.target);
        formdata.append("town", this.filterTownship(item.town));
        
        formdata.append("updateTime", updateTime.toDateString("YYYY-MM-DD"));
        formdata.append("updateUserId", Auth().user().id);

        Request()
          .post("/api/green/plants_statistics/create", formdata)
          .then(res => {
            this.sendcount++;
            if (this.sendcount === this.dynamicValidateForm.data.length) {
              this.listLoading = false;
              this.getData();
            }
          });
      });
    },

    changeFilter() {
      this.getData();
    },

    getData() {
      this.listLoading = true;
      let toDate = new Date(this.registerTimeTo.getFullYear(),
                this.registerTimeTo.getMonth(),
                this.registerTimeTo.getDate(),
                23, 59, 59
              );

      Request()
        .get("/api/green/plants_statistics/all", {
          town: this.town,
          registerTimeFrom:
            this.registerTimeFrom == "" || this.registerTimeFrom == null
              ? ""
              : this.registerTimeFrom,
          registerTimeTo:
            this.registerTimeTo == "" || this.registerTimeTo == null
              ? ""
              : toDate,
          sortBy: "id"
        })
        .then(res => {
          this.tableData = res.data;
          this.total = this.tableData.length;
          this.getTotal();

          this.tableData.forEach(item =>{
            if (item.organicArea !== -1)
                item.organicArea = parseFloat(item.organicArea).toFixed(2);
            else
                item.organicArea = "/";
            
            if (item.highQualityArea !== -1)
              item.highQualityArea = parseFloat(item.highQualityArea).toFixed(2);
            else
              item.highQualityArea = "/";

            if (item.repeatArea !== -1)
              item.repeatArea = parseFloat(item.repeatArea).toFixed(2);
            else
              item.repeatArea = "/";

            if (item.sum !== -1)
              item.sum = parseFloat(item.sum).toFixed(2);
            else
              item.sum = "/";
            
            if (item.cultivatedArea !== -1)
              item.cultivatedArea = parseFloat(item.cultivatedArea).toFixed(2);
            else
              item.cultivatedArea = "/";

            if (item.greenOrganic !== -1)
              item.greenOrganic = parseFloat(item.greenOrganic).toFixed(2);
            else 
              item.greenOrganic = "/";

            if (item.predictArea !== -1)
              item.predictArea = parseFloat(item.predictArea).toFixed(2);
            else
              item.predictArea = "/";

            if (item.expectedRatio !== -1)
              item.expectedRatio = parseFloat(item.expectedRatio).toFixed(2);
            else
              item.expectedRatio = "/";

            if (item.proportion !== -1)
              item.proportion = parseFloat(item.proportion).toFixed(2);
            else
              item.proportion = "/";
          })
          this.listLoading = false;
        });
    },

    getTotal() {
      this.tableData.forEach(item => {
        if (item.sum !== -1 && item.cultivatedArea !== -1 )
           item.proportion = item.sum * 100 / item.cultivatedArea;
        else
           item.proportion = -1;

        if (item.predictArea !== -1 && item.cultivatedArea !== -1)
           item.expectedRatio = item.predictArea * 100 / item.cultivatedArea;
        else
            item.expectedRatio = -1;
      });

      this.tableData.push({
        town: "合计",
        productName: "", //this.greenFoodQuality(),
        organicArea: this.organicAreaQuality(),
        highQualityArea: this.greenHighQuality(),
        repeatArea: this.repeatAreaQuality(),
        sum: this.totalQuality(),
        cultivatedArea: this.cultivateQuality(),
        proportion: 0, //this.proportionQuality(),
        greenOrganic: this.greenOrganicQuality(),
        target: this.landmarkQuality(),
        predictArea: this.estimateQuality(),
        expectedRatio: 0 //this.expectedQuality()
      });
      this.tableData[this.tableData.length - 1].proportion = this.tableData[this.tableData.length - 1].sum / this.tableData[this.tableData.length - 1].cultivatedArea;
      this.tableData[this.tableData.length - 1].expectedRatio = this.tableData[this.tableData.length - 1].predictArea /this.tableData[this.tableData.length - 1].cultivatedArea;
    },

    greenFoodQuality() {
      let total = 0;
      this.tableData.forEach(data => {        
        total += (data.productName == -1? 0: data.productName);
      });
      return total;
    },

    organicAreaQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.organicArea == -1? 0:data.organicArea);
      });
      return total;
    },

    greenHighQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.highQualityArea == -1? 0: data.highQualityArea);
      });
      return total;
    },

    repeatAreaQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.repeatArea == -1? 0:data.repeatArea);
      });
      return total;
    },

    totalQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.sum  == -1? 0:data.sum);
      });
      return total;
    },

    cultivateQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.cultivatedArea == -1? 0:data.cultivatedArea);
      });
      return total;
    },

    proportionQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.proportion == -1? 0:data.proportion);
      });
      return total;
    },

    greenOrganicQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.greenOrganic == -1? 0:data.greenOrganic);
      });
      return total;
    },

    landmarkQuality() {
      let total1 = 0,
        total2 = 0;
      this.tableData.forEach(data => {
        if (data.target != -1)
        {
          if (data.target.includes("%")) {
          let res = data.target.split("%");
          total1 += Number(res[0]);
          total2 += Number(res[1].substring(1, res[1].length - 1));
        } else {
          if (!isNaN(data.target)) total2 += Number(data.target);
        }
        }
      });
      if (total1 > 0) return parseFloat(total1).toFixed(2) + "%(" + total2 + ")";

      return total2;
    },

    estimateQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.predictArea == -1? 0:data.predictArea);
      });
      return total;
    },

    objectSpanMethod({ row, col, rowIndex, columnIndex }) {
      if (rowIndex == this.tableData.length - 1) {
        if (columnIndex == 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
        if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 2
          };
        }
      }
    },

    expectedQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += (data.expectedRatio == -1? 0:data.expectedRatio);
      });
      return total;
    },

    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return row.rowIndex + 1;
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
</style>

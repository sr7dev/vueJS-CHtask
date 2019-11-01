<template>
  <div class="container">
    <el-dialog :visible.sync="openDialog" width="90%" :before-close="handleClose">
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm">
        <el-form-item class="left-margin flex-box w-100 no-margin-IE">
          <el-row v-for="(rowData, index) in dynamicValidateForm.data" :key="index">
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
                :prop="'data.' + index+'.town'"
                :rules="{ required: true, message: '请插入', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-input v-model="rowData.town"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="绿色食品面积:"
                :prop="'data.' + index+'.productName'"
                :rules="{ required: true, message: '请插入', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-input v-model="rowData.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="有机面积:"
                :prop="'data.' + index+'.organicArea'"
                :rules="[{required: true, message: '请插入', trigger: 'blur'},
                { type: 'number',message: '插入号码', trigger: 'blur'}]"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.organicArea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item
                label="绿色优质基地面积:"
                :prop="'data.' + index+'.highQualityArea'"
                :rules="[{required: true, message: '请插入', trigger: 'blur'},
                { type: 'number',message: '插入号码', trigger: 'blur'}]"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.highQualityArea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="重复面积:"
                :prop="'data.' + index+'.repeatArea'"
                :rules="[{required: true, message: '请插入', trigger: 'blur'},
                { type: 'number',message: '插入号码', trigger: 'blur'}]"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.repeatArea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="合计:"
                :prop="'data.' + index+'.sum'"
                :rules="[{required: true, message: '请插入', trigger: 'blur'},
                { type: 'number',message: '插入号码', trigger: 'blur'}]"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.sum"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="耕地面积:"
                :prop="'data.' + index+'.cultivatedArea'"
                :rules="[{required: true, message: '请插入', trigger: 'blur'},
                { type: 'number',message: '插入号码', trigger: 'blur'}]"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.cultivatedArea"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="绿色,有机:"
                :prop="'data.' + index+'.greenOrganic'"
                :rules="[{required: true, message: '请插入', trigger: 'blur'},
                { type: 'number',message: '插入号码', trigger: 'blur'}]"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.greenOrganic"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="地标:"
                :prop="'data.' + index+'.target'"
                :rules="{required: true, message: '请插入', trigger: 'blur'}"
                class="margin-left-10"
              >
                <el-input v-model="rowData.target"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="预计面积:"
                :prop="'data.' + index+'.predictArea'"
                :rules="[{required: true, message: '请插入', trigger: 'blur'},
                { type: 'number',message: '插入号码', trigger: 'blur'}]"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.predictArea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="margin-left-40 margin-top-20">
            <el-col :span="17">
              <el-button size="small" @click="addFormRow()" type="primary" plain>添加</el-button>
              <el-button size="small" @click="deleteSelectedRows()" type="danger" plain>删除</el-button>
            </el-col>
            <el-col :span="4" v-show="dynamicValidateForm.data.length > 0">
              <span>插入时间:&nbsp;</span>
              <el-date-picker type="date" v-model="registerTime"></el-date-picker>
            </el-col>
            <el-col :span="2" v-show="dynamicValidateForm.data.length > 0">
              <el-button
                size="small"
                @click="onSubmit('dynamicValidateForm')"
                type="success"
                plain
              >保存</el-button>
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
        <el-button size="small" @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
        <el-button size="small" type="success" @click="updateSelectedRows()" plain>确认</el-button>
      </span>
    </el-dialog>

    <div class="box">
      <div class="iptBox">
        <el-row>
          <el-col :span="2">
            <el-button size="small" type="success" plain v-on:click="showAddDialog()">添加</el-button>
          </el-col>
          <el-col :span="6">
            <span>开始日期:&nbsp;</span>
            <el-date-picker type="date" v-model="registerTimeFrom"></el-date-picker>
          </el-col>
          <el-col :span="6">
            <span>结束日期:&nbsp;</span>
            <el-date-picker type="date" v-model="registerTimeTo"></el-date-picker>
          </el-col>
          <el-col :span="9">
            <span>创建单位:&nbsp;</span>
            <el-input v-model="town" class="w-80"></el-input>
          </el-col>
          <el-col :span="1">
            <el-button size="small" type="primary" plain v-on:click="changeFilter()" class="margin-left-10">搜索</el-button>
          </el-col>          
        </el-row>

      </div>
      <el-container>
        <el-header>种植业绿色优质农产品统计汇总</el-header>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
          border
          :span-method="objectSpanMethod"
        >
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="town" label="板块"></el-table-column>
          <el-table-column prop="productName" label="绿色食品面积"></el-table-column>
          <el-table-column prop="organicArea" label="有机面积"></el-table-column>
          <el-table-column prop="highQualityArea" label="绿色优质基地面积"></el-table-column>
          <el-table-column prop="repeatArea" label="重复面积"></el-table-column>
          <el-table-column prop="sum" label="合计"></el-table-column>
          <el-table-column prop="cultivatedArea" label="耕地面积"></el-table-column>
          <el-table-column prop="proportion" label="占比"></el-table-column>
          <el-table-column prop="greenOrganic" label="绿色,有机"></el-table-column>
          <el-table-column prop="target" label="地标"></el-table-column>
          <el-table-column prop="predictArea" label="预计面积"></el-table-column>
          <el-table-column prop="expectedRatio" label="预计占比"></el-table-column>
        </el-table>
      </el-container>
    </div>
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
      confirm_dialogVisible: false,
      checked: [],
      registerTime: new Date().toString("YYYY-MM-DD"),
      registerTimeFrom: "",
      registerTimeTo: "",
      town: "",
      sendcount: 0,

      alert_dialogVisible: false,
      loggedinUserType: null,

      tableData: [],
      listLoading: true
    };
  },
  created() {
    this.loggedinUserType = Auth().user().userType;
    this.getData();
  },
  methods: {
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
          if (this.selectedRows.length > 0) this.confirm_dialogVisible = true;
          else this.openDialog = false;
        }
      });
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
        formdata.append("cultivatedArea", item.cultivatedArea);       
        formdata.append("greenOrganic", item.greenOrganic);
        
        formdata.append("highQualityArea", item.highQualityArea);
        formdata.append("id", 0);
        formdata.append("organicArea", item.organicArea);
        formdata.append("predictArea", item.predictArea);
        formdata.append("productName", item.productName);
        formdata.append("registerTime", this.registerTime.toString("YYYY-MM-DD"));
        formdata.append("repeatArea", item.repeatArea);
        formdata.append("sum", item.sum);
        formdata.append("target", item.target);
        formdata.append("town", item.town);
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
      Request()
        .get("/api/green/plants_statistics/all", {
          town: this.town,
          registerTimeFrom: (this.registerTimeFrom == "" || this.registerTimeFrom == null )  ? "": this.registerTimeFrom.toString("YYYY-MM-DD"),
          registerTimeTo: (this.registerTimeTo == "" || this.registerTimeTo == null) ? "": this.registerTimeTo.toString("YYYY-MM-DD"),
          sortBy: "id"
        })
        .then(res => {
          this.tableData = res.data;
          this.total = this.tableData.length;
          this.getTotal();
          this.listLoading = false;
        });
    },

    getTotal() {
      this.tableData.forEach( item => {
        item.proportion = (item.sum / item.cultivatedArea).toFixed(2);
        item.expectedRatio = (item.predictArea/ item.cultivatedArea).toFixed(2);
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
        expectedRatio: 0, //this.expectedQuality()
      });
      this.tableData[this.tableData.length - 1].proportion = (this.tableData[this.tableData.length - 1].sum / this.tableData[this.tableData.length - 1].cultivatedArea).toFixed(2);
      this.tableData[this.tableData.length - 1].expectedRatio = (this.tableData[this.tableData.length - 1].predictArea/ this.tableData[this.tableData.length - 1].cultivatedArea).toFixed(2);
    },

    greenFoodQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.productName;
      });
      return total;
    },

    organicAreaQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.organicArea;
      });
      return total;
    },

    greenHighQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.highQualityArea;
      });
      return total;
    },

    repeatAreaQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.repeatArea;
      });
      return total;
    },

    totalQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.sum;
      });
      return total;
    },

    cultivateQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.cultivatedArea;
      });
      return total;
    },

    proportionQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.proportion;
      });
      return total;
    },

    greenOrganicQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.greenOrganic;
      });
      return total;
    },

    landmarkQuality() {
      let total1 = 0, total2 = 0;
      this.tableData.forEach(data => {
        if (data.target.includes("%")){
          let res =data.target.split("%");
          total1 += Number(res[0]);
          total2 += Number(res[1].substring(1, res[1].length-1));
        } else {
          if (!isNaN(data.target))
            total2 += Number(data.target);
        }
      });
      if (total1 > 0)
        return total1+ "%(" + total2 + ")" ;

      return total2;
    },

    estimateQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.predictArea;
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
        total += data.expectedRatio;
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
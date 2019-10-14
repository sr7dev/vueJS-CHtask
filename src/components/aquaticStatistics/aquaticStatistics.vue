  <template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">水产统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button type="primary" plain v-on:click="handleImportExcel()">添加</el-button>
        <input
          type="file"
          id="file"
          ref="file"          
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          v-on:change="handleFileUpload()"
          name="Upload Excel"
          style="display:none"
        />
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
          <el-table-column prop="sampleName" label="样品名称"></el-table-column>
          <el-table-column prop="sampleScientificName" label="样品学名"></el-table-column>
          <el-table-column prop="sampleSerialNum" label="样品编号"></el-table-column>
          <el-table-column prop="city" label="市别"></el-table-column>
          <el-table-column prop="district" label="区县"></el-table-column>
          <el-table-column prop="inspectedUnit" label="被检单位"></el-table-column>
          <el-table-column prop="sampleType" label="样品类型"></el-table-column>
          <el-table-column prop="furaMeta" label="呋喃唑酮代谢物"></el-table-column>
          <el-table-column prop="malaGreen" label="孔雀石绿"></el-table-column>
          <el-table-column prop="detectionRoomNum" label="检测室编号"></el-table-column>
          <el-table-column prop="detectionRoomName" label="检测室名称"></el-table-column>
          <el-table-column prop="detectionTime" label="检测时间"></el-table-column>
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
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";
import XLSX from "xlsx";

export default {
  name: "aquaticStatistics",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      file: null,
      total: 0,
      tableData: [],
      listLoading: false
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/aquatic_statistics/all", {
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize
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
        
    fixdata(data) {
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },

    workbook_make_json(workbook) {
      var key={
        "区县":"district",
        "呋喃唑酮代谢物":"furaMeta",
        "孔雀石绿":"malaGreen",
        "市别":"city",
        "样品名称":"sampleName",
        "样品学名":"sampleScientificName",
        "样品类型":"sampleType",
        "样品编号":"sampleSerialNum",
        "检测室名称":"detectionRoomName",
        "检测室编号":"detectionRoomNum",
        "检测时间":"detectionTime",
        "被检单位":"inspectedUnit"
      };
      var result = [];            
      var index = 0;
      workbook.SheetNames.forEach(function(sheetName) {        
        var roa = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        
        if (roa.length > 0) {
         roa.forEach(function(row){
             let changeVal = Object.keys(row).map(k => {
              let v = key[k] || k;                            
              return { [v] : row[k] };
            });
            
            result.push(Object.assign({}, ...changeVal, 
            {"createTime" : new Date().toJSON()}, 
            {"createUserId" : Auth().user().attrs.id}, 
            {"id" : 0}, 
            {"updateTime" : new Date().toJSON()}, 
            {"updateUserId" : Auth().user().attrs.id})) ;      
                 
         });
        }
      });
      
      return result;
    },

    handleImportExcel() {
      document.getElementById("file").click();
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      var reader = new FileReader();
      var obj = this;

      reader.onload = function(e) {
        
        let fixedData = obj.fixdata(e.target.result),
          workbook = XLSX.read(btoa(fixedData), { type: "base64" });
        let val = obj.workbook_make_json(workbook);
        
        Request()
        .post('/api/aquatic_statistics/create', val)
        .then(response=>{
          obj.getList();
        })
        .catch(error => {
              console.log(error);
        });        
      };

      reader.readAsArrayBuffer(this.file);
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
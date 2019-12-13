<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">常用语管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button size="small" type="primary" v-on:click="$router.go(-1)" plain>
          <i class="el-icon-back"></i> 返回
        </el-button>
        <el-button size="small" type="success" @click="handleAdd" plain>
          <i class="el-icon-plus"></i> 添加
        </el-button>
      </div>
      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
          <el-table-column prop="word" label="常用语"></el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button size="small" type="primary" plain @click="handleEdit(row.index, row)">
                <i class="el-icon-edit"></i>查看
              </el-button>
              <el-button size="small" type="danger" plain @click="handleDel(row.index, row)">
                <i class="el-icon-close"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <el-dialog title="添加" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" :rules="addFormRules" ref="addForm">
          <el-form-item prop="word">
            <el-input v-model="addForm.word"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click.native="addSubmit" plain :loading="addLoading">保存</el-button>
          <el-button size="small" @click.native="addFormVisible = false" plain type="warning">关闭</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" :rules="editFormRules" ref="editForm">
          <el-form-item prop="word">
            <el-input v-model="editForm.word"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" plain @click.native="editSubmit" :loading="editLoading">保存</el-button>
          <el-button size="small" @click.native="editFormVisible = false" type="warning" plain>关闭</el-button>
        </div>
      </el-dialog>
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
import Request from "../../../services/api/request.js";
export default {
  name: "commonWords",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      listLoading: true,
      editFormRules: {
        word: [{ required: true, message: "请输入", trigger: "blur,change" }]
      },
      editForm: { id: 0, word: "" },
      editFormVisible: false,
      editLoading: false,
      addFormRules: {
        word: [{ required: true, message: "请输入", trigger: "blur,change" }]
      },
      addForm: { id: 0, word: "" },
      addFormVisible: false,
      addLoading: false,
      tableData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/common_word/all", {
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
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        Request()
          .delete("/api/common_word/delete/" + row.id)
          .then(response => {
            // this.tableData = response.data;
            // this.total = response.total;
            this.getList();
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    handleAdd() {
      this.addFormVisible = true;
      this.addForm = {
        id: 0,
        word: ""
      };
    },
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editLoading = true;
          Request()
            .put("/api/common_word/update/" + this.editForm.id, {
              id: this.editForm.id,
              word: this.editForm.word
            })
            .then(response => {
              // this.tableData = response.data;
              // this.total = response.total;
              this.editLoading = false;
              this.editFormVisible = false;
              this.getList();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addLoading = true;
          Request()
            .post("/api/common_word/create", {
              id: this.addForm.id,
              word: this.addForm.word
            })
            .then(response => {
              // this.tableData = response;
              // this.total = this.tableData.length;
              this.addLoading = false;
              this.addFormVisible = false;
              this.getList();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
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

<style scoped>
</style>
<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>站内消息</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">Add Internal Message</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form 
        ref="addForm" 
        :model="addForm" 
        :rules="rules" 
        label-width="100px"
        class="form-width" 
    >
        <el-form-item prop="receiveUserId" label="接收人" class="input-width label-align">
            <el-select 
                v-model="addForm.receiveUserId" 
                placeholder="请选择"
            >
                <el-option
                    v-for="item in users"
                    :key="item.id"
                    :label="item.userId"
                    :value="item.id"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="contents" label="内容" class="label-align">
            <el-input 
                v-model="addForm.contents" 
                auto-complete="off"
                type="textarea"
                :rows="10"
            >
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="success" plain @click="onSubmit('addForm')">
                保存
            </el-button>
            <el-button type="danger" plain v-on:click="$router.go(-1)">
                取消
            </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import Auth from "../../../services/authentication/auth.js";

export default {
  data() {
    return {
        addForm: {
            contents: "",
            receiveUserId: "",
        },
        users: [],
        rules: {
            contents: [
            {
                required: true,
                message: "请插入",
                trigger: "change"
            }],
            receiveUserId: [
            {
                required: true,
                message: "请选择",
                trigger: "change"
            }],
        },
        dataloading: false
    };
  },
  mounted() {
    this.getReceiveUserId();
  },
  methods: {
    onSubmit(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.dataloading = true;
                var now = new Date();
                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);
                var today = now.getFullYear() + "-" + (month) + "-" + (day);
                Request()
                    .post("/api/internal_message/create", 
                    {
                        receiveUserId: this.addForm.receiveUserId,
                        contents: this.addForm.contents,
                        receiveStatus: 0,
                        createTime: today,
                        id: 0
                    })
                    .then(response => {
                        this.$router.push({ path: "/internalMessage" });
                        setTimeout(() => {
                            this.dataloading = false;
                        }, 0.01 * 1000);
                    })
                    .catch(error => {});
            }
        });
    },
    getReceiveUserId() {
        this.dataloading = true;
        Request()
            .get("/api/user/all")
            .then(response => {
                this.users = this.users.concat(response.data)
            })
            .catch(error => {});
    }
  }
};
</script>

<style lang="scss">
</style>
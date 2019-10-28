<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>通知管理 / 通知公告</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form 
        ref="formData" 
        :model="formData" 
        style="max-width:980px; margin:0 auto;"
        v-loading="dataloading"
    >
        <el-form-item class="detail-text-align">
            {{ formData.title }}
        </el-form-item>
        <el-form-item class="detail-text-align">
            <span>发布日期：</span>
            <span>{{ formData.releaseTime | formatDate }}</span>
            <span style="margin-left: 50px;">发布者：</span>
            <span>{{ formData.releasePerson }}</span>
        </el-form-item>
        <el-form-item>
            <p style="word-wrap: break-word;line-height: 1.5em;">{{ formData.content }}</p>
        </el-form-item>
        <el-form-item label="" prop="file">
            <el-button size="small" v-if="file_live_1" plain @click="downloadFile()">附件下载</el-button>
            <el-button size="small" v-else plain disabled>附件下载</el-button>
            <!-- <span class="item-value" v-if="!file_live_1">
                <el-link @click="downloadFile()">
                    {{ fileName }}
                </el-link>
            </span> -->
            <span class="item-value" v-if="file_live_1">
                ({{ fileName }})
            </span>
        </el-form-item>
        <el-form-item>
            <el-button size="small" plain v-on:click="$router.go(-1)" type="success">
                返回
            </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";
export default {
  data() {
    return {
        formData: {
            timingRelease: "",
            releaseTime: "",
            releasePerson: "",
            title: "",
            content: "",
        },
        fileName: '',
        file_live_1: null,
        id: 0,
        dataloading: true

    };
  },
  beforeMount() {
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id) {
        this.dataloading = true;
        Request()
            .get("/api/notice/get/" + id)
            .then(response => {
                this.formData = response;
                if (response.noticeProfiles) {
                  this.file_live_1 = response.noticeProfiles;
                  this.fileName = this.file_live_1.replace("/uploads/", "");
                }
                setTimeout(() => {
                    this.dataloading = false;
                }, 0.01 * 1000);
            })
            .catch(error => {
                console.log(error);
            });
    },
    downloadFile() {
        axios({
            url: Urls.DOWNLOAD_URL() + this.file_live_1,
            method: "GET",
            responseType: "blob" // important
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                this.file_live_1.replace("/uploads/", "")
            ); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    },
  }
};
</script>

<style lang="scss">
</style>
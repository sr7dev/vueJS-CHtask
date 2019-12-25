<template>
  <div>
    <mt-header fixed title="溯源详情">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header qrboard">
      <div class="qrboard-container">
        <qrcode-stream
          @decode="onDecode"
          @init="onInit"
          :track="paintGreenText"
        ></qrcode-stream>
      </div>
      <p v-if="!error">将相机设置在QR Code上</p>
    </div>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { MessageBox } from "mint-ui";
import TokenManager from "@/configs/token-manager";
export default {
  name: "recognizeQR",
  components: { QrcodeStream, QrcodeDropZone, QrcodeCapture, MessageBox },
  data() {
    return {
      result: "",
      error: ""
    };
  },
  created() {
    if (!TokenManager().accessToken) {
      MessageBox.alert("Token 错误", "提示").then(action => {
        this.$router.push("/");
      });
    }
  },
  methods: {
    /* When recognize QRcode  */
    onDecode(decodedString) {
      if (decodedString.indexOf("{") > -1) {
        this.result = JSON.parse(decodedString).batchNumber;
        //getting batchnumber from QRcode information
        setTimeout(() => {
          this.$router.push("/sweepCode/" + this.result); //go to SweepCode page
        }, 1000);
      } else {
        MessageBox.alert("不正确的 QR Code", "提示").then(action => {
          this.$router.push("/");
        });
      }
    },
    /* Detect Camera Status */
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "错误：您需要授予摄像头访问权限";
        } else if (error.name === "NotFoundError") {
          this.error = "错误：此设备上没有相机";
        } else if (error.name === "NotSupportedError") {
          this.error = "错误：需要安全上下文（HTTPS，localhost）";
        } else if (error.name === "NotReadableError") {
          this.error = "错误：相机已在使用中吗？";
        } else if (error.name === "OverconstrainedError") {
          this.error = "错误：安装的相机不合适";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "错误：此浏览器不支持 Stream API";
        }
        setTimeout(() => {
          MessageBox.alert(this.error, "提示").then(action => {
            this.$router.push("/");
          });
        }, 1000);
      }
    },
    /* customized QrcodeStream track */
    paintGreenText(location, ctx) {
      const {
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
      } = location;

      const pointArray = [
        topLeftCorner,
        topRightCorner,
        bottomLeftCorner,
        bottomRightCorner
      ];

      const centerX = pointArray.reduce((sum, { x }) => x + sum, 0) / 4;
      const centerY = pointArray.reduce((sum, { y }) => y + sum, 0) / 4;

      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";

      ctx.lineWidth = 3;
      ctx.strokeStyle = "#35495e";
      ctx.strokeText(this.result, centerX, centerY);

      ctx.fillStyle = "#5cb984";
      ctx.fillText(this.result, centerX, centerY);
    }
  }
};
</script>
<style scoped>
.qrboard {
  background: black;
  padding: 25% 10px;
  height: calc(100vh - 50px);
}
.qrboard-container {
  border: 0.25em solid #4679eb;
  position: relative;
}
.qrboard-container::before,
.qrboard-container::after {
  content: "";
  display: block;
  position: absolute;
  background: #000;
}

.qrboard-container::before {
  top: -0.3em;
  bottom: -0.3em;
  left: 1em;
  right: 1em;
}

.qrboard-container::after {
  left: -0.3em;
  right: -0.3em;
  top: 1em;
  bottom: 1em;
}
.qrboard p {
  text-align: center;
}
.wrapper {
  height: 50%;
  z-index: 1;
}
</style>

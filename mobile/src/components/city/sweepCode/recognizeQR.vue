<template>
  <div>
    <mt-header fixed title="溯源详情">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header qrboard">
      <div class="qrboard-container">
         <vue-qr-reader 
          v-on:code-scanned="codeArrived" 
          v-on:error-captured="errorCaptured" 
          :line-width="4"
          line-color="#FF0000"
          :responsive="true">
        </vue-qr-reader>
      </div>
      <p v-if="!errorMessage">将相机设置在QR Code上</p>
    </div>
  </div>
</template>

<script>
 import VueQrReader from 'vue-qr-reader/dist/lib/vue-qr-reader.umd.js';
import { MessageBox } from "mint-ui";
import TokenManager from "@/configs/token-manager";
export default {
  name: "recognizeQR",
  components: { VueQrReader },
  data() {
    return {
      errorMessage:""
    };
  },
  created() {
    if (!TokenManager().accessToken) {
      MessageBox.alert("Token 错误", "提示").then(action => {
        this.$router.push("/");
      });
    }else{
      const checkCamera = hasGetUserMedia();
      checkCamera ? MessageBox.alert(checkCamera, "提示").then(action => {
        // this.$router.push("/");
      }):MessageBox.alert("camera not recognized", "提示").then(action => {
        // this.$router.push("/");
      })
    }
  },
  methods: {
    hasGetUserMedia() {
      return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
    },
    /* When recognize QRcode  */
    codeArrived (event) {
      console.log(event);
      MessageBox.alert(event, "提示").then(action => {
        // this.$router.push("/");
      });
    },
    /* Detect Camera Status */
    errorCaptured(error) {
      switch (error.name) {
          case 'NotAllowedError':
          this.errorMessage = 'Camera permission denied.'
          break;
          case 'NotFoundError':
          this.errorMessage = 'There is no connected camera.'
          break;
          case 'NotSupportedError':
          this.errorMessage = 'Seems like this page is served in non-secure context.'
          break;
          case 'NotReadableError':
          this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
          break;
          case 'OverconstrainedError':
          this.errorMessage = 'Constraints don\'t match any installed camera.'
          break;
          default:
          this.errorMessage = 'UNKNOWN ERROR: ' + error.message
      }
      setTimeout(() => {
        MessageBox.alert(this.errorMessage, "提示").then(action => {
          // this.$router.push("/");
        });
      }, 500);
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
  /* background: #000; */
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

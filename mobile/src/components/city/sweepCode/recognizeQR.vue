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
          :camera="camera"
          :paused="paused"
          @init="onCameraChange"
        ></qrcode-stream>
      </div>
      <p>将相机设置在QR Code上</p>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { QrcodeReader } from 'vue-qrcode-reader';
import TokenManager from "@/configs/token-manager";
export default {
  name: "recognizeQR",
  components: { QrcodeReader },
  data() {
    return {
      cameraSettings: {
        audio: false,
        video: {
          facingMode: { ideal: 'environment' }
        }
      },
      camera: 'auto',
      paused: false,
      content:""
    }
  },
  created() {
    if (!TokenManager().accessToken) {
      MessageBox.alert("Token 错误", "提示").then(action => {
        this.$router.push("/");
      });
    }
  },
  methods: {
    async onDecode (content) {
      try {
        this.content = content;
        this.pauseCamera(); // 暫停鏡頭準備調用
  
        // 調用 redeem 進行兌換
        let message = await this.redeem(content);
        // 兌換成功後彈出訊息並重新啟用鏡頭
        Swal('Good job!',
              message,
              'success').then(() => {
                this.unPauseCamera()
        });
      } catch (error) {
          Swal('Whoops!',
                error.message,
                'error').then(() => {
                this.unPauseCamera()
          });
      }
    },
    pauseCamera () {
      this.paused = true
    },
    unPauseCamera () {
      this.paused = false
    },
    redeem (content) {
     return new Promise((resolve, reject) => {
          // 兌換票券請求
        if (content) { 
          resolve('Success'); 
        } else { 
          reject('failed'); 
        }
      });
    },
    onCameraChange (promise) {
      promise.catch(error => {
        const cameraMissingError = error.name === 'OverconstrainedError'
        const triedFrontCamera = this.camera === 'front'

        if (triedFrontCamera && cameraMissingError) {
           MessageBox.alert("Token 错误", "提示").then(action => {
            this.$router.push("/");
          });
        }
      })
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
  z-index: 1!important;
}
</style>

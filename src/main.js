import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "./utils/dateformat";
import "element-ui/lib/theme-chalk/index.css";
import "../src/assets/css/ie-global.scss";
import "../src/assets/css/global.scss";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
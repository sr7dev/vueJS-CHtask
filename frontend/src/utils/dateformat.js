import Vue from "vue";
import moment from 'moment'

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("YYYY-MM-DD");
  }
});

Vue.filter("formatDateTime", function(value) {
  if (value) {
    return moment(String(value)).format("YYYY-MM-DD HH:mm:ss");
  }
});
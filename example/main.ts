import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import * as ButtplugPanel from "../";

Vue.use(Vuetify);
Vue.use(ButtplugPanel);

// tslint:disable-next-line no-unused-expression
new Vue({
  el: "#app",
  render: (h) => h(App),
});

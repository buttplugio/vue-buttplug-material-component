import Vue from "vue";
const VueMaterial = require("vue-material");

import ButtplugPanelType from "./ButtplugPanel/ButtplugPanel";
import ButtplugPanelComponent from "./ButtplugPanel/ButtplugPanel.vue";
Vue.use(VueMaterial);

export { ButtplugPanelComponent,
         ButtplugPanelType };

export function install(vue: typeof Vue, options = { prefix: "buttplug" }) {
  const { prefix } = options;
  vue.component(`${prefix}-panel`, ButtplugPanelComponent);
}
